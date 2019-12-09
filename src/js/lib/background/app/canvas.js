export default function(options) {
  const screenshotHasScrollbar = {options}

  this.createPreviewScreenshot = (image, width=image.width, height=image.height) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, width, height);
    context.lineWidth = 1;
    context.strokeStyle = "#A9A9A9";
    context.strokeRect(0,0, width, height);
    return canvas;
  };

  this.createScreenshot = (image, width=image.width, height=image.height) => {
    const canvas  = new OffscreenCanvas(width, height);
    const context = canvas.getContext('2d');
    const dwidth  = screenshotHasScrollbar ? width + 15 : width;
    context.drawImage(image, 0, 0, width, height, 0, 0, dwidth, height);
    return canvas;
  };

  return this;
}
