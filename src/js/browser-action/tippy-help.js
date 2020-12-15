export default function() {
  const el  = document.getElementById('help-icon');
  tippy(el, {
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
}
