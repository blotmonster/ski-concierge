function scoreResorts(user) {

  let filtered = resorts.filter(r => {

    if (user.travel === "drive" && r.region !== "NE") return false;
    if (user.travel === "fly" && r.tier < 7) return false;
    if (user.pass !== "Any" && r.pass !== user.pass) return false;

    return true;
  });

  return filtered.map(r => {

    let abilityAlign = 10 - Math.abs(r.expert - user.ability);

    let weightSnow = user.travel === "fly" ? 1.5 : 1.0;
    let weightVertical = user.travel === "fly" ? 1.5 : 1.0;
    let weightTier = user.travel === "fly" ? 2.0 : 0.5;

    let score =
      abilityAlign * 1.5 +
      r.vertical * weightVertical +
      r.snow * weightSnow +
      r.luxury * user.luxuryWeight +
      r.tier * weightTier;

    return { ...r, score };
  })
  .sort((a,b) => b.score - a.score);
}
