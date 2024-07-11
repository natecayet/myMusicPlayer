const previousBtn = document.getElementById('previous-btn');
const pauseBtn = document.getElementById('pause-btn');
const playBtn = document.getElementById('play-btn');
const playSongBtn = document.getElementById('play-song-btn');
const stopBtn = document.getElementById('stop-btn');
const nextBtn = document.getElementById('next-btn');

const currentSongTitle = document.getElementById('current-song-title');
const currentSongArtist = document.getElementById('current-song-artist');

const playlistContainer = document.getElementById('playlist-container');
const background = document.getElementById('container');
const songImg = document.getElementById('current-song-img-container');

const allSongs = [
    {
        id: 0,
        title: "Adventure",
        artist: "Alexander Nakarada",
        duration: "4:37",
        img: "./cover/image-0.jpg",
        src: "./mp3/alexander-nakarada-adventure.mp3"
    },
    {
        id: 1,
        title: "Adventure Remaster",
        artist: "Alexander Nakarada",
        duration: "4:37",
        img: "./cover/image-1.jpg",
        src: "./mp3/alexander-nakarada-adventure-remaster.mp3"
    },
    {
        id: 2,
        title: "Autumn Walk",
        artist: "Alexander Nakarada",
        duration: "3:18",
        img: "./cover/image-2.jpg",
        src: "./mp3/alexander-nakarada-autumn-walk.mp3"
    },
    {
        id: 3,
        title: "Fantasy",
        artist: "Alexander Nakarada",
        duration: "4:53",
        img: "./cover/image-3.jpg",
        src: "./mp3/alexander-nakarada-fantasy-motion-loop-ready.mp3"
    },
    {
        id: 4,
        title: "Farm",
        artist: "Alexander Nakarada",
        duration: "3:25",
        img: "./cover/image-4.jpg",
        src: "./mp3/alexander-nakarada-farm.mp3"
    },
    {
        id: 5,
        title: "Forest Walk",
        artist: "Alexander Nakarada",
        duration: "3:37",
        img: "./cover/image-5.jpg",
        src: "./mp3/alexander-nakarada-forest-walk.mp3"
    },
    {
        id: 6,
        title: "Night of Mystery",
        artist: "Alexander Nakarada",
        duration: "3:22",
        img: "./cover/image-6.jpg",
        src: "./mp3/alexander-nakarada-night-of-mystery.mp3"
    },
    {
        id: 7,
        title: "Pathfinder",
        artist: "Alexander Nakarada",
        duration: "4:03",
        img: "./cover/image-6.jpg",
        src: "./mp3/alexander-nakarada-pathfinder.mp3"
    },
    {
        id: 8,
        title: "Spirit of the Greenwood",
        artist: "Alexander Nakarada",
        duration: "3:39",
        img: "./cover/image-8.jpg",
        src: "./mp3/alexander-nakarada-spirits-of-the-greenwood.mp3"
    },
    {
        id: 9,
        title: "Village Ambiance",
        artist: "Alexander Nakarada",
        duration: "6:16",
        img: "./cover/image-9.jpg",
        src: "./mp3/alexander-nakarada-village-ambiance.mp3"
    },
    {
        id: 10,
        title: "Woods of Imagination",
        artist: "Alexander Nakarada",
        duration: "3:33",
        img: "./cover/image-10.jpg",
        src: "./mp3/alexander-nakarada-woods-of-imagination.mp3"
    },
];

const audio = new Audio();
let userData = {
    songs: [...allSongs],
    currentSong: null,
    songCurrentTime: 0,
};

//play song
const playSong = (id) => {
    const song = userData?.songs.find((song) => song.id === id);
    audio.src = song.src;
    audio.title = song.title;

    if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
        audio.currentTime = 0;
    }else {
        audio.currentTime = userData?.songCurrentTime;
    }
    userData.currentSong = song;
    playBtn.classList.add('playing');

    highlightCurrentSong();
    setPlayerDisplay();
    audio.play();
};

//pause song
const pauseSong = () => {
    userData.songCurrentTime = audio.currentTime;

    playBtn.classList.remove('playing');
    audio.pause();
};

//play next song
const playNextSong = () => {
    if (userData?.currentSong === null) {
        playSong(userData?.songs[0].id);
    }else {
        const currentSongIndex = getCurrentSongIndex();
        const nextSong = userData.songs[currentSongIndex + 1].id;

        playSong(nextSong);
    }
};

//play previous song
const playPreviousSong = () => {
    if (userData?.currentSong === null) {
        playSong(userData?.songs[0].id);
    }else {
        const currentSongIndex = getCurrentSongIndex();
        const previousSong = userData.songs[currentSongIndex - 1].id;

        playSong(previousSong);
    }
};

//stop song
const stopSong = () => {
    audio.src = "";
    audio.title = "";
    audio.currentTime = 0;
    userData.currentSong = null;
    userData.songCurrentTime = 0;

    background.style.backgroundImage = `url("./cover/album-cover.jpg")`;
    songImg.innerHTML = "";

    playBtn.classList.remove('playing');
    renderSongs(userData?.songs)
};

//change center display to current song playing
const setPlayerDisplay = () => {
    const playingSong = document.getElementById('current-song-title');
    const songArtist = document.getElementById('current-song-artist');
    const currentTitle = userData?.currentSong?.title;
    const currentArtist = userData?.currentSong?.artist;

    const imgHTML = `
    <img src="${getImg()}">
    `;

    background.style.backgroundImage = `url("${getImg()}")`;
    
    songImg.innerHTML = imgHTML;
    playingSong.textContent = currentTitle ? currentTitle : "Music Player";
    songArtist.textContent = currentArtist ? currentArtist : "natecayet";
};

const renderSongs = (arr) => {
    const songHTML = arr.map((song) => {
        return `
        <div id="song-${song.id}" class="song-container">
            <div id="song-info">
                <p id="song-title">${song.title}</p>
                <p id="song-artist">${song.artist}</p>
                <p id="song-time">${song.duration}</p>
            </div>
            <button id="play-song-btn" class="play-song${song.id}" onclick="playSong(${song.id})">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20"><path d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm4.404,13.873l-5.212,2.854c-.325.183-.683.274-1.041.274-.373,0-.747-.099-1.087-.297-.667-.39-1.064-1.083-1.064-1.855v-5.699c0-.772.397-1.465,1.064-1.855.665-.389,1.465-.396,2.138-.017l5.192,2.843c.696.391,1.105,1.091,1.105,1.878s-.409,1.487-1.096,1.873Zm-.904-1.873c0,.087-.058.119-.066.125l-5.212,2.855c-.019.01-.077.042-.147-.001-.074-.043-.074-.107-.074-.128v-5.699c0-.021,0-.085.074-.128.027-.016.052-.021.074-.021.036,0,.065.016.083.026l5.192,2.844c.019.011.076.043.076.13Z"/></svg>
            </button>
        </div>
        `;
    }).join("");

    playlistContainer.innerHTML = songHTML;
};

const getCurrentSongIndex = () => userData?.songs.indexOf(userData?.currentSong);

const getImg = () => userData?.currentSong === null ? "" : userData?.currentSong.img;

const highlightCurrentSong = () => {
    const playlistSongElements = document.querySelectorAll(".song-container");
    const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`);
  
    playlistSongElements.forEach((songEl) => {
      songEl.removeAttribute("aria-current");
    });
  
    if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
  };

//progress bar
let progress = document.getElementById('audio-progress');
    

audio.onloadedmetadata = function(){
    progress.max = Math.round(audio.duration);
    progress.value = audio.currentTime;
};
    
if (audio.play()) {
    setInterval(() => {
        progress.value = audio.currentTime;
        let x = progress.value / Math.round(progress.max)
        progress.style.background = `linear-gradient(90deg, white ${x*99}%, rgba(245, 245, 245, 0.705) ${x*99}%)`;

        //auto play next song
        if (progress.value === progress.max) {
            playNextSong();
        };
    }, 500);
};

progress.onchange = function(){
    audio.play();
    audio.currentTime = progress.value;
}

//button event listeners

playBtn.addEventListener("click", () => {
    if (userData?.currentSong === null) {
        playSong(userData?.songs[0].id);
    }else {
        playSong(userData?.currentSong.id);
    }
});

pauseBtn.addEventListener('click', pauseSong);

nextBtn.addEventListener('click', playNextSong);

previousBtn.addEventListener('click', playPreviousSong);

stopBtn.addEventListener('click', stopSong);

renderSongs(userData?.songs);