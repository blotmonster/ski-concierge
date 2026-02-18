function safe(n){ return Number(n) || 0; }

function scoreResort(r, prefs){

  let score = 0;

  score += safe(r.expert) * prefs.expertWeight;
  score += safe(r.groomers) * prefs.groomerWeight;
  score += safe(r.snow) * prefs.snowWeight;
  score += safe(r.luxury) * prefs.luxuryWeight;
  score += safe(r.nightlife) * prefs.nightlifeWeight;
  score += safe(r.tier) * 2;

  if(prefs.mode === "drive"){
    let distancePenalty = Math.abs(safe(r.lat) - prefs.lat) * 3;
    score -= distancePenalty;
  }

  return score;
}

function findMountains(){

  const ability = document.getElementById("ability").value;
  const mode = document.querySelector("input[name='mode']:checked").value;

  const prefs = {
    expertWeight: ability === "Expert" ? 3 : 1,
    groomerWeight: ability === "Beginner" ? 3 : 1,
    snowWeight: 2,
    luxuryWeight: 1,
    nightlifeWeight: 1,
    lat: 42.36, // Boston baseline
    mode: mode
  };

  let scored = resorts.map(r => ({
    ...r,
    matchScore: scoreResort(r, prefs)
  }));

  scored.sort((a,b)=> b.matchScore - a.matchScore);

  renderResults(scored.slice(0,5), scored);
}

function renderResults(top5, all){

  const container = document.getElementById("results");
  container.innerHTML = "";

  const winner = top5[0];

  container.innerHTML += `
    <div class="hero">
      <img src="${winner.hero}" />
      <div class="heroText">
        🏆 ${winner.name} (${winner.state})
        <p>Best overall alignment with your terrain preferences, snow priorities, and trip profile.</p>
      </div>
    </div>
  `;

  container.innerHTML += `<h2>Your Top 5</h2>`;

  top5.forEach((r,i)=>{
    container.innerHTML += `
      <div class="card">
        <strong>#${i+1} ${r.name}</strong>
        <div>Match Score: ${r.matchScore.toFixed(1)}</div>
      </div>
    `;
  });

  // By State
  container.innerHTML += `<h2>Top by State</h2>`;

  const byState = {};

  all.forEach(r=>{
    if(!byState[r.state] || byState[r.state].matchScore < r.matchScore){
      byState[r.state] = r;
    }
  });

  Object.values(byState).forEach(r=>{
    container.innerHTML += `
      <div class="card">
        <strong>${r.state}: ${r.name}</strong>
        <div>Score: ${r.matchScore.toFixed(1)}</div>
      </div>
    `;
  });

}
