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
// Drive Time → Distance Mapping
// -----------------------------

function getMaxDistance(driveTime) {
  if (!driveTime) return 9999;

  if (driveTime === "2") return 90;
  if (driveTime === "3") return 140;
  if (driveTime === "4") return 200;
  if (driveTime === "5") return 260;
  if (driveTime === "6") return 320;

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

      const maxDistance = getMaxDistance(user.driveTime);

      if (distance > maxDistance) return;
    }

    // -------------------------
    // PASS HARD GATING
    // -------------------------

    if (user.pass && user.pass.toLowerCase() !== "any") {
      if (!resort.pass.includes(user.pass)) return;
    }

    let score = 0;

    // -------------------------
    // Ability Intelligence
    // -------------------------

    if (user.ability === "Beginner") {
      score += resort.groomer * 3;
      score += (10 - resort.expert);
    }

    if (user.ability === "Intermediate") {
      score += resort.terrainMix * 2;
      score += resort.groomer;
    }

    if (user.ability === "Advanced") {
      score += resort.expert * 2;
      score += resort.terrainMix;
    }

    if (user.ability === "Expert") {
      score += resort.expert * 3;
      score += resort.vertical;
    }

    // -------------------------
    // Snow Weighting
    // -------------------------

    if (user.snow === "High") score += resort.snow * 3;
    else if (user.snow === "Medium") score += resort.snow * 2;
    else score += resort.snow;

    // -------------------------
    // Crowd Preference
    // -------------------------

    if (user.crowd === "Low – Avoid Crowds") {
      score += (10 - resort.crowd) * 2;
    } else if (user.crowd === "High – Don’t Care") {
      score += resort.crowd;
    }

    // -------------------------
    // Luxury
    // -------------------------

    if (user.luxury === "High") score += resort.luxury * 3;
    else if (user.luxury === "Medium") score += resort.luxury * 2;

    // -------------------------
    // Fly Bias (Destination Logic)
    // -------------------------

    if (user.travel === "fly") {
      score += resort.tier * 3;
      score += resort.vertical * 2;
    }

    results.push({
      name: resort.name,
      state: resort.state,
      region: resort.region,
      score: score
    });

  });

  return results.sort((a, b) => b.score - a.score);
}
