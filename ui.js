document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="card">
      <h2>Travel Type</h2>
      <select id="travel">
        <option value="drive">Drive</option>
        <option value="fly">Fly</option>
      </select>

      <h2>Ability</h2>
      <select id="ability">
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Expert</option>
      </select>

      <h2>Pass</h2>
      <select id="pass">
        <option>Any</option>
        <option>Epic</option>
        <option>Ikon</option>
        <option>Indy</option>
      </select>

      <button id="goBtn">Find My Mountains</button>
      <div id="results"></div>
    </div>
  `;

  document.getElementById("goBtn").addEventListener("click", () => {
    const travel = document.getElementById("travel").value;
    const ability = document.getElementById("ability").value;
    const passPref = document.getElementById("pass").value;

    const filtered = filterResorts(travel, passPref);
    const ranked = rankResorts(filtered, ability).slice(0, 5);

    const results = document.getElementById("results");
    results.innerHTML = `
      <h2>Your Top 5</h2>
      ${ranked.map((r,i) => `
        <div class="result">
          #${i+1} ${r.name} (${r.state}) — ${r.score.toFixed(1)}
        </div>
      `).join("")}
    `;
  });
});
