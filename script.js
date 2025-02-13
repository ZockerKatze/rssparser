let rssUrl = ""; // put your rssUrl here!     

function changeRSS(url) {
    rssUrl = url;
    fetchRSS();
}

function toggleTheme() {
    const body = document.body;
    const button = document.querySelector(".toggle-button");

    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        localStorage.setItem("dark-mode", "false");
        button.textContent = "☀️";
    } else {
        body.classList.add("dark-mode");
        localStorage.setItem("dark-mode", "true");
        button.textContent = "🌙";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".toggle-button");
    if (localStorage.getItem("dark-mode") === "true") {
        document.body.classList.add("dark-mode");
        button.textContent = "🌙";
    } else {
        button.textContent = "☀️";
    }
    fetchRSS();
});

async function fetchRSS() {
    try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`);
        const data = await response.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");

        if (!data.contents) {
            console.error("Leere Antwort vom RSS-Feed");
            showErrorMessage();
            return;
        }

        const daysFilter = parseInt(document.getElementById("week-filter").value, 10);
        const now = new Date();

        const items = Array.from(xmlDoc.querySelectorAll("item"));
        items.sort((a, b) => new Date(b.querySelector("pubDate").textContent) - new Date(a.querySelector("pubDate").textContent));

        let html = "";
        items.forEach(item => {
            const title = item.querySelector("title")?.textContent || "Kein Titel verfügbar";
            const link = item.querySelector("link")?.textContent || "#";
            const pubDate = item.querySelector("pubDate")?.textContent || "Kein Datum verfügbar";
            const itemDate = new Date(pubDate);

            if (daysFilter === 0 || (now - itemDate) / (1000 * 60 * 60 * 24) <= daysFilter) {
                html += `<div class='feed-item'>
                            <a href='${link}' target='_blank'>${title}</a>
                            <div class='date'>Veröffentlicht am: ${pubDate}</div>
                         </div>`;
            }
        });

        document.getElementById("rss-feed").innerHTML = html;
        document.getElementById("error-message").style.display = 'none'; // Hide error message if RSS is loaded
    } catch (error) {
        console.error("Fehler beim Abrufen des RSS-Feeds:", error);
        showErrorMessage();
    }
}

function showErrorMessage() {
    document.getElementById("rss-feed").innerHTML = ""; // Clear any previous feed content
    document.getElementById("error-message").style.display = 'block'; // Show error message and input
}

function changeRSSFromInput() {
    const newUrl = document.getElementById("new-rss-url").value;
    if (newUrl) {
        changeRSS(newUrl);
        document.getElementById("new-rss-url").value = ''; // Clear input after change
        document.getElementById("error-message").style.display = 'none'; // Hide error message
    }
}
