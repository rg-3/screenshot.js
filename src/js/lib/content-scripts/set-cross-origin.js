/*
   Sites like Instagram requires 'crossOrigin = anonymous' to be set in order to
   capture videos it loads from another origin. We poll because videos appear and
   disappear as the user browses. This is not efficient but I couldn't get
   `MutationObserver` to work.

   This script is loaded on https://www.instagram.com/*.
*/
(function() {
  const videos = document.getElementsByTagName('video');

  const isCrossOrigin = (video) => {
    return !video.crossOrigin &&
           document.location.origin !== new URL(video.src).origin;
  };

  const setCrossOrigin = () => {
    for(let i = 0; i < videos.length; i++) {
      const video = videos[i];
      if(isCrossOrigin(video)) {
        video.crossOrigin = "anonymous";
      }
    }
  }

  setInterval(setCrossOrigin, 100);
})();
