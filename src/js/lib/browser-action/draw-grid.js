const removeWithFadeOut = (el, speed) => {
  const seconds = speed / 1000;
  el.style.cssText = `transition: opacity ${seconds}s ease; opacity: 0`;
  setTimeout(() => el.remove(), speed);
};

const onDeleteClick = (screenshotEl, screenshot) => {
  const el = screenshotEl.querySelector('.delete');
  el.addEventListener('click', (event) => {
    event.preventDefault();
    removeWithFadeOut(screenshotEl, 500);
    chrome.runtime.sendMessage({action: 'remove-screenshot', removedId: screenshot.id});
  });
};

const onCopyClick = (screenshotEl, screenshot) => {
  const el = screenshotEl.querySelector('.copy');
  el.addEventListener('click', (event) => {
    const clipItem = new ClipboardItem({"image/png": screenshot.blob});
    navigator.clipboard.write([clipItem]);
  });
};

const drawGrid = function(page) {
  const app = page.app;
  const count = app.screenshotCount;
  const grid = document.getElementById('screenshot-grid');

  /* Draw screenshots grid */
  app.screenshots.forEach(function(screenshot) {
    const screenshotEl = document.querySelector('.screenshot-template').cloneNode(true);
    screenshot.createBlob().then(([_, urlToBlob]) => {
      onDeleteClick(screenshotEl, screenshot);
      onCopyClick(screenshotEl, screenshot);
      const canvas = app.canvas.createCanvas(screenshot.image, 200, 200);
      screenshotEl.querySelector('.image').prepend(canvas);
      screenshotEl.querySelector('.image').setAttribute('href', urlToBlob);
      screenshotEl.querySelector('.save').setAttribute('href', urlToBlob);
      screenshotEl.querySelector('.save').setAttribute('download', screenshot.getFilename());
      screenshotEl.querySelector('.loading-text').remove();
      screenshotEl.querySelectorAll('.hidden').forEach((screenshot) => screenshot.classList.remove('hidden'));
    });
    screenshotEl.classList.remove('hidden');
    grid.appendChild(screenshotEl);
    feather.replace();
  });

  /* Redraw screenshots grid when screenshot is taken while browser_action.html
     is open.*/
  const id = setInterval(() => {
    if(count < app.screenshotCount) {
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
    arrow: false,
    ignoreAttributes: true,
    onShow(tip) {
      setTimeout(tip.hide, 500);
    }
  });

  tippy('a[data-tippy-content]', {
    placement: 'bottom',
    trigger: 'mouseenter',
    multiple: true,
    arrow: false
  });
};

export default drawGrid
