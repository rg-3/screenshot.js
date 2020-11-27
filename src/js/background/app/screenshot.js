import Canvas from './canvas.js';

const createHTMLImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = url;
  });
}

export default function(app, dataUrl, options = {}) {
  /* Blob-related properties */
  this.id = null;
  this.urlToBlob = null;
  this.blob = null;

  /* Slot for HTMLImage, its width and height. */
  this.image = null;
  this.width = null;
  this.height = null;

  /* Records the index of a screenshot */
  this.index = null;

  this.timestamp = new Date();
  this.canvas = new Canvas(options);

  this.createBlob = () => {
    if(this.blob && this.urlToBlob) {
      return new Promise((resolve, reject) => resolve([this.blob, this.urlToBlob]));
    }
    return createHTMLImage(dataUrl).then((image) => {
      const canvas = this.canvas.createScreenshot(image, image.width, image.height);
      return canvas.convertToBlob({type: "image/png"}).then((blob) => {
        this.image = image;
        this.width = image.width;
        this.height = image.height;
        this.blob = blob;
        this.urlToBlob = URL.createObjectURL(blob);
        this.id = this.urlToBlob.split('/').pop();
        return [this.blob, this.urlToBlob];
      });
    });
  };

  this.revokeBlob = () => {
    if(this.urlToBlob) {
      URL.revokeObjectURL(this.urlToBlob);
      for(let prop in this) {
        if(this.hasOwnProperty(prop)) { delete(this[prop]); }
      };
    };
  };

  return this;
};
