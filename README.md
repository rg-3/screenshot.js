## Screenshot.js

A browser extension that takes screenshots.  
The extension works on all Chromium-derived (eg Chrome) browsers.
Firefox support is planned for the future.

## Features

* Take a screenshot of the page on the current tab using a keyboard shortcut  
  (`Ctrl + Shift + X` on PCs and  `Command + Shift + X` on Macs).

* Take a screenshot of the video being played on the current tab using a keyboard shortcut  
  (`Ctrl + Shift + V` on PCs and  `Command + Shift + V` on Macs).

* Store screenshots in temporary browser memory.

* Open screenshots in a new tab.

* Save screenshots to disk.

* Copy screenshots to the clipboard.

* Delete screenshots from temporary browser memory.

* Choose the number of screenshots stored in temporary browser memory.

* Choose between capturing videos at their natural size or at their visible size.

## Screenshots

__v0.9.0__

__#1__

![help screenshot](./webstore-assets/v0.9.0/help_screenshot_1280x800.png)

__#2__

![settings screenshot](./webstore-assets/v0.9.0/settings_screenshot_1280x800.png)

## Install

__Web stores__

* [Chrome Webstore](https://chrome.google.com/webstore/detail/screenshot/ehmcpclingghgidajkpodncclbginiak)

__From source__

* Grab a copy of the extension:

      git clone https://github.com/rg-3/screenshot.js

* Convert the SCSS files to CSS  
  (This step requires the `scss` executable to be in `$PATH`):

      cd screenshot.js
      sh scripts/build.sh

* In your browser, open `chrome://extensions`.

* Enable the `Developer mode` checkbox.

* Click the `Load unpacked extension` button and point it at the `src/`
  directory in the cloned repository.

* Done.

## Dependencies

__Runtime dependencies__

Dependencies used while the extension is running:

* Spectre.css  
  Minimalist CSS framework.

* Feather Icons  
  Provides icons.

* PopperJS, tippy.js  
  Provides popovers and tooltips.

__Development dependencies__

Dependencies used to develop the extension:

  * SCSS  
    SCSS is a language that extends CSS with useful features that make
    styling pages easier and more maintainable. It is transpiled to CSS.

## Credit

  * Thanks and credit to
    [Double-J Design](http://www.iconarchive.com/artist/double-j-design.html)
    for authoring the green camera icons.

## License

MIT license. See [./LICENSE.txt](./LICENSE.txt) for details.

## Changelog

[CHANGELOG.md](./CHANGELOG.md)
