// Music data
const songs = [
    {
        name: "Song 1",
        artist: "Artist 1",
        path: "Song 1.mp3",
        cover: "cover 1.png",
    },
    {
        name: "Song 2",
        artist: "Artist 2",
        path: "Song 2.mp3",
        cover: "cover 2.png",
    },
    {
        name: "Song 3",
        artist: "Artist 3",
        path: "Song 3.mp3",
        cover: "cover 3.png",
    },
    {
        name: "Song 4",
        artist: "Artist 4",
        path: "Song 4.mp3",
        cover: "cover 4.png",
    },
    {
        name: "Song 5",
        artist: "Artist 5",
        path: "Song 5.mp3",
        cover: "cover 5.png",
    },
];

// Select elements
const audio = document.querySelector('#audio');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playButton = document.querySelector('.play-button');
const forwardButton = document.querySelector('.forward-button');
const backwardButton = document.querySelector('.backward-button');
const playPauseIcon = document.querySelector('#playPauseIcon');

let currentMusic = 0;
let isPlaying = false;

// Initialize music
const setMusic = (i) => {
    let song = songs[i];
    currentMusic = i;
    audio.src = song.path;
    songName.textContent = song.name;
    artistName.textContent = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    audio.onloadedmetadata = () => {
        seekBar.max = audio.duration;
        musicDuration.textContent = formatTime(audio.duration);
    };

    currentTime.textContent = "00:00";
    seekBar.value = 0;
};

// Play/Pause functionality
const togglePlayPause = () => {
    if (isPlaying) {
        audio.pause();
        playPauseIcon.src = "play.png"; // Show play icon
        disk.classList.remove('play');
    } else {
        audio.play();
        playPauseIcon.src = "pause.png"; // Show pause icon
        disk.classList.add('play');
    }
    isPlaying = !isPlaying;
};

playButton.addEventListener('click', togglePlayPause);

// Format time (MM:SS)
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
};

// Update seek bar and time
setInterval(() => {
    seekBar.value = audio.currentTime;
    currentTime.textContent = formatTime(audio.currentTime);

    if (audio.currentTime == audio.duration) {
        forwardButton.click(); // Auto play next song
    }
}, 500);

seekBar.addEventListener('change', () => {
    audio.currentTime = seekBar.value;
});

// Play next song
forwardButton.addEventListener('click', () => {
    currentMusic = (currentMusic + 1) % songs.length;
    setMusic(currentMusic);
    audio.play();
    playPauseIcon.src = "pause.png";
    disk.classList.add('play');
    isPlaying = true;
});

// Play previous song
backwardButton.addEventListener('click', () => {
    currentMusic = (currentMusic - 1 + songs.length) % songs.length;
    setMusic(currentMusic);
    audio.play();
    playPauseIcon.src = "pause.png";
    disk.classList.add('play');
    isPlaying = true;
});

// Initialize first song
setMusic(0);
