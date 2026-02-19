if (user.pass.toLowerCase() !== "any") {
// -----------------------------
// Distance Calculation
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

    // -------------------------
    // DRIVE HARD GATING
    // -------------------------
    if (user.travel === "Drive") {

      const distance = calculateDistance(
        bostonLat,
        bostonLon,
        resort.lat,
        resort.lon
      );

      // 250 miles ≈ ~4 hours
      if (distance > 250) {
        return; // completely remove from consideration
      }
    }

    let score = 0;

    // -------------------------
    // Ability Scoring
    // -------------------------

    if (user.ability === "Beginner" && resort.terrain === "beginner") {
      score += 25;
    }

    if (user.ability === "Intermediate" && resort.terrain === "mixed") {
      score += 25;
    }

    if (
      (user.ability === "Advanced" || user.ability === "Expert") &&
      (resort.terrain === "advanced" || resort.terrain === "expert")
    ) {
      score += 30;
    }

    // -------------------------
    // Pass Gating
    // -------------------------

    if (user.pass.toLowerCase() !== "any") {
      if (resort.pass === user.pass) {
        score += 20;
      } else {
        return; // hard remove if wrong pass
      }
    }

    // -------------------------
    // Snow Reliability
    // -------------------------

    score += resort.snow * 2;

    // -------------------------
    // Crowd Preference
    // -------------------------

    if (user.crowd === "Low – Avoid Crowds") {
      score += (10 - resort.crowd) * 2;
    }

    if (user.crowd === "Medium") {
      score += 5;
    }

    if (user.crowd === "High – Don’t Care") {
      score += resort.crowd;
    }

    // -------------------------
    // Luxury
    // -------------------------

    if (user.luxury === "Medium") {
      score += resort.luxury;
    }

    if (user.luxury === "High") {
      score += resort.luxury * 2;
    }

    // -------------------------
    // Fly Bonus
    // -------------------------

    if (user.travel === "Fly") {
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
