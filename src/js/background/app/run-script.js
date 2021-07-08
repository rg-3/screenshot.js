const runScriptOnFrames = (allFrames, options, resolve, reject) => {
  const errors = [];
  const responses = [];
  let count = 0;

  const onScriptResponse = (response) => {
    count++;
    if (chrome.runtime.lastError) {
      errors.push(chrome.runtime.lastError);
    } else {
      responses.push(...response);
    }
    if (count >= allFrames.length) {
      if (responses.length) {
        resolve(responses);
      } else {
        reject(new Error(`${errors.join(',')}`));
      }
    }
  };

  allFrames.forEach((frame) => {
    chrome.tabs.executeScript(
      frame.tabId,
      Object.assign({}, options, { frameId: frame.frameId }),
      onScriptResponse
    );
  });
};

/*
  Runs a script on all frames on the current tab.
  The 'options' argument is passed to `chrome.tabs.executeScript`.

  Example:

  import runScript from './background/app/run-script.js';
  runScript({file: "some/file.js"})
  .then((responses) => ...)
  .catch((errors) => ...);

*/
export default function (options) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
      chrome.webNavigation.getAllFrames({ tabId: tabs[0].id }, (frames) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        }
        runScriptOnFrames(frames, options, resolve, reject);
      });
    });
  });
}
