import includeHTML from "./browser-action/include-html.js";
import tippyFooter     from './browser-action/tippy-footer.js';
import drawCommandHelp from "./browser-action/draw-command-help.js";

const setDefaultOption = (select, currentValue) => {
  for(let i = 0; i < select.options.length; i++) {
    const option = select.options[i];
    if(option.value === String(currentValue)) {
      option.selected = true;
    }
  }
};

chrome.runtime.getBackgroundPage((page) => {
  const app = page.app;

  app.getKeyboardCommands().then((commands) => {
    includeHTML().then((nodes) => {
      commands.forEach(drawCommandHelp);
      tippyFooter(app);
    });
  });

  /*
     Control the size of a video screenshot.
     Possible values: 'visible', 'natural'.
  */
  const vSizeSelect = document.getElementById('video-size');
  setDefaultOption(vSizeSelect, app.settings.getItem('videoSize'));
  vSizeSelect.addEventListener('change', (event) => {
    const option = event.target;
    app.settings.setItem('videoSize', option.value);
  });

  /*
    Control the number of screenshots stored in memory.
    Possible values: 4, 8, 16, 32, 64, 99, Infinity
  */
  const maxSelect = document.getElementById('max-screenshots');
  setDefaultOption(maxSelect, app.settings.getItem('maxScreenshots'));
  maxSelect.addEventListener('change', (event) => {
    const option   = event.target;
    const newMax   = Number(option.value);
    const truncate = app.maxScreenshots === 0 || (newMax > 0 && newMax < app.maxScreenshots);
    app.settings.setItem('maxScreenshots', newMax);
    if(truncate) {
      for(let i = newMax; i < app.screenshots.length; i++) {
        const screenshot = app.screenshots[i];
        chrome.runtime.sendMessage({action: 'remove-screenshot', removedId: screenshot.id});
      }
    }
  });

  /*
    Control whether or not tooltips are shown on the settings and help icons.
    Possible values: 1 (show), 0 (hide)
  */
  const tooltipSelect = document.getElementById('show-tooltips');
  setDefaultOption(tooltipSelect, app.settings.getItem('showTooltips'));
  tooltipSelect.addEventListener('change', (event) => {
    const option = event.target;
    app.settings.setItem('showTooltips', Number(option.value));
  });
});
