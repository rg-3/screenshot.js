<p align="center">
  <img src="/src/images/camera128.png" alt="Screenshot logo">
  <br>
  <b>Screenshot</b>
</p>

**Table of contents**

* <a href="#introduction"> Introduction </a>
* <a href="#features"> Features </a>
* <a href="#preview"> Preview </a>
* <a href='#install'>Install</a>
  * <a href='#install-webstores'> Chrome Webstore </a>
  * <a href='#install-fromsource'> Source install</a>
* <a href='#dependencies'>Dependencies</a>
* <a href='#thanks'>Thanks</a>
* <a href='#license'>License</a>

## <a id='introduction'>Introduction</a>

Screenshot is an extension for Chromium-derived (eg Chrome) browsers.  
The extension can take screenshots of web pages and web videos.

## <a id='features'>Features</a>

* Take a screenshot of the page on the current tab using a keyboard shortcut  
  (`Ctrl + Shift + X` on PCs and  `Command + Shift + X` on Macs).

* Take a screenshot of the video being played on the current tab using a keyboard shortcut  
  (`Ctrl + Shift + V` on PCs and  `Command + Shift + V` on Macs).

* Open screenshots in a new tab, save screenshots to disk, and copy screenshots
  to the clipboard.

* Easy to use and doesn't intrude on your privacy.


## <a id='preview'>Preview</a>

<p align="center">
  <img src="/webstore-assets/readme-screenshot.png">
</p>

## <a id='install'> Install </a>

<a id='install-webstores'>**Chrome Webstore**</a>

Screenshot is available for install via the [Chrome Webstore](https://chrome.google.com/webstore/detail/screenshot/ehmcpclingghgidajkpodncclbginiak).

<a id='install-fromsource'>**Source install**</a>

* Clone a copy of the extension:

      git clone https://github.com/rg-3/screenshot.js

* Convert the SCSS files to CSS
  (This step requires the `scss` executable to be in `$PATH`):

      cd screenshot.js
      sh scripts/build.sh

* Open `chrome://extensions` in your browser.

* Enable the `Developer mode` checkbox.

* Click the `Load unpacked extension` button and point it at 
  the `src/` directory in the cloned repository.

* Done.

## <a id='dependencies'> Dependencies </a>

**Runtime dependencies**

Dependencies used while the extension is running:

* [Spectre.css](https://picturepan2.github.io/spectre/)  
  A Lightweight, Responsive and Modern CSS Framework.

* [Popper.js](https://popper.js.org/), [Tippy.js](https://atomiks.github.io/tippyjs/)  
  Provides popovers and tooltips.

**Development dependencies**

Dependencies used to develop the extension:

  * [Saas](https://www.sass-lang.com)  
    Saas extends CSS with useful features.

## <a id='thanks'>Thanks</a>

Thanks to the following [freeicons.io](https://freeicons.io) artists:

* Thanks to [Raj Dev](https://freeicons.io/profile/714) who 
  authored the camera icon, the save icon, the copy icon and 
  the delete icon.

* Thanks to [BECRIS](https://freeicons.io/profile/3484) who 
  authored the back icon.

* Thanks to [ColourCreatype](https://freeicons.io/profile/5790) who 
  authored the settings icon.
  
 * Thanks to <a href="https://freeicons.io/profile/726">Free Preloaders</a> for the help icon.
                                
  
## <a id='license'>License</a>

MIT license. See [./src/LICENSE.txt](./src/LICENSE.txt) for details.
