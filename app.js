let mode = null;

const modeStep = document.getElementById("modeStep");
const profileStep = document.getElementById("profileStep");

document.getElementById("driveBtn").addEventListener("click", () => {
  mode = "drive";
  goToProfile();
});

document.getElementById("flyBtn").addEventListener("click", () => {
  mode = "fly";
  goToProfile();
});

document.getElementById("backBtn").addEventListener("click", () => {
  profileStep.classList.add("hidden");
  modeStep.classList.remove("hidden");
});

document.getElementById("submitBtn").addEventListener("click", findMountains);

function goToProfile(){
  modeStep.classList.add("hidden");
  profileStep.classList.remove("hidden");
}

function safe(n){ return Number(n) || 0; }

function scoreResort(r, ability){

  let score = 0;

  if(ability === "Expert"){
    score += safe(r.expert) * 3;
  } else {
    score += safe(r.groomers) * 3;
  }

  score += safe(r.snow) * 2;
  score += safe(r.tier) * 2;

  return score;
}

function findMountains(){

  const ability = document.getElementById("ability").value;

  let scored = resorts.map(r => ({
    ...r,
    matchScore: scoreResort(r, ability)
  }));

  scored.sort((a,b)=> b.matchScore - a.matchScore);

  renderResults(scored.slice(0,5));
}

function renderResults(top5){

  const container = document.getElementById("results");
  container.innerHTML = "";

  const winner = top5[0];

  container.innerHTML += `
    <div class="hero">
      <img src="${winner.hero}" />
      <div class="heroText">
        🏆 ${winner.name} (${winner.state})
        <p>Best alignment with your ski ability and terrain preferences.</p>
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
}
