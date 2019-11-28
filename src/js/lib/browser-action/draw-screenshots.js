const removeWithFadeOut = (el, speed) => {
  const seconds = speed / 1000;
  el.style.cssText = `transition: opacity ${seconds}s ease; opacity: 0`;
  setTimeout(() => el.remove(), speed);
}

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
    bitmap.freeObjectURL();
    chrome.runtime.sendMessage({action: 'remove-bitmap'});
  });
};

const drawScreenshots = function(page) {
  const count = page.SCREENSHOT_COUNT;
  const container = document.getElementById('screenshots');

  page.bitmaps.forEach(function(bitmap) {
    const el = document.querySelector('.screenshot-template').cloneNode(true);
    onDeleteClick(el, bitmap);
    bitmap.getObjectURL().then((url) => {
      el.querySelector('.image').prepend(createCanvas(bitmap, 200, 200));
      el.querySelector('.image').setAttribute('href', url);
      el.querySelector('.save').setAttribute('href', url);
      el.querySelector('.save').setAttribute('download', `${page.SCREENSHOT_COUNT}.png`);
      el.querySelector('.loading-text').remove();
      el.querySelectorAll('.hidden').forEach((el) => el.classList.remove('hidden'));
    });
    el.classList.remove('hidden');
    container.appendChild(el);
    feather.replace();
  });

  const id = setInterval(() => {
    /* Redraw screenshots when a screenshot is taken while the popover
       is open.*/
    if(count < page.SCREENSHOT_COUNT) {
      container.innerHTML = '';
      clearInterval(id);
      drawScreenshots(page);
    }
  }, 100);
};

export default drawScreenshots;
