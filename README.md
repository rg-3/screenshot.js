<p align="center">
  <img src="/src/images/camera128.png" alt="Screenshot logo">
  <br>
  <b>Screenshot</b>
</p>

**Table of contents**

* <a href="#introduction"> Introduction </a>
* <a href="#features"> Features </a>
* <a href='#install'>Install</a>
  * <a href='#install-webstores'> Chrome Webstore </a>
  * <a href='#install-fromsource'> From source </a>
* <a href='#dependencies'>Dependencies</a>
* <a href='#thanks'>Thanks</a>
* <a href='#license'>License</a>

## <a id='introduction'>Introduction</a>

Screenshot is a browser extension that takes screenshots of web pages and web videos.  
The extension works on all Chromium-derived (eg Chrome) browsers.

## <a id='features'>Features</a>

* Take a screenshot of the page on the current tab using a keyboard shortcut  
  (`Ctrl + Shift + X` on PCs and  `Command + Shift + X` on Macs).

* Take a screenshot of the video being played on the current tab using a keyboard shortcut  
  (`Ctrl + Shift + V` on PCs and  `Command + Shift + V` on Macs).

* Open screenshots in a new tab, save screenshots to disk, and copy screenshots
  to the clipboard.

* Easy to use, respects your privacy.


## <a id='install'> Install </a>

<a id='install-webstores'>**Chrome Webstore**</a>

Screenshot is available for install via the [Chrome Webstore](https://chrome.google.com/webstore/detail/screenshot/ehmcpclingghgidajkpodncclbginiak).

<a id='install-fromsource'>**From source**</a>

* Clone a copy of the extension:

      git clone https://github.com/rg-3/screenshot.js

* Convert the SCSS files to CSS
  (This step requires the `scss` executable to be in `$PATH`):

      cd screenshot.js
      sh scripts/build.sh

* Open `chrome://extensions` in your browser.

* Enable the `Developer mode` checkbox.

* Click the `Load unpacked extension` button and point it at the `src/`
  directory in the cloned repository.

* Done.

## <a id='dependencies'> Dependencies </a>

**Runtime dependencies**

Dependencies used while the extension is running:

* Spectre.css  
  Minimalist CSS framework.

* Feather Icons  
  Provides icons.

* PopperJS, tippy.js  
  Provides popovers and tooltips.

**Development dependencies**

Dependencies used to develop the extension:

  * [Saas](https://www.sass-lang.com)  
    Saas extends CSS with features that making writing CSS easier.

## <a id='thanks'>Thanks</a>

Thanks to [Raj Dev](https://freeicons.io/profile/714) from [freeicons.io](https://www.freeicons.io)
who authored the icons used by this extension.

## <a id='license'>License</a>

MIT license. See [./src/LICENSE.txt](./src/LICENSE.txt) for details.
