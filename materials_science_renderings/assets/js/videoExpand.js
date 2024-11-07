// videoExpand.js

function expandVideo(videoId) {
  // Find all video wrappers and remove the 'expanded' class
  const allVideos = document.querySelectorAll(".courseware-video-wrapper-small");
  allVideos.forEach((video) => {
    if (video.id !== videoId) {
      video.classList.remove("expanded");
    }
  });

  // Toggle the 'expanded' class on the clicked video wrapper
  const videoWrapper = document.getElementById(videoId);
  videoWrapper.classList.toggle("expanded");
}
