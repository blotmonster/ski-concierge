// -----------------------------
// RUN BUTTON
// -----------------------------

document.addEventListener("DOMContentLoaded", function () {

  const runBtn = document.getElementById("runBtn");

  if (!runBtn) {
    console.error("runBtn not found");
    return;
  }

  runBtn.addEventListener("click", function () {

    const user = {
      travel: document.getElementById("travel")?.value || "drive",
      ability: document.getElementById("ability")?.value || "Intermediate",
      terrain: document.getElementById("terrain")?.value || "mixed",
      crowd: document.getElementById("crowd")?.value || "Medium",
      luxury: document.getElementById("luxury")?.value || "Low",
      snowImportance: document.getElementById("snow")?.value || "Low",
      pass: document.getElementById("pass")?.value || "Any",
      zip: document.getElementById("zip")?.value || "02482",
      maxDrive: document.getElementById("maxDrive")?.value || "Under 4 hours"
    };

    console.log("USER INPUT:", user);

    const results = calculateMatches(user);

    console.log("MATCH RESULTS:", results);

    renderResults(results);

  });

});


// -----------------------------
// RENDER RESULTS
// -----------------------------

function renderResults(results) {

  const container = document.getElementById("results");

  if (!container) {
    console.error("Results container not found");
    return;
  }

  if (!results || results.length === 0) {
    container.innerHTML = "<p>No matching resorts found.</p>";
    return;
  }

  let html = "<h2>Your Top 5</h2>";

  results.slice(0, 5).forEach((resort, index) => {
    html += `
      <div style="margin-bottom:20px;">
        <strong>#${index + 1} ${resort.name} (${resort.state})</strong><br/>
        Match Score: ${resort.score.toFixed(1)}
      </div>
    `;
  });

  container.innerHTML = html;
}
