import Canvas from './canvas.js';

const createHTMLImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = url;
  });
}

export default function(app, dataUrl, options = {}) {
  const {screenshotHasScrollbar} = options;

  /* Blob-related properties */
  this.id = null;
  this.urlToBlob = null;
  this.blob = null;

  /* Slots for HTMLImage object, its width & height. */
  this.image = null;
  this.width = null;
  this.height = null;
  this.timestamp = new Date();
  this.canvas = new Canvas({screenshotHasScrollbar});

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
    })
  };

  this.revokeBlob = () => {
    if(this.urlToBlob) {
      URL.revokeObjectURL(this.urlToBlob);
    }
    this.id = null;
    this.urlToBlob = null;
    this.blob = null;
    this.image = null;
  };

  this.getFilename = () => {
    if(this.id) {
      return `screenshot_${this.width}x${this.height}_${this.id}`;
    }
  }

  return this;
};
