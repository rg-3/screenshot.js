import BitmapImage from './lib/background/bitmap-image.js';
import notify from './lib/background/notify.js';

const MAX_BITMAPS_SIZE = 6;
const bitmaps = [];

chrome.commands.onCommand.addListener((command) => {
  if(command === "take_screenshot") {
    chrome.tabs.captureVisibleTab({format: "png"}, (dataUrl) => {
      bitmaps.unshift(new BitmapImage(dataUrl));
      notify("You took a screenshot");
      window.SCREENSHOT_COUNT += 1;
    });
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if(message.action === 'remove-bitmap') {
    bitmaps.forEach((bitmap) => {
      if(message.removedId === bitmap.id) {
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
