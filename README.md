### ![logo](src/images/camera24.png) Screenshot

A browser extension that takes screenshots.

### Features

* Takes a screenshot of the visible area on the current tab in response to
  a key stroke  
  (`Ctrl + Shift + X` on PCs and  `Command + Shift + X` on Macs).

* Takes a screenshot of the video on the current tab in response to
  a key stroke  
  (`Ctrl + Shift + V` on PCs and  `Command + Shift + V` on Macs).

* Stores the last 6 screenshots in temporary browser memory  
  (With the option to save them to disk, copy them to the clipboard and delete
   them from memory)

* Does not make network requests.

### Screenshots

#### v0.2.1

* Hovering over the `Save screenshot` icon.

  ![screenshot](./webstore-assets/v0.2.1/v0.2.1_save_screenshot.png_640x400.png)

* Hovering over the `Copy screenshot to clipboard` icon.

  ![screenshot](./webstore-assets/v0.2.1/v0.2.1_copy_screenshot.png_640x400.png)

* Hovering over the `Delete screenshot` icon.

  ![screenshot](./webstore-assets/v0.2.1/v0.2.1_delete_screenshot.png_640x400.png)

* Displaying help.

  ![screenshot](./webstore-assets/v0.2.1/v0.2.1_help_screenshot.png_640x400.png)

#### Older versions

[Available in ./webstore-assets/](./webstore-assets/)

### Install

#### Web stores

* [Google Chrome webstore](https://chrome.google.com/webstore/detail/screenshot/ehmcpclingghgidajkpodncclbginiak)

* Firefox ... Coming soon.

#### From source

* Grab a copy of the extension:

      git clone https://github.com/rg-3/screenshot.js

* In your browser, open `chrome://extensions`.

* Enable the `Developer mode` checkbox.

* Click the `Load unpacked extension` button and point it at the `src/`
  directory in the cloned repository.

* Done!

### Credit

  * Special thanks and credit to
    [Double-J Design](http://www.iconarchive.com/artist/double-j-design.html)
    for providing the green camera icons.

### Similar projects

  * [Take webpage screenshots](https://chrome.google.com/webstore/detail/take-webpage-screenshots/mcbpblocgmgfnpjjppndjkmgjaogfceg)

### License

MIT license. See [./LICENSE.txt](./LICENSE.txt) for details.

### ChangeLog

__v0.2.0__

* Add a help icon that opens a popover with information about how to take
  screenshots.

* Remove arrow from tooltips and popovers.

* Change default `capture-visible-tab` shortcut from `Ctrl + Shift + K` to
  `Ctrl + Shift + X`.

* Add ability to take a screenshot of the video on the current tab.  
  (Works on YouTube, etc).

* Insert `Press <shortcut> to take a screenshot` text after reading what
  shortcut the `capture-visible-tab` keyboard command is bound to (it can be changed
  to a custom shortcut by the user via the `chrome://extensions/shortcuts` page)
