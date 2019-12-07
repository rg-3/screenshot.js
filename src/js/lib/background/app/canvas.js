export default function() {
  this.createPreviewCanvas = (image, width=image.width, height=image.height) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, width, height);
    context.lineWidth = 1;
    context.strokeStyle = "#A9A9A9";
    context.strokeRect(0,0, width, height);
    return canvas
  };

  this.createOffscreenCanvas = (image, width=image.width, height=image.height) => {
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    return canvas
  };

  return this;
}
