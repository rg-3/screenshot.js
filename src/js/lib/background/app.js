import Screenshot from './app/screenshot.js';
import runScript from './app/run-script.js';
import rstl from '../../vendor/rstl.js';

const notify = (message, timeout)  => {
  chrome.notifications.create({
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

const getVideoWidthAlgorithm = (app) => {
  if(app.videoSize === "visible") {
    return "return video.getBoundingClientRect().width"
  } else if(app.videoSize === "natural"){
    return "return video.videoWidth;"
  }
};

const getVideoHeightAlgorithm = (app) => {
  if(app.videoSize === "visible") {
    return "return video.getBoundingClientRect().height;"
  } else if(app.videoSize === "natural"){
    return "return video.videoHeight;"
  }
};

const codeCache = {};
let captureHTML5VideoTemplate = null;
const setCaptureHTML5VideoTemplate = () => {
  return fetch('/js/lib/content-scripts/capture-html5-video.js')
        .then(async (res) => captureHTML5VideoTemplate = await res.text())
        .catch(setCaptureHTML5VideoTemplate)
};
setCaptureHTML5VideoTemplate();

export default function() {
  this.videoSize = "visible";
  this.maxScreenshots = 8;
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
           notify("A playing video wasn't found", 1500);
         }
      } else {
        this.createScreenshot(dataUrls[i], screenshotOptions);
      }
    }
  };

  this.createScreenshot = (dataUrl, screenshotOptions) => {
    notify("You took a screenshot", 1500);
    this.screenshots.unshift(new Screenshot(this, dataUrl, screenshotOptions));
    this.screenshotCount += 1;
    if(this.screenshots.length > this.maxScreenshots) {
      this.screenshots.pop().revokeBlob();
    }
  };

  this.getCaptureHTML5VideoCode = () => {
    if(codeCache[this.videoSize]) {
      return codeCache[this.videoSize];
    } else if(!captureHTML5VideoTemplate) {
      /*
         This should not happen, it means the fetch() call made in
         setCaptureHTML5VideoTemplate function has failed or has not completed
         yet. Since setCaptureHTML5VideoTemplate is making a request for a file
         that is served from disk and belongs to the extension, its failure
         would indicate something unusual has happened.

         The handling of this error is.... weird. We literally show
         'captureHTML5VideoTemplate_Not_Initialized' as a notification.
         (See src/js/background.js)
      */
      return 'captureHTML5VideoTemplate_Not_Initialized';
    } else {
      const code = rstl(captureHTML5VideoTemplate, {
        widthAlgorithm:  getVideoWidthAlgorithm(this),
        heightAlgorithm: getVideoHeightAlgorithm(this)
      });
      codeCache[this.videoSize] = code;
      return code;
    }
  };

  this.getKeyboardCommands = () => {
    return new Promise((resolve, reject) => chrome.commands.getAll(resolve));
  };

  this.runScript = runScript;
  this.notify = notify;

  return this;
}
