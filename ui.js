// =====================================================
// UI – Concierge Mode
// =====================================================

function getUserInputs() {
  return {
    travel: document.getElementById("travel")?.value,
    zip: document.getElementById("zip")?.value || "02482",
    maxDrive: document.getElementById("driveTime")?.value,
    ability: document.getElementById("ability")?.value,
    terrain: document.getElementById("terrain")?.value,
    crowd: document.getElementById("crowd")?.value,
    luxury: document.getElementById("luxury")?.value,
    snowImportance: document.getElementById("snow")?.value,
    pass: document.getElementById("pass")?.value
  };
}

function renderResults(results, user) {

  const container = document.getElementById("results");
  if (!container) return;

  if (!results.length) {
    container.innerHTML = "<p>No matching resorts found.</p>";
    return;
  }

  const winner = results[0];
  const explanation = buildWinnerExplanation(winner, user);

  let html = `
    <div style="padding:20px;border:2px solid #000;margin-bottom:30px;">
      <h2>🏆 Your Best Match</h2>
      <h3>${winner.name} (${winner.state})</h3>
      <img src="${winner.hero}" style="width:100%;max-height:300px;object-fit:cover;margin:10px 0;">
      <p><strong>Match Score:</strong> ${winner.score.toFixed(1)}</p>
      <ul>
        ${explanation.map(r => `<li>${r}</li>`).join("")}
      </ul>
    </div>
    <h3>Top 5 Matches</h3>
  `;

  results.slice(0, 5).forEach((r, i) => {
    html += `
      <div style="margin-bottom:15px;">
        <strong>#${i + 1} ${r.name} (${r.state})</strong>
        — Score: ${r.score.toFixed(1)}
      </div>
    `;
  });

  container.innerHTML = html;
}

function runMatch() {
  const user = getUserInputs();
  const results = calculateMatches(user);
  renderResults(results, user);
}

window.onload = function () {
  const btn = document.getElementById("runBtn");
  if (!btn) return;
  btn.onclick = function (e) {
    e.preventDefault();
    runMatch();
  };
};
