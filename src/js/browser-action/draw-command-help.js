export default function(command) {
  const container = document.getElementById(command.name);
  if(container) {
    const shortcut = container.querySelector('.shortcut');
    const description = container.querySelector('.description');
    shortcut.innerHTML = command.shortcut.split('+').join(' + ');
    description.innerHTML = command.description;
  }
};
