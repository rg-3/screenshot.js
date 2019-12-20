import drawGrid        from './lib/browser-action/draw-grid.js';
import drawCommandHelp from './lib/browser-action/draw-command-help.js';
import includeHTML     from './lib/browser-action/include-html.js';
import tippyHelp       from './lib/browser-action/tippy-help.js';

chrome.runtime.getBackgroundPage((page) => {
  const app = page.app;
  app.getKeyboardCommands().then((commands) => {
    includeHTML().then((nodes) => {
      drawGrid(page);
      commands.forEach(drawCommandHelp);
      feather.replace();
      tippyHelp();
    });
  });
});
