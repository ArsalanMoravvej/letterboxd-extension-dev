# Letterboxd Helper

![Letterboxd Helper Icon](assets/icon48.png)

Letterboxd Helper is a Chrome extension that allows you to search and manage movies on Letterboxd directly from your browser.

## Features

- **Context Menu Search**: Highlight text and search for it on Letterboxd using the context menu.
- **Popup Actions**: Quickly open Letterboxd or your watchlist from the popup.
- **Google Movie Page Integration**: Adds a button to Google movie pages to open the movie on Letterboxd.

## Installation

1. Clone the repository or download the source code.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the directory containing the extension's files.

## Usage

### Context Menu Search

1. Highlight any text on a webpage.
2. Right-click and select "Search Letterboxd" from the context menu.
3. A new tab will open with the search results on Letterboxd.

### Popup Actions

1. Click on the extension icon in the Chrome toolbar.
2. Use the buttons to open Letterboxd or your watchlist.

### Google Movie Page Integration

1. Navigate to a movie page on Google.
2. Click the "🎬 Add to Letterboxd" button that appears at the bottom right of the page.
3. The extension will attempt to find the movie on Letterboxd and open it in a new tab.

## Files

- `background.js`: Handles context menu creation and background tasks.
- `contentScript.js`: Injects functionality into Google movie pages.
- `popup.html`: The HTML for the extension's popup.
- `popup.js`: JavaScript for the extension's popup.
- `popup.css`: Styles for the extension's popup.
- `manifest.json`: Configuration file for the Chrome extension.
- `utils.js`: Utility functions (currently empty).

## Icons

Icons are located in the `assets` directory and are used for the extension's icon in various sizes.

## License

This project is licensed under the MIT License.