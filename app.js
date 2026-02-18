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
  if (!response.ok) throw new Error("Invalid ZIP code");
  const data = await response.json();

  return {
    lat: parseFloat(data.places[0].latitude),
    lon: parseFloat(data.places[0].longitude)
  };
}

function travelScore(distance, tolerance) {

  if (tolerance === "local") {
    return Math.max(0, 10 - (distance / 20));
  }

  if (tolerance === "regional") {
    return Math.max(0, 10 - (distance / 50));
  }

  if (tolerance === "extended") {
    return Math.max(0, 10 - (distance / 120));
  }

  return 8;
}

document.getElementById("quizForm").addEventListener("submit", async function(e){
  e.preventDefault();

  const zip = document.getElementById("zip").value;
  const travel = document.getElementById("travel").value;
  const ability = document.getElementById("ability").value;
  const terrain = document.getElementById("terrain").value;
  const luxury = document.getElementById("luxury").value;
  const nightlife = document.getElementById("nightlife").value;
  const snowImportance = document.getElementById("snow").value;

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Calculating...";

  try {

    const user = await getUserCoords(zip);

    const scored = resorts.map(r => {

      const distance = haversine(user.lat, user.lon, r.lat, r.lon);
      const travelVal = travelScore(distance, travel);

      const quality = (r.vertical + r.tier) * 1.2;

      let alignment = 0;

      if (ability === "advanced" || ability === "expert") {
        alignment += r.expert * 1.5;
      } else {
        alignment += r.groomers * 1.2;
      }

      if (terrain === "steeps") alignment += r.expert * 1.5;
      if (terrain === "groomers") alignment += r.groomers * 1.5;
      if (terrain === "balanced") alignment += (r.expert + r.groomers) * 0.7;

      if (luxury === "high") alignment += r.luxury * 1.5;
      if (luxury === "medium") alignment += r.luxury * 0.8;

      if (nightlife === "high") alignment += r.nightlife * 1.5;
      if (nightlife === "medium") alignment += r.nightlife * 0.8;

      if (snowImportance === "high") alignment += r.snow * 1.5;
      if (snowImportance === "medium") alignment += r.snow * 0.8;

      const finalScore =
        (quality * 0.4) +
        (alignment * 0.35) +
        (travelVal * 0.25);

      return { ...r, score: finalScore };
    });

    scored.sort((a,b) => b.score - a.score);
    const top5 = scored.slice(0,5);

    resultsDiv.innerHTML = "<h2>Your Top Matches</h2>";

    top5.forEach(r => {

      let reasons = [];

      if (r.expert >= 8 && (ability === "advanced" || ability === "expert")) {
        reasons.push("Strong expert terrain aligns with your ability.");
      }

      if (luxury === "high" && r.luxury >= 8) {
        reasons.push("High-end lodging matches your luxury preference.");
      }

      if (nightlife === "high" && r.nightlife >= 7) {
        reasons.push("Active nightlife scene fits your preferences.");
      }

      if (snowImportance === "high" && r.snow >= 8) {
        reasons.push("Excellent snow reliability matches your priorities.");
      }

      reasons.push("Distance aligns with your travel tolerance.");

      resultsDiv.innerHTML += `
        <div class="result-card">
          <h3>${r.name}</h3>
          <p>Match Score: ${r.score.toFixed(1)}</p>
          <ul>
            ${reasons.map(reason => `<li>${reason}</li>`).join("")}
          </ul>
        </div>
      `;
    });

  } catch (err) {
    resultsDiv.innerHTML = "<p>Please enter a valid US ZIP code.</p>";
  }

});
