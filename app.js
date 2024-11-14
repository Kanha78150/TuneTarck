const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectToDb = require("./config/mongoose-connection");
connectToDb();

const app = express();

// Set up views and static files
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Import and use auth routes
const authRouter = require("./router/auth-router");
app.use("/api/auth", authRouter);

// Route to render index.ejs
app.get("/index", (req, res) => {
    res.render("index"); // Ensure index.ejs is in the 'views' directory
});


app.get("/playlist", (req, res) => {
    res.render("playlist");
});

app.get("/fav", (req, res) => {
    res.render("favorites");
});


// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});
