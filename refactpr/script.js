// JavaScript is bullshit

const rssFeeds = {
    // List of RSS-Feeds
    'BBC News': 'https://feeds.bbci.co.uk/news/rss.xml',
    'CNN': 'http://rss.cnn.com/rss/edition.rss',
    'Al Jazeera': 'https://www.aljazeera.com/xml/rss/all.xml',
    'Reuters': 'https://www.reutersagency.com/feed/?best-topics=world'
};

document.addEventListener('DOMContentLoaded', () => {
    populateRSSDropdown();
    fetchRSS();
    loadTheme();
});

function populateRSSDropdown() {
    const rssDropdown = document.getElementById('rss-source');
    rssDropdown.innerHTML = '';
    for (const [name, url] of Object.entries(rssFeeds)) {
        const option = document.createElement('option');
        option.value = url;
        option.textContent = name;
        rssDropdown.appendChild(option);
    }
}

function addCustomFeed() {
    const customUrl = document.getElementById('custom-url').value.trim();
    if (customUrl) {
        const rssDropdown = document.getElementById('rss-source');
        const customOption = document.createElement('option');
        customOption.value = customUrl;
        customOption.textContent = customUrl;
        rssDropdown.appendChild(customOption);
        rssDropdown.value = customUrl;
        fetchRSS();
    }
}

function fetchRSS() {
    const rssUrl = document.getElementById('rss-source').value;
    const weekFilter = document.getElementById('week-filter').value;
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`)
        .then(response => response.json())
        .then(data => parseRSS(data.contents, weekFilter))
        .catch(() => {
            console.error("RSS-Feed konnte nicht geladen werden.");
        });
}

function parseRSS(rssText, weekFilter) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rssText, 'text/xml');
    const items = xmlDoc.querySelectorAll('item');
    const rssFeed = document.getElementById('rss-feed');
    rssFeed.innerHTML = '';
    const now = new Date();
    const filterDays = parseInt(weekFilter);

    // Sort the items by pubDate in descending order
    const sortedItems = Array.from(items).sort((a, b) => {
        const dateA = new Date(a.querySelector('pubDate')?.textContent);
        const dateB = new Date(b.querySelector('pubDate')?.textContent);
        return dateB - dateA; // Sort in descending order (newest first)
    });

    // Display sorted feed items
    sortedItems.forEach(item => {
        const title = item.querySelector('title')?.textContent || "Kein Titel";
        const link = item.querySelector('link')?.textContent || "#";
        const pubDateText = item.querySelector('pubDate')?.textContent;
        const pubDate = pubDateText ? new Date(pubDateText) : new Date();
        if (filterDays === 0 || (now - pubDate) / (1000 * 60 * 60 * 24) <= filterDays) {
            const feedItem = document.createElement('div');
            feedItem.className = 'feed-item';
            feedItem.innerHTML = `<a href="${link}" target="_blank">${title}</a><div class="date">${pubDate.toDateString()}</div>`;
            rssFeed.appendChild(feedItem);
        }
    });
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.querySelector('.toggle-button').textContent = isDarkMode ? '🌙' : '☀️';
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('.toggle-button').textContent = '🌙';
    }
}