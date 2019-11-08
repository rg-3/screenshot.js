var createCanvas = (bitmap, width, height) => {
  var el = document.createElement('canvas');
  var ctx = el.getContext('2d');
  ctx.drawImage(bitmap.native, 0, 0, width, height);
  return el;
};

var createLink = () => {
  var el = document.createElement('a');
  el.setAttribute('target', '_blank');
  el.innerText = 'Processing';
  return el;
};

chrome.runtime.getBackgroundPage(function(page) {
  var bitmaps = page.bitmaps;
  var root = document.getElementById('screenshots');
  var descendingBitmaps = bitmaps.slice().reverse();
  descendingBitmaps.forEach(function(bitmap) {
    var div = document.createElement('div');
    var canvas = createCanvas(bitmap, 200, 200);
    var hyperlink = createLink();
    bitmap.getObjectURL().then((url) => {
      hyperlink.setAttribute('href', url);
      hyperlink.innerText = '';
      hyperlink.appendChild(canvas);
    });;
    div.appendChild(hyperlink);
    root.appendChild(div);
    div.setAttribute('class', 'screenshot')
  });
});
