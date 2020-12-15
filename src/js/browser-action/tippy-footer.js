export default function(app) {
  if(!app.showTooltips) {
    return;
  }
  tippy('#footer [data-tippy-content]', {
    theme: 'light-border',
    arrow: false,
    trigger: 'mouseenter',
    offset: [0, 5]
  });
}
