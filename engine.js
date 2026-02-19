// =====================================================
// ENGINE V2 – Clean Weighted Ski Matching
// =====================================================

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
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// -----------------------------
// ZIP → Lat/Lon (Temp Boston)
// -----------------------------

function getZipLatLon(zip) {
  return {
    lat: 42.3601,
    lon: -71.0589
  };
}

// -----------------------------
// Drive Time → Realistic Miles
// -----------------------------

function getMaxMiles(maxDrive) {
  if (!maxDrive) return 200;

  const v = maxDrive.toLowerCase();

  if (v.includes("2")) return 100;
  if (v.includes("3")) return 150;
  if (v.includes("4")) return 200;
  if (v.includes("5")) return 250;
  if (v.includes("6")) return 300;

  return 200;
}

// =====================================================
// MAIN MATCH ENGINE
// =====================================================

function calculateMatches(user) {

  if (!window.resorts || !Array.isArray(resorts)) {
    console.error("Resorts dataset missing.");
    return [];
  }

  const travel = (user.travel || "").toLowerCase();
  const ability = user.ability;
  const terrainPref = user.terrain;
  const crowd = user.crowd;
  const luxury = user.luxury;
  const snowImportance = user.snowImportance;
  const pass = (user.pass || "").toLowerCase();

  const origin = getZipLatLon(user.zip);
  const maxMiles = getMaxMiles(user.maxDrive);

  let results = [];

  resorts.forEach(resort => {

    // -------------------------
    // DRIVE HARD GATING
    // -------------------------

    if (travel === "drive") {
      const straight = calculateDistance(
        origin.lat,
        origin.lon,
        resort.lat,
        resort.lon
      );

      const driveMiles = straight * 1.4;

      if (driveMiles > maxMiles) return;
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
    // Ability Weight
    // -------------------------

    if (ability === "Beginner" && resort.terrain === "beginner") score += 40;
    if (ability === "Intermediate" && resort.terrain === "mixed") score += 40;
    if ((ability === "Advanced" || ability === "Expert") &&
        (resort.terrain === "advanced" || resort.terrain === "expert")) {
      score += 50;
    }

    // -------------------------
    // Terrain Preference Weight
    // -------------------------

    if (terrainPref === "Groomers" && resort.groomerFocus) score += 25;
    if (terrainPref === "Steeps & Expert Terrain" && resort.expertFocus) score += 25;

    // -------------------------
    // Snow Reliability
    // -------------------------

    const snowWeight = snowImportance === "High" ? 4 : 2;
    score += (resort.snow || 0) * snowWeight;

    // -------------------------
    // Crowd Matching
    // -------------------------

    if (crowd === "Low – Avoid Crowds") {
      score += (10 - (resort.crowd || 5)) * 3;
    }

    if (crowd === "Medium") {
      score += 5;
    }

    if (crowd === "High – Don’t Care") {
      score += (resort.crowd || 5);
    }

    // -------------------------
    // Luxury
    // -------------------------

    if (luxury === "High") score += (resort.luxury || 0) * 3;
    if (luxury === "Medium") score += (resort.luxury || 0) * 1.5;

    // -------------------------
    // Fly Destination Bias
    // -------------------------

    if (travel === "fly") {

      if (resort.tier === "destination") score += 60;
      if (resort.tier === "regional") score += 20;

      score += (resort.vertical || 0) / 50;
      score += (resort.snow || 0) * 2;
    }

    results.push({
      name: resort.name,
      state: resort.state,
      score: score
    });

  });

  return results.sort((a, b) => b.score - a.score);
}
