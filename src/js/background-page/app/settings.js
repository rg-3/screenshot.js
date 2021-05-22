
export default function (app) {
  const { localStorage } = app;

  const defaults = {
    maxScreenshots: 4,
    videoSize: 'visible',
    showTooltips: 1,
    playSound: 1
  };

  const settings = (function () {
    const storedSettings = localStorage.getItem('settings');
    if (storedSettings) {
      return Object.assign({}, defaults, storedSettings);
    } else {
      return Object.assign({}, defaults);
    }
  })();

  this.getItem = (key) => {
    return settings[key];
  };

  this.setItem = (key, value) => {
    settings[key] = value;
    app[key] = value;
    localStorage.setItem('settings', JSON.stringify(settings));
  };
}
