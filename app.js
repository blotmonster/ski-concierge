let travelMode = null;

function selectMode(mode) {
  travelMode = mode;
  document.getElementById("modeSelect").classList.add("hidden");

  if (mode === "drive") {
    document.getElementById("driveStep").classList.remove("hidden");
  } else {
    document.getElementById("flyStep").classList.remove("hidden");
  }
}

function nextToSki() {
  document.getElementById("driveStep").classList.add("hidden");
  document.getElementById("flyStep").classList.add("hidden");
  document.getElementById("skiStep").classList.remove("hidden");
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 3958.8;
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

function driveMultiplier(distance, driveTime) {
  if (driveTime === "local") return distance < 150 ? 1 : 0;
  if (driveTime === "regional") return distance < 350 ? 1 : 0;
  if (driveTime === "extended") return distance < 600 ? 1 : 0;
  return 1;
}

async function calculateResults() {

  const ability = document.getElementById("ability").value;
  const terrain = document.getElementById("terrain").value;
  const luxury = document.getElementById("luxury").value;
  const snow = document.getElementById("snow").value;
  const passPref = document.getElementById("pass").value;
  const crowdTolerance = document.getElementById("crowdTolerance").value;
  const resultMode = document.getElementById("resultMode").value;

  let userCoords = null;
  let driveTime = null;

  if (travelMode === "drive") {
    const zip = document.getElementById("zipDrive").value;
    driveTime = document.getElementById("driveTime").value;
    userCoords = await getUserCoords(zip);
  }

  if (travelMode === "fly") {
    const zip = document.getElementById("zipFly").value;
    userCoords = await getUserCoords(zip);
  }

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Calculating...";

  let scored = resorts
    .filter(r => passPref === "any" || r.pass === passPref)
    .map(r => {

      let distance = 0;
      let travelMult = 1;

      if (travelMode === "drive") {
        distance = haversine(userCoords.lat, userCoords.lon, r.lat, r.lon);
        travelMult = driveMultiplier(distance, driveTime);
      }

      const quality = r.vertical + r.tier;
      let alignment = 0;

      if (ability === "advanced" || ability === "expert") {
        alignment += r.expert * 1.5;
      } else {
        alignment += r.groomers * 1.2;
      }

      if (terrain === "steeps") alignment += r.expert;
      if (terrain === "groomers") alignment += r.groomers;
      if (luxury === "high") alignment += r.luxury;
      if (snow === "high") alignment += r.snow;
      if (crowdTolerance === "low") alignment += (10 - r.crowd);

      // FLY trips weight quality & snow more heavily
      if (travelMode === "fly") {
        alignment += r.tier * 1.5;
        alignment += r.snow * 1.2;
      }

      const score = (quality + alignment) * travelMult;

      return { ...r, score };
    });

  scored = scored.filter(r => r.score > 0);
  scored.sort((a,b) => b.score - a.score);

  const winner = scored[0];

  resultsDiv.innerHTML = `
    <div class="result-card" style="border:2px solid #f59e0b;">
      <h2>🏆 Overall Winner</h2>
      <h3>${winner.name} (${winner.state})</h3>
      <p>
        ${winner.name} stands out due to its 
        ${winner.expert >= 8 ? "elite terrain" : "balanced terrain"}, 
        ${winner.snow >= 8 ? "strong snowfall" : "reliable conditions"}, 
        and overall mountain scale.
      </p>
    </div>
  `;

  if (resultMode === "overall") {

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

  } else {

    resultsDiv.innerHTML += "<h2>Top 3 by State</h2>";

    const grouped = {};

    scored.forEach(r => {
      if (!grouped[r.state]) grouped[r.state] = [];
      grouped[r.state].push(r);
    });

    Object.keys(grouped).forEach(state => {
      resultsDiv.innerHTML += `<h3>${state}</h3>`;

      grouped[state].slice(0,3).forEach((r,index) => {
        resultsDiv.innerHTML += `
          <div class="result-card">
            <div class="rank-badge">#${index + 1}</div>
            <h4>${r.name}</h4>
            <p>Match Score: ${r.score.toFixed(1)}</p>
          </div>
        `;
      });
    });
  }
}
