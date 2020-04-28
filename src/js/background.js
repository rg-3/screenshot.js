import App from './background/app.js';

chrome.commands.onCommand.addListener((command) => {
  switch(command) {
    case "capture-visible-tab": {
      app.runScript({file: "js/content-scripts/detect-scrollbars.js"})
         .then((results) => chrome.tabs.captureVisibleTab({format: "png"}, (dataUrl) => app.receiveScreenshot(dataUrl, results[0])))
         .catch(() => chrome.tabs.captureVisibleTab({format: "png"}, app.receiveScreenshot));
      break;
    }
    case "capture-html5-video": {
      const code = app.getCaptureHTML5VideoCode();
      if(code === "captureHTML5VideoTemplate_Not_Initialized") {
        app.notify(code); /* Shouldn't happen */
      } else {
        app.runScript({code})
           .then(app.receiveScreenshot)
           .catch((err) => app.receiveScreenshot("no_video"));
      }
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

chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    if(new URL(details.initiator).origin === new URL(details.url).origin) {
      /* We're not interested in same-origin requests. */
      return;
    }
    /* From here we know this is a cross origin request for a media
       item (<audio> / <video>). We insert the access-control-allow-origin
       header to allow canvas export access to the video from the window
       that initiated the request.

       It adds support for websites like DailyMail.co.uk who load videos from
       another origin without setting the `Access-Control-Allow-Origin` header.
       It must be set or the video won't play because `crossorigin="anonymous"`
       has been by `src/js/content-scripts/set-cross-origin.js`.
    */
    const headers = details.responseHeaders;
    const header = headers.find((h) => h.name.toLowerCase() === 'access-control-allow-origin');
    if(!header) {
      headers.push({name: 'access-control-allow-origin', value: '*'});
    }
    return {responseHeaders: headers};
  },
  {urls: ["<all_urls>"], types: ["media"]},
  ["blocking", "extraHeaders", "responseHeaders"]
);

/* Exports
 * chrome.runtime.getBackgroundPage((page) => page.app.screenshotCount)
*/
window.app = new App();
