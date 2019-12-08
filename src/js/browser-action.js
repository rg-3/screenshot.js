import drawGrid from './lib/browser-action/draw-grid.js';

const drawCommandHelp = (command) => {
  const container = document.getElementById(command.name);
  if(container) {
    const shortcut = container.querySelector('.shortcut');
    const description = container.querySelector('.description');
    shortcut.innerHTML = command.shortcut.split('+').join(' + ');
    description.innerHTML = command.description;
  }
};

chrome.runtime.getBackgroundPage((page) => {
  const app = page.app;
  drawGrid(page);

  app.getKeyboardCommands().then((commands) => {
    commands.forEach(drawCommandHelp);
    feather.replace();
    tippy(document.getElementById('help-icon'), {
      theme: 'light-border',
      trigger: 'click',
      arrow: false,
      maxWidth: 500,
      content: () => {
        const el = document.getElementById('popover-help-content').cloneNode(true);
        el.classList.remove('hidden');
        return el;
      }
    });
  });
});
