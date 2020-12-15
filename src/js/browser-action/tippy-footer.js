export default function(app) {
  tippy('#footer #help-icon', {
    theme: 'light-border',
    trigger: 'click',
    placement: 'top',
    maxWidth: 420,
    offset: [0, 5],
    arrow: false,
    ignoreAttributes: true,
    content: () => {
      const el = document.getElementById('popover-help-content').cloneNode(true);
      el.classList.remove('hidden');
      return el;
    }
  });

  if(app.showTooltips) {
    tippy('#footer [data-tippy-content]', {
      theme: 'light-border',
      arrow: false,
      trigger: 'mouseenter',
      offset: [0, 5]
    });
  }
}
