export default function(imageBitmap) {
  /* Blob-related properties */
  this.id = null;
  this.urlToBlob = null;
  this.blob = null;

  this.timestamp = new Date();
  this.native = imageBitmap;
  this.width = imageBitmap.width;
  this.height = imageBitmap.height;

  this.createBlob = () => {
    if(this.blob && this.urlToBlob) {
      return new Promise((resolve, reject) => resolve([this.blob, this.urlToBlob]));
    }
    var canvas = new OffscreenCanvas(this.width, this.height);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(imageBitmap, 0, 0);
    return canvas.convertToBlob({type: "image/png"}).then((blob) => {
      this.blob = blob;
      this.urlToBlob = URL.createObjectURL(blob);
      this.id = this.urlToBlob.split('/').pop();
      return [this.blob, this.urlToBlob];
    });
  };

  this.revokeBlob = () => {
    if(this.urlToBlob) {
      URL.revokeObjectURL(this.urlToBlob);
    }
    this.id = null;
    this.urlToBlob = null;
    this.blob = null;
  };

  return this;
};
