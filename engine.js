// =====================================================
// ENGINE V8 – Ski Brain (Balanced Concierge Tone)
// =====================================================

// =====================================================
// Distance Utilities
// =====================================================

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
  return { lat: 42.3601, lon: -71.0589 }; // Default Boston
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
// MAIN MATCH ENGINE – Ski Brain Experience Model
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

    // Drive filtering
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

    // Pass filtering
    if (pass !== "any") {
      if (!resort.pass || resort.pass.toLowerCase() !== pass) return;
    }

    const groomers = resort.groomers || 0;
    const expert = resort.expert || 0;
    const snow = resort.snow || 0;
    const luxury = resort.luxury || 0;
    const vertical = resort.vertical || 0;
    const crowd = resort.crowd || 5;
    const tier = resort.tier || "regional";

    // =====================================================
    // Experience Modeling
    // =====================================================

    const densityBoost =
      crowdPref === "Low – Avoid Crowds"
        ? (10 - crowd) * 0.6
        : 0;

    const groomerExperience =
        (groomers * 0.35)
      + (vertical * 0.30)
      + (snow * 0.20)
      + (luxury * 0.10)
      + (densityBoost * 0.05);

    const steepExperience =
        (expert * 0.40)
      + (vertical * 0.30)
      + (snow * 0.20)
      + (tier === "destination" ? 1 : 0) * 0.10
      + (densityBoost * 0.05);

    let terrainScore = 0;

    if (terrainPref === "Groomers") {
      terrainScore = groomerExperience * 10;
    }

    if (terrainPref === "Steeps & Expert Terrain") {
      terrainScore = steepExperience * 10;
    }

    let abilityScore = 0;

    if (ability === "Beginner") {
      abilityScore = groomers * 3;
    }

    if (ability === "Intermediate") {
      abilityScore = (groomers * 2) + (expert * 1);
    }

    if (ability === "Advanced" || ability === "Expert") {
      abilityScore = expert * 4;
    }

    let snowScore =
      snowImportance === "High"
        ? snow * 4
        : snow * 2;

    if (terrainPref === "Steeps & Expert Terrain") {
      snowScore *= 1.25;
    }

    let luxuryScore = 0;

    if (luxuryPref === "High") {
      luxuryScore = luxury * luxury * 1.5;
    } else if (luxuryPref === "Medium") {
      luxuryScore = luxury * 3;
    } else {
      luxuryScore = luxury;
    }

    let flyBias = 0;

    if (travel === "fly") {
      if (tier === "destination") flyBias += 25;
      if (vertical >= 8) flyBias += 10;
    }

    const totalScore =
        terrainScore
      + abilityScore
      + snowScore
      + luxuryScore
      + flyBias;

    results.push({
      ...resort,
      score: totalScore,
      breakdown: {
        terrainScore,
        abilityScore,
        snowScore,
        luxuryScore,
        flyBias
      }
    });

  });

  return results.sort((a, b) => b.score - a.score);
}

// =====================================================
// Explanation Builder – Balanced Tone
// =====================================================

function buildWinnerExplanation(winner, user) {

  const reasons = [];

  if (user.terrain === "Groomers") {
    reasons.push(
      "Long, sustained groomed terrain supports a strong carving-focused experience."
    );
  }

  if (user.terrain === "Steeps & Expert Terrain") {
    reasons.push(
      "Challenging expert terrain and vertical scale align with your advanced skiing goals."
    );
  }

  if (user.luxury === "High") {
    reasons.push(
      "Service standards, lodging quality, and overall polish align strongly with your high-luxury preference."
    );
  }

  if (user.crowd === "Low – Avoid Crowds") {
    reasons.push(
      "Lower skier density supports a smoother and more refined on-mountain flow."
    );
  }

  if (user.travel === "fly") {
    reasons.push(
      "Destination-scale vertical and infrastructure justify traveling for this experience."
    );
  }

  if (reasons.length < 4) {
    reasons.push(
      "Strong overall alignment across terrain, comfort, and mountain scale."
    );
  }

  return reasons.slice(0, 5);
}
