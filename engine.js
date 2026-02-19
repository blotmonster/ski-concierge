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
// Drive Time → Distance Mapping
// -----------------------------

function getMaxDistance(maxDrive) {
  if (!maxDrive) return 9999;

  if (maxDrive === "Under 2 hours") return 90;
  if (maxDrive === "Under 3 hours") return 140;
  if (maxDrive === "Under 4 hours") return 200;
  if (maxDrive === "Under 5 hours") return 260;
  if (maxDrive === "Under 6 hours") return 320;

  return 9999;
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

    if (user.travel === "drive") {

      const distance = calculateDistance(
        bostonLat,
        bostonLon,
        resort.lat,
        resort.lon
      );

      const maxDistance = getMaxDistance(user.maxDrive);

      if (distance > maxDistance) {
        return; // REMOVE resort completely
      }
    }

    // -------------------------
    // PASS HARD GATING
    // -------------------------

    if (user.pass && user.pass.toLowerCase() !== "any") {
      if (resort.pass !== user.pass) {
        return; // remove if wrong pass
      }
    }

    // -------------------------
    // SCORING
    // -------------------------

    let score = 0;

    // Ability weighting
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

    // Luxury weighting
    if (user.luxury === "Medium") {
      score += resort.luxury;
    }

    if (user.luxury === "High") {
      score += resort.luxury * 2;
    }

    // Fly bonus
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
