const songs = [
    { id: 1, title: "Song 1", artist: "Artist 1", image: "./images/imgae1.jpeg", audio: "../songs/song1.mp3" },
    { id: 2, title: "Song 2", artist: "Artist 2", image: "../images/pic2.jpg", audio: "../songs/song2.mp3" },
    { id: 3, title: "Song 3", artist: "Artist 3", image: "../images/pic3.jpg", audio: "../songs/song3.mp3" },
    { id: 4, title: "Song 4", artist: "Artist 4", image: "../images/pic4.jpg", audio: "../songs/song4.mp3" },
    { id: 5, title: "Song 5", artist: "Artist 5", image: "../images/pic5.jpg", audio: "../songs/song5.mp3" },
    { id: 6, title: "Song 6", artist: "Artist 6", image: "../images/pic6.jpg", audio: "../songs/song6.mp3" },
    { id: 7, title: "Song 7", artist: "Artist 7", image: "../images/pic7.jpg", audio: "../songs/song7.mp3" },
    { id: 8, title: "Song 8", artist: "Artist 8", image: "../images/pic8.jpg", audio: "../songs/song8.mp3" },
    { id: 9, title: "Song 9", artist: "Artist 9", image: "../images/pic9.jpg", audio: "../songs/song9.mp3" },
    { id: 10, title: "Song 10", artist: "Artist 10", image: "../images/pic10.jpg", audio: "../songs/song10.mp3" },

];

const songList = document.getElementById('song-list');
const audioElement = document.getElementById('audio');
const audioSource = document.getElementById('audio-source');

// Populate song list
songs.forEach(song => {
    const songItem = document.createElement('li');
    songItem.classList.add('flex', 'flex-col', 'sm:flex-row', 'items-center', 'justify-between', 'p-4', 'bg-gray-800', 'rounded-lg', 'hover:bg-gray-700', 'transition');
    songItem.innerHTML = `
        <div class="flex items-center space-x-4 mb-4 sm:mb-0">
            <img src="${song.image}" alt="${song.title}" class="w-12 h-12 rounded-md">
            <div class="text-center sm:text-left">
                <h3 class="text-lg font-semibold">${song.title}</h3>
                <p class="text-gray-400">${song.artist}</p>
            </div>
        </div>
        <div class="flex items-center space-x-4">
            <button class="text-gray-400 hover:text-white play-button" data-audio="${song.audio}">
                Play
            </button>
            <button class="favorite-button text-gray-400 hover:text-red-500" data-song-id="${song.id}">❤️</button>
        </div>
    `;
    songList.appendChild(songItem);
});

// Play song
document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', event => {
        const audioSrc = event.target.getAttribute('data-audio');
        audioSource.src = audioSrc;
        audioElement.load();
        audioElement.play();
    });
});

// Add song to favorites in local storage
document.querySelectorAll('.favorite-button').forEach(button => {
    button.addEventListener('click', event => {
        const songId = event.target.getAttribute('data-song-id');
        const favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || [];
        const songToAdd = songs.find(song => song.id == songId);
        if (!favoriteSongs.some(song => song.id == songToAdd.id)) {
            favoriteSongs.push(songToAdd);
            localStorage.setItem('favoriteSongs', JSON.stringify(favoriteSongs));
            alert(`${songToAdd.title} added to favorites!`);
        } else {
            alert(`${songToAdd.title} is already in your favorites!`);
        }
    });
});

// Play all songs in sequence when "Play All" is clicked
const playAllButton = document.getElementById('play-all');
let currentSongIndex = 0;

playAllButton.addEventListener('click', () => {
    if (songs.length > 0) {
        playNextSong();
    }
});

// Function to play the next song
function playNextSong() {
    const song = songs[currentSongIndex];
    audioSource.src = song.audio;
    audioElement.load();
    audioElement.play();
    currentSongIndex++;


    if (currentSongIndex < songs.length) {
        audioElement.addEventListener('ended', playNextSong);
    } else {

        currentSongIndex = 0;
    }
}