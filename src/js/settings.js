import includeHTML from './browser-action/include-html.js';
import tippyFooter from './browser-action/tippy-footer.js';
import drawCommandHelp from './browser-action/draw-command-help.js';

const setDefaultOption = (select, currentValue) => {
  for (let i = 0; i < select.options.length; i++) {
    const option = select.options[i];
    if (option.value === String(currentValue)) {
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
  (function () {
    const el = document.getElementById('video-size');
    setDefaultOption(el, app.settings.getItem('videoSize'));
    el.addEventListener('change', (event) => {
      const option = event.target;
      chrome.runtime.sendMessage({
        action: 'set-setting',
        setting: 'videoSize',
        value: option.value
      });
    });
  })();

  /*
    Control the number of screenshots stored in memory.
    Possible values: 4, 8, 16, 32, 64, 99, Infinity
  */
  (function () {
    const el = document.getElementById('max-screenshots');
    setDefaultOption(el, app.settings.getItem('maxScreenshots'));
    el.addEventListener('change', (event) => {
      const option = event.target;
      const newMax = Number(option.value);
      const truncate = app.maxScreenshots === 0 || (newMax > 0 && newMax < app.maxScreenshots);
      chrome.runtime.sendMessage({
        action: 'set-setting',
        setting: 'maxScreenshots',
        value: newMax
      });
      if (truncate) {
        for (let i = newMax; i < app.screenshots.length; i++) {
          const screenshot = app.screenshots[i];
          chrome.runtime.sendMessage({
            action: 'remove-screenshot',
            removedId: screenshot.id
          });
        }
      }
    });
  })();

  /*
    Control whether or not tooltips are shown on the settings and help icons.
    Possible values: 1 (show), 0 (hide)
  */
  (function () {
    const el = document.getElementById('show-tooltips');
    setDefaultOption(el, app.settings.getItem('showTooltips'));
    el.addEventListener('change', (event) => {
      const option = event.target;
      chrome.runtime.sendMessage({
        action: 'set-setting',
        setting: 'showTooltips',
        value: Number(option.value)
      });
    });
  })();

  /*
      Control whether or not a sound is played when a screenshot is taken.
      Possible values: 1 (show), 0 (hide)
    */
  (function () {
    const el = document.getElementById('play-sound');
    setDefaultOption(el, app.settings.getItem('playSound'));
    el.addEventListener('change', (event) => {
      const option = event.target;
      chrome.runtime.sendMessage({
        action: 'set-setting',
        setting: 'playSound',
        value: Number(option.value)
      });
    });
  })();
});
