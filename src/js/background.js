import BitmapImage from './lib/background/bitmap-image.js';
import notify from './lib/background/notify.js';

const MAX_BITMAPS_SIZE = 6;
const bitmaps = [];

chrome.commands.onCommand.addListener((command) => {
  if(command === "take_screenshot") {
    chrome.tabCapture.capture({audio: false, video: true}, (stream) => {
      const track = stream.getVideoTracks()[0];
      const grabFrame = new ImageCapture(track).grabFrame();
      grabFrame.then((bitmap) => {
        if(bitmaps.length === MAX_BITMAPS_SIZE) {
          bitmaps.pop();
        }
        bitmaps.unshift(new BitmapImage(bitmap));
        track.stop();
        notify("You took a screenshot");
        window.SCREENSHOT_COUNT += 1;
      }).catch(track.stop);
    });
  }
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

/* Exports
 * getBackgroundPage((page) => page.SCREENSHOT_COUNT)
*/
window.SCREENSHOT_COUNT = 0;
window.bitmaps = bitmaps;
