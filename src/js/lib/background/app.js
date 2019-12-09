import Screenshot from './app/screenshot.js';
import runScript from './app/run-script.js';

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

  this.receiveScreenshot = (payload, screenshotOptions = {}) => {
    const dataUrl = typeof(payload) === "string" ? payload : payload[0];
    if(dataUrl === "no_video" || dataUrl === "no_suitable_videos") {
      notify("A playing video wasn't found", 1250);
    } else if(!dataUrl) {
      /*
        "dataUrl" can be null because of an error in a content script.
        For now we do nothing.
      */
    } else {
      notify("You took a screenshot");
      this.screenshots.unshift(new Screenshot(this, dataUrl, screenshotOptions));
      this.screenshotCount += 1;
      if(this.screenshots.length > this.max_screenshots) {
        this.screenshots.pop().revokeBlob();
      }
    }
  }

  this.getKeyboardCommands = () => {
    return new Promise((resolve, reject) => chrome.commands.getAll(resolve));
  };

  this.runScript = runScript;

  return this;
}
