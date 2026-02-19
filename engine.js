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

    if (user.travel.toLowerCase() === "drive") {

      const distance = calculateDistance(
        bostonLat,
        bostonLon,
        resort.lat,
        resort.lon
      );

      // Convert drive time selection to miles
      const driveMap = {
        "2": 120,
        "3": 180,
        "4": 240,
        "5": 300,
        "6": 360
      };

      const maxMiles = driveMap[user.driveTime];

      if (distance > maxMiles) {
        return; // completely remove resort
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
      if (resort.pass !== user.pass) {
        return; // hard remove if wrong pass
      }
      score += 20;
    }

    // -------------------------
    // Snow Reliability
    // -------------------------

    if (user.snow === "High") {
      score += resort.snow * 3;
    } else if (user.snow === "Medium") {
      score += resort.snow * 2;
    } else {
      score += resort.snow;
    }

    // -------------------------
    // Crowd Preference
    // -------------------------

    if (user.crowd === "Low – Avoid Crowds") {
      score += (10 - resort.crowd) * 2;
    } else if (user.crowd === "High – Don’t Care") {
      score += resort.crowd;
    } else {
      score += 5;
    }

    // -------------------------
    // Luxury
    // -------------------------

    if (user.luxury === "High") {
      score += resort.luxury * 2;
    } else if (user.luxury === "Medium") {
      score += resort.luxury;
    }

    // -------------------------
    // Fly Bonus
    // -------------------------

    if (user.travel.toLowerCase() === "fly") {
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
