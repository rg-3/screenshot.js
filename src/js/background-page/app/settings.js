export default function(app) {
  const {localStorage} = app;

  const defaults = {
    maxScreenshots: 4,
    videoSize: "visible",
    showTooltips: 1
  };

  const settings = localStorage.getItem('settings') ?
                   Object.assign({}, defaults, JSON.parse(localStorage.getItem('settings'))) : Object.assign({}, defaults);

  this.getItem = (key) => {
    return settings[key];
  };

  this.setItem = (key, value) => {
    settings[key] = value;
    app[key] = value;
    localStorage.setItem('settings', JSON.stringify(settings));
  };
}
