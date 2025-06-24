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
  
  // Exit if required elements don't exist
  if (!music) {
    console.error("Audio element not found!");
    return;
  }
  
  if (!soundToggle) {
    console.error("Sound toggle button not found!");
    return;
  }
  
  // Set initial volume
  music.volume = 0.3;
  
  // Flag to track if music has been initialized by user interaction
  let musicInitialized = false;
  
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
    } else {
      // Sound OFF icon
      icon.classList.add('fas', 'fa-volume-mute', 'text-red-400');
    }
  }
    // Set initial icon state (should start as muted)
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
      error: music.error
    });
  };
});
