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
  if (tolerance === "local") return distance < 150 ? 1 : 0;
  if (tolerance === "regional") return distance < 350 ? 1 : 0;
  if (tolerance === "extended") return distance < 800 ? 1 : 0.5;
  return 1;
}

function generateWinnerSummary(resort, inputs) {

  let reasons = [];

  if (inputs.ability === "expert" || inputs.ability === "advanced") {
    if (resort.expert >= 8) {
      reasons.push("its elite expert terrain");
    }
  }

  if (inputs.terrain === "steeps" && resort.expert >= 8) {
    reasons.push("steep, challenging lines");
  }

  if (inputs.snow === "high" && resort.snow >= 8) {
    reasons.push("consistently strong snowfall");
  }

  if (inputs.luxury === "high" && resort.luxury >= 8) {
    reasons.push("premium lodging and amenities");
  }

  if (inputs.crowdTolerance === "low" && resort.crowd <= 4) {
    reasons.push("relatively low crowd levels");
  }

  const distanceHours = Math.round(resort.distance / 60);

  let travelLine = "";

  if (inputs.travel === "local" || inputs.travel === "regional") {
    travelLine = `within approximately ${distanceHours} hours of travel`;
  } else {
    travelLine = "and it aligns with your willingness to travel";
  }

  return `
    <strong>${resort.name}</strong> stands out as your best overall match 
    due to ${reasons.join(", ")} ${travelLine}. 
    Based on your selections, it offers the strongest balance of terrain, 
    experience, and accessibility for this trip.
  `;
}

async function calculateResults() {

  const zip = document.getElementById("zip").value;
  const travel = document.getElementById("travel").value;
  const ability = document.getElementById("ability").value;
  const terrain = document.getElementById("terrain").value;
  const luxury = document.getElementById("luxury").value;
  const nightlife = document.getElementById("nightlife").value;
  const snow = document.getElementById("snow").value;
  const passPref = document.getElementById("pass").value;
  const crowdTolerance = document.getElementById("crowdTolerance").value;
  const resultMode = document.getElementById("resultMode").value;

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
        if (snow === "high") alignment += r.snow;

        if (crowdTolerance === "low") alignment += (10 - r.crowd);

        const finalScore = (quality + alignment) * travelMult;

        return { ...r, score: finalScore, distance };
      });

    scored.sort((a,b) => b.score - a.score);

    resultsDiv.innerHTML = "";

    const overallWinner = scored[0];

    const winnerSummary = generateWinnerSummary(overallWinner, {
      ability, terrain, luxury, snow, travel, crowdTolerance
    });

    resultsDiv.innerHTML += `
      <div class="result-card" style="border:2px solid #f59e0b;">
        <h2>🏆 Overall Winner</h2>
        <h3 class="resort-title">${overallWinner.name} (${overallWinner.state})</h3>
        <p>${winnerSummary}</p>
      </div>
    `;

    if (resultMode === "overall") {

      const top5 = scored.slice(0,5);

      resultsDiv.innerHTML += "<h2>Your Top 5 Matches</h2>";

      top5.forEach((r, index) => {

        const hours = Math.round(r.distance / 60);

        let badges = `<span class="badge pass">${r.pass}</span>`;

        if (r.expert >= 8) badges += `<span class="badge expert">Expert Terrain</span>`;
        if (r.snow >= 8) badges += `<span class="badge snow">High Snow</span>`;
        if (r.crowd <= 4) badges += `<span class="badge lowcrowd">Low Crowds</span>`;

        resultsDiv.innerHTML += `
          <div class="result-card">
            <div class="rank-badge">#${index + 1}</div>
            <h3 class="resort-title">${r.name}</h3>
            <div class="meta">${r.state} • ~${hours} hr travel</div>
            <div class="badges">${badges}</div>
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

        resultsDiv.innerHTML += `<h3 style="margin-top:30px;">${state}</h3>`;

        grouped[state].slice(0,3).forEach((r,index) => {

          resultsDiv.innerHTML += `
            <div class="result-card">
              <div class="rank-badge">#${index + 1}</div>
              <h3 class="resort-title">${r.name}</h3>
              <p>Match Score: ${r.score.toFixed(1)}</p>
            </div>
          `;
        });
      });
    }

  } catch (err) {
    resultsDiv.innerHTML = "<p>Please enter a valid ZIP.</p>";
  }
}
