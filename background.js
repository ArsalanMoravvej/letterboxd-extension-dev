// Create a context menu item that appears when text is selected
chrome.contextMenus.create({
    id: "searchLetterboxd",
    title: "Search Letterboxd",
    contexts: ["selection"]
});

// Add a listener for when the context menu item is clicked
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "searchLetterboxd") {
        // Encode the selected text and create a search URL for Letterboxd
        const query = encodeURIComponent(info.selectionText);
        const url = `https://letterboxd.com/search/${query}/`;
        // Open a new tab with the search URL
        chrome.tabs.create({ url });
    }
});

// Add a listener for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "checkMovieUrl") {
        // Perform a HEAD request to check if the movie URL exists
        fetch(message.url, { method: 'HEAD' })
            .then(response => {
                // Respond with whether the URL exists (status 200)
                sendResponse({ exists: response.status === 200 });
            })
            .catch(error => {
                console.error("Error checking URL:", error);
                // If there's an error, respond that the URL does not exist
                sendResponse({ exists: false });
            });
        
        // Return true to indicate that the response will be sent asynchronously
        return true;
    }
});