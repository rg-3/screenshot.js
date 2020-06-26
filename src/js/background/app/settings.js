export default function(app) {
  const {localStorage} = app;

  const defaults = {
    maxScreenshots: 4,
    videoSize: "visible"
  };

  const settings = localStorage.getItem('settings') ?
                   JSON.parse(Object.assign({}, defaults, localStorage.getItem('settings'))) : Object.assign({}, defaults);

  this.getItem = (key) => {
    return settings[key];
  };

  this.setItem = (key, value) => {
    settings[key] = value;
    app[key] = value;
    localStorage.setItem('settings', JSON.stringify(settings));
  };
}
