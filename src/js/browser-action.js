import drawGrid from './lib/browser-action/draw-grid.js';

chrome.runtime.getBackgroundPage((page) => {
  drawGrid(page);
  const app = page.app;
  app.getKeyboardCommands().then((commands) => {
    commands.forEach((command) => {
      const container = document.getElementById(command.name);
      if(container) {
        const shortcut = container.querySelector('.shortcut');
        const description = container.querySelector('.description');
        shortcut.innerHTML = command.shortcut.split('+').join(' + ');
        description.innerHTML = command.description;
      }
    })

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
  feather.replace();
});
