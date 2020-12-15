export default function() {
  tippy('#footer [data-tippy-content]', {
    theme: 'light-border',
    arrow: false,
    trigger: 'mouseenter',
    offset: [0, 5]
  });
}
