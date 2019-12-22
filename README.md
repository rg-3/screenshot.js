### ![logo](src/images/camera24.png) Screenshot

A browser extension that takes screenshots.

### Features

* Takes a screenshot of the visible area on the current tab in response to
  a key stroke  
  (`Ctrl + Shift + X` on PCs and  `Command + Shift + X` on Macs).

* Takes a screenshot of the video being played on the current tab in response to
  a key stroke  
  (`Ctrl + Shift + V` on PCs and  `Command + Shift + V` on Macs).

* Stores and previews the last 8 screenshots in temporary browser memory  
  (With the option to save them to disk, copy them to the clipboard and delete
   them from memory).

* Allows a user to select the number of screenshots stored in temporary browser memory.  
  (The default is 8).

* Allows a user to select between capturing videos at their natural size or at
  their visible size.   
  (The default is visible size)

### Screenshots

#### v0.8.0

* Default page, hovering over the `Copy to clipboard` icon.

  ![screenshot](./webstore-assets/v0.8.0/copy_screenshot_v0.8.0_1280x800.png)

* Settings page

  ![screenshot](./webstore-assets/v0.8.0/settings_screenshot_v0.8.0_1280x800.png)

* Showing help

  ![screenshot](./webstore-assets/v0.8.0/help_screenshot_v0.8.0_1280x800.png)


#### Older screenshots

[Available in ./webstore-assets/](./webstore-assets/)

### Install

#### Web stores

* [Google Chrome webstore](https://chrome.google.com/webstore/detail/screenshot/ehmcpclingghgidajkpodncclbginiak)

* Firefox ... Coming soon.

#### From source

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

* Done!

### Credit

  * Thanks and credit to
    [Double-J Design](http://www.iconarchive.com/artist/double-j-design.html)
    for authoring the green camera icons.

### Dependencies

  * **Extension dependencies**

    An extension dependency is a dependency that's used while the extension
    is running.

    * Spectre.css  
      A minimalist CSS framework.

    * FeatherIcons  
      Provides icons

    * PopperJS, tippy.js  
      Provides popovers and tooltips

  * **Developer dependencies**

    A developer dependency is a dependency that's used to develop / build the
    extension.

      * SCSS  
        SCSS is a language that extends CSS with many useful features that make
        styling pages easier and more maintainable. It is trans-piled to CSS.

### License

MIT license. See [./LICENSE.txt](./LICENSE.txt) for details.

### ChangeLog

__To be released__

* The settings and help icons are fixed in place, they follow scroll when
  there is more than 8 screenshots to browse, and they've been positioned to
  the center.

* Add a settings page that allows the user configure the extension.  
  (The two options that can be configured are described below).

* Add the option to select the number of screenshots to store in
  temporary browser memory (defaults to 8).

* Add the option to capture a video at its natural size or at its
  visible size (defaults to visible).

* Add includeHTML function (`src/js/browser-action/include-html.js`)

  includeHTML replaces one or more html elements with the contents of one or
  more `fetch()` requests. In the case of the extension, the HTML is served
  from the file system meaning there's no network latency  and is pretty much
  instantaneous. It supports template variables as well, and it allows
  `browser_action.html` and `settings.html` to share blobs of HTML between
  them. In the future it will become a separate project.

* Add SCSS

  * Add `src/scss`; contains the SCSS files that will be converted to CSS.

  * Add `scripts/build.sh` to convert SCSS to CSS.

  * This change introduces the need to "build" the extension,
    I tried to keep the complexity and dependencies at the
    bare minimum.

* Add `Spectre.css`, a minimalist CSS framework ~ 10kb

* Prevent clicking the help icon from jumping to the top of the browser action's
  window.

__v0.7.0__

* Add improved loading effect while waiting for a screenshot
  to become available.

* Change the tool tip on the `Delete` icon from "Delete screenshot" to
  "Delete screenshot from memory".

__v0.6.0__

* Store and preview up to 8 screenshots instead of 6.

__v0.5.2__

* Fix cross origin audio.

__v0.5.1__

* Update `background.js` to push onto `headers` instead of
 `details.responseHeaders` (typo fix).

__v0.5.0__

* Improve the display of notifications.  
  (By switching to generated notification IDs)

* On the Brave browser, when a screenshot of a video can't be captured because
  Brave is blocking all possible device recognition attempts or all possible
  cross-origin device recognition attempts, the extension will notify the user
  that's why a screenshot can't be captured.  

* Add support for taking a screenshot of a playing video loaded through an
  iframe.

*  Add support for taking a screenshot of a playing video on websites like `dailymail.co.uk`.
   The daily mail website loads video from another origin without setting the
   `Access-Control-Allow-Origin` header. It must be set to `*` or the video
   won't play because `crossorigin="anonymous"` has been set by
   `src/js/content-scripts/set-cross-origin.js`, which was introduced for Instagram support.

* Add support for taking a screenshot of a playing video on sites like Instagram.
  Instagram delivers video through another origin using CORS access controls,
  which require some extra work to support.
  (This change should see better support for other sites who work in a similar way
   as well.)

__v0.4.0__

* Remove horizontal scrollbar from screenshots of the visible tab.

* Restore the quality of visible tab screenshots.  
  (Bad quality screenshots were introduced in v0.3.0)

__v0.3.1__

* Fix silly typo in last release.

__v0.3.0__

* Remove vertical scroll bar from screenshots of the visible tab.

* Display a failure message when a video screenshot is attempted on a
  protected page that extensions can't inject code into (eg `chrome://*` pages).
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
