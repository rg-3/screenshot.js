const removeWithFadeOut = (el, speed, page) => {
  const seconds = speed / 1000;
  el.style.cssText = `transition: opacity ${seconds}s ease; opacity: 0`;
  setTimeout(() => {
    clearInterval(page.app.pollId);
    drawGrid(page);
  }, speed);
};

const onDeleteClick = (screenshotEl, screenshot, page) => {
  const el = screenshotEl.querySelector('.delete');
  el.addEventListener('click', (event) => {
    event.preventDefault();
    removeWithFadeOut(screenshotEl, 500, page);
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
  const grid = document.getElementById('body');

  /* Reset the grid (drawGrid can be called multiple times) */
  grid.innerHTML = '';

  /* Draw screenshots grid */
  app.screenshots.forEach(function(screenshot) {
    const screenshotEl = document.querySelector('.screenshot-template').cloneNode(true);
    screenshot.createBlob().then(([_, urlToBlob]) => {
      onDeleteClick(screenshotEl, screenshot, page);
      onCopyClick(screenshotEl, screenshot);
      const canvas = screenshot.canvas.createPreviewScreenshot(screenshot.image, 175, 150);
      screenshotEl.querySelector('.image').prepend(canvas);
      screenshotEl.querySelector('.image').setAttribute('href', urlToBlob);
      screenshotEl.querySelector('.save').setAttribute('href', urlToBlob);
      screenshotEl.querySelector('.save').setAttribute('download', screenshot.getFilename());
      screenshotEl.querySelector('.loader-container').remove();
      screenshotEl.querySelectorAll('.hidden').forEach((screenshot) => screenshot.classList.remove('hidden'));
    });
    screenshotEl.classList.remove('hidden');
    grid.appendChild(screenshotEl);
    feather.replace();
  });

  if(app.screenshots.length > (app.maxScreenshots / 2)) {
    grid.style.cssText = "min-height: 380px !important;";
  } else {
    grid.style.cssText = "min-height: 275px !important;";
  }

  /* Redraw screenshots grid when screenshot is taken while browser_action.html
     is open.*/
  app.pollId = setInterval(() => {
    if(count < app.screenshotCount) {
      clearInterval(app.pollId);
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
