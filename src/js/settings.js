import includeHTML from "./browser-action/include-html.js";
import tippyHelp from "./browser-action/tippy-help.js";
import drawCommandHelp from "./browser-action/draw-command-help.js";

const setDefaultOption = (select, currentValue) => {
  for(let i = 0; i < select.options.length; i++) {
    const option = select.options[i];
    if(option.value === currentValue) {
      option.selected = true;
    }
  }
};

chrome.runtime.getBackgroundPage((page) => {
  const app = page.app;

  /*
     Allows user to switch between capturing a video at its natural size or
     at its visible size.
  */
  const vSizeSelect = document.getElementById('video-size');
  setDefaultOption(vSizeSelect, app.settings.getItem('videoSize'));
  vSizeSelect.addEventListener('change', (event) => {
    const option = event.target;
    app.settings.setItem('videoSize', option.value);
  });

  /*
    Allows  user to select the number of screenshots stored in temporary
    browser memory.
  */
  const maxSelect = document.getElementById('max-screenshots');
  setDefaultOption(maxSelect, String(app.settings.getItem('maxScreenshots')));
  maxSelect.addEventListener('change', (event) => {
    const option = event.target;
    if(option.value < app.maxScreenshots) {
      for(let i = option.value; i < app.maxScreenshots; i++) {
        const screenshot = app.screenshots[i];
        if(screenshot) {
          chrome.runtime.sendMessage({action: 'remove-screenshot', removedId: screenshot.id});
        }
      }
    }
    app.settings.setItem('maxScreenshots', Number(option.value));
  });

  app.getKeyboardCommands().then((commands) => {
    includeHTML().then((nodes) => {
      commands.forEach(drawCommandHelp);
      feather.replace();
      tippyHelp();
    });
  });
});
