// =====================================================
// ENGINE V4 – Concierge Intelligence Layer
// =====================================================

// -----------------------------
// Distance Utilities
// -----------------------------

function toRad(value) {
  return value * Math.PI / 180;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8;
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

function getZipLatLon(zip) {
  return { lat: 42.3601, lon: -71.0589 };
}

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

  const travel = (user.travel || "").toLowerCase();
  const ability = user.ability;
  const terrainPref = user.terrain;
  const crowdPref = user.crowd;
  const luxuryPref = user.luxury;
  const snowImportance = user.snowImportance;
  const pass = (user.pass || "").toLowerCase();

  const origin = getZipLatLon(user.zip);
  const maxMiles = getMaxMiles(user.maxDrive);

  let results = [];

  resorts.forEach(resort => {

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

    if (pass !== "any") {
      if (!resort.pass || resort.pass.toLowerCase() !== pass) return;
    }

    let breakdown = {
      ability: 0,
      terrain: 0,
      snow: 0,
      crowd: 0,
      luxury: 0,
      tier: 0
    };

    // Ability
    if (ability === "Beginner") {
      breakdown.ability = (resort.groomers || 0) * 4;
    }

    if (ability === "Intermediate") {
      breakdown.ability =
        (resort.groomers || 0) * 2 + (resort.expert || 0) * 2;
    }

    if (ability === "Advanced" || ability === "Expert") {
      breakdown.ability = (resort.expert || 0) * 5;
    }

    // Terrain Preference
    if (terrainPref === "Groomers") {
      breakdown.terrain = (resort.groomers || 0) * 3;
    }

    if (terrainPref === "Steeps & Expert Terrain") {
      breakdown.terrain = (resort.expert || 0) * 4;
    }

    // Snow
    const snowWeight = snowImportance === "High" ? 4 : 2;
    breakdown.snow = (resort.snow || 0) * snowWeight;

    // Crowd
    if (crowdPref === "Low – Avoid Crowds") {
      breakdown.crowd = (10 - (resort.crowd || 5)) * 3;
    }

    if (crowdPref === "Medium") {
      breakdown.crowd = 5;
    }

    if (crowdPref === "High – Don’t Care") {
      breakdown.crowd = resort.crowd || 0;
    }

    // Luxury
    if (luxuryPref === "High") {
      breakdown.luxury = (resort.luxury || 0) * 3;
    }

    if (luxuryPref === "Medium") {
      breakdown.luxury = (resort.luxury || 0) * 1.5;
    }

    // Fly Tier Bias
    if (travel === "fly") {
      if (resort.tier === "destination") breakdown.tier = 60;
      if (resort.tier === "regional") breakdown.tier = 20;
    }

    const total =
      breakdown.ability +
      breakdown.terrain +
      breakdown.snow +
      breakdown.crowd +
      breakdown.luxury +
      breakdown.tier;

    results.push({
      ...resort,
      score: total,
      breakdown
    });

  });

  return results.sort((a, b) => b.score - a.score);
}

// =====================================================
// Winner Explanation Builder
// =====================================================

function buildWinnerExplanation(winner, user) {

  let reasons = [];

  if (winner.breakdown.ability > 40) {
    reasons.push("Exceptional terrain match for your ability level.");
  }

  if (winner.breakdown.snow > 20) {
    reasons.push("Strong snowfall aligns with your snow quality priority.");
  }

  if (winner.breakdown.crowd > 10) {
    reasons.push("Lower crowd factor enhances your experience.");
  }

  if (winner.breakdown.luxury > 10) {
    reasons.push("High-end lodging and amenities elevate the trip.");
  }

  if (winner.breakdown.tier > 0) {
    reasons.push("Premier destination mountain experience.");
  }

  return reasons.slice(0, 4);
}
