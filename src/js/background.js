import App from './lib/background/app.js';

chrome.commands.onCommand.addListener((command) => {
  switch(command) {
    case "capture-visible-tab": {
      app.runScript({file: "js/lib/content-scripts/detect-scrollbars.js"})
        .then((results) => chrome.tabs.captureVisibleTab({format: "png"}, (dataUrl) => app.receiveScreenshot(dataUrl, results[0])))
        .catch(() => chrome.tabs.captureVisibleTab({format: "png"}, app.receiveScreenshot));
      break;
    }
    case "capture-html5-video": {
      app.runScript({file: "js/lib/content-scripts/capture-html5-video.js"})
        .then(app.receiveScreenshot)
        .catch((err) => app.receiveScreenshot("no_video"));
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
