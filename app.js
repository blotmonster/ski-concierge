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

// TEMP: Boston coords (replace later with ZIP lookup)
function getUserCoords() {
  return { lat:42.36, lon:-71.06 };
}

function travelScore(distance, tolerance) {
  if (tolerance === "local") return distance < 150 ? 10 : 0;
  if (tolerance === "regional") return distance < 350 ? 10 : 4;
  if (tolerance === "extended") return distance < 800 ? 10 : 6;
  return 8; // fly
}

document.getElementById("quizForm").addEventListener("submit", function(e){
  e.preventDefault();

  const travel = document.getElementById("travel").value;
  const ability = document.getElementById("ability").value;
  const terrain = document.getElementById("terrain").value;
  const luxury = document.getElementById("luxury").value;
  const nightlife = document.getElementById("nightlife").value;
  const snowImportance = document.getElementById("snow").value;

  const user = getUserCoords();

  const scored = resorts.map(r => {

    const distance = haversine(user.lat, user.lon, r.lat, r.lon);
    const travelVal = travelScore(distance, travel);

    let quality = r.vertical + r.tier;

    let alignment = 0;

    if (ability === "advanced" || ability === "expert") {
      alignment += r.expert;
    } else {
      alignment += r.groomers;
    }

    if (terrain === "steeps") alignment += r.expert;
    if (terrain === "groomers") alignment += r.groomers;

    if (luxury === "high") alignment += r.luxury;
    if (nightlife === "high") alignment += r.nightlife;
    if (snowImportance === "high") alignment += r.snow;

    const finalScore =
      (quality * 0.4) +
      (alignment * 0.35) +
      (travelVal * 0.25);

    return { ...r, score: finalScore.toFixed(1) };
  });

  scored.sort((a,b) => b.score - a.score);
  const top5 = scored.slice(0,5);

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<h2>Your Top Matches</h2>";

  top5.forEach(r => {
    resultsDiv.innerHTML += `
      <div class="result-card">
        <h3>${r.name}</h3>
        <p>Match Score: ${r.score}</p>
      </div>
    `;
  });

});
