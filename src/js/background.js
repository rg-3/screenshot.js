import Screenshot from './lib/background/screenshot.js';
import Canvas from './lib/background/canvas.js';
import notify from './lib/background/notify.js';

const MAX_SCREENSHOTS_SIZE = 6;
const screenshots = [];

const app = {
  screenshotCount: 0,
  canvas: new Canvas(),
  screenshots, notify,
  getKeyboardCommands: () => {
    return new Promise((resolve, reject) => chrome.commands.getAll(resolve));
  },
  insertScreenshot: (screenshot) => {
    if(screenshots.length >= MAX_SCREENSHOTS_SIZE) {
      screenshots.pop().revokeBlob();
    }
    screenshots.unshift(screenshot);
  }
};

/* Exports
 * getBackgroundPage((page) => page.app.screenshotCount)
*/
window.app = app;

chrome.commands.onCommand.addListener((command) => {
  switch(command) {
    case "capture-visible-tab": {
      chrome.tabs.captureVisibleTab({format: "png"}, (dataUrl) => {
        app.insertScreenshot(new Screenshot(app, dataUrl));
        app.notify("You took a screenshot");
        app.screenshotCount += 1;
      });
      break;
    }
    case "capture-html5-video": {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.executeScript(tabs[0].id, {file: "js/lib/content-scripts/html5-video.js"}, (result) => {
          const dataUrl = result[0];
          if(dataUrl === "no_video") {
            app.notify("No video on page");
          } else {
            app.insertScreenshot(new Screenshot(app, dataUrl));
            app.notify("You took a screenshot");
            app.screenshotCount += 1;
          }
        });
      });
      break;
    }
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if(message.action === 'remove-screenshot') {
    screenshots.forEach((screenshot) => {
      if(message.removedId === screenshot.id) {
        const index = screenshots.indexOf(screenshot);
        screenshot.revokeBlob();
        screenshots.splice(index, 1);
      }
    });
  }
});
