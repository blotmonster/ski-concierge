function calculateMatches(profile) {

  return window.resorts.map(r => {

    let score = 0;

    if (profile.pass !== "Any" && profile.pass !== r.pass) {
      score -= 100;
    }

    if (profile.ability === "Beginner") {
      score += r.groomers * 2;
    }

    if (profile.ability === "Advanced" || profile.ability === "Expert") {
      score += r.expert * 2;
    }

    if (profile.crowd === "Low — Avoid Crowds") {
      score += (10 - r.crowd);
    }

    score += r.tier;

    return { ...r, score };

  }).sort((a,b)=>b.score-a.score);
}
