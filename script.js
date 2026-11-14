const list = document.querySelector("#starred");
const status = document.querySelector("#status");

async function loadEvents() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const events = await response.json();
    if (
      !Array.isArray(events) ||
      events.some(
        (event) =>
          !event ||
          typeof event.name !== "string" ||
          typeof event.starred !== "string"
      )
    ) {
      throw new Error("Repository data must be a list of named star events.");
    }

    for (const event of events) {
      const item = document.createElement("li");
      item.textContent = `${event.name} — starred ${event.starred}`;
      list.appendChild(item);
    }

    status.textContent = events.length
      ? `${events.length} starred repositories loaded.`
      : "No starred repositories yet.";
  } catch (error) {
    console.error("Could not load starred repositories:", error);
    status.textContent =
      "Could not load starred repositories. Please try again later.";
    status.dataset.error = "true";
  }
}

loadEvents();