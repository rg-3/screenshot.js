(function() {
  const getWidth = (video) => {
    return video.getBoundingClientRect().width;
  }

  const getHeight = (video) => {
    return video.getBoundingClientRect().height;
  }

  const canvas = document.createElement('canvas');
  const video  = document.querySelector('video');
  if (video) {
    canvas.width  = getWidth(video);
    canvas.height = getHeight(video);
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL();
  } else {
    return "no_video";
  }
})();
