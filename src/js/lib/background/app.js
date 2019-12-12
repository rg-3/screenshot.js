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

const captureFail = (dataUrl) => {
  return !dataUrl ||
         dataUrl === "" ||
         dataUrl === "no_video" ||
         dataUrl === "no_suitable_videos"
};

export default function() {
  this.max_screenshots = 6;
  this.screenshots = [];
  this.screenshotCount = 0;

  this.receiveScreenshot = (dataUrls, screenshotOptions = {}) => {
    if(typeof(dataUrls) === "string") {
      dataUrls = [dataUrls];
    }
    let misses = 0;
    for(let i = 0; i < dataUrls.length; i++) {
      if(captureFail(dataUrls[i])) {
         misses += 1;
         if(misses === dataUrls.length) {
           /* This is specific to the Brave browser and when its fingerprint
              protection blocks the export of a canvas through 'toDataURL'.
              Firefox has the same protections, but I don't know if it behaves
              the same as Brave and returns an empty string from to toDataURL().

              Brave github issue about this:
              https://github.com/brave/brave-browser/issues/6081
           */
           for(let i = 0; i < dataUrls.length; i++) {
             if(dataUrls[i] === "") {
               notify("Fingerprint protection settings didn't allow a screenshot to be taken", 3000);
               return;
             }
           }
           notify("A playing video wasn't found", 1250);
         }
      } else {
        this.createScreenshot(dataUrls[i], screenshotOptions);
      }
    }
  };

  this.createScreenshot = (dataUrl, screenshotOptions, onMiss) => {
    notify("You took a screenshot");
    this.screenshots.unshift(new Screenshot(this, dataUrl, screenshotOptions));
    this.screenshotCount += 1;
    if(this.screenshots.length > this.max_screenshots) {
      this.screenshots.pop().revokeBlob();
    }
  };

  this.getKeyboardCommands = () => {
    return new Promise((resolve, reject) => chrome.commands.getAll(resolve));
  };

  this.runScript = runScript;

  return this;
}
