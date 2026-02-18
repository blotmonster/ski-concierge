let travelMode = null;

function showStep(id) {
  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function selectMode(mode) {
  travelMode = mode;
  showStep(mode + "Step");
}

function goBack(step) {
  showStep(step);
}

function goToSki() {
  showStep("skiStep");
}

function goBackToTravel() {
  showStep(travelMode + "Step");
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // miles
  const dLat = (lat2 - lat1) * Math.PI/180;
  const dLon = (lon2 - lon1) * Math.PI/180;

  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1*Math.PI/180) *
    Math.cos(lat2*Math.PI/180) *
    Math.sin(dLon/2) *
    Math.sin(dLon/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

async function getUserCoords(zip) {
  const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
  if (!response.ok) throw new Error("Invalid ZIP");
  const data = await response.json();

  return {
    lat: parseFloat(data.places[0].latitude),
    lon: parseFloat(data.places[0].longitude)
  };
}

function getDriveRadius(driveTime) {
  if (driveTime === "local") return 150;
  if (driveTime === "regional") return 300;
  if (driveTime === "extended") return 450;
  return 150;
}

function generateWinnerExplanation(r, inputs) {

  let reasons = [];

  if (inputs.ability === "expert" && r.expert >= 9)
    reasons.push("features truly elite expert terrain");

  if (inputs.terrain === "steeps" && r.expert >= 8)
    reasons.push("offers sustained, technical steeps");

  if (inputs.snow === "high" && r.snow >= 8)
    reasons.push("has strong snow reliability");

  if (inputs.luxury === "high" && r.luxury >= 8)
    reasons.push("delivers a premium mountain experience");

  if (travelMode === "drive")
    reasons.push("fits within your preferred drive range");

  if (travelMode === "fly")
    reasons.push("stands out as a true destination-level ski trip");

  return `
    ${r.name} stands out because it ${reasons.join(", ")}.
    It offers the strongest overall alignment with your skiing profile,
    terrain preferences, and trip priorities.
  `;
}

async function calculateResults() {

  const ability = document.getElementById("ability").value;
  const terrain = document.getElementById("terrain").value;
  const luxury = document.getElementById("luxury").value;
  const snow = document.getElementById("snow").value;
  const passPref = document.getElementById("pass").value;
  const crowdTolerance = document.getElementById("crowdTolerance").value;

  let userCoords = null;
  let maxDistance = null;

  if (travelMode === "drive") {
    const zip = document.getElementById("zipDrive").value;
    const driveTime = document.getElementById("driveTime").value;

    userCoords = await getUserCoords(zip);
    maxDistance = getDriveRadius(driveTime);
  }

  let scored = resorts
    .filter(r => passPref === "any" || r.pass === passPref)
    .map(r => {

      // DRIVE MODE — Hard Eliminate
      if (travelMode === "drive") {
        const distance = haversine(
          userCoords.lat,
          userCoords.lon,
          r.lat,
          r.lon
        );

        if (distance > maxDistance) {
          return null; // eliminate
        }
      }

      let score = r.vertical + r.tier;

      if (ability === "advanced" || ability === "expert")
        score += r.expert * 1.5;
      else
        score += r.groomers * 1.2;

      if (terrain === "steeps") score += r.expert;
      if (terrain === "groomers") score += r.groomers;
      if (luxury === "high") score += r.luxury;
      if (snow === "high") score += r.snow;
      if (crowdTolerance === "low") score += (10 - r.crowd);

      // FLY MODE Boost Destination Quality
      if (travelMode === "fly") {
        score += r.tier * 1.5;
        score += r.snow * 1.2;
      }

      return { ...r, score };
    })
    .filter(r => r !== null); // remove eliminated resorts

  if (scored.length === 0) {
    document.getElementById("results").innerHTML =
      "<p>No resorts match your drive range. Try expanding your radius.</p>";
    return;
  }

  scored.sort((a,b) => b.score - a.score);

  const winner = scored[0];

  const explanation = generateWinnerExplanation(winner, {
    ability,
    terrain,
    luxury,
    snow
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

  resultsDiv.innerHTML += `
    <button onclick="location.reload()">Start Over</button>
  `;
}
