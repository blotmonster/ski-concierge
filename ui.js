// =====================================================
// UI V9 – Fully Aligned With New HTML Layout
// =====================================================

function getUserInputs() {
  return {
    travel: document.getElementById("travelType")?.value,
    zip: document.getElementById("zipCode")?.value || "02482",
    maxDrive: document.getElementById("driveTime")?.value,
    ability: document.getElementById("ability")?.value,
    terrain: document.getElementById("terrainPreference")?.value,
    crowd: document.getElementById("crowdTolerance")?.value,
    luxury: document.getElementById("luxuryImportance")?.value,
    snowImportance: document.getElementById("snowImportance")?.value,
    pass: document.getElementById("passPreference")?.value
  };
}

function renderResults(results, user) {

  if (!results || results.length === 0) return;

  const winner = results[0];
  const explanation = buildWinnerExplanation(winner, user);

  // ===== Populate Hero =====
  document.getElementById("bestHeroImage").src = winner.hero;
  document.getElementById("bestMountainName").textContent =
    `${winner.name} (${winner.state})`;

  document.getElementById("bestMatchScore").textContent =
    `Match Score: ${winner.score.toFixed(1)}`;

  document.getElementById("bestReasons").innerHTML =
    explanation.map(r => `<li>${r}</li>`).join("");

  // ===== Top Overall List =====
  const topList = document.getElementById("topMatchesList");
  topList.innerHTML = "";

  results.slice(0,5).forEach((r,i)=>{
    const li = document.createElement("li");
    li.innerHTML = `<strong>#${i+1} ${r.name} (${r.state})</strong> — ${r.score.toFixed(1)}`;
    topList.appendChild(li);
  });

  // ===== Results By State =====
  const stateContainer = document.getElementById("resultsByState");
  stateContainer.innerHTML = "";

  const grouped = {};
  results.forEach(r => {
    if (!grouped[r.state]) grouped[r.state] = [];
    grouped[r.state].push(r);
  });

  const states = Object.keys(grouped)
    .sort((a,b)=> grouped[b][0].score - grouped[a][0].score);

  states.forEach(state => {

    const wrapper = document.createElement("div");
    wrapper.className = "state-group";

    const title = document.createElement("h4");
    title.textContent = state;
    wrapper.appendChild(title);

    grouped[state]
      .sort((a,b)=> b.score - a.score)
      .slice(0,3)
      .forEach((r,i)=>{
        const div = document.createElement("div");
        div.textContent = `${i+1}. ${r.name} — ${r.score.toFixed(1)}`;
        wrapper.appendChild(div);
      });

    stateContainer.appendChild(wrapper);
  });
}

function runMatch() {
  const user = getUserInputs();
  const results = calculateMatches(user);
  renderResults(results, user);
}

window.onload = function () {
  const btn = document.getElementById("findButton");
  if (!btn) return;

  btn.addEventListener("click", function (e) {
    e.preventDefault();
    runMatch();
  });
};
