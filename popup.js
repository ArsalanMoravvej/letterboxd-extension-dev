document.getElementById('openLetterboxd').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://letterboxd.com' });
});

document.getElementById('openWatchlist').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://letterboxd.com/watchlist/' });
});