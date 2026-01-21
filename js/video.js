(() => {
  const START_DELAY_MS = 5000;
  const TARGET_OPACITY = 0.4;
  const PLAYBACK_RATE = 0.5;

  function setupVideo() {
    const video = document.getElementById("bg-video");
    if (!video) return;

    video.playbackRate = PLAYBACK_RATE;
    video.loop = true;

    setTimeout(() => {
      video.style.opacity = TARGET_OPACITY;
      video.play().catch(() => {
        // ignore autoplay failures
      });
    }, START_DELAY_MS);

    // Native loop handles continuous playback; no manual fade-out.
  }

  window.addEventListener("load", setupVideo);
})();
