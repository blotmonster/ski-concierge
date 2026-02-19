// =============================================
// Utility Functions
// =============================================

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

// =============================================
// ZIP to Lat/Lon (Temporary – Boston Default)
// =============================================

function getLatLonFromZip(zip) {
  // For now, hardcoded Boston area
  return {
    lat: 42.3601,
    lon: -71.0589
  };
}

// =============================================
// Main Matching Engine
// =============================================

function calculateMatches(user) {

  if (!window.resorts || resorts.length === 0) {
    console.error("Resort dataset not loaded.");
    return [];
  }

  let results = [];

  let origin = getLatLonFromZip(user.zip);

  resorts.forEach(resort => {

    let score = 0;

    // =========================================
    // DRIVE HARD FILTER
    // =========================================

    if (user.travel === "drive") {

      const distance = calculateDistance(
        origin.lat,
        origin.lon,
        resort.lat,
        resort.lon
      );

      const driveHours = distance / 50; // assume 50mph avg

      if (driveHours > user.maxDrive) {
        return; // remove resort
      }
    }

    // =========================================
    // ABILITY
    // =========================================

    if (user.ability === "Beginner" && resort.terrain === "beginner") score += 25;
    if (user.ability === "Intermediate" && resort.terrain === "mixed") score += 25;
    if (
      (user.ability === "Advanced" || user.ability === "Expert") &&
      (resort.terrain === "advanced" || resort.terrain === "expert")
    ) score += 30;

    // =========================================
    // PASS FILTER
    // =========================================

    if (user.pass !== "Any") {
      if (resort.pass !== user.pass) {
        return;
      } else {
        score += 20;
      }
    }

    // =========================================
    // SNOW
    // =========================================

    score += resort.snow * 2;

    // =========================================
    // CROWD
    // =========================================

    if (user.crowd === "Low – Avoid Crowds") {
      score += (10 - resort.crowd) * 2;
    }

    if (user.crowd === "Medium") {
      score += 5;
    }

    if (user.crowd === "High – Don’t Care") {
      score += resort.crowd;
    }

    // =========================================
    // LUXURY
    // =========================================

    if (user.luxury === "Medium") score += resort.luxury;
    if (user.luxury === "High") score += resort.luxury * 2;

    // =========================================
    // FLY BONUS
    // =========================================

    if (user.travel === "fly") {
      score += resort.snow * 1.5;
      score += resort.luxury;
    }

    results.push({
      name: resort.name,
      state: resort.state,
      score: score
    });

  });

  return results.sort((a, b) => b.score - a.score);
}
