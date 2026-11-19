/*
  loops teaser videos (research highlights, areas, publications) silently while they are on screen,
  and pauses them when scrolled away.
*/

{
  const onLoad = () => {
    const videos = document.querySelectorAll(
      ".gallery-card video, .area-media video, .citation-image video"
    );
    if (!videos.length) return;

    // leave videos on their poster frame if the visitor prefers less motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const play = (video) => {
      const promise = video.play();
      if (promise) promise.catch(() => {});
    };

    if (!("IntersectionObserver" in window)) {
      videos.forEach(play);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries)
          isIntersecting ? play(target) : target.pause();
      },
      { threshold: 0.25 }
    );
    for (const video of videos) observer.observe(video);
  };

  // after page loads
  window.addEventListener("load", onLoad);
}
