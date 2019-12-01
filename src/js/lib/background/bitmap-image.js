export default function(imageBitmap) {
  let url;

  this.blob = undefined;
  this.timestamp = new Date();
  this.native = imageBitmap;
  this.width = imageBitmap.width;
  this.height = imageBitmap.height;

  this.getUrl = () => {
    if(url) {
      return new Promise((resolve, reject) => resolve(url));
    }
    var canvas = new OffscreenCanvas(this.width, this.height);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(imageBitmap, 0, 0);
    return canvas.convertToBlob({type: "image/png"}).then((blob) => {
      this.blob = blob;
      url = URL.createObjectURL(blob);
      return url;
    });
  };

  this.free = () => {
    if(url) {
      URL.revokeObjectURL(url);
      url = null;
      this.blob = null;
    }
  };

  return this;
};
