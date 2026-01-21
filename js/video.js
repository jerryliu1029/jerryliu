(() => {
  const START_DELAY_MS = 5000;
  const TARGET_OPACITY = 0.4;
  const PLAYBACK_RATE = 0.5;

  function setupVideo() {
    const video = document.getElementById("bg-video");
    if (!video) return;

    let hasStartedPlaying = false;

    // Configure video
    video.controls = false;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    // Attempt to play
    const attemptPlay = () => {
      if (hasStartedPlaying) return;

      video.muted = true;
      video.play()
        .then(() => {
          console.log("Video playing");
          hasStartedPlaying = true;
          video.playbackRate = PLAYBACK_RATE;
          
          setTimeout(() => {
            video.style.opacity = TARGET_OPACITY;
          }, START_DELAY_MS);
          
          // Clean up listeners
          document.removeEventListener("touchend", attemptPlay);
          document.removeEventListener("click", attemptPlay);
          document.removeEventListener("scroll", attemptPlay);
        })
        .catch((error) => {
          console.log("Autoplay prevented:", error.message);
        });
    };

    // Add fallback listeners for interaction
    document.addEventListener("touchend", attemptPlay, { passive: true });
    document.addEventListener("click", attemptPlay);
    document.addEventListener("scroll", attemptPlay, { passive: true, once: true });

    // Try to play immediately
    attemptPlay();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupVideo);
  } else {
    setupVideo();
  }
})();
    setupVideo();
  }
})();
