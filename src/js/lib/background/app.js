import Canvas from './app/canvas.js';
import Screenshot from './app/screenshot.js';

const notify = (message, timeout=950)  => {
  chrome.notifications.create("screenshot", {
    iconUrl: "/images/camera48.png",
    type: "basic",
    title: "Screenshot",
    message: message
  }, (notifID) => {
    setTimeout(() => chrome.notifications.clear(notifID), timeout);
  });
};

export default function() {
  this.max_screenshots = 6;
  this.screenshots = [];
  this.screenshotCount = 0;
  this.canvas = new Canvas();

  this.receiveScreenshot = (payload) => {
    const dataUrl = typeof(payload) === "string" ? payload : payload[0];
    if(dataUrl === "no_video") {
      notify("No video on page");
    } else if(!dataUrl) {
      /*
        "dataUrl" can be null because of an error in a content script.
        For now we do nothing.
      */
    } else {
      if(this.screenshots.length >= this.max_screenshots) {
        this.screenshots.pop().revokeBlob();
      }
      this.screenshots.unshift(new Screenshot(this, dataUrl));
      this.screenshotCount += 1;
      notify("You took a screenshot");
    }
  };

  this.getKeyboardCommands = () => {
    return new Promise((resolve, reject) => chrome.commands.getAll(resolve));
  };
}