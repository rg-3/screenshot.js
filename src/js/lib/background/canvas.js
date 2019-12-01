export default function() {
  this.createCanvas = (image, width=image.width, height=image.height) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, width, height);
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
