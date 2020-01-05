const promise = (resolve, reject, options) => {
  const errors = [];
  let responses = [];
  let runCount = 0;

  const runScriptOnFrame = (frame, allFrames) => {
    chrome.tabs.executeScript(
      frame.tabId,
      Object.assign({}, options, {frameId: frame.frameId}),
      (response) => {
        if(chrome.runtime.lastError) {
          errors.push(chrome.runtime.lastError)
        } else {
          responses = responses.concat(response);
        }
        runCount += 1;
        if(runCount === allFrames.length) {
          if(responses.length > 0) {
            resolve(responses);
          } else {
            reject(errors);
          }
        }
      }
    );
  };

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if(chrome.runtime.lastError) {
      reject([chrome.runtime.lastError])
    }
    chrome.webNavigation.getAllFrames({tabId: tabs[0].id}, (frames) => {
      if(chrome.runtime.lastError) {
        reject([chrome.runtime.lastError])
      }
      frames.forEach((frame) => runScriptOnFrame(frame, frames));
    });
  });
};

/*
  Runs a script on all frames on the current tab, including frames that have
  been added to the DOM after page load.
*/

export default function(options) {
  return new Promise((resolve, reject) => promise(resolve, reject, options));
};
