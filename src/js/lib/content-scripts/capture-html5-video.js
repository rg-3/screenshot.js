(function() {
  const videos  = document.querySelectorAll('video');

  const getWidth = (video) => {
    return video.getBoundingClientRect().width;
  };

  const getHeight = (video) => {
    return video.getBoundingClientRect().height;
  };

  const getDataUrl = (video) => {
    const canvas = document.createElement('canvas');
    canvas.width  = getWidth(video);
    canvas.height = getHeight(video);
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    try {
      return canvas.toDataURL();
    } catch(err) {
      return null
    }
  }

  const isPlaying = (elem) => {
    return elem.currentTime > 0 &&
          !elem.paused &&
          !elem.ended &&
          elem.readyState > 2
  };

  const isPaused = (elem) => {
    return elem.currentTime > 0 &&
           elem.paused &&
           !elem.ended &&
           elem.readyState > 2
  };

  /*
    Credit to Ohad Navan for the original implementation.
    (Source: https://stackoverflow.com/a/41698614).
  */
  const isVisible = (elem) => {
    const style = getComputedStyle(elem);
    if (style.display === 'none') return false;
    if (style.visibility !== 'visible') return false;
    if (style.opacity < 0.1) return false;
    if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
        elem.getBoundingClientRect().width === 0) {
        return false;
    }
    const elemCenter   = {
        x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
        y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    };
    if (elemCenter.x < 0) return false;
    if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (elemCenter.y < 0) return false;
    if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
    let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
    do {
        if (!pointContainer) return false;
        if (pointContainer === elem) return true;
    } while (pointContainer = pointContainer.parentNode);
    return false;
  };

  if (videos.length === 0) {
    return "no_video";
  } else {
    const playing = Array.from(videos).filter((video) => (isVisible(video) && isPlaying(video)) || isPlaying(video));
    for(let i = 0; i < playing.length; i++) {
      const dataUrl = getDataUrl(playing[i]);
      if(dataUrl === null) {
        continue;
      } else {
        return dataUrl;
      }
    }
    return "no_suitable_videos";
  }
})();
