const sheetURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQSlA2Sc51EGcXLg6jd4Jj8TjrFcfvSBP_9IjMIo_3XM5W9HfO3Mz8KNaCLMLNkrgSzHiYFLXnsxJ4x/pub?gid=0&single=true&output=csv";

fetch(sheetURL)
  .then((response) => response.text())
  .then((csv) => {
    const rows = csv.split("\n").slice(1);
    const container = document.getElementById("events-container");

    if (!container) {
      console.error("❌ events-container not found");
      return;
    }

    // Clear container (important on reloads)
    container.innerHTML = "";

    let hasEvents = false;

    rows.forEach((row) => {
      if (!row.trim()) return; // skip empty rows

      const cols = row.split(",");

      const title = (cols[0] || "").trim();
      const date = (cols[1] || "").trim();
      const time = (cols[2] || "").trim();
      const description = (cols[3] || "").trim();
      const link = (cols[4] || "").trim();

      if (!title) return;

      hasEvents = true;

      const card = document.createElement("div");
      card.className = "event-card animate";

      card.innerHTML = `
        <h3>${title}</h3>
        <p><strong>${date}</strong>${time ? ` • ${time}` : ""}</p>
        <p>${description}</p>
        ${
          link
            ? `<a href="${link}" class="btn" target="_blank" rel="noopener">Register</a>`
            : ""
        }
      `;

      container.appendChild(card);
    });

    // No events fallback
    if (!hasEvents) {
      container.innerHTML = "<p>No upcoming events.</p>";
    }

    // 🔥 IMPORTANT: re-observe newly added elements
    if (window.observeAnimations) {
      window.observeAnimations();
    }
  })
  .catch((error) => {
    console.error("❌ Error loading events:", error);
  });

