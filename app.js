// ===== STATE =====
let state = {
  mode: null,
  zip: null,
  driveHours: null,
  ability: null,
  terrain: null,
  crowd: null,
  luxury: null,
  snow: null,
  pass: null
};

// ===== DOM ELEMENTS =====
const modeStep = document.getElementById("modeStep");
const driveStep = document.getElementById("driveStep");
const flyStep = document.getElementById("flyStep");
const profileStep = document.getElementById("profileStep");
const resultsDiv = document.getElementById("results");

// ===== NAVIGATION =====
function selectMode(mode){
  state.mode = mode;
  modeStep.classList.add("hidden");

  if(mode === "drive"){
    driveStep.classList.remove("hidden");
  } else {
    flyStep.classList.remove("hidden");
  }
}

function goToProfile(){
  driveStep.classList.add("hidden");
  flyStep.classList.add("hidden");
  profileStep.classList.remove("hidden");
}

function backToMode(){
  driveStep.classList.add("hidden");
  flyStep.classList.add("hidden");
  modeStep.classList.remove("hidden");
}

function startOver(){
  location.reload();
}

// ===== DISTANCE FUNCTION =====
function haversine(lat1, lon1, lat2, lon2){
  const R = 3958.8;
  const toRad = x => x * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon/2) *
            Math.sin(dLon/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// ===== MAIN CALCULATE =====
function calculate(){

  // ===== COLLECT INPUTS =====
  if(state.mode === "drive"){
    state.zip = document.getElementById("zip").value;
    state.driveHours = parseFloat(document.getElementById("driveHours").value);
  }

  state.ability = document.getElementById("ability").value;
  state.terrain = document.getElementById("terrain").value;
  state.crowd = document.getElementById("crowd").value;
  state.luxury = document.getElementById("luxury").value;
  state.snow = document.getElementById("snow").value;
  state.pass = document.getElementById("pass").value;

  profileStep.classList.add("hidden");

  let ranked = resorts
    .map(r => ({...r, score: scoreResort(r)}))
    .filter(r => r.score > -9999)
    .sort((a,b) => b.score - a.score);

  if(ranked.length === 0){
    resultsDiv.innerHTML = "<h2>No resorts found.</h2>";
    return;
  }

  renderResults(ranked);
}

// ===== SCORING ENGINE =====
function scoreResort(r){

  let score = 0;

  // ===== HARD PASS FILTER =====
  if(state.pass !== "any" && r.pass !== state.pass){
    return -9999;
  }

  // ===== HARD DISTANCE FILTER (DRIVE MODE) =====
  if(state.mode === "drive" && state.driveHours){

    // For now Boston fallback (can later geocode zip)
    const userLat = 42.36;
    const userLon = -71.06;

    const distance = haversine(userLat, userLon, r.lat, r.lon);
    const maxMiles = state.driveHours * 70;

    if(distance > maxMiles){
      return -9999;
    }
  }

  // ===== ABILITY MATCH =====
  if(state.ability === "beginner"){
    score += r.groomers * 5;
  }
  if(state.ability === "intermediate"){
    score += (r.groomers + r.expert) * 4;
  }
  if(state.ability === "expert"){
    score += r.expert * 6;
  }

  // ===== TERRAIN =====
  if(state.terrain === "expert"){
    score += r.expert * 3;
  }
  if(state.terrain === "groomers"){
    score += r.groomers * 3;
  }

  // ===== CROWD =====
  if(state.crowd === "low"){
    score += (10 - r.crowd) * 2;
  }
  if(state.crowd === "high"){
    score += r.crowd;
  }

  // ===== LUXURY =====
  if(state.luxury === "high"){
    score += r.luxury * 2;
  }

  // ===== SNOW =====
  if(state.snow === "high"){
    score += r.snow * 3;
  }

  return score;
}

// ===== RENDER RESULTS =====
function renderResults(ranked){

  const top5 = ranked.slice(0,5);
  const winner = top5[0];

  resultsDiv.innerHTML = `
    <div class="hero" style="background-image:url('${winner.hero}')">
      <div class="hero-overlay">
        <h2>🏆 ${winner.name} (${winner.state})</h2>
        <p>Strongest overall match based on your ski DNA and constraints.</p>
      </div>
    </div>

    <h3>Your Top 5</h3>
    ${top5.map((r,i)=>`
      <div class="result-card">
        <strong>#${i+1} ${r.name}</strong> — ${r.score.toFixed(1)}
      </div>
    `).join("")}

    <h3>Top 3 By State</h3>
    ${renderByState(ranked)}

    <button onclick="startOver()" class="primary-btn">Start Over</button>
  `;
}

// ===== BY STATE VIEW =====
function renderByState(ranked){

  const grouped = {};

  ranked.forEach(r=>{
    if(!grouped[r.state]) grouped[r.state] = [];
    grouped[r.state].push(r);
  });

  return Object.keys(grouped).map(state=>{
    const top3 = grouped[state].slice(0,3);
    return `
      <div class="state-block">
        <h4>${state}</h4>
        ${top3.map(r=>`
          <div class="result-card small">
            ${r.name} — ${r.score.toFixed(1)}
          </div>
        `).join("")}
      </div>
    `;
  }).join("");
}
