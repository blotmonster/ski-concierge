// =====================================================
// UI V8 – Vertical Concierge Layout
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
  if (!container || !results.length) {
    container.innerHTML = "<p>No matching resorts found.</p>";
    return;
  }

  const winner = results[0];
  const explanation = buildWinnerExplanation(winner, user);

  container.innerHTML = `
    ${renderWinnerCard(winner, explanation)}
    ${renderTopOverall(results)}
    ${renderByState(results)}
  `;
}

function renderWinnerCard(winner, explanation) {

  return `
    <div style="margin-bottom:40px;">
      <h2>🏆 Best Overall Match</h2>

      <div style="position:relative;margin-top:15px;">
        <img src="${winner.hero}"
          style="width:100%;max-height:350px;object-fit:cover;border-radius:10px;">

        <div style="
          position:absolute;
          bottom:0;
          left:0;
          right:0;
          background:linear-gradient(to top, rgba(0,0,0,0.85), transparent);
          color:white;
          padding:20px;
          border-radius:0 0 10px 10px;
        ">
          <h3 style="margin:0;">${winner.name} (${winner.state})</h3>
          <p style="margin:6px 0 0 0;">
            Match Score: ${winner.score.toFixed(1)}
          </p>
        </div>
      </div>

      <ul style="margin-top:15px;line-height:1.6;">
        ${explanation.map(r => `<li>${r}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderTopOverall(results) {

  const top = results.slice(0,5);

  return `
    <div style="margin-bottom:40px;">
      <h3>🔥 Top Overall Matches</h3>
      ${top.map((r,i)=>`
        <div style="margin-bottom:10px;">
          <strong>#${i+1} ${r.name} (${r.state})</strong>
          — ${r.score.toFixed(1)}
        </div>
      `).join("")}
    </div>
  `;
}

function renderByState(results) {

  const grouped = {};

  results.forEach(r => {
    if (!grouped[r.state]) grouped[r.state] = [];
    grouped[r.state].push(r);
  });

  const states = Object.keys(grouped)
    .sort((a,b)=> grouped[b][0].score - grouped[a][0].score);

  let html = `
    <div style="margin-bottom:40px;">
      <h3>🗺 Top Results by State</h3>
  `;

  states.forEach(state => {

    const sorted = grouped[state]
      .sort((a,b)=> b.score - a.score)
      .slice(0,3);

    html += `
      <div style="margin-top:20px;">
        <h4>${state}</h4>
        ${sorted.map((r,i)=>`
          <div style="margin-bottom:6px;">
            ${i+1}. ${r.name} — ${r.score.toFixed(1)}
          </div>
        `).join("")}
      </div>
    `;
  });

  html += `</div>`;

  return html;
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
