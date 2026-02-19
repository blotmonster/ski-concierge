// engine.js

// -----------------------------
// Offline ZIP -> lat/lon (starter set)
// If zip not found, we fall back to Boston.
// Add more zips anytime.
// -----------------------------
const ZIP_LOOKUP = {
  "02482": { lat: 42.2965, lon: -71.2926 }, // Wellesley
  "02108": { lat: 42.3573, lon: -71.0636 }, // Boston
  "10001": { lat: 40.7506, lon: -73.9972 }, // NYC
  "94103": { lat: 37.7725, lon: -122.4091 }, // SF
  "80202": { lat: 39.7525, lon: -104.9995 }, // Denver
  "98101": { lat: 47.6101, lon: -122.3364 }, // Seattle
  "V6B1A1": { lat: 49.2827, lon: -123.1207 } // Vancouver (rough)
};

function getOriginFromZip(zipRaw) {
  const zip = (zipRaw || "").toString().trim().toUpperCase();
  if (ZIP_LOOKUP[zip]) return ZIP_LOOKUP[zip];

  // If user types only 5 digits and it’s not in our lookup, fall back to Boston for now.
  // (Static app: we avoid live geocoding.)
  return { lat: 42.3601, lon: -71.0589 }; // Boston fallback
}

// -----------------------------
// Distance Calculation (Haversine)
// -----------------------------
function toRad(v) { return v * Math.PI / 180; }

function milesBetween(lat1, lon1, lat2, lon2) {
  const R = 3958.8;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// -----------------------------
// Helpers
// -----------------------------
function norm10(x) {
  // clamp to [0..10]
  const v = Number(x);
  if (Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(10, v));
}

function lc(x) { return (x || "").toString().trim().toLowerCase(); }

function driveHoursToMiles(hours) {
  // conservative average speed to avoid “2 hours includes Killington” mistakes
  // 50 miles/hr is a better gating proxy in the Northeast.
  const h = Number(hours);
  if (Number.isNaN(h) || h <= 0) return 200;
  return h * 50;
}

// -----------------------------
// Main Matching Engine
// -----------------------------
function calculateMatches(user) {
  if (!window.resorts || !Array.isArray(window.resorts)) {
    throw new Error("resorts dataset is missing. Make sure data.js loads before engine.js");
  }

  const travel = lc(user.travel);     // "drive" | "fly"
  const pass = lc(user.pass);         // "any" | "ikon" | "epic" | "indy" | "none"
  const ability = lc(user.ability);   // beginner/intermediate/advanced/expert
  const terrainPref = lc(user.terrain);
  const crowdPref = lc(user.crowd);
  const luxuryPref = lc(user.luxury);
  const snowPref = lc(user.snow);

  // drive config
  const origin = getOriginFromZip(user.zip);
  const maxDriveHours = Number(user.maxDriveHours || 2);
  const maxMiles = driveHoursToMiles(maxDriveHours);

  const results = [];

  for (const r of window.resorts) {
    // --- HARD GATING: Travel ---
    if (travel === "drive") {
      const d = milesBetween(origin.lat, origin.lon, r.lat, r.lon);
      if (d > maxMiles) continue; // hard remove
    }

    // --- HARD GATING: Pass (optional but strict) ---
    // If user chooses a specific pass, only include that pass.
    // NOTE: "none" means "no major pass / independent".
    if (pass !== "any") {
      if (lc(r.pass) !== pass) continue;
    }

    // -----------------------------
    // Weighted Scoring Model
    // -----------------------------
    // Base weights (tuneable)
    const W = {
      tier: 0.9,        // overall quality / credibility bias
      snow: 1.4,        // snow matters a lot (esp for fly)
      expert: 1.0,
      groomers: 1.0,
      vertical: 0.8,
      crowd: 0.8,
      luxury: 0.9,
      nightlife: 0.4
    };

    // Travel adjustments
    // For fly: snow + expert a bit more important.
    // For drive: crowd and groomers often matter more.
    if (travel === "fly") {
      W.snow += 0.5;
      W.expert += 0.3;
      W.tier += 0.2;
      W.luxury += 0.2;
    } else {
      W.crowd += 0.2;
      W.groomers += 0.2;
    }

    // Build sub-scores
    const tierScore = norm10(r.tier);
    const snowScore = norm10(r.snow);
    const expertScore = norm10(r.expert);
    const groomerScore = norm10(r.groomers);
    const verticalScore = norm10(r.vertical);
    const crowdScore = norm10(r.crowd);
    const luxuryScore = norm10(r.luxury);
    const nightlifeScore = norm10(r.nightlife);

    // Preference transforms
    let abilityFit = 0;
    if (ability === "beginner") abilityFit = groomerScore;
    else if (ability === "intermediate") abilityFit = (groomerScore * 0.6 + verticalScore * 0.4);
    else if (ability === "advanced") abilityFit = (expertScore * 0.7 + verticalScore * 0.3);
    else if (ability === "expert") abilityFit = (expertScore * 0.85 + verticalScore * 0.15);
    else abilityFit = (expertScore + groomerScore + verticalScore) / 3;

    let terrainFit = 0;
    if (terrainPref.includes("groom")) terrainFit = groomerScore;
    else if (terrainPref.includes("mixed")) terrainFit = (groomerScore + expertScore) / 2;
    else if (terrainPref.includes("steep") || terrainPref.includes("expert")) terrainFit = expertScore;
    else terrainFit = (groomerScore + expertScore) / 2;

    let crowdFit = 0;
    // user wants low crowds -> reward low crowd score (inverse)
    if (crowdPref.includes("avoid") || crowdPref.includes("low")) crowdFit = (10 - crowdScore);
    else if (crowdPref.includes("medium")) crowdFit = 5;
    else crowdFit = crowdScore;

    let luxuryFit = 0;
    if (luxuryPref.includes("low")) luxuryFit = 3;
    else if (luxuryPref.includes("medium")) luxuryFit = luxuryScore;
    else if (luxuryPref.includes("high")) luxuryFit = luxuryScore * 1.2;
    else luxuryFit = luxuryScore;

    let snowFit = 0;
    if (snowPref.includes("low")) snowFit = 3;
    else if (snowPref.includes("medium")) snowFit = snowScore;
    else if (snowPref.includes("high")) snowFit = snowScore * 1.2;
    else snowFit = snowScore;

    // Total weighted score (0..~100-ish)
    const components = {
      tier: tierScore * W.tier,
      snow: snowFit * W.snow,
      ability: abilityFit * 1.2,
      terrain: terrainFit * 1.0,
      vertical: verticalScore * W.vertical,
      crowd: crowdFit * W.crowd,
      luxury: luxuryFit * W.luxury,
      nightlife: nightlifeScore * W.nightlife
    };

    // Sum
    let total = 0;
    for (const k of Object.keys(components)) total += components[k];

    // Small realism nudge:
    // If resort is "None" pass and user chose "Any", allow but keep a slight penalty
    // so big pass-connected destinations float up.
    if (pass === "any" && lc(r.pass) === "none") total -= 1.5;

    // Extra drive penalty for extremely far drive within gate (push nearer options higher)
    if (travel === "drive") {
      const d = milesBetween(origin.lat, origin.lon, r.lat, r.lon);
      const pct = Math.min(1, d / maxMiles);
      total -= pct * 6.0; // up to -6 at edge of range
      components.driveDistancePenalty = -pct * 6.0;
    }

    // Hero explanation: pick top drivers
    const drivers = Object.entries(components)
      .filter(([k]) => k !== "driveDistancePenalty")
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([k]) => k);

    const explanation = buildExplanation(drivers, { travel, pass, ability });

    results.push({
      name: r.name,
      state: r.state,
      country: r.country,
      region: r.region,
      pass: r.pass,
      hero: r.hero,
      score: Math.round(total * 10) / 10,
      explanation
    });
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

function buildExplanation(drivers, ctx) {
  const parts = [];

  if (drivers.includes("snow")) parts.push("excellent snow reliability");
  if (drivers.includes("ability")) {
    if (ctx.ability === "beginner") parts.push("beginner-friendly terrain mix");
    else if (ctx.ability === "intermediate") parts.push("strong intermediate progression terrain");
    else parts.push("strong advanced/expert terrain");
  }
  if (drivers.includes("terrain")) parts.push("matches your terrain preference");
  if (drivers.includes("tier")) parts.push("high overall resort quality");
  if (drivers.includes("luxury")) parts.push("solid village / comfort factor");
  if (drivers.includes("crowd")) parts.push("fits your crowd tolerance");
  if (drivers.includes("vertical")) parts.push("big vertical + long runs");

  if (ctx.pass !== "any") parts.push(`on the ${ctx.pass.toUpperCase()} pass`);

  // keep it tight
  const top = parts.slice(0, 3);
  if (ctx.travel === "drive") top.unshift("fits your drive constraints");
  return top.join(" • ");
}

// Export to window for ui.js
window.calculateMatches = calculateMatches;
