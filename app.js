let travelMode = null;

function selectMode(mode) {
  travelMode = mode;
  document.getElementById("modeSelect").classList.add("hidden");
  document.getElementById(mode + "Step").classList.remove("hidden");
}

function nextToSki() {
  document.getElementById("driveStep").classList.add("hidden");
  document.getElementById("flyStep").classList.add("hidden");
  document.getElementById("skiStep").classList.remove("hidden");
}

function generateWinnerExplanation(r, inputs) {

  let reasons = [];

  if (inputs.ability === "expert" && r.expert >= 9) {
    reasons.push("features some of the most challenging terrain in North America");
  }

  if (inputs.terrain === "steeps" && r.expert >= 8) {
    reasons.push("offers sustained steeps and advanced lines");
  }

  if (inputs.snow === "high" && r.snow >= 8) {
    reasons.push("delivers strong snow reliability");
  }

  if (inputs.luxury === "high" && r.luxury >= 8) {
    reasons.push("provides a premium on-mountain experience");
  }

  if (travelMode === "drive") {
    reasons.push("fits within your preferred drive range");
  }

  if (travelMode === "fly") {
    reasons.push("justifies a destination ski trip");
  }

  return `
    ${r.name} stands out because it ${reasons.join(", ")}.
    Based on your skiing profile and priorities,
    it offers the strongest overall alignment across terrain, snow quality,
    and mountain experience.
  `;
}

async function calculateResults() {

  const ability = document.getElementById("ability").value;
  const terrain = document.getElementById("terrain").value;
  const luxury = document.getElementById("luxury").value;
  const snow = document.getElementById("snow").value;
  const passPref = document.getElementById("pass").value;
  const crowdTolerance = document.getElementById("crowdTolerance").value;

  let scored = resorts
    .filter(r => passPref === "any" || r.pass === passPref)
    .map(r => {

      let score = r.vertical + r.tier;

      if (ability === "advanced" || ability === "expert") {
        score += r.expert * 1.5;
      } else {
        score += r.groomers * 1.2;
      }

      if (terrain === "steeps") score += r.expert;
      if (terrain === "groomers") score += r.groomers;
      if (luxury === "high") score += r.luxury;
      if (snow === "high") score += r.snow;
      if (crowdTolerance === "low") score += (10 - r.crowd);

      if (travelMode === "fly") {
        score += r.tier * 1.5;
        score += r.snow * 1.2;
      }

      return { ...r, score };
    });

  scored.sort((a,b) => b.score - a.score);

  const winner = scored[0];

  const explanation = generateWinnerExplanation(winner, {
    ability, terrain, luxury, snow
  });

  const resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = `
    <div class="hero-card">
      <img src="${winner.hero}" class="hero-image">
      <div class="hero-content">
        <h2>🏆 ${winner.name} (${winner.state})</h2>
        <p>${explanation}</p>
      </div>
    </div>
  `;

  resultsDiv.innerHTML += "<h2>Your Top Matches</h2>";

  scored.slice(0,5).forEach((r,index) => {
    resultsDiv.innerHTML += `
      <div class="result-card">
        <div class="rank-badge">#${index + 1}</div>
        <h3>${r.name}</h3>
        <p>Match Score: ${r.score.toFixed(1)}</p>
      </div>
    `;
  });
}
