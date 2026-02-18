function nextStep(step) {
  document.querySelectorAll(".step").forEach(s => s.classList.add("hidden"));
  document.getElementById("step" + step).classList.remove("hidden");
}

function prevStep(step) {
  nextStep(step);
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

function travelMultiplier(distance, tolerance) {

  if (tolerance === "local") {
    if (distance < 150) return 1;
    return 0;
  }

  if (tolerance === "regional") {
    if (distance < 350) return 1;
    return 0;
  }

  if (tolerance === "extended") {
    if (distance < 800) return 1;
    return 0.5;
  }

  return 1;
}

async function calculateResults() {

  const zip = document.getElementById("zip").value;
  const travel = document.getElementById("travel").value;
  const ability = document.getElementById("ability").value;
  const terrain = document.getElementById("terrain").value;
  const luxury = document.getElementById("luxury").value;
  const nightlife = document.getElementById("nightlife").value;
  const snowImportance = document.getElementById("snow").value;
  const passPref = document.getElementById("pass").value;
  const crowdTolerance = document.getElementById("crowdTolerance").value;

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Calculating...";

  try {

    const user = await getUserCoords(zip);

    const scored = resorts
      .filter(r => passPref === "any" || r.pass === passPref)
      .map(r => {

        const distance = haversine(user.lat, user.lon, r.lat, r.lon);
        const travelMult = travelMultiplier(distance, travel);

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
        if (nightlife === "high") alignment += r.nightlife;
        if (snowImportance === "high") alignment += r.snow;

        if (crowdTolerance === "low") alignment += (10 - r.crowd);

        const finalScore = (quality + alignment) * travelMult;

        return { ...r, score: finalScore };
      });

    scored.sort((a,b) => b.score - a.score);

    const top5 = scored.slice(0,5);

    resultsDiv.innerHTML = "<h2>Your Top Matches</h2>";

    top5.forEach(r => {
      resultsDiv.innerHTML += `
        <div class="result-card">
          <h3>${r.name} (${r.state})</h3>
          <p>Match Score: ${r.score.toFixed(1)}</p>
        </div>
      `;
    });

  } catch (err) {
    resultsDiv.innerHTML = "<p>Please enter a valid ZIP.</p>";
  }
}
