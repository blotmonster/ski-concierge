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
    if (user.travelType === "Drive") {

      const distance = calculateDistance(
        bostonLat,
        bostonLon,
        resort.lat,
        resort.lon
      );

      // Exclude resorts beyond ~4 hour drive (~250 miles)
      if (distance > 250) {
        return; // completely remove from consideration
      }

    }

    // -------------------------
    // SCORING
    // -------------------------

    let score = 0;

    // Ability weighting
    if (user.ability === "Beginner" && resort.terrain === "beginner") {
      score += 20;
    }

    if (user.ability === "Intermediate" && resort.terrain === "mixed") {
      score += 20;
    }

    if (
      (user.ability === "Advanced" || user.ability === "Expert") &&
      (resort.terrain === "advanced" || resort.terrain === "expert")
    ) {
      score += 25;
    }

    // Pass match
    if (user.pass !== "Any") {
      if (resort.pass === user.pass) {
        score += 20;
      } else {
        score -= 100; // strong penalty
      }
    }

    // Snow reliability
    score += resort.snow * 2;

    // Crowd preference
    if (user.crowd === "Low – Avoid Crowds") {
      score += (10 - resort.crowd) * 2;
    }

    if (user.crowd === "Medium") {
      score += 5;
    }

    if (user.crowd === "High – Don’t Care") {
      score += resort.crowd;
    }

    // Luxury preference
    if (user.luxury === "Medium") {
      score += resort.luxury;
    }

    if (user.luxury === "High") {
      score += resort.luxury * 2;
    }

    // Travel type bonus
    if (user.travelType === "Fly") {
      score += resort.snow * 1.5;
      score += resort.luxury;
    }

    results.push({
      name: resort.name,
      state: resort.state,
      score: score
    });

  });

  // Sort descending
  return results.sort((a, b) => b.score - a.score);
}
