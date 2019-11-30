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

const draw = function(page) {
  const count = page.SCREENSHOT_COUNT;
  const container = document.getElementById('screenshots');

  /* Draw screenshots grid */
  page.bitmaps.forEach(function(bitmap) {
    const el = document.querySelector('.screenshot-template').cloneNode(true);
    onDeleteClick(el, bitmap);
    onCopyClick(el, bitmap);
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

  /* Redraw screenshots grid when screenshot is taken while browser_action.html
     is open.*/
  const id = setInterval(() => {
    if(count < page.SCREENSHOT_COUNT) {
      container.innerHTML = '';
      clearInterval(id);
      draw(page);
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

export default draw
