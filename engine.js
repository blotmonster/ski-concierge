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

function calculateMatches(profile) {
  let filtered = resorts;

  // DRIVE FILTER
  if (profile.travelType === "Drive") {
    const origin = origins["Boston"]; // For now fixed

    filtered = resorts.filter(r => {
      const distance = calculateDistance(origin.lat, origin.lon, r.lat, r.lon);
      return distance <= 250; // approx 4 hour radius
    });
  }

  const results = filtered.map(r => {
    let score = 0;

    // Ability scoring
    if (profile.ability === r.terrain) score += 15;
    if (profile.ability === "advanced" && r.terrain === "expert") score += 10;
    if (profile.ability === "beginner" && r.terrain === "mixed") score += 5;

    // Pass gating
    if (profile.pass !== "Any" && profile.pass !== r.pass) {
      score -= 100;
    }

    // Snow weighting
    score += r.snow * 2;

    return { ...r, score };
  });

  return results.sort((a, b) => b.score - a.score);
}
