// =============================================
// Collect User Inputs
// =============================================

function getUserInputs() {

  const travel = document.getElementById("travel").value.toLowerCase();
  const ability = document.getElementById("ability").value;
  const terrain = document.getElementById("terrain").value;
  const crowd = document.getElementById("crowd").value;
  const luxury = document.getElementById("luxury").value;
  const snow = document.getElementById("snow").value;
  const pass = document.getElementById("pass").value;

  const zipInput = document.getElementById("zip");
  const maxDriveInput = document.getElementById("maxDrive");

  let zip = zipInput ? zipInput.value : "";
  let maxDrive = maxDriveInput ? parseInt(maxDriveInput.value) : 6;

  return {
    travel,
    ability,
    terrain,
    crowd,
    luxury,
    snow,
    pass,
    zip,
    maxDrive
  };
}

// =============================================
// Render Results
// =============================================

function renderResults(results) {

  const container = document.getElementById("results");

  if (!container) {
    console.error("Results container missing.");
    return;
  }

  if (results.length === 0) {
    container.innerHTML = "<p>No resorts match your criteria.</p>";
    return;
  }

  let html = "<h2>Your Top 5</h2>";

  results.slice(0, 5).forEach((r, i) => {
    html += `
      <div>
        <strong>#${i + 1} ${r.name}</strong><br>
        Match Score: ${r.score.toFixed(1)}
      </div>
      <br>
    `;
  });

  container.innerHTML = html;
}

// =============================================
// Run Match
// =============================================

function runMatch() {
  const user = getUserInputs();
  const results = calculateMatches(user);
  renderResults(results);
}

// =============================================
// Button Wiring
// =============================================

document.addEventListener("DOMContentLoaded", function () {

  const button = document.getElementById("findBtn");

  if (!button) {
    console.error("Find button not found.");
    return;
  }

  button.addEventListener("click", function (e) {
    e.preventDefault();
    runMatch();
  });

});
