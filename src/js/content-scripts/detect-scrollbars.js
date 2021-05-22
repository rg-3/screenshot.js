(function () {
  return {
    hasVerticalScrollbar: window.innerWidth > document.documentElement.clientWidth,
    hasHorizontalScrollbar: document.documentElement.scrollWidth > document.documentElement.clientWidth
  };
})();
