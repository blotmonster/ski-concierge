// -----------------------------
// Distance Helpers
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
// Main Matching Engine
// -----------------------------

function calculateMatches(user) {

  const bostonLat = 42.3601;
  const bostonLon = -71.0589;

  let results = [];

  resorts.forEach(resort => {

    // Normalize values
    const travel = user.travel ? user.travel.toLowerCase() : "";
    const pass = user.pass ? user.pass.toLowerCase() : "any";

    // -------------------------
    // DRIVE HARD GATING
    // -------------------------
    if (travel === "drive") {

      const distance = calculateDistance(
        bostonLat,
        bostonLon,
        resort.lat,
        resort.lon
      );

      // 250 miles ≈ ~4 hours
      if (distance > 250) {
        return; // remove completely
      }
    }

    // -------------------------
    // PASS HARD GATING
    // -------------------------
    if (pass !== "any") {
      if (!resort.pass || resort.pass.toLowerCase() !== pass) {
        return; // remove completely
      }
    }

    let score = 0;

    // -------------------------
    // Ability Weighting
    // -------------------------

    if (user.ability === "Beginner" && resort.terrain === "beginner") {
      score += 30;
    }

    if (user.ability === "Intermediate" && resort.terrain === "mixed") {
      score += 30;
    }

    if (
      (user.ability === "Advanced" || user.ability === "Expert") &&
      (resort.terrain === "advanced" || resort.terrain === "expert")
    ) {
      score += 35;
    }

    // -------------------------
    // Snow Reliability
    // -------------------------

    if (resort.snow) {
      score += resort.snow * 2;
    }

    // -------------------------
    // Crowd Preference
    // -------------------------

    if (user.crowd === "Low – Avoid Crowds" && resort.crowd) {
      score += (10 - resort.crowd) * 2;
    }

    if (user.crowd === "Medium") {
      score += 5;
    }

    if (user.crowd === "High – Don’t Care" && resort.crowd) {
      score += resort.crowd;
    }

    // -------------------------
    // Luxury Weighting
    // -------------------------

    if (user.luxury === "Medium" && resort.luxury) {
      score += resort.luxury;
    }

    if (user.luxury === "High" && resort.luxury) {
      score += resort.luxury * 2;
    }

    // -------------------------
    // Fly Bonus (destination bias)
    // -------------------------

    if (travel === "fly") {
      if (resort.snow) score += resort.snow * 1.5;
      if (resort.luxury) score += resort.luxury;
    }

    results.push({
      name: resort.name,
      state: resort.state,
      score: score
    });

  });

  // Sort highest score first
  return results.sort((a, b) => b.score - a.score);
}
