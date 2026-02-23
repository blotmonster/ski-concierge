// =====================================================
// UI – Concierge Mode + Tab View
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

// -----------------------------
// Render Results
// -----------------------------

function renderResults(results, user) {

  const container = document.getElementById("results");
  if (!container) return;

  if (!results.length) {
    container.innerHTML = "<p>No matching resorts found.</p>";
    return;
  }

  const winner = results[0];
  const explanation = buildWinnerExplanation(winner, user);

  container.innerHTML = `
    ${renderWinnerCard(winner, explanation)}
    ${renderTabs(results)}
  `;

  activateTab("topMatches");
}

// -----------------------------
// Winner Card
// -----------------------------

function renderWinnerCard(winner, explanation) {

  return `
    <div style="margin-bottom:30px;">
      <h2>🏆 Your Best Match</h2>
      <div style="position:relative;">
        <img src="${winner.hero}" style="width:100%;max-height:350px;object-fit:cover;border-radius:8px;">
        <div style="
          position:absolute;
          bottom:0;
          left:0;
          right:0;
          background:linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          color:white;
          padding:20px;
          border-radius:0 0 8px 8px;
        ">
          <h3 style="margin:0;">${winner.name} (${winner.state})</h3>
          <p style="margin:5px 0 0 0;">Match Score: ${winner.score.toFixed(1)}</p>
        </div>
      </div>
      <ul style="margin-top:15px;">
        ${explanation.map(r => `<li>${r}</li>`).join("")}
      </ul>
    </div>
  `;
}

// -----------------------------
// Tabs Layout
// -----------------------------

function renderTabs(results) {

  return `
    <div style="margin-top:20px;">
      <div style="display:flex;border-bottom:2px solid #ccc;">
        <button class="tabBtn activeTab" data-tab="topMatches"
          style="flex:1;padding:10px;border:none;background:none;cursor:pointer;">
          Top Matches
        </button>
        <button class="tabBtn" data-tab="byState"
          style="flex:1;padding:10px;border:none;background:none;cursor:pointer;">
          By State
        </button>
      </div>

      <div id="topMatches" class="tabContent">
        ${renderTopMatches(results)}
      </div>

      <div id="byState" class="tabContent" style="display:none;">
        ${renderByState(results)}
      </div>
    </div>
  `;
}

// -----------------------------
// Top 5
// -----------------------------

function renderTopMatches(results) {
  return `
    <div style="margin-top:20px;">
      ${results.slice(0,5).map((r,i)=>`
        <div style="margin-bottom:12px;">
          <strong>#${i+1} ${r.name} (${r.state})</strong>
          — Score: ${r.score.toFixed(1)}
        </div>
      `).join("")}
    </div>
  `;
}

// -----------------------------
// By State
// -----------------------------

function renderByState(results) {

  const grouped = {};

  results.forEach(r => {
    if (!grouped[r.state]) grouped[r.state] = [];
    grouped[r.state].push(r);
  });

  let html = "<div style='margin-top:20px;'>";

  Object.keys(grouped).forEach(state => {

    const topInState = grouped[state].slice(0,3);

    html += `
      <div style="margin-bottom:25px;">
        <h4>${state}</h4>
        ${topInState.map((r,i)=>`
          <div style="margin-bottom:6px;">
            ${i+1}. ${r.name} — ${r.score.toFixed(1)}
          </div>
        `).join("")}
      </div>
    `;
  });

  html += "</div>";

  return html;
}

// -----------------------------
// Tab Activation
// -----------------------------

function activateTab(defaultTab) {

  document.querySelectorAll(".tabBtn").forEach(btn => {
    btn.addEventListener("click", function () {

      document.querySelectorAll(".tabBtn")
        .forEach(b => b.classList.remove("activeTab"));

      document.querySelectorAll(".tabContent")
        .forEach(c => c.style.display = "none");

      this.classList.add("activeTab");

      const target = this.getAttribute("data-tab");
      document.getElementById(target).style.display = "block";
    });
  });
}

// -----------------------------
// Run Match
// -----------------------------

function runMatch() {
  const user = getUserInputs();
  const results = calculateMatches(user);
  renderResults(results, user);
}

// -----------------------------
// Stable Button Binding
// -----------------------------

window.onload = function () {
  const btn = document.getElementById("runBtn");
  if (!btn) return;
  btn.onclick = function (e) {
    e.preventDefault();
    runMatch();
  };
};
