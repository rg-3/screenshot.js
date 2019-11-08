var bitmaps = [];

var Bitmap = function(imageBitmap) {
  this.objectURL = undefined;
  this.timestamp = new Date();
  this.native = imageBitmap;
  this.width = imageBitmap.width;
  this.height = imageBitmap.height;

  this.getObjectURL = () => {
    if(this.objectURL) {
      return new Promise((resolve, reject) => resolve(this.objectURL));
    }
    var canvas = new OffscreenCanvas(this.width, this.height);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(imageBitmap, 0, 0);
    return canvas.convertToBlob().then((blob) => {
      this.objectURL = URL.createObjectURL(blob);
      return this.objectURL;
    });
  };

  this.freeObjectURL = () => {
    if(this.objectURL) {
      URL.revokeObjectURL(this.objectURL);
      this.objectURL = null;
    }
  };

  return this;
};

var notify = (message) => {
  chrome.notifications.create("screenshot", {
    iconUrl: "/logo.png",
    type: "basic",
    title: "Screenshot",
    message: message
  });
};


chrome.commands.onCommand.addListener((_command) => {
  chrome.tabCapture.capture({audio: false, video: true}, function(stream) {
    var track = stream.getVideoTracks()[0];
    var frame = new ImageCapture(track).grabFrame();
    frame.then((bitmap) => {
      bitmaps.push(new Bitmap(bitmap));
      track.stop();
      notify("You took a screenshot");
    }).catch(() => track.stop);
  });
});

chrome.runtime.onMessage.addListener((req) => {
  if(req.action === 'remove-bitmap') {
    bitmaps.forEach((bitmap) => {
      if(bitmap.objectURL === null) {
        var index = bitmaps.indexOf(bitmap);
        bitmaps.splice(index, 1);
      }
    });
  }
});
