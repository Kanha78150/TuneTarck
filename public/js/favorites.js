// Retrieve favorite songs from local storage
let favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs'));

// Check if favoriteSongs is valid
if (!favoriteSongs || !Array.isArray(favoriteSongs) || favoriteSongs.length === 0) {
    document.getElementById('favorite-list').innerHTML = "<p class='text-gray-400 text-center sm:text-left'>No favorite songs yet.</p>";
} else {
    const favoriteList = document.getElementById('favorite-list');

    // Display each song
    favoriteSongs.forEach(song => {
        const songItem = document.createElement('li');
        songItem.classList.add('flex', 'flex-col', 'sm:flex-row', 'items-center', 'justify-between', 'p-4', 'bg-gray-800', 'rounded-lg', 'hover:bg-gray-700', 'transition');

        // Ensure there are valid image, title, artist, and audio fields
        const image = song.image ? song.image : 'placeholder.jpg';
        const title = song.title ? song.title : 'Unknown Title';
        const artist = song.artist ? song.artist : 'Unknown Artist';
        const audio = song.audio ? song.audio : '';

        // Set up the HTML structure with song details and audio controls
        songItem.innerHTML = `
            <div class="flex items-center space-x-4 mb-4 sm:mb-0 w-full sm:w-auto">
                <img src="${image}" alt="${title}" class="w-12 h-12 rounded-md">
                <div class="text-center sm:text-left">
                    <h3 class="text-lg font-semibold">${title}</h3>
                    <p class="text-gray-400">${artist}</p>
                </div>
            </div>
            <div class="w-full sm:w-auto">
                ${audio ? `<audio controls class="w-full sm:w-80 mx-auto"><source src="${audio}" type="audio/mp3">Your browser does not support the audio element.</audio>` : '<p class="text-gray-500">Audio not available</p>'}
            </div>
        `;

        // Append each song item to the favorite list
        favoriteList.appendChild(songItem);
    });
}