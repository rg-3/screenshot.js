import Screenshot from './lib/background/screenshot.js';
import Canvas from './lib/background/canvas.js';
import notify from './lib/background/notify.js';

const MAX_SCREENSHOTS_SIZE = 6;
const screenshots = [];

const app = {
  screenshotCount: 0,
  canvas: new Canvas(),
  screenshots
};

chrome.commands.onCommand.addListener((command) => {
  if(command === "take_screenshot") {
    chrome.tabs.captureVisibleTab({format: "png"}, (dataUrl) => {
      if(screenshots.length >= MAX_SCREENSHOTS_SIZE) {
        screenshots.pop().revokeBlob();
      }
      screenshots.unshift(new Screenshot(app, dataUrl));
      notify("You took a screenshot");
      app.screenshotCount += 1;
    });
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if(message.action === 'remove-screenshot') {
    screenshots.forEach((screenshot) => {
      if(message.removedId === screenshot.id) {
        const index = screenshots.indexOf(screenshot);
        screenshots.splice(index, 1);
      }
    });
  }
});

/* Exports
 * getBackgroundPage((page) => page.app.screenshotCount)
*/
window.app = app;
