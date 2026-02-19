const app = document.getElementById("app");

let state = {
  step: 1,
  mode: null,
  zip: "",
  driveHours: 0,
  ability: "",
  terrain: "",
  snowPriority: "",
  luxuryPriority: "",
  pass: ""
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
      <h2>Your Ski Profile</h2>

      <select id="ability">
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Expert</option>
      </select>

      <select id="terrain">
        <option value="steeps">Steeps</option>
        <option value="groomers">Groomers</option>
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

function scoreResort(r){

  let score = 0;

  if(state.ability === "Expert"){
    score += r.expert * 3;
  } else {
    score += r.groomers * 3;
  }

  score += r.snow * 2;
  score += r.tier * 2;

  if(state.mode === "drive" && state.driveHours){
    const approxUserLat = 42.36; // Boston baseline for now
    const approxUserLon = -71.06;

    const distance = haversine(
      approxUserLat,
      approxUserLon,
      r.lat,
      r.lon
    );

    const maxMiles = state.driveHours * 70;
    const penalty = Math.max(0, distance - maxMiles);
    score -= penalty / 20;
  }

  return score;
}

function showResults(){

  let scored = resorts.map(r => ({
    ...r,
    score: scoreResort(r)
  }));

  scored.sort((a,b)=> b.score - a.score);

  const winner = scored[0];
  const top5 = scored.slice(0,5);

  app.innerHTML = `
    <div class="hero">
      <img src="${winner.hero}">
      <h2>🏆 ${winner.name} (${winner.state})</h2>
      <p>Strongest alignment with your skiing style and trip priorities.</p>
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

  app.innerHTML += `
    <button onclick="reset()">Start Over</button>
  `;
}

function reset(){
  state = {
    step: 1,
    mode: null,
    zip: "",
    driveHours: 0,
    ability: "",
    terrain: "",
    snowPriority: "",
    luxuryPriority: "",
    pass: ""
  };
  render();
}

render();
