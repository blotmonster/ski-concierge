function filterResorts(travelType, passPref) {
  return RESORTS.filter(r => {
    if (travelType === "drive" && !r.drive) return false;
    if (travelType === "fly" && r.drive) return true;
    if (passPref !== "Any" && !r.pass.includes(passPref)) return false;
    return true;
  });
}

function scoreResort(resort, ability) {
  let score = 0;

  score += resort.vertical * 2;
  score += resort.snow * 2;
  score += resort.tier;

  if (ability === "Beginner") score += resort.groomers * 2;
  if (ability === "Intermediate") score += resort.groomers + resort.expert;
  if (ability === "Expert") score += resort.expert * 2;

  return score;
}

function rankResorts(resorts, ability) {
  return resorts
    .map(r => ({ ...r, score: scoreResort(r, ability) }))
    .sort((a, b) => b.score - a.score);
}
