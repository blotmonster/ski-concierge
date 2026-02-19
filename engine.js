function scoreResorts(user) {

  let filtered = resorts.filter(r => {

    if (user.travel === "drive" && r.region !== "NE") return false;
    if (user.travel === "fly" && r.tier < 7) return false;
    if (user.pass !== "Any" && r.pass !== user.pass) return false;

    return true;
  });

  return filtered.map(r => {

    let abilityAlign = 10 - Math.abs(r.expert - user.ability);

    let terrainScore = 0;
    if(user.terrain === "steeps") terrainScore = r.expert;
    if(user.terrain === "groomers") terrainScore = r.vertical * 0.6;
    if(user.terrain === "balanced") terrainScore = (r.expert + r.vertical) / 2;

    let crowdScore = (10 - r.crowd || 5) * user.crowdTolerance;

    let weightSnow = user.travel === "fly" ? 1.5 : 1.0;
    let weightVertical = user.travel === "fly" ? 1.5 : 1.0;
    let weightTier = user.travel === "fly" ? 2.0 : 0.5;

    let score =
      abilityAlign * 1.5 +
      terrainScore * 1.2 +
      r.snow * user.snowPriority * weightSnow +
      r.vertical * weightVertical +
      r.luxury * user.luxuryPriority +
      crowdScore +
      r.tier * weightTier;

    let explanation = buildExplanation(r, user);

    return { ...r, score, explanation };

  })
  .sort((a,b) => b.score - a.score);
}

function buildExplanation(r, user){

  let reasons = [];

  if(r.expert > 8 && user.ability >= 8)
    reasons.push("elite expert terrain");

  if(r.snow > 8 && user.snowPriority >= 2)
    reasons.push("reliable snow");

  if(r.luxury > 8 && user.luxuryPriority >= 2)
    reasons.push("premium destination feel");

  if(user.travel === "fly" && r.tier >= 9)
    reasons.push("true fly-worthy scale");

  if(user.travel === "drive")
    reasons.push("strong regional fit");

  return reasons.length > 0
    ? "Strong match due to " + reasons.join(", ") + "."
    : "Solid overall alignment with your ski profile.";
}
