// =====================================================
// UI V5 – Structured + Deterministic + State Breakdown Fixed
// =====================================================

// =====================================================
// User Inputs
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

// =====================================================
// Render Results
// =====================================================

function renderResults(results, user) {

  const container = document.getElementById("results");
  if (!container) return;

  if (!results || !results.length) {
    container.innerHTML = "<p>No matching resorts found.</p>";
    return;
  }

  const winner = results[0];
  const explanation = buildWinnerExplanation(winner, user);

  container.innerHTML = `
    ${renderWinnerCard(winner, explanation)}
    ${renderTabs(results)}
  `;

  bindTabs();
}

// =====================================================
// Winner Card
// =====================================================

function renderWinnerCard(winner, explanation) {

  return `
    <div style="margin-bottom:40px;">
      <h2>🏆 Your Best Match</h2>

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
          <h3 style="margin:0;font-size:22px;">
            ${winner.name} (${winner.state})
          </h3>
          <p style="margin:6px 0 0 0;">
            Match Score: ${winner.score.toFixed(1)}
          </p>
        </div>
      </div>

      <div style="margin-top:20px;">
        <h4>Why This Mountain Was Selected</h4>
        <ul style="margin-top:10px;line-height:1.6;">
          ${explanation.map(r => `<li>${r}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

// =====================================================
// Tabs Layout
// =====================================================

function renderTabs(results) {

  return `
    <div style="margin-top:20px;">
      <div style="display:flex;border-bottom:2px solid #ccc;">
        <button class="tabBtn activeTab" data-tab="topMatches"
          style="flex:1;padding:12px;border:none;background:none;cursor:pointer;font-weight:600;">
          Top Matches
        </button>

        <button class="tabBtn" data-tab="byState"
          style="flex:1;padding:12px;border:none;background:none;cursor:pointer;font-weight:600;">
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

// =====================================================
// Top Matches
// =====================================================

function renderTopMatches(results) {

  const top = results.slice(0, 5);

  return `
    <div style="margin-top:20px;">
      ${top.map((r, i) => `
        <div style="margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid #eee;">
          <strong>#${i + 1} ${r.name} (${r.state})</strong>
          <div style="font-size:14px;color:#555;">
            Score: ${r.score.toFixed(1)}
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// =====================================================
// By State (Structured + Sorted)
// =====================================================

function renderByState(results) {

  const grouped = {};

  // Group by state
  results.forEach(r => {
    if (!grouped[r.state]) grouped[r.state] = [];
    grouped[r.state].push(r);
  });

  // Sort states by their best resort score
  const sortedStates = Object.keys(grouped).sort((a, b) => {
    return grouped[b][0].score - grouped[a][0].score;
  });

  let html = `<div style="margin-top:20px;">`;

  sortedStates.forEach(state => {

    const resortsInState = grouped[state]
      .sort((a, b) => b.score - a.score);

    const topThree = resortsInState.slice(0, 3);

    html += `
      <div style="margin-bottom:30px;">
        <h4 style="margin-bottom:10px;">
          ${state} (${resortsInState.length})
        </h4>

        ${topThree.map((r, i) => `
          <div style="margin-bottom:8px;">
            ${i + 1}. ${r.name}
            <span style="color:#666;font-size:14px;">
              — ${r.score.toFixed(1)}
            </span>
          </div>
        `).join("")}
      </div>
    `;
  });

  html += "</div>";

  return html;
}

// =====================================================
// Tab Binding
// =====================================================

function bindTabs() {

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

// =====================================================
// Run Match
// =====================================================

function runMatch() {
  const user = getUserInputs();
  const results = calculateMatches(user);
  renderResults(results, user);
}

// =====================================================
// Button Binding
// =====================================================

window.onload = function () {

  const btn = document.getElementById("runBtn");
  if (!btn) return;

  btn.onclick = function (e) {
    e.preventDefault();
    runMatch();
  };
};
