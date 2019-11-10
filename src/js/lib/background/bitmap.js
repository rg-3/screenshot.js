export default function(imageBitmap) {
  this.objectURL = undefined;
  this.timestamp = new Date();
  this.native = imageBitmap;
  this.width = imageBitmap.width;
  this.height = imageBitmap.height;

  this.getObjectURL = () => {
    if(this.objectURL) {
      return new Promise((resolve, reject) => resolve(this.objectURL));
    }
    var canvas = new OffscreenCanvas(this.width, this.height);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(imageBitmap, 0, 0);
    return canvas.convertToBlob({type: "image/png"}).then((blob) => {
      this.objectURL = URL.createObjectURL(blob);
      return this.objectURL;
    });
  };

  this.freeObjectURL = () => {
    if(this.objectURL) {
      URL.revokeObjectURL(this.objectURL);
      this.objectURL = null;
    }
  };

  return this;
};
