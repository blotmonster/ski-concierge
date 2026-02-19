// ui.js

function $(id) { return document.getElementById(id); }

function initUI() {
  const container = document.querySelector(".container");
  if (!container) return;

  container.innerHTML = `
    <h1>🎿 Ski Concierge</h1>
    <p class="subtitle">We’ll match you intelligently.</p>

    <div class="card">
      <h2>Travel Type</h2>

      <div class="row">
        <select id="travel" class="select">
          <option value="drive">Drive</option>
          <option value="fly">Fly</option>
        </select>
      </div>

      <div class="row row-split">
        <div class="field">
          <label>ZIP Code</label>
          <input id="zip" class="input" placeholder="e.g. 02482" value="02482" />
        </div>

        <div class="field">
          <label>Max Drive Time</label>
          <select id="maxDrive" class="select">
            <option value="2">Under 2 hours</option>
            <option value="3">Under 3 hours</option>
            <option value="4" selected>Under 4 hours</option>
            <option value="5">Under 5 hours</option>
            <option value="6">Under 6 hours</option>
          </select>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>Ski Profile</h2>

      <label>Ability</label>
      <select id="ability" class="select">
        <option>Beginner</option>
        <option selected>Intermediate</option>
        <option>Advanced</option>
        <option>Expert</option>
      </select>

      <label>Terrain Preference</label>
      <select id="terrain" class="select">
        <option selected>Groomers</option>
        <option>Mixed</option>
        <option>Steeps & Expert Terrain</option>
      </select>

      <label>Crowd Tolerance</label>
      <select id="crowd" class="select">
        <option selected>Low – Avoid Crowds</option>
        <option>Medium</option>
        <option>High – Don’t Care</option>
      </select>

      <label>Luxury Importance</label>
      <select id="luxury" class="select">
        <option selected>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <label>Snow Reliability Importance</label>
      <select id="snow" class="select">
        <option>Low</option>
        <option selected>Medium</option>
        <option>High</option>
      </select>

      <label>Pass</label>
      <select id="pass" class="select">
        <option value="Any" selected>Any</option>
        <option value="Ikon">Ikon</option>
        <option value="Epic">Epic</option>
        <option value="Indy">Indy</option>
        <option value="None">None / Independent</option>
      </select>

      <button id="runBtn" class="btn">Find My Mountains</button>
      <div id="status" class="status"></div>
    </div>

    <div id="results"></div>
  `;

  $("travel").addEventListener("change", syncDriveFields);
  $("runBtn").addEventListener("click", runMatch);

  syncDriveFields();
}

function syncDriveFields() {
  const isDrive = ($("travel").value === "drive");
  $("zip").disabled = !isDrive;
  $("maxDrive").disabled = !isDrive;

  // optional: visually dim when disabled
  $("zip").style.opacity = isDrive ? "1" : "0.55";
  $("maxDrive").style.opacity = isDrive ? "1" : "0.55";
}

function getUser() {
  return {
    travel: $("travel").value,              // "drive" | "fly"
    zip: $("zip").value,
    maxDriveHours: $("maxDrive").value,     // "2".."6"
    ability: $("ability").value,
    terrain: $("terrain").value,
    crowd: $("crowd").value,
    luxury: $("luxury").value,
    snow: $("snow").value,
    pass: $("pass").value
  };
}

function runMatch() {
  const status = $("status");
  status.textContent = "";

  let matches;
  try {
    const user = getUser();
    matches = window.calculateMatches(user);
  } catch (e) {
    status.textContent = `Error: ${e.message}`;
    console.error(e);
    return;
  }

  if (!matches || matches.length === 0) {
    renderNoResults();
    return;
  }

  renderResults(matches);
}

function renderNoResults() {
  const el = $("results");
  el.innerHTML = `
    <div class="card">
      <h2>No results</h2>
      <p>Try widening your drive time, changing pass selection, or switching to Fly.</p>
    </div>
  `;
}

function groupByStateProvince(matches) {
  const map = {};
  for (const m of matches) {
    const key = `${m.state} (${m.country})`;
    if (!map[key]) map[key] = [];
    map[key].push(m);
  }
  // sort each group
  for (const k of Object.keys(map)) map[k].sort((a, b) => b.score - a.score);
  return map;
}

function renderResults(matches) {
  const top5 = matches.slice(0, 5);
  const winner = top5[0];

  const grouped = groupByStateProvince(matches.slice(0, 30)); // keep view clean

  const el = $("results");
  el.innerHTML = `
    <div class="hero" style="background-image:url('${winner.hero}')">
      <div class="hero-overlay">
        <div class="hero-title">🏆 ${winner.name} (${winner.state})</div>
        <div class="hero-sub">${winner.explanation}</div>
      </div>
    </div>

    <div class="tabs">
      <button class="tab active" id="tabTop">Top 5</button>
      <button class="tab" id="tabState">By State/Province</button>
    </div>

    <div id="viewTop" class="view">
      <h2>Your Top 5</h2>
      ${top5.map((m, i) => `
        <div class="result">
          <div class="rank">#${i + 1}</div>
          <div class="r-main">
            <div class="r-name">${m.name} <span class="muted">(${m.state}, ${m.country})</span></div>
            <div class="r-explain">${m.explanation}</div>
          </div>
          <div class="r-score">${m.score}</div>
        </div>
      `).join("")}
    </div>

    <div id="viewState" class="view hidden">
      <h2>By State / Province (Top ~30)</h2>
      ${Object.keys(grouped).sort().map(k => `
        <div class="group">
          <div class="group-title">${k}</div>
          ${grouped[k].slice(0, 5).map(m => `
            <div class="result compact">
              <div class="r-main">
                <div class="r-name">${m.name}</div>
                <div class="r-explain">${m.explanation}</div>
              </div>
              <div class="r-score">${m.score}</div>
            </div>
          `).join("")}
        </div>
      `).join("")}
    </div>
  `;

  // tabs behavior
  $("tabTop").addEventListener("click", () => {
    $("tabTop").classList.add("active");
    $("tabState").classList.remove("active");
    $("viewTop").classList.remove("hidden");
    $("viewState").classList.add("hidden");
  });

  $("tabState").addEventListener("click", () => {
    $("tabState").classList.add("active");
    $("tabTop").classList.remove("active");
    $("viewState").classList.remove("hidden");
    $("viewTop").classList.add("hidden");
  });
}

document.addEventListener("DOMContentLoaded", initUI);
