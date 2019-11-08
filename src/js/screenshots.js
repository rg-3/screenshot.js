

var createCanvas = (bitmap, width, height) => {
  var el = document.createElement('canvas');
  var ctx = el.getContext('2d');
  ctx.drawImage(bitmap.native, 0, 0, width, height);
  return el;
};

var createSaveEl = () => {
  var el = document.createElement('a');
  el.setAttribute('target', '_blank');
  el.innerText = 'Processing';
  return el;
};

chrome.runtime.getBackgroundPage(function(page) {
  var bitmaps = page.bitmaps;
  var root = document.getElementById('screenshots');

  bitmaps.slice().reverse().forEach(function(bitmap) {
    var div = document.createElement('div');
    var canvas = createCanvas(bitmap, 200, 200);
    var hyperlink = createSaveEl();
    div.appendChild(canvas);
    div.appendChild(hyperlink);
    root.appendChild(div);
    bitmap.getObjectURL().then((url) => {
      hyperlink.setAttribute('href', url);
      hyperlink.innerText = 'Open';
    }).catch(() => {
      console.log('Link creation failed');
    });
  });
});
