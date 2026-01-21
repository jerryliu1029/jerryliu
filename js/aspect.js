// Computes and exposes viewport aspect ratio utilities.
(function () {
  const BASE_SIZE = 350; // The smaller dimension
  const MAX_SIZE = 600; // The larger dimension

  function getViewportAspect() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return h === 0 ? 0 : w / h;
  }

  function setAspectCssVar() {
    const ratio = getViewportAspect();
    document.documentElement.style.setProperty(
      "--viewport-aspect",
      ratio.toString(),
    );

    // Calculate max width and height based on aspect ratio.
    // The smaller dimension is always BASE_SIZE (350px), larger is capped at MAX_SIZE (700px).
    let maxWidth, maxHeight;
    if (ratio > 1) {
      // Landscape: height is smaller, width is larger
      maxHeight = BASE_SIZE;
      maxWidth = Math.min(BASE_SIZE * ratio, MAX_SIZE);
    } else {
      // Portrait: width is smaller, height is larger
      maxWidth = BASE_SIZE;
      maxHeight = Math.min(BASE_SIZE / ratio, MAX_SIZE);
    }

    document.documentElement.style.setProperty(
      "--container-max-width",
      `${maxWidth}px`,
    );
    document.documentElement.style.setProperty(
      "--container-max-height",
      `${maxHeight}px`,
    );

    return ratio;
  }

  // Initialize and keep updated on resize.
  setAspectCssVar();
  window.addEventListener("resize", setAspectCssVar);

  // Expose helpers for optional use elsewhere.
  window.viewportAspect = {
    get: getViewportAspect,
    updateCssVar: setAspectCssVar,
  };
})();
