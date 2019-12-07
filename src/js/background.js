import App from './lib/background/app.js';

chrome.commands.onCommand.addListener((command) => {
  switch(command) {
    case "capture-visible-tab": {
      chrome.tabs.captureVisibleTab({format: "png"}, app.receiveScreenshot);
      break;
    }
    case "capture-html5-video": {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.executeScript(
          tabs[0].id,
          {file: "js/lib/content-scripts/capture-html5-video.js"},
          app.receiveScreenshot
        );
      });
      break;
    }
  }
});

chrome.runtime.onMessage.addListener((message) => {
  const screenshots = app.screenshots;
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

/* Exports
 * chrome.runtime.getBackgroundPage((page) => page.app.screenshotCount)
*/
window.app = new App();
