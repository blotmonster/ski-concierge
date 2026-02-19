const app = document.getElementById("app");

let state = {
  step: 1,
  mode: null,
  zip: "",
  driveHours: 0,
  ability: "",
  terrain: "",
  snowPriority: "medium",
  luxuryPriority: "medium",
  crowdTolerance: "medium",
  pass: "any"
};

function render(){

  if(state.step === 1){
    app.innerHTML = `
      <h2>How are you traveling?</h2>
      <button onclick="setMode('drive')">🚗 Drive</button>
      <button onclick="setMode('fly')">✈️ Fly</button>
    `;
  }

  if(state.step === 2 && state.mode === "drive"){
    app.innerHTML = `
      <h2>Drive Details</h2>
      <input id="zipInput" placeholder="ZIP Code" />
      <select id="driveHours">
        <option value="2">Under 2 hours</option>
        <option value="4">2–4 hours</option>
        <option value="6">4–6 hours</option>
      </select>
      <button onclick="saveDrive()">Next</button>
    `;
  }

  if(state.step === 2 && state.mode === "fly"){
    state.step = 3;
    render();
  }

  if(state.step === 3){
    app.innerHTML = `
      <h2>Your Ski DNA</h2>

      <label>Ability</label>
      <select id="ability">
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Expert</option>
      </select>

      <label>Terrain Preference</label>
      <select id="terrain">
        <option value="balanced">Balanced</option>
        <option value="steeps">Steeps</option>
        <option value="groomers">Groomers</option>
      </select>

      <label>Snow Reliability Importance</label>
      <select id="snowPriority">
        <option value="low">Low</option>
        <option value="medium" selected>Medium</option>
        <option value="high">High</option>
      </select>

      <label>Luxury Importance</label>
      <select id="luxuryPriority">
        <option value="low">Low</option>
        <option value="medium" selected>Medium</option>
        <option value="high">High</option>
      </select>

      <label>Crowd Tolerance</label>
      <select id="crowdTolerance">
        <option value="low">Low (avoid crowds)</option>
        <option value="medium" selected>Medium</option>
        <option value="high">High (doesn’t matter)</option>
      </select>

      <label>Pass Preference</label>
      <select id="pass">
        <option value="any">Any</option>
        <option value="Ikon">Ikon</option>
        <option value="Epic">Epic</option>
        <option value="Indy">Indy</option>
      </select>

      <button onclick="saveProfile()">Find My Mountain</button>
    `;
  }

  if(state.step === 4){
    showResults();
  }
}

function setMode(mode){
  state.mode = mode;
  state.step = 2;
  render();
}

function saveDrive(){
  state.zip = document.getElementById("zipInput").value;
  state.driveHours = Number(document.getElementById("driveHours").value);
  state.step = 3;
  render();
}

function saveProfile(){
  state.ability = document.getElementById("ability").value;
  state.terrain = document.getElementById("terrain").value;
  state.snowPriority = document.getElementById("snowPriority").value;
  state.luxuryPriority = document.getElementById("luxuryPriority").value;
  state.crowdTolerance = document.getElementById("crowdTolerance").value;
  state.pass = document.getElementById("pass").value;
  state.step = 4;
  render();
}

function haversine(lat1, lon1, lat2, lon2){
  const R = 3958.8;
  const dLat = (lat2 - lat1) * Math.PI/180;
  const dLon = (lon2 - lon1) * Math.PI/180;

  const a =
    Math.sin(dLat/2)**2 +
    Math.cos(lat1*Math.PI/180) *
    Math.cos(lat2*Math.PI/180) *
    Math.sin(dLon/2)**2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function weight(level){
  if(level === "high") return 3;
  if(level === "medium") return 2;
  return 1;
}

function scoreResort(r){

  if(state.pass !== "any" && r.pass !== state.pass){
    return -999; // filter out
  }

  let score = 0;

  // Ability + Terrain
  if(state.ability === "Expert"){
    score += r.expert * 3;
  } else {
    score += r.groomers * 3;
  }

  if(state.terrain === "steeps") score += r.expert * 2;
  if(state.terrain === "groomers") score += r.groomers * 2;

  // Snow priority
  score += r.snow * weight(state.snowPriority);

  // Luxury
  score += r.luxury * weight(state.luxuryPriority);

  // Crowd penalty
  if(state.crowdTolerance === "low"){
    score -= r.crowd * 2;
  }

  // Tier boost for Fly
  if(state.mode === "fly"){
    score += r.tier * 3;
  } else {
    score += r.tier * 1.5;
  }

  // Soft distance penalty
  if(state.mode === "drive" && state.driveHours){
    const userLat = 42.36; // Boston baseline for now
    const userLon = -71.06;
    const distance = haversine(userLat, userLon, r.lat, r.lon);
    const maxMiles = state.driveHours * 70;
    const penalty = Math.max(0, distance - maxMiles);
    score -= penalty / 15;
  }

  return score;
}

function showResults(){

  let scored = resorts.map(r => ({
    ...r,
    score: scoreResort(r)
  })).filter(r => r.score > -500);

  scored.sort((a,b)=> b.score - a.score);

  const winner = scored[0];
  const top5 = scored.slice(0,5);

  app.innerHTML = `
    <div class="hero">
      <img src="${winner.hero}">
      <h2>🏆 ${winner.name} (${winner.state})</h2>
      <p>Strongest match based on your ski DNA, terrain preference, and trip priorities.</p>
    </div>
    <h3>Your Top 5</h3>
  `;

  top5.forEach((r,i)=>{
    app.innerHTML += `
      <div class="card">
        #${i+1} ${r.name} — ${r.score.toFixed(1)}
      </div>
    `;
  });

  app.innerHTML += `<button onclick="reset()">Start Over</button>`;
}

function reset(){
  state.step = 1;
  render();
}

render();
