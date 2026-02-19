// -----------------------------
// Distance Utilities
// -----------------------------

function toRad(value) {
  return value * Math.PI / 180;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// -----------------------------
// ZIP → Lat/Lon (Temp: Boston Default)
// -----------------------------

function getZipLatLon(zip) {
  // For now we assume Boston area.
  // Later we’ll add real geocoding.
  return {
    lat: 42.3601,
    lon: -71.0589
  };
}

// -----------------------------
// Convert Drive Time to Miles
// -----------------------------

function getMaxMiles(maxDrive) {
  if (!maxDrive) return 250;

  const value = maxDrive.toLowerCase();

  if (value.includes("2")) return 120;
  if (value.includes("3")) return 180;
  if (value.includes("4")) return 240;
  if (value.includes("5")) return 300;
  if (value.includes("6")) return 360;

  return 250;
}

// -----------------------------
// MAIN MATCH ENGINE
// -----------------------------

function calculateMatches(user) {

  const travel = (user.travel || "").toLowerCase();
  const ability = user.ability;
  const pass = (user.pass || "").toLowerCase();
  const crowd = user.crowd;
  const luxury = user.luxury;
  const snowImportance = user.snowImportance;

  const { lat, lon } = getZipLatLon(user.zip);
  const maxMiles = getMaxMiles(user.maxDrive);

  let results = [];

  resorts.forEach(resort => {

    // -------------------------
    // HARD DRIVE GATING
    // -------------------------

    if (travel === "drive") {

      const distance = calculateDistance(
        lat,
        lon,
        resort.lat,
        resort.lon
      );

      if (distance > maxMiles) {
        return; // completely remove resort
      }
    }

    // -------------------------
    // PASS HARD GATING
    // -------------------------

    if (pass !== "any") {
      if (!resort.pass || resort.pass.toLowerCase() !== pass) {
        return;
      }
    }

    let score = 0;

    // -------------------------
    // Ability
    // -------------------------

    if (ability === "Beginner" && resort.terrain === "beginner") {
      score += 30;
    }

    if (ability === "Intermediate" && resort.terrain === "mixed") {
      score += 30;
    }

    if (
      (ability === "Advanced" || ability === "Expert") &&
      (resort.terrain === "advanced" || resort.terrain === "expert")
    ) {
      score += 40;
    }

    // -------------------------
    // Snow Reliability
    // -------------------------

    if (snowImportance === "High") {
      score += resort.snow * 3;
    } else {
      score += resort.snow * 2;
    }

    // -------------------------
    // Crowd
    // -------------------------

    if (crowd === "Low – Avoid Crowds") {
      score += (10 - resort.crowd) * 2;
    }

    if (crowd === "Medium") {
      score += 5;
    }

    if (crowd === "High – Don’t Care") {
      score += resort.crowd;
    }

    // -------------------------
    // Luxury
    // -------------------------

    if (luxury === "Medium") {
      score += resort.luxury;
    }

    if (luxury === "High") {
      score += resort.luxury * 2;
    }

    // -------------------------
    // Fly Bias
    // -------------------------

    if (travel === "fly") {
      score += resort.vertical ? resort.vertical / 100 : 0;
      score += resort.snow * 2;
    }

    results.push({
      name: resort.name,
      state: resort.state,
      score: score
    });

  });

  return results.sort((a, b) => b.score - a.score);
}
