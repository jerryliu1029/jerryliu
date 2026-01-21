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

    let hasStartedPlaying = false;

    // Function to start playback
    const startPlayback = () => {
      if (hasStartedPlaying) return;

      video.muted = true; // Ensure muted before play
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

              // Remove interaction listeners since we're playing
              document.removeEventListener("touchstart", playOnInteraction);
              document.removeEventListener("click", playOnInteraction);
              document.removeEventListener("scroll", playOnInteraction);
            }
          })
          .catch((error) => {
            // Autoplay blocked - listeners will handle it
            console.log("Autoplay prevented:", error.message);
          });
      }
    };

    // Fallback: play on any user interaction
    const playOnInteraction = (e) => {
      if (!hasStartedPlaying) {
        startPlayback();
      }
    };

    // Set up interaction listeners before trying autoplay
    document.addEventListener("touchstart", playOnInteraction, {
      passive: true,
    });
    document.addEventListener("click", playOnInteraction);
    document.addEventListener("scroll", playOnInteraction, { passive: true });

    // Load and try to play immediately
    video.load();

    // Small delay to ensure load has started
    setTimeout(() => {
      startPlayback();
    }, 100);
  }

  // Try to start as early as possible
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupVideo);
  } else {
    setupVideo();
  }
})();
