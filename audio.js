/**
 * Audio Controller for Background Music
 * This script handles playing, pausing, and managing the background music
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded - setting up audio");
  
  // Get references to HTML elements
  const music = document.getElementById('background-music');
  const soundToggle = document.getElementById('soundToggle');
  const prevSongBtn = document.getElementById('prevSong');
  const nextSongBtn = document.getElementById('nextSong');
  const ps2Audio = document.getElementById('ps2-audio');
  
  // Playlist configuration
  const playlist = [
    { title: "Zelda", file: "audio/Zelda.mp3" },
    { title: "Wii", file: "audio/Wii.mp3" },
    { title: "GTA", file: "audio/GTA.mp3" },
    { title: "TheLastOfUs", file: "audio/TheLastOfUs.mp3" },
    { title: "Sonic", file: "audio/Sonic.mp3" },
    { title: "Mario", file: "audio/Mario.mp3" },
    { title: "Tetris", file: "audio/Tetris.mp3" }
  ];
  
  // Current song index
  let currentSongIndex = 0;
  
  // Exit if required elements don't exist
  if (!music) {
    console.error("Audio element not found!");
    return;
  }
  
  if (!soundToggle) {
    console.error("Sound toggle button not found!");
    return;
  }
  
  if (!prevSongBtn || !nextSongBtn) {
    console.error("Song navigation buttons not found!");
    return;
  }
  
  // Set initial volume
  music.volume = 0.3;
  
  // Flag to track if music has been initialized by user interaction
  let musicInitialized = false;

  /**
   * Load a specific song from the playlist
   */
  function loadSong(index) {
    const song = playlist[index];
    const source = music.querySelector('source');
    source.src = song.file;
    music.load();
    console.log(`Loaded song: ${song.title}`);
    
    // If music was already initialized (user has clicked sound toggle at least once), play the song
    if (musicInitialized) {
      music.play()
        .then(() => {
          console.log(`Playing: ${song.title}`);
          updateIcon(true);
        })
        .catch(err => {
          console.error(`Error playing ${song.title}:`, err);
          updateIcon(false);
        });
    }
  }

  /**
   * Play previous song in the playlist
   */
  function playPreviousSong() {
    // If music hasn't been initialized yet, don't do anything
    if (!musicInitialized) {
      console.log("Music not initialized yet");
      return;
    }
    
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
  }

  /**
   * Play next song in the playlist
   */
  function playNextSong() {
    // If music hasn't been initialized yet, don't do anything
    if (!musicInitialized) {
      console.log("Music not initialized yet");
      return;
    }
    
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
  }

  // Event listeners for previous and next buttons
  prevSongBtn.addEventListener('click', function() {
    console.log("Previous song button clicked");
    playPreviousSong();
  });

  nextSongBtn.addEventListener('click', function() {
    console.log("Next song button clicked");
    playNextSong();
  });

  // Set the initial song
  loadSong(currentSongIndex);
  
  /**
   * Handle toggle sound button clicks 
   */
  soundToggle.addEventListener('click', function() {
    console.log("Sound toggle clicked");
    
    try {
      if (!musicInitialized) {
        // First time initialization
        musicInitialized = true;
        music.play()
          .then(() => {
            console.log("Music playing for first time");
            updateIcon(true);
          })
          .catch(err => {
            console.error("Could not play music:", err);
            updateIcon(false);
            musicInitialized = false; // Reset flag if initialization fails
          });
      } else if (music.paused) {
        // Resume paused music
        music.play()
          .then(() => {
            console.log("Music resumed");
            updateIcon(true);
          })
          .catch(err => {
            console.error("Could not play music:", err);
            updateIcon(false);
          });
      } else {
        // Pause playing music
        music.pause();
        console.log("Music paused");
        updateIcon(false);
      }
    } catch (error) {
      console.error("Toggle sound error:", error);
    }
  });
  
  /**
   * Update the sound icon based on play state
   */
  function updateIcon(isPlaying) {
    const icon = soundToggle.querySelector('i');
    if (!icon) return;
    
    // Remove all existing classes
    icon.className = '';
    
    if (isPlaying) {
      // Sound ON icon
      icon.classList.add('fas', 'fa-volume-up', 'text-green-400');
      // Show music navigation buttons
      prevSongBtn.classList.remove('hidden');
      nextSongBtn.classList.remove('hidden');
    } else {
      // Sound OFF icon
      icon.classList.add('fas', 'fa-volume-mute', 'text-red-400');
      // Hide music navigation buttons
      prevSongBtn.classList.add('hidden');
      nextSongBtn.classList.add('hidden');
    }
  }
    // Set initial icon state (should start as muted) and hide navigation buttons
  updateIcon(false);
  
  // Expose debug function for troubleshooting
  window.debugAudio = function() {
    console.log({
      audioElement: music,
      source: music.querySelector('source')?.src,
      paused: music.paused,
      currentTime: music.currentTime,
      readyState: music.readyState,
      initialized: musicInitialized,
      currentSong: playlist[currentSongIndex].title,
      currentIndex: currentSongIndex,
      playlistLength: playlist.length,
      error: music.error
    });
  };
});
