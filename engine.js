// =====================================================
// ENGINE V7 – Ski Brain Experience Model
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
  return { lat: 42.3601, lon: -71.0589 }; // default Boston
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
// MAIN SKI BRAIN MATCH ENGINE
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

    // -----------------------------
    // Drive Filtering
    // -----------------------------
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

    // -----------------------------
    // Pass Filtering
    // -----------------------------
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
    // EXPERIENCE MODELING
    // =====================================================

    // -----------------------------
    // Density Modifier
    // -----------------------------
    const densityModifier =
      crowdPref === "Low – Avoid Crowds"
        ? (10 - crowd) * 0.6
        : 0;

    // -----------------------------
    // Groomer Experience
    // -----------------------------
    const groomerExperience =
        (groomers * 0.35)
      + (vertical * 0.30)
      + (snow * 0.20)
      + (luxury * 0.10)
      + (densityModifier * 0.05);

    // -----------------------------
    // Steep / Expert Experience
    // -----------------------------
    const steepExperience =
        (expert * 0.40)
      + (vertical * 0.30)
      + (snow * 0.20)
      + (tier === "destination" ? 1 : 0) * 0.10
      + (densityModifier * 0.05);

    // -----------------------------
    // Terrain Selection Logic
    // -----------------------------
    let terrainScore = 0;

    if (terrainPref === "Groomers") {
      terrainScore = groomerExperience * 10;
    }

    if (terrainPref === "Steeps & Expert Terrain") {
      terrainScore = steepExperience * 10;
    }

    // -----------------------------
    // Ability Alignment
    // -----------------------------
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

    // Suppress irrelevant terrain
    if (terrainPref === "Groomers") {
      abilityScore += groomers * 1;
    }

    if (terrainPref === "Steeps & Expert Terrain") {
      abilityScore += expert * 1;
    }

    // -----------------------------
    // Snow Amplification
    // -----------------------------
    let snowScore = 0;

    if (snowImportance === "High") {
      snowScore = snow * 4;
    } else {
      snowScore = snow * 2;
    }

    // Snow matters more for steeps
    if (terrainPref === "Steeps & Expert Terrain") {
      snowScore *= 1.25;
    }

    // -----------------------------
    // Luxury Modeling (Non-Linear)
    // -----------------------------
    let luxuryScore = 0;

    if (luxuryPref === "High") {
      luxuryScore = luxury * luxury * 1.5; // exponential feel
    }

    if (luxuryPref === "Medium") {
      luxuryScore = luxury * 3;
    }

    if (luxuryPref === "Low") {
      luxuryScore = luxury * 1;
    }

    // -----------------------------
    // Fly Bias (No Filtering)
    // -----------------------------
    let flyBias = 0;

    if (travel === "fly") {
      if (tier === "destination") flyBias = 25;
      if (vertical >= 8) flyBias += 10;
    }

    // =====================================================
    // FINAL SCORE
    // =====================================================

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
// Winner Explanation Builder
// =====================================================

function buildWinnerExplanation(winner, user) {

  const reasons = [];

  if (winner.breakdown.terrainScore > winner.breakdown.abilityScore) {
    reasons.push("Terrain profile strongly aligns with your stated preference.");
  }

  if (winner.breakdown.luxuryScore > 50) {
    reasons.push("Luxury experience significantly elevates this resort above competitors.");
  }

  if (winner.breakdown.snowScore > 25) {
    reasons.push("Snow reliability enhances overall skiing quality.");
  }

  if (winner.breakdown.flyBias > 0) {
    reasons.push("Destination scale and vertical make this a strong fly-worthy mountain.");
  }

  if (reasons.length < 3) {
    reasons.push("Strong overall alignment across terrain, ability, and experience factors.");
  }

  return reasons.slice(0, 4);
}
