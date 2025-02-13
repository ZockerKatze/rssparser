# [RSS Feed Reader](https://zockerkatze.github.io/rssparser/)

This is a simple RSS feed reader that allows you to view and filter news articles based on a selected time period. It also includes a dark mode toggle for a better reading experience.

## Features
- **Dark Mode Toggle**: Switch between light and dark themes.
- **RSS Feed Fetching**: Fetches RSS feed from an external URL.
- **Date Filter**: Filter news articles by time range:
  - Last 7 days
  - Last 14 days
  - Last 30 days
  - All time
- **Responsive Design**: Works well on both mobile and desktop devices.

## Setup

### Prerequisites
- A modern browser that supports JavaScript and CSS variables.
- An active internet connection to fetch the RSS feed data.

### Installation
1. Clone or download the repository.
2. Open `index.html` in your preferred browser.

### Demo:
I made a Demo with Github Pages it is [here](https://zockerkatze.github.io/rssparser/)

### Customization
- **RSS URL**: You can set your own RSS feed URL in the `rssUrl` variable inside the `script.js` file.
  
  ```javascript
  let rssUrl = ""; // Add your RSS feed URL here
### Theming: 
You can modify the CSS variables in style.css to customize the colors and appearance of the light and dark modes.
### How It Works
The app fetches the RSS feed data through the AllOrigins API to bypass potential CORS restrictions.
The RSS feed is parsed, and the articles are displayed in a list format. Articles are sorted by their publication date, with the most recent displayed first.
You can choose to filter the articles based on a specific time range, which is calculated from the current date.
### Files
index.html: The main HTML file containing the structure of the page.
script.js: JavaScript file containing the logic to fetch, parse, and display the RSS feed.
style.css: Stylesheet to apply basic and dark mode themes.
How to Use
### Switch Themes:

Click the 🌙 (dark mode) or ☀️ (light mode) button in the top-right corner to toggle between light and dark modes.
Your theme preference will be saved in local storage and applied on subsequent visits.
Filter Articles:

### Use the dropdown menu to select the time range for filtering the articles.

The options are:
Letzte Woche (Last Week)
Letzte zwei Wochen (Last 2 Weeks)
Letzter Monat (Last Month)
Gesamte Zeit (All Time)

### View Articles:

Articles will be displayed below the title as clickable links, sorted by their publication date.
Each article will show its title and the publication date.
