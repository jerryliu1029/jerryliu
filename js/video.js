(() => {
  const START_DELAY_MS = 5000;
  const TARGET_OPACITY = 0.4;
  const PLAYBACK_RATE = 0.5;

  function setupVideo() {
    const video = document.getElementById("bg-video");
    if (!video) return;

    video.playbackRate = PLAYBACK_RATE;

    // Ensure video plays immediately for better mobile compatibility
    video.play().catch(() => {
      // ignore autoplay failures
    });

    // Fade in after delay
    setTimeout(() => {
      video.style.opacity = TARGET_OPACITY;
    }, START_DELAY_MS);
  }

  // Try to start as early as possible
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupVideo);
  } else {
    setupVideo();
  }
})();
