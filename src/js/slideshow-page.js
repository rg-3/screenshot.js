document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(document.location.search);
  const screenshotId = params.get('id');
  const blobUrl = params.get('blobUrl');

  const img = document.getElementById('screenshot');
  img.setAttribute('src', blobUrl);

  chrome.runtime.sendMessage({ action: 'slideshow/totals', screenshotId }, (totals) => {
    const screenshotIndex = totals.screenshotIndex;
    const screenshotTotal = totals.screenshotTotal;
    document.getElementById('screenshot-total').innerText = screenshotTotal;
    document.getElementById('screenshot-index').innerText = screenshotIndex;
  });

  const nextButton = document.getElementById('next');
  chrome.runtime.sendMessage({ action: 'slideshow/next', screenshotId }, (url) => {
    nextButton.setAttribute('href', url);
  });

  const prevButton = document.getElementById('prev');
  chrome.runtime.sendMessage({ action: 'slideshow/prev', screenshotId }, (url) => {
    prevButton.setAttribute('href', url);
  });

  tippy('#help-icon', {
    theme: 'light-border',
    trigger: 'click',
    placement: 'bottom',
    content: () => {
      const el = document.getElementById('popover-help-content').cloneNode(true);
      el.classList.remove('hidden');
      return el;
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowRight') {
      nextButton.click();
    } else if (event.code === 'ArrowLeft') {
      prevButton.click();
    }
  });
});
