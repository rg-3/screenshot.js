import ImageBitmap from './lib/background/image-bitmap.js';
import notify from './lib/background/notify.js';

const MAX_BITMAPS_SIZE = 6;
const bitmaps = [];

chrome.commands.onCommand.addListener((command) => {
  switch(command) {
    case "take_screenshot": {
      chrome.tabCapture.capture({audio: false, video: true}, function(stream) {
        const track = stream.getVideoTracks()[0];
        const frame = new ImageCapture(track).grabFrame();
        frame.then((bitmap) => {
          if(bitmaps.length === MAX_BITMAPS_SIZE) {
            bitmaps.pop();
          }
          bitmaps.unshift(new ImageBitmap(bitmap));
          track.stop();
          notify("You took a screenshot");
          window.SCREENSHOT_COUNT += 1;
        }).catch(track.stop);
      });
    }
    break;
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
window.MAX_BITMAPS_SIZE = MAX_BITMAPS_SIZE;
window.bitmaps = bitmaps;
