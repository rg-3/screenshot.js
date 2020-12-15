let gridPollId = null;

const removeWithFadeOut = (el, speed, page) => {
  const seconds = speed / 1000;
  el.style.cssText = `transition: opacity ${seconds}s ease; opacity: 0`;
  setTimeout(() => el.remove(), speed);
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
  const app   = page.app;
  const count = app.screenshotCount;
  const grid  = document.getElementById('body');

  /* Remove the previous grid */
  grid.innerHTML = '';

  /* Draw grid */
  let index = app.screenshots.length;
  app.screenshots.forEach(function(screenshot) {
    const screenshotEl = document.querySelector('.screenshot-template').cloneNode(true);
    const filename = `Screenshot ${index}.png`;
    screenshot.createBlob().then(([_, urlToBlob]) => {
      onDeleteClick(screenshotEl, screenshot, page);
      onCopyClick(screenshotEl, screenshot);
      const canvas = screenshot.canvas.createPreviewScreenshot(screenshot.image, 175, 150);
      screenshotEl.querySelector('.image').prepend(canvas);
      screenshotEl.querySelector('.image').setAttribute('href', urlToBlob);
      screenshotEl.querySelector('.save').setAttribute('href', urlToBlob);
      screenshotEl.querySelector('.save').setAttribute('download', filename);
      screenshotEl.querySelector('.loader-container').remove();
      screenshotEl.querySelectorAll('.hidden').forEach((screenshot) => screenshot.classList.remove('hidden'));
    });
    screenshotEl.classList.remove('hidden');
    grid.appendChild(screenshotEl);
    feather.replace();
    index -= 1;
  });

  /* Redraw the grid when a screenshot is taken while grid-page.html is open */
  gridPollId = setInterval(() => {
    if(count < app.screenshotCount) {
      clearInterval(gridPollId);
      drawGrid(page);
    }
  }, 100);

  /* Tooltips */
  tippy('#body .copy', {
    theme: 'light-border',
    content: 'Copied screenshot',
    trigger: 'click',
    placement: 'bottom',
    multiple: true,
    arrow: false,
    distance: 5,
    ignoreAttributes: true,
    onShow(tip) {
      setTimeout(tip.hide, 500);
    }
  });

  tippy('#body [data-tippy-content]', {
    theme: 'light-border',
    placement: 'bottom',
    distance: 5,
    flip: false,
    trigger: 'mouseenter',
    multiple: true,
    arrow: false
  });
};

export default drawGrid;
