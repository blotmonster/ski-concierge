const app = document.getElementById("app");

let user = {};

function renderTravel() {
  app.innerHTML = `
    <h2>How are you planning to travel?</h2>
    <button onclick="selectTravel('drive')">🚗 Drive</button>
    <button onclick="selectTravel('fly')">✈️ Fly</button>
  `;
}

function selectTravel(type) {
  user.travel = type;

  if (type === "drive") {
    renderDrive();
  } else {
    renderProfile();
  }
}

function renderDrive() {
  app.innerHTML = `
    <h2>Drive Details</h2>
    <label>ZIP Code</label>
    <input id="zip" placeholder="e.g. 02108" />
    <label>Max Drive Time</label>
    <select id="driveTime">
      <option value="2">Under 2 hours</option>
      <option value="4">2–4 hours</option>
    </select>
    <button onclick="renderProfile()">Next</button>
  `;
}

function renderProfile() {
  app.innerHTML = `
    <h2>Your Ski Profile</h2>

    <label>Ability</label>
    <select id="ability">
      <option value="5">Beginner</option>
      <option value="7">Intermediate</option>
      <option value="9">Expert</option>
    </select>

    <label>Pass Preference</label>
    <select id="pass">
      <option value="Any">Any</option>
      <option value="Epic">Epic</option>
      <option value="Ikon">Ikon</option>
      <option value="Indy">Indy</option>
    </select>

    <button onclick="calculate()">Find My Mountain</button>
  `;
}

function calculate() {
  const ability = parseInt(document.getElementById("ability").value);
  const pass = document.getElementById("pass").value;

  let results = resorts.map(r => {

    if (pass !== "Any" && r.pass !== pass) return null;

    let score = 0;

    score += (r.expert - Math.abs(r.expert - ability));
    score += r.vertical;
    score += r.snow;
    score += r.luxury;

    if (user.travel === "drive") {
      score -= r.state === "CO" || r.state === "WY" ? 100 : 0;
    }

    return { ...r, score };
  })
  .filter(r => r !== null)
  .sort((a,b) => b.score - a.score)
  .slice(0,5);

  renderResults(results);
}

function renderResults(results) {

  if (results.length === 0) {
    app.innerHTML = "<h2>No resorts found.</h2>";
    return;
  }

  const winner = results[0];

  app.innerHTML = `
    <div class="hero" style="background-image:url('${winner.hero}')">
      <div class="hero-content">
        <h2>🏆 ${winner.name} (${winner.state})</h2>
        <p>Strongest overall match based on your ability and pass preference.</p>
      </div>
    </div>

    <h2>Your Top 5</h2>

    ${results.map((r,i) => `
      <div class="card">
        <strong>#${i+1} ${r.name}</strong>
        <div>Match Score: ${r.score.toFixed(1)}</div>
      </div>
    `).join("")}

    <button class="start-over" onclick="renderTravel()">Start Over</button>
  `;
}

renderTravel();
