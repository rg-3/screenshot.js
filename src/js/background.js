var bitmaps = [];

var Bitmap = function(imageBitmap) {
  var objectURL;

  this.timestamp = new Date();
  this.native = imageBitmap;
  this.width = imageBitmap.width;
  this.height = imageBitmap.height;

  this.getObjectURL = () => {
    if(objectURL) {
      return new Promise((resolve, reject) => resolve(objectURL));
    }
    var canvas = new OffscreenCanvas(this.width, this.height);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(imageBitmap, 0, 0);
    return canvas.convertToBlob().then((blob) => {
      objectURL = URL.createObjectURL(blob);
      return objectURL;
    });
  };

  this.freeObjectURL = () => {
    if(objectURL) {
      URL.revokeObjectURL(objectURL);
      objectURL = undefined;
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
    var index = bitmaps.indexOf(req.bitmap);
    bitmaps.splice(index, 1);
  }
});
