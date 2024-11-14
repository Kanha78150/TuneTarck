const usermodel = require("../model/user-model");

const bcrypt = require("bcrypt");

const generateToken = require("../utils/token-create");

module.exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await usermodel.findOne({ email });

        if (user) {
            return res.status(400).render('signup', { error: "User already exists" });
        }

        // Password encryption
        let salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(password, salt);

        // Create the new user
        user = await usermodel.create({
            email,
            password: hashedPassword,
            name,
        });

        // Generate the token
        let token = generateToken({ email });
        res.cookie("token", token, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true,
            secure: true // Set secure to true if using HTTPS
        });

        // Redirect to login page after successful registration
        res.redirect('/login');

    } catch (error) {
        res.status(500).render('signup', { error: "Something went wrong: " + error.message });
    }
};


module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(401).render("login", { error: "Email or Password incorrect" });
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            let token = generateToken({ email });
            res.cookie("token", token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: false // Set to true if using HTTPS
            });
            // Redirect to index.ejs on successful login
            res.redirect("/index");
        } else {
            res.status(401).render("login", { error: "Email or Password incorrect" });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};
