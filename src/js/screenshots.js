const createCanvas = (bitmap, width, height) => {
  const el = document.createElement('canvas');
  const ctx = el.getContext('2d');
  ctx.drawImage(bitmap.native, 0, 0, width, height);
  return el;
};

const createScreenshotLink = () => {
  const el = document.createElement('a');
  el.setAttribute('target', '_blank');
  el.innerText = 'Processing';
  return el;
};

const createDeleteLink = (screenshotEl, bitmap) => {
  const root = document.createElement('div')
  const el = document.createElement('a')
  el.innerText = 'Delete';
  el.href = '#';
  el.addEventListener('click', (event) => {
    event.preventDefault();
    screenshotEl.remove();
    bitmap.freeObjectURL();
    chrome.runtime.sendMessage({action: 'remove-bitmap'});
  });
  root.appendChild(el);
  return root;
};

chrome.runtime.getBackgroundPage(function(page) {
  const bitmaps = page.bitmaps;
  const root = document.getElementById('screenshots');
  bitmaps.forEach(function(bitmap) {
    const rootDiv = document.createElement('div');
    const screenshotDiv = document.createElement('div');
    const screenshotLink = createScreenshotLink();
    const deleteLink = createDeleteLink(rootDiv, bitmap);
    const dateSpan = document.createElement('span');
    dateSpan.innerText = bitmap.timestamp.toLocaleString();
    bitmap.getObjectURL().then((url) => {
      const canvas = createCanvas(bitmap, 200, 200);
      screenshotLink.setAttribute('href', url);
      screenshotLink.innerText = '';
      screenshotLink.appendChild(canvas);
    });
    screenshotDiv.setAttribute('class', 'screenshot');
    screenshotDiv.appendChild(screenshotLink);
    rootDiv.style.float = 'left';
    rootDiv.style.marginBottom = '10px';
    rootDiv.appendChild(screenshotDiv);
    rootDiv.appendChild(dateSpan);
    rootDiv.appendChild(deleteLink);
    root.appendChild(rootDiv);
  });
});
