// =====================================================
// UI – Stable Wiring (Button Safe Across Deploys)
// =====================================================

function getUserInputs() {

  return {
    travel: document.getElementById("travel")?.value,
    zip: document.getElementById("zip")?.value || "02482",
    maxDrive: document.getElementById("maxDrive")?.value,
    ability: document.getElementById("ability")?.value,
    terrain: document.getElementById("terrain")?.value,
    crowd: document.getElementById("crowd")?.value,
    luxury: document.getElementById("luxury")?.value,
    snowImportance: document.getElementById("snow")?.value,
    pass: document.getElementById("pass")?.value
  };
}

// -----------------------------
// Render Results
// -----------------------------

function renderResults(results) {

  const container = document.getElementById("results");

  if (!container) {
    console.error("Results container missing.");
    return;
  }

  if (!results || results.length === 0) {
    container.innerHTML = "<p>No matching resorts found.</p>";
    return;
  }

  let html = "<h2>Your Top 5</h2>";

  results.slice(0, 5).forEach((r, i) => {
    html += `
      <div style="margin-bottom:20px;">
        <strong>#${i + 1} ${r.name} (${r.state})</strong><br>
        Match Score: ${r.score.toFixed(1)}
      </div>
    `;
  });

  container.innerHTML = html;
}

// -----------------------------
// Run Match
// -----------------------------

function runMatch() {
  const user = getUserInputs();
  const results = calculateMatches(user);
  renderResults(results);
}

// -----------------------------
// Stable Button Binding
// -----------------------------

window.onload = function () {

  const btn = document.getElementById("runBtn");

  if (!btn) {
    console.error("runBtn not found in DOM.");
    return;
  }

  btn.onclick = function (e) {
    e.preventDefault();
    runMatch();
  };

};
