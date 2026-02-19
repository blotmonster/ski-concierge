document.addEventListener("DOMContentLoaded", function () {

  const runBtn = document.getElementById("runBtn");

  if (!runBtn) {
    console.error("Run button not found.");
    return;
  }

  runBtn.addEventListener("click", function () {

    const user = {
      travel: document.getElementById("travel")?.value || "Fly",
      zip: document.getElementById("zip")?.value || "",
      maxDrive: document.getElementById("maxDrive")?.value || "Under 2 hours",
      ability: document.getElementById("ability")?.value || "Intermediate",
      terrain: document.getElementById("terrain")?.value || "Groomers",
      crowd: document.getElementById("crowd")?.value || "Medium",
      luxury: document.getElementById("luxury")?.value || "Low",
      snow: document.getElementById("snow")?.value || "Medium",
      pass: document.getElementById("pass")?.value || "Any"
    };

    const results = calculateMatches(user);

    renderResults(results);

  });

});
