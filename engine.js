function calculateMatches(profile) {

  return resorts
    .filter(r => {
      // PASS GATING
      if (profile.pass !== "any") {
        if (!r.pass || r.pass.toLowerCase() !== profile.pass) return false;
      }

      return true;
    })
    .map(r => {

      let score = 0;

      // Ability Weight
      if (profile.ability === "beginner") {
        score += r.groomers * 2;
      }
      if (profile.ability === "intermediate") {
        score += r.groomers * 1.5 + r.vertical;
      }
      if (profile.ability === "advanced") {
        score += r.vertical * 1.5 + r.expert;
      }
      if (profile.ability === "expert") {
        score += r.expert * 2 + r.vertical;
      }

      // Terrain Preference
      if (profile.terrain === "groomers") {
        score += r.groomers * 2;
      }
      if (profile.terrain === "mixed") {
        score += r.vertical + r.groomers;
      }
      if (profile.terrain === "steeps") {
        score += r.expert * 2;
      }

      // Crowd
      if (profile.crowd === "low") {
        score += (10 - r.crowd) * 1.5;
      }
      if (profile.crowd === "medium") {
        score += 5;
      }
      if (profile.crowd === "high") {
        score += r.crowd;
      }

      // Luxury
      if (profile.luxury === "medium") {
        score += r.luxury;
      }
      if (profile.luxury === "high") {
        score += r.luxury * 2;
      }

      // Snow Reliability
      if (profile.snow === "medium") {
        score += r.snow;
      }
      if (profile.snow === "high") {
        score += r.snow * 2;
      }

      return {
        ...r,
        score
      };

    })
    .sort((a,b) => b.score - a.score);
}
