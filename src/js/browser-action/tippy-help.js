export default function() {
  const el  = document.getElementById('help-icon');
  const img = el.querySelector('img');
  tippy(el, {
    theme: 'light-border',
    trigger: 'click',
    arrow: true,
    placement: 'top',
    maxWidth: 420,
    offset: [0, 5],
    arrow: false,
    onShow: () => img.src = '/images/icons/help-open-icon.svg',
    onHide: () => img.src = '/images/icons/help-icon.svg',
    content: () => {
      const el = document.getElementById('popover-help-content').cloneNode(true);
      el.classList.remove('hidden');
      return el;
    }
  });
}
