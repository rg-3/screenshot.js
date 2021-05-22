/*
   Sites like Instagram.com load video through a different origin using
   CORS for access control which makes the video "tainted" and unexportable
   unless `<HTMLVideoElement>.crossOrigin` is set to "anonymous".

   To set crossOrigin we poll as well as using MutationObserver to monitor changes
   to the DOM, since videos can be added to and removed from the DOM at any time.
   We use two approachs because depending on the site, both are useful and can
   be the difference between a finding a video or not.

   This script is injected onto all pages.
*/
(function () {
  const isCrossOrigin = (video) => {
    return !video.crossOrigin &&
           video.src &&
           video.src.length > 0 &&
           document.location.origin !== new URL(video.src).origin;
  };

  const videos = document.getElementsByTagName('video');
  const audios = document.getElementsByTagName('audio');
  const setCrossOrigin = (mediaEls) => {
    for (let i = 0; i < mediaEls.length; i++) {
      const el = mediaEls[i];
      if (isCrossOrigin(el)) {
        el.crossOrigin = 'anonymous';
      }
    }
  };
  setInterval(() => {
    setCrossOrigin(videos);
    setCrossOrigin(audios);
  }, 50);

  const mutator = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' &&
         mutation.attributeName === 'src' &&
         (mutation.target.tagName === 'VIDEO' || mutation.target.tagName === 'AUDIO') &&
         isCrossOrigin(mutation.target)) {
        mutation.target.crossOrigin = 'anonymous';
      } else {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes[i];
          if ((node.tagName === 'VIDEO' || node.tagName === 'AUDIO') && isCrossOrigin(node)) {
            node.crossOrigin = 'anonymous';
          }
        }
      }
    });
  });
  mutator.observe(document.documentElement, { attributes: true, subtree: true, childList: true });
})();
