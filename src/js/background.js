const MAX_BITMAPS_SIZE = 24;

const bitmaps = [];

const Bitmap = function(imageBitmap) {
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
    return canvas.convertToBlob({type: "image/png"}).then((blob) => {
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

const notify = (message) => {
  chrome.notifications.create("screenshot", {
    iconUrl: "/logo.png",
    type: "basic",
    title: "Screenshot",
    message: message
  }, (notificationId) => {
    const listener = (alarm) => {
      chrome.notifications.clear(notificationId);
      chrome.alarms.clear(alarm.name);
      chrome.alarms.onAlarm.removeListener(listener);
    };
    const now  = new Date();
    const when = now.setSeconds(now.getSeconds() + 1).valueOf();
    chrome.alarms.onAlarm.addListener(listener);
    chrome.alarms.create({when});
  });
};


chrome.commands.onCommand.addListener((_command) => {
  chrome.tabCapture.capture({audio: false, video: true}, function(stream) {
    const track = stream.getVideoTracks()[0];
    const frame = new ImageCapture(track).grabFrame();
    frame.then((bitmap) => {
      if(bitmaps.length === MAX_BITMAPS_SIZE) {
        bitmaps.pop();
      }
      bitmaps.unshift(new Bitmap(bitmap));
      track.stop();
      notify("You took a screenshot");
    }).catch(track.stop);
  });
});

chrome.runtime.onMessage.addListener((req) => {
  if(req.action === 'remove-bitmap') {
    bitmaps.forEach((bitmap) => {
      if(bitmap.objectURL === null) {
        const index = bitmaps.indexOf(bitmap);
        bitmaps.splice(index, 1);
      }
    });
  }
});

window.bitmaps = bitmaps;
