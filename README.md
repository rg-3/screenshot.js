### ![logo](src/images/camera24.png) Screenshot

A browser extension that takes screenshots.

### Features

* Takes a screenshot of the visible area on the current tab in response to
  a key stroke  
  (`Ctrl + Shift + X` on PCs and  `Command + Shift + X` on Macs).

* Takes a screenshot of the video being played on the current tab in response to
  a key stroke  
  (`Ctrl + Shift + V` on PCs and  `Command + Shift + V` on Macs).

* Stores and previews the last 6 screenshots in temporary browser memory  
  (With the option to save them to disk, copy them to the clipboard and delete
   them from memory)

* Does not make network requests.

### Screenshots

#### v0.2.5

* Displaying help.

  ![screenshot](./webstore-assets/v0.2.5/v0.2.5_help_screenshot_1280x800.png)

* Hovering over the `Save screenshot` icon.

  ![screenshot](./webstore-assets/v0.2.1/v0.2.1_save_screenshot_1280x800.png)

* Hovering over the `Copy screenshot to clipboard` icon.

  ![screenshot](./webstore-assets/v0.2.1/v0.2.1_copy_screenshot_1280x800.png)

* Hovering over the `Delete screenshot` icon.

  ![screenshot](./webstore-assets/v0.2.1/v0.2.1_delete_screenshot_1280x800.png)

#### Older screenshots

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

__v0.3.1__

* Fix silly typo in last release.

__v0.3.0__

* Remove vertical scroll bar from screenshots of the visible tab.

* Display a failure message when a video screenshot is attempted on a
  protected page that extensions can't inject into (eg `chrome://*` pages).
  Prior to this a user wouldn't get a response.

__v0.2.5__

* Give preference to videos that visible and playing over videos that are just
  playing.

__v0.2.4__

* Don't take screenshots of videos that are visible and paused  
  (A video must be either visible and playing, or just playing to be captured).

__v0.2.3__

* Skip videos the browser considers "tainted", as it does not allow them to be
  exported.

* Improve the experience on websites like Twitter where there can be multiple
  videos on a page. When this happens we choose the first video that is visible
  and/or playing or the first that is visible and paused.  Otherwise we alert the
  user we couldn't find a video. This logic also applies to pages with a single
  video.

__v0.2.2__

* In `browser_action.html`, load JavaScript at the end of the document to let
 the browser parse the HTML first.

__v0.2.1__

* Reduce (visual) size of screenshot previews.

* Add light border around screenshot previews.

* Fix bug where screenshot previews had the bottom part cut off.

* Fix bug where icon tooltips for screenshots 4 to 6 would have `top` placement
  instead of `bottom` placement.

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
