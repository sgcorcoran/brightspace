// videoExpand.js
function expandVideo(videoId) {
  // Find all video wrappers and remove the 'expanded' class
  const allVideos = document.querySelectorAll(".courseware-video-wrapper");
  allVideos.forEach((video) => {
    if (video.id !== videoId) {
      video.classList.remove("expanded");

      // Disable controls on non-expanded videos
      const innerVideo = video.querySelector("video");
      if (innerVideo) {
        innerVideo.removeAttribute("controls");
      }
    }
  });

  // Toggle the 'expanded' class on the clicked video wrapper
  const videoWrapper = document.getElementById(videoId);
  videoWrapper.classList.toggle("expanded");

  // Enable or disable controls based on the 'expanded' state
  const innerVideo = videoWrapper.querySelector("video");
  if (innerVideo) {
    if (videoWrapper.classList.contains("expanded")) {
      innerVideo.setAttribute("controls", "controls");

      // Delay the scroll to allow the video to expand fully
      setTimeout(() => {
        videoWrapper.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300); // Adjust the delay as needed
    } else {
      innerVideo.removeAttribute("controls");
    }
  }
}





// function expandVideo(videoId) {
//   // Find all video wrappers and remove the 'expanded' class
//   const allVideos = document.querySelectorAll(".courseware-video-wrapper");
//   allVideos.forEach((video) => {
//     if (video.id !== videoId) {
//       video.classList.remove("expanded");
//     }
//   });

//   // Toggle the 'expanded' class on the clicked video wrapper
//   const videoWrapper = document.getElementById(videoId);
//   videoWrapper.classList.toggle("expanded");
// }

