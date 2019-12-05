import drawGrid from './lib/browser-action/draw-grid.js';

chrome.runtime.getBackgroundPage((page) => {
  drawGrid(page);
  const app = page.app;
  app.getKeyboardCommands().then((commands) => {
    const command = commands.find((command) => command.name === "take_screenshot");
    const container = document.getElementById('commands-help');
    const shortcut = container.querySelector('.shortcut');
    shortcut.innerHTML = command.shortcut.split('+').join(' + ');
    container.classList.remove('hidden');
  })
});
