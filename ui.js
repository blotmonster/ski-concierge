const app = document.getElementById("app");

function renderForm() {
  app.innerHTML = `
    <div class="card">
      <h2>Ski Profile</h2>

      <label>Travel Type</label>
      <select id="travel">
        <option value="drive">Drive</option>
        <option value="fly">Fly</option>
      </select>

      <label>Ability</label>
      <select id="ability">
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
        <option value="expert">Expert</option>
      </select>

      <label>Terrain Preference</label>
      <select id="terrain">
        <option value="groomers">Groomers</option>
        <option value="mixed">Mixed Terrain</option>
        <option value="steeps">Steeps & Expert</option>
      </select>

      <label>Crowd Tolerance</label>
      <select id="crowd">
        <option value="low">Low – Avoid Crowds</option>
        <option value="medium">Medium</option>
        <option value="high">High – Don’t Care</option>
      </select>

      <label>Luxury Importance</label>
      <select id="luxury">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <label>Snow Reliability Importance</label>
      <select id="snow">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <label>Pass</label>
      <select id="pass">
        <option value="any">Any</option>
        <option value="ikon">Ikon</option>
        <option value="epic">Epic</option>
        <option value="independent">Independent</option>
      </select>

      <button onclick="runMatch()">Find My Mountains</button>
    </div>
  `;
}

function runMatch() {
  const profile = {
    travel: document.getElementById("travel").value,
    ability: document.getElementById("ability").value,
    terrain: document.getElementById("terrain").value,
    crowd: document.getElementById("crowd").value,
    luxury: document.getElementById("luxury").value,
    snow: document.getElementById("snow").value,
    pass: document.getElementById("pass").value
  };

  const results = calculateMatches(profile);

  renderResults(results);
}

function renderResults(results) {
  if (results.length === 0) {
    app.innerHTML = `<p>No resorts match your criteria.</p>
    <button onclick="renderForm()">Start Over</button>`;
    return;
  }

  const winner = results[0];

  let html = `
    <div class="hero">
      <h2>🏆 ${winner.name} (${winner.state})</h2>
      <p>Strongest overall match based on your ski DNA and priorities.</p>
    </div>

    <h3>Your Top 5</h3>
  `;

  results.slice(0,5).forEach((r, i) => {
    html += `
      <div class="result">
        <strong>#${i+1} ${r.name}</strong>
        <div>Match Score: ${r.score.toFixed(1)}</div>
      </div>
    `;
  });

  html += `<button onclick="renderForm()">Start Over</button>`;

  app.innerHTML = html;
}

renderForm();
