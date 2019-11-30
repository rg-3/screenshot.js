const removeWithFadeOut = (el, speed) => {
  const seconds = speed / 1000;
  el.style.cssText = `transition: opacity ${seconds}s ease; opacity: 0`;
  setTimeout(() => el.remove(), speed);
};

const createCanvas = (bitmap, width, height) => {
  const el = document.createElement('canvas');
  const ctx = el.getContext('2d');
  ctx.drawImage(bitmap.native, 0, 0, width, height);
  return el;
};

const onDeleteClick = (screenshotEl, bitmap) => {
  const el = screenshotEl.querySelector('.delete');
  el.addEventListener('click', (event) => {
    event.preventDefault();
    removeWithFadeOut(screenshotEl, 500);
    bitmap.free();
    chrome.runtime.sendMessage({action: 'remove-bitmap'});
  });
};

const onCopyClick = (screenshotEl, bitmap) => {
  const el = screenshotEl.querySelector('.copy');
  el.addEventListener('click', (event) => {
    const clipItem = new ClipboardItem({"image/png": bitmap.blob});
    navigator.clipboard.write([clipItem]);
  });
};

const drawGrid = function(page) {
  const count = page.SCREENSHOT_COUNT;
  const grid = document.getElementById('screenshot-grid');

  /* Draw screenshots grid */
  page.bitmaps.forEach(function(bitmap) {
    const screenshot = document.querySelector('.screenshot-template').cloneNode(true);
    onDeleteClick(screenshot, bitmap);
    onCopyClick(screenshot, bitmap);
    bitmap.getObjectURL().then((url) => {
      screenshot.querySelector('.image').prepend(createCanvas(bitmap, 200, 200));
      screenshot.querySelector('.image').setAttribute('href', url);
      screenshot.querySelector('.save').setAttribute('href', url);
      screenshot.querySelector('.save').setAttribute('download', `${page.SCREENSHOT_COUNT}.png`);
      screenshot.querySelector('.loading-text').remove();
      screenshot.querySelectorAll('.hidden').forEach((screenshot) => screenshot.classList.remove('hidden'));
    });
    screenshot.classList.remove('hidden');
    grid.appendChild(screenshot);
    feather.replace();
  });

  /* Redraw screenshots grid when screenshot is taken while browser_action.html
     is open.*/
  const id = setInterval(() => {
    if(count < page.SCREENSHOT_COUNT) {
      grid.innerHTML = '';
      clearInterval(id);
      drawGrid(page);
    }
  }, 100);

  /* Tooltips */
  tippy('.copy', {
    content: 'Copied screenshot',
    trigger: 'click',
    placement: 'bottom',
    multiple: true,
    ignoreAttributes: true,
    onShow(tip) {
      setTimeout(tip.hide, 500);
    }
  });

  tippy('a[data-tippy-content]', {
    placement: 'bottom',
    trigger: 'mouseenter',
    multiple: true
  });
};

export default drawGrid
