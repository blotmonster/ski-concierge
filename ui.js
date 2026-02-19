// =====================================================
// ZIP CODE → LAT/LON LOOKUP (Basic for Now)
// =====================================================

function getLatLonFromZip(zip) {

  // For now we hardcode common Northeast ZIPs
  if (zip === "02482") {
    return { lat: 42.3601, lon: -71.0589 }; // Boston / Wellesley
  }

  // Default fallback
  return { lat: 42.3601, lon: -71.0589 };
}

// =====================================================
// MAIN RUN FUNCTION
// =====================================================

function runMatch() {

  const travel = document.getElementById("travel").value;
  const ability = document.getElementById("ability").value;
  const terrain = document.getElementById("terrain").value;
  const crowd = document.getElementById("crowd").value;
  const luxury = document.getElementById("luxury").value;
  const snowImportance = document.getElementById("snow").value;
  const pass = document.getElementById("pass").value;

  const zip = document.getElementById("zip").value;
  const maxDrive = document.getElementById("maxDrive").value;

  let originLat = null;
  let originLon = null;

  if (travel.toLowerCase() === "drive") {
    const coords = getLatLonFromZip(zip);
    originLat = coords.lat;
    originLon = coords.lon;
  }

  const user = {
    travel,
    ability,
    terrain,
    crowd,
    luxury,
    snowImportance,
    pass,
    maxDrive,
    originLat,
    originLon
  };

  const results = calculateMatches(user);

  renderResults(results);
}

// =====================================================
// RENDER RESULTS
// =====================================================

function renderResults(results) {

  const container = document.getElementById("results");
  container.innerHTML = "";

  if (!results.length) {
    container.innerHTML = "<p>No resorts match your criteria.</p>";
    return;
  }

  const top5 = results.slice(0, 5);

  top5.forEach((resort, index) => {

    const div = document.createElement("div");
    div.className = "result";

    div.innerHTML = `
      <h3>#${index + 1} ${resort.name} (${resort.state})</h3>
      <p>Match Score: ${resort.score}</p>
    `;

    container.appendChild(div);
  });
}
