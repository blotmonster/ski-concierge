const app = document.getElementById("app");

let user = {
  travel: null,
  ability: 7,
  pass: "Any",
  luxuryWeight: 1
};

function renderTravel() {
  app.innerHTML = `
    <h2>Travel Type</h2>
    <button onclick="selectTravel('drive')">🚗 Drive</button>
    <button onclick="selectTravel('fly')">✈️ Fly</button>
  `;
}

function selectTravel(type) {
  user.travel = type;
  renderProfile();
}

function renderProfile() {
  app.innerHTML = `
    <h2>Ski Profile</h2>

    <label>Ability</label>
    <select id="ability">
      <option value="5">Beginner</option>
      <option value="7">Intermediate</option>
      <option value="9">Expert</option>
    </select>

    <label>Pass</label>
    <select id="pass">
      <option value="Any">Any</option>
      <option value="Epic">Epic</option>
      <option value="Ikon">Ikon</option>
      <option value="Indy">Indy</option>
    </select>

    <button onclick="calculate()">Find My Mountains</button>
  `;
}

function calculate() {
  user.ability = parseInt(document.getElementById("ability").value);
  user.pass = document.getElementById("pass").value;

  let ranked = scoreResorts(user);

  renderResults(ranked.slice(0,5));
}

function renderResults(results) {

  const winner = results[0];

  app.innerHTML = `
    <div class="hero" style="background-image:url('https://images.unsplash.com/photo-1519681393784-d120267933ba')">
      <div class="hero-content">
        <h2>🏆 ${winner.name} (${winner.state})</h2>
        <p>Strongest overall match based on travel mode and ski DNA.</p>
      </div>
    </div>

    <h2>Your Top 5</h2>

    ${results.map((r,i) => `
      <div class="card">
        <strong>#${i+1} ${r.name}</strong>
        <div>Score: ${r.score.toFixed(1)}</div>
      </div>
    `).join("")}

    <button onclick="renderTravel()">Start Over</button>
  `;
}

renderTravel();
