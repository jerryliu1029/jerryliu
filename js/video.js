(() => {
  const START_DELAY_MS = 5000;
  const TARGET_OPACITY = 0.4;
  const PLAYBACK_RATE = 0.5;

  function setupVideo() {
    const video = document.getElementById("bg-video");
    if (!video) return;

    video.playbackRate = PLAYBACK_RATE;

    // Remove controls if they appear
    video.controls = false;
    video.removeAttribute("controls");

    // Force muted for autoplay compliance
    video.muted = true;
    video.defaultMuted = true;

    // Attempt to play
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // If autoplay fails, try playing on first user interaction
        const playOnInteraction = () => {
          video.play().catch(() => {});
          document.removeEventListener("touchstart", playOnInteraction);
          document.removeEventListener("click", playOnInteraction);
        };
        document.addEventListener("touchstart", playOnInteraction, {
          once: true,
        });
        document.addEventListener("click", playOnInteraction, { once: true });
      });
    }

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
