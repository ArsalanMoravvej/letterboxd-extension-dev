// contentScript.js

// Function to check if the current page is a movie page on Google
function isMoviePage() {
    const googleMovie = document.getElementById("kp-wp-tab-FilmReview");
    return googleMovie !== null;
}

// Function to extract movie information from Google's movie page
function extractMovieInfo() {
    if (window.location.hostname.includes('google.com')) {
        // Get the movie title from Google's page
        const title = document.querySelector('div[data-attrid="title"]')?.textContent;
        
        // Getting year (for later)
        // const yearElement = document.querySelector('.kc-yr-val, [data-attrid*="release_date"] .kVYeYb');
        // const year = yearElement ? yearElement.textContent.trim().match(/\d{4}/) : null;
        
        return { 
            title: title ? title.trim() : null,
            year: year ? year[0] : null
        };
    }
    return null;
}

// Function to transform a movie title into a Letterboxd URL slug
function titleToSlug(title) {
    if (!title) return '';
    
    // Step 1: Convert to lowercase
    let slug = title.toLowerCase();
    
    // Step 2: Remove year and anything in parentheses
    slug = slug.replace(/\(\d{4}\)|\(.*?\)/g, '');
    
    // Step 3: Remove special characters, keep only letters, numbers, and spaces
    slug = slug.replace(/[^\w\s-]/g, '');
    
    // Step 4: Replace spaces with hyphens
    slug = slug.replace(/\s+/g, '-');
    
    // Step 5: Remove any trailing hyphens
    slug = slug.replace(/-+$/, '');
    
    // Step 6: Trim to remove any leading/trailing spaces that might have become hyphens
    return slug.trim();
}

// Add a floating button on movie pages
if (isMoviePage()) {
    const button = document.createElement('button');
    button.textContent = '🎬 Add to Letterboxd';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        background: #ff8000;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        z-index: 9999;
    `;
    
    // Add click event listener to the button
    button.addEventListener('click', async () => {
        // Show loading state
        button.textContent = '⏳ Finding movie...';
        button.disabled = true;
        
        // Extract movie information
        const movieInfo = extractMovieInfo();
        console.log(movieInfo)
        if (movieInfo && movieInfo.title) {
            // Convert the title to a Letterboxd slug
            const slug = titleToSlug(movieInfo.title);
            
            // Create the direct URL to the movie on Letterboxd
            const directUrl = `https://letterboxd.com/film/${slug}/`;
            
            // Send message to background script to check if the URL exists
            chrome.runtime.sendMessage(
                { action: "checkMovieUrl", url: directUrl, title: movieInfo.title },
                (response) => {
                    if (response && response.exists) {
                        // Direct URL exists, open it
                        window.open(directUrl, '_blank');
                    } else {
                        // Fallback: open search page on Letterboxd
                        const searchUrl = `https://letterboxd.com/search/${encodeURIComponent(movieInfo.title)}/`;
                        window.open(searchUrl, '_blank');
                    }
                    
                    // Reset button after action
                    setTimeout(() => {
                        button.textContent = '🎬 Open in Letterboxd';
                        button.disabled = false;
                    }, 2000);
                }
            );
        } else {
            // No movie info found, show error
            button.textContent = '❌ Movie not found';
            setTimeout(() => {
                button.textContent = '🎬 Open in Letterboxd';
                button.disabled = false;
            }, 2000);
        }
    });
    
    // Append the button to the body of the document
    document.body.appendChild(button);
}