// videoExpand.js

const videoContainer = document.getElementById('videoContainer');
const video = document.getElementById('myVideo');
// Start without controls in thumbnail mode
video.controls = false;
// Function to toggle fullscreen mode
function toggleFullscreen() {
  if (videoContainer.classList.contains('fullscreen')) {
    // If already fullscreen, shrink back to original size
    videoContainer.classList.remove('fullscreen');
    video.controls = false; // Turn off controls when shrinking
  } else {
    // Expand to fullscreen
    videoContainer.classList.add('fullscreen');
    video.controls = true; // Turn on controls when in fullscreen
  }
}

// Add event listener for click/tap
videoContainer.addEventListener('click', toggleFullscreen);
