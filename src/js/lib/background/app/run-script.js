const promise = (resolve, reject, options) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if(chrome.runtime.lastError) {
      reject()
    }
    chrome.tabs.executeScript(
      tabs[0].id,
      options,
      (results) => {
        if(chrome.runtime.lastError) {
          reject()
        } else {
          resolve(results)
        }
      }
    );
  });
};

/*
  Runs a script on the current tab.
*/

export default function(options) {
  return new Promise((resolve, reject) => promise(resolve, reject, options));
};
