var createCanvas = (bitmap, width, height) => {
  var el = document.createElement('canvas');
  var ctx = el.getContext('2d');
  ctx.drawImage(bitmap.native, 0, 0, width, height);
  return el;
};

var createScreenshotLink = () => {
  var el = document.createElement('a');
  el.setAttribute('target', '_blank');
  el.innerText = 'Processing';
  return el;
};

var createDeleteLink = (screenshotEl, bitmap) => {
  const root = document.createElement('div')
  const el = document.createElement('a')
  el.innerText = 'Delete';
  el.href = '#';
  el.addEventListener('click', (event) => {
    event.preventDefault();
    screenshotEl.remove();
    bitmap.freeObjectURL();
    chrome.runtime.sendMessage({action: 'remove-bitmap', bitmap: bitmap});
  });
  root.appendChild(el);
  return root;
};

chrome.runtime.getBackgroundPage(function(page) {
  var bitmaps = page.bitmaps;
  var root = document.getElementById('screenshots');
  var descendingBitmaps = bitmaps.slice().reverse();
  descendingBitmaps.forEach(function(bitmap) {
    var div = document.createElement('div');
    var screenshot = document.createElement('div');
    var canvas = createCanvas(bitmap, 200, 200);
    var screenshotLink = createScreenshotLink();
    var deleteLink = createDeleteLink(div, bitmap);
    var dateSpan = document.createElement('span');
    dateSpan.innerText = bitmap.timestamp.toLocaleString();
    bitmap.getObjectURL().then((url) => {
      screenshotLink.setAttribute('href', url);
      screenshotLink.innerText = '';
      screenshotLink.appendChild(canvas);
    });
    screenshot.setAttribute('class', 'screenshot');
    screenshot.appendChild(screenshotLink);
    div.style.float = 'left';
    div.style.marginBottom = '10px';
    div.appendChild(screenshot);
    div.appendChild(dateSpan);
    div.appendChild(deleteLink);
    root.appendChild(div);
  });
});
