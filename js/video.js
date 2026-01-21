(() => {
  const START_DELAY_MS = 5000;
  const TARGET_OPACITY = 0.4;
  const PLAYBACK_RATE = 0.5;

  function setupVideo() {
    const video = document.getElementById("bg-video");
    if (!video) return;

    // Remove controls if they appear
    video.controls = false;
    video.removeAttribute("controls");

    // Force muted for autoplay compliance
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    // Load the video
    video.load();

    let hasStartedPlaying = false;

    // Function to start playback
    const startPlayback = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Successfully playing
            if (!hasStartedPlaying) {
              hasStartedPlaying = true;
              video.playbackRate = PLAYBACK_RATE;
              // Fade in after delay
              setTimeout(() => {
                video.style.opacity = TARGET_OPACITY;
              }, START_DELAY_MS);
            }
          })
          .catch(() => {
            // Autoplay blocked - wait for interaction
          });
      }
    };

    // Try to play immediately
    startPlayback();

    // Fallback: play on any user interaction
    const playOnInteraction = () => {
      if (!hasStartedPlaying) {
        video.load();
        startPlayback();
      }
    };

    document.addEventListener("touchstart", playOnInteraction, {
      once: true,
      passive: true,
    });
    document.addEventListener("click", playOnInteraction, { once: true });
  }

  // Try to start as early as possible
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupVideo);
  } else {
    setupVideo();
  }
})();
