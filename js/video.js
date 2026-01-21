(() => {
  const START_DELAY_MS = 5000;
  const TARGET_OPACITY = 0.4;
  const PLAYBACK_RATE = 0.5;

  function setupVideo() {
    const video = document.getElementById("bg-video");
    if (!video) return;

    let hasStartedPlaying = false;

    // Ensure video is properly configured
    video.controls = false;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    // Function to attempt playback
    const attemptPlay = () => {
      if (hasStartedPlaying) return;

      video.muted = true; // Re-enforce muted
      
      video.play()
        .then(() => {
          console.log("Video playing successfully");
          hasStartedPlaying = true;
          video.playbackRate = PLAYBACK_RATE;
          
          // Fade in
          setTimeout(() => {
            video.style.opacity = TARGET_OPACITY;
          }, START_DELAY_MS);
          
          // Clean up listeners
          document.removeEventListener("touchend", attemptPlay);
          document.removeEventListener("click", attemptPlay);
        })
        .catch((error) => {
          console.log("Play failed:", error.name, error.message);
        });
    };

    // Add listeners for user interaction
    document.addEventListener("touchend", attemptPlay, { passive: true });
    document.addEventListener("click", attemptPlay);

    // Try autoplay after a brief moment
    setTimeout(attemptPlay, 50);
  }

  // Start setup
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupVideo);
  } else {
    setupVideo();
  }
})();
    setupVideo();
  }
})();
