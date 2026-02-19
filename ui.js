document.getElementById("runBtn").addEventListener("click", function () {

  const user = {
    travel: document.getElementById("travel").value,          // "drive" or "fly"
    zip: document.getElementById("zip").value || "02482",    // default Boston
    driveTime: document.getElementById("driveTime").value,   // "2", "3", etc.
    ability: document.getElementById("ability").value,
    terrain: document.getElementById("terrain").value,
    crowd: document.getElementById("crowd").value,
    luxury: document.getElementById("luxury").value,
    snow: document.getElementById("snow").value,
    pass: document.getElementById("pass").value
  };

  const matches = calculateMatches(user);

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!matches || matches.length === 0) {
    resultsDiv.innerHTML = "<p>No resorts match your criteria.</p>";
    return;
  }

  const top5 = matches.slice(0, 5);

  top5.forEach((resort, index) => {
    const div = document.createElement("div");
    div.className = "result-card";
    div.innerHTML = `
      <h3>#${index + 1} ${resort.name}</h3>
      <p>Match Score: ${resort.score.toFixed(1)}</p>
    `;
    resultsDiv.appendChild(div);
  });

});
