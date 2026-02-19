// =====================================================
// Ski Concierge Matching Engine
// =====================================================

// -----------------------------------------------------
// Distance Helpers (Haversine Formula)
// -----------------------------------------------------

function toRad(value) {
  return value * Math.PI / 180;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // Earth radius in miles
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

// -----------------------------------------------------
// Main Matching Engine
// -----------------------------------------------------

function calculateMatches(user) {

  let results = [];

  resorts.forEach(resort => {

    let score = 0;

    const travelType = user.travel?.toLowerCase();
    const passChoice = user.pass?.toLowerCase();

    // =====================================================
    // DRIVE HARD GATING (TIME BASED)
    // =====================================================

    if (travelType === "drive") {

      const distance = calculateDistance(
        user.originLat,
        user.originLon,
        resort.lat,
        resort.lon
      );

      // Realistic Northeast mountain driving average
      const averageSpeed = 48; // mph

      const driveTimeHours = distance / averageSpeed;

      let maxHours = 10; // default

      if (user.maxDrive === "2") maxHours = 2;
      if (user.maxDrive === "3") maxHours = 3;
      if (user.maxDrive === "4") maxHours = 4;
      if (user.maxDrive === "5") maxHours = 5;
      if (user.maxDrive === "6") maxHours = 6;

      if (driveTimeHours > maxHours) {
        return; // remove from consideration
      }
    }

    // =====================================================
    // PASS HARD GATING
    // =====================================================

    if (passChoice && passChoice !== "any") {
      if (!resort.pass || resort.pass.toLowerCase() !== passChoice) {
        return; // remove if pass mismatch
      }
    }

    // =====================================================
    // ABILITY WEIGHTING
    // =====================================================

    const ability = user.ability?.toLowerCase();

    if (ability === "beginner" && resort.terrain === "beginner") {
      score += 25;
    }

    if (ability === "intermediate" && resort.terrain === "mixed") {
      score += 25;
    }

    if (
      (ability === "advanced" || ability === "expert") &&
      (resort.terrain === "advanced" || resort.terrain === "expert")
    ) {
      score += 30;
    }

    // =====================================================
    // SNOW RELIABILITY
    // =====================================================

    if (user.snowImportance === "high") {
      score += resort.snow * 3;
    } else if (user.snowImportance === "medium") {
      score += resort.snow * 2;
    } else {
      score += resort.snow;
    }

    // =====================================================
    // CROWD PREFERENCE
    // =====================================================

    if (user.crowd === "Low – Avoid Crowds") {
      score += (10 - resort.crowd) * 2;
    }

    if (user.crowd === "Medium") {
      score += 5;
    }

    if (user.crowd === "High – Don’t Care") {
      score += resort.crowd;
    }

    // =====================================================
    // LUXURY WEIGHTING
    // =====================================================

    if (user.luxury === "High") {
      score += resort.luxury * 2;
    }

    if (user.luxury === "Medium") {
      score += resort.luxury;
    }

    // =====================================================
    // FLY BONUS LOGIC
    // =====================================================

    if (travelType === "fly") {

      // Big mountain / destination boost
      score += resort.snow * 1.5;
      score += resort.luxury;

      // Slight regional boost for major western states
      const westernStates = [
        "CO", "UT", "WY", "ID", "MT", "CA", "WA", "OR", "BC", "AB"
      ];

      if (westernStates.includes(resort.state)) {
        score += 10;
      }
    }

    // =====================================================
    // Push Result
    // =====================================================

    results.push({
      ...resort,
      score: Number(score.toFixed(1))
    });

  });

  // Sort descending
  return results.sort((a, b) => b.score - a.score);
}
