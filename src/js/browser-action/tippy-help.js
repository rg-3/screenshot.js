export default function() {
  tippy(document.getElementById('help-icon'), {
    theme: 'light-border',
    trigger: 'click',
    arrow: true,
    placement: 'top',
    maxWidth: 390,
    content: () => {
      const el = document.getElementById('popover-help-content').cloneNode(true);
      el.classList.remove('hidden');
      return el;
    }
  });
}
