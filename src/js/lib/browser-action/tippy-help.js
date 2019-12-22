export default function() {
  tippy(document.getElementById('help-icon'), {
    theme: 'light-border',
    trigger: 'click',
    offset: "-50, 0",
    arrow: true,
    placement: 'left',
    maxWidth: 450,
    content: () => {
      const el = document.getElementById('popover-help-content').cloneNode(true);
      el.classList.remove('hidden');
      return el;
    }
  });
}
