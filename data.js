// data.js
// Curated, static dataset: US + Canada (≈75 resorts)
// Fields:
// name, region, country, state, pass, crowd(1-10), lat, lon,
// vertical(1-10), expert(1-10), groomers(1-10), snow(1-10),
// luxury(1-10), nightlife(1-10), tier(1-10), hero

const resorts = [
  // -----------------------------
  // NORTHEAST (US)
  // -----------------------------
  { name:"Stowe", country:"US", state:"VT", region:"Northeast", pass:"Epic", crowd:7, lat:44.53, lon:-72.78, vertical:7, expert:7, groomers:7, snow:6, luxury:7, nightlife:6, tier:7, hero:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80" },
  { name:"Killington", country:"US", state:"VT", region:"Northeast", pass:"Ikon", crowd:8, lat:43.63, lon:-72.80, vertical:7, expert:6, groomers:8, snow:6, luxury:5, nightlife:7, tier:7, hero:"https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1600&q=80" },
  { name:"Sugarbush", country:"US", state:"VT", region:"Northeast", pass:"Ikon", crowd:6, lat:44.14, lon:-72.89, vertical:7, expert:7, groomers:6, snow:6, luxury:5, nightlife:4, tier:6, hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80" },
  { name:"Jay Peak", country:"US", state:"VT", region:"Northeast", pass:"None", crowd:4, lat:44.94, lon:-72.50, vertical:7, expert:7, groomers:5, snow:8, luxury:3, nightlife:2, tier:6, hero:"https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80" },
  { name:"Okemo", country:"US", state:"VT", region:"Northeast", pass:"Epic", crowd:8, lat:43.40, lon:-72.72, vertical:6, expert:4, groomers:9, snow:5, luxury:5, nightlife:4, tier:5, hero:"https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=80" },

  { name:"Loon", country:"US", state:"NH", region:"Northeast", pass:"Ikon", crowd:8, lat:44.04, lon:-71.62, vertical:6, expert:5, groomers:8, snow:5, luxury:4, nightlife:3, tier:5, hero:"https://images.unsplash.com/photo-1516569422572-d9e0510c85fc?auto=format&fit=crop&w=1600&q=80" },
  { name:"Cannon", country:"US", state:"NH", region:"Northeast", pass:"None", crowd:6, lat:44.16, lon:-71.70, vertical:6, expert:6, groomers:5, snow:6, luxury:2, nightlife:2, tier:5, hero:"https://images.unsplash.com/photo-1548263594-a71c2f11b0f8?auto=format&fit=crop&w=1600&q=80" },
  { name:"Bretton Woods", country:"US", state:"NH", region:"Northeast", pass:"None", crowd:6, lat:44.26, lon:-71.44, vertical:5, expert:3, groomers:8, snow:5, luxury:6, nightlife:2, tier:5, hero:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80" },
  { name:"Sunapee", country:"US", state:"NH", region:"Northeast", pass:"Epic", crowd:7, lat:43.33, lon:-72.08, vertical:5, expert:3, groomers:8, snow:4, luxury:4, nightlife:2, tier:4, hero:"https://images.unsplash.com/photo-1542736667-069246bdbc74?auto=format&fit=crop&w=1600&q=80" },
  { name:"Waterville Valley", country:"US", state:"NH", region:"Northeast", pass:"Indy", crowd:6, lat:43.96, lon:-71.50, vertical:5, expert:4, groomers:7, snow:5, luxury:3, nightlife:2, tier:4, hero:"https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1600&q=80" },
  { name:"Pats Peak", country:"US", state:"NH", region:"Northeast", pass:"None", crowd:6, lat:43.16, lon:-71.79, vertical:2, expert:2, groomers:6, snow:3, luxury:1, nightlife:1, tier:2, hero:"https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1600&q=80" },

  { name:"Sunday River", country:"US", state:"ME", region:"Northeast", pass:"None", crowd:7, lat:44.47, lon:-70.85, vertical:6, expert:5, groomers:8, snow:6, luxury:4, nightlife:3, tier:5, hero:"https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1600&q=80" },
  { name:"Sugarloaf", country:"US", state:"ME", region:"Northeast", pass:"Ikon", crowd:5, lat:45.03, lon:-70.31, vertical:7, expert:7, groomers:6, snow:7, luxury:3, nightlife:3, tier:6, hero:"https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80" },
  { name:"Saddleback", country:"US", state:"ME", region:"Northeast", pass:"Indy", crowd:4, lat:44.94, lon:-70.63, vertical:6, expert:7, groomers:4, snow:7, luxury:2, nightlife:1, tier:5, hero:"https://images.unsplash.com/photo-1548263594-a71c2f11b0f8?auto=format&fit=crop&w=1600&q=80" },

  { name:"Wachusett", country:"US", state:"MA", region:"Northeast", pass:"None", crowd:8, lat:42.50, lon:-71.89, vertical:2, expert:1, groomers:6, snow:3, luxury:1, nightlife:1, tier:2, hero:"https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1600&q=80" },

  { name:"Whiteface", country:"US", state:"NY", region:"Northeast", pass:"Ikon", crowd:6, lat:44.37, lon:-73.90, vertical:7, expert:7, groomers:5, snow:7, luxury:3, nightlife:2, tier:6, hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80" },
  { name:"Gore", country:"US", state:"NY", region:"Northeast", pass:"None", crowd:5, lat:43.67, lon:-74.00, vertical:6, expert:6, groomers:6, snow:6, luxury:2, nightlife:1, tier:5, hero:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80" },
  { name:"Hunter", country:"US", state:"NY", region:"Northeast", pass:"Epic", crowd:9, lat:42.20, lon:-74.21, vertical:5, expert:4, groomers:7, snow:4, luxury:2, nightlife:4, tier:4, hero:"https://images.unsplash.com/photo-1516569422572-d9e0510c85fc?auto=format&fit=crop&w=1600&q=80" },

  // -----------------------------
  // COLORADO
  // -----------------------------
  { name:"Vail", country:"US", state:"CO", region:"Colorado", pass:"Epic", crowd:9, lat:39.64, lon:-106.37, vertical:9, expert:7, groomers:9, snow:7, luxury:9, nightlife:8, tier:9, hero:"https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=80" },
  { name:"Beaver Creek", country:"US", state:"CO", region:"Colorado", pass:"Epic", crowd:7, lat:39.60, lon:-106.52, vertical:7, expert:6, groomers:9, snow:7, luxury:10, nightlife:5, tier:9, hero:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80" },
  { name:"Breckenridge", country:"US", state:"CO", region:"Colorado", pass:"Epic", crowd:9, lat:39.48, lon:-106.07, vertical:8, expert:7, groomers:8, snow:7, luxury:7, nightlife:8, tier:8, hero:"https://images.unsplash.com/photo-1548263594-a71c2f11b0f8?auto=format&fit=crop&w=1600&q=80" },
  { name:"Keystone", country:"US", state:"CO", region:"Colorado", pass:"Epic", crowd:8, lat:39.61, lon:-105.95, vertical:7, expert:6, groomers:8, snow:6, luxury:5, nightlife:4, tier:6, hero:"https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1600&q=80" },

  { name:"Aspen Snowmass", country:"US", state:"CO", region:"Colorado", pass:"Ikon", crowd:7, lat:39.21, lon:-106.95, vertical:8, expert:8, groomers:8, snow:7, luxury:10, nightlife:8, tier:9, hero:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80" },
  { name:"Steamboat", country:"US", state:"CO", region:"Colorado", pass:"Ikon", crowd:7, lat:40.46, lon:-106.80, vertical:7, expert:6, groomers:8, snow:8, luxury:6, nightlife:6, tier:8, hero:"https://images.unsplash.com/photo-1516569422572-d9e0510c85fc?auto=format&fit=crop&w=1600&q=80" },
  { name:"Winter Park", country:"US", state:"CO", region:"Colorado", pass:"Ikon", crowd:7, lat:39.89, lon:-105.76, vertical:7, expert:7, groomers:7, snow:7, luxury:4, nightlife:4, tier:7, hero:"https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1600&q=80" },
  { name:"Copper", country:"US", state:"CO", region:"Colorado", pass:"Ikon", crowd:7, lat:39.50, lon:-106.15, vertical:7, expert:7, groomers:7, snow:7, luxury:4, nightlife:4, tier:7, hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80" },
  { name:"Arapahoe Basin", country:"US", state:"CO", region:"Colorado", pass:"Ikon", crowd:6, lat:39.64, lon:-105.87, vertical:7, expert:9, groomers:3, snow:7, luxury:1, nightlife:2, tier:7, hero:"https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1600&q=80" },

  { name:"Telluride", country:"US", state:"CO", region:"Colorado", pass:"Epic", crowd:6, lat:37.94, lon:-107.81, vertical:8, expert:8, groomers:7, snow:7, luxury:9, nightlife:6, tier:9, hero:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80" },
  { name:"Crested Butte", country:"US", state:"CO", region:"Colorado", pass:"Epic", crowd:5, lat:38.90, lon:-106.97, vertical:7, expert:9, groomers:4, snow:7, luxury:3, nightlife:4, tier:7, hero:"https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80" },

  // -----------------------------
  // UTAH
  // -----------------------------
  { name:"Snowbird", country:"US", state:"UT", region:"Utah", pass:"Ikon", crowd:7, lat:40.58, lon:-111.65, vertical:8, expert:10, groomers:4, snow:9, luxury:4, nightlife:3, tier:9, hero:"https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1600&q=80" },
  { name:"Alta", country:"US", state:"UT", region:"Utah", pass:"Ikon", crowd:6, lat:40.59, lon:-111.64, vertical:8, expert:10, groomers:3, snow:10, luxury:2, nightlife:2, tier:9, hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80" },
  { name:"Park City", country:"US", state:"UT", region:"Utah", pass:"Epic", crowd:9, lat:40.65, lon:-111.50, vertical:7, expert:6, groomers:9, snow:8, luxury:7, nightlife:8, tier:8, hero:"https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1600&q=80" },
  { name:"Deer Valley", country:"US", state:"UT", region:"Utah", pass:"Ikon", crowd:7, lat:40.64, lon:-111.48, vertical:7, expert:5, groomers:10, snow:7, luxury:10, nightlife:5, tier:9, hero:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80" },
  { name:"Snowbasin", country:"US", state:"UT", region:"Utah", pass:"Ikon", crowd:6, lat:41.22, lon:-111.86, vertical:8, expert:7, groomers:8, snow:8, luxury:5, nightlife:2, tier:8, hero:"https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1600&q=80" },
  { name:"Brighton", country:"US", state:"UT", region:"Utah", pass:"Ikon", crowd:7, lat:40.60, lon:-111.58, vertical:6, expert:7, groomers:5, snow:9, luxury:2, nightlife:2, tier:7, hero:"https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80" },
  { name:"Solitude", country:"US", state:"UT", region:"Utah", pass:"Ikon", crowd:6, lat:40.62, lon:-111.59, vertical:6, expert:7, groomers:6, snow:9, luxury:3, nightlife:2, tier:7, hero:"https://images.unsplash.com/photo-1516569422572-d9e0510c85fc?auto=format&fit=crop&w=1600&q=80" },
  { name:"Powder Mountain", country:"US", state:"UT", region:"Utah", pass:"Indy", crowd:4, lat:41.38, lon:-111.78, vertical:6, expert:7, groomers:4, snow:9, luxury:2, nightlife:1, tier:7, hero:"https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1600&q=80" },

  // -----------------------------
  // WYOMING
  // -----------------------------
  { name:"Jackson Hole", country:"US", state:"WY", region:"Wyoming", pass:"Ikon", crowd:7, lat:43.59, lon:-110.83, vertical:10, expert:10, groomers:4, snow:8, luxury:7, nightlife:6, tier:10, hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80" },
  { name:"Grand Targhee", country:"US", state:"WY", region:"Wyoming", pass:"Ikon", crowd:4, lat:43.79, lon:-110.96, vertical:7, expert:7, groomers:5, snow:9, luxury:3, nightlife:2, tier:8, hero:"https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80" },

  // -----------------------------
  // IDAHO
  // -----------------------------
  { name:"Sun Valley", country:"US", state:"ID", region:"Idaho", pass:"Ikon", crowd:5, lat:43.70, lon:-114.35, vertical:8, expert:7, groomers:8, snow:7, luxury:7, nightlife:5, tier:8, hero:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80" },
  { name:"Schweitzer", country:"US", state:"ID", region:"Idaho", pass:"Ikon", crowd:5, lat:48.37, lon:-116.62, vertical:7, expert:7, groomers:6, snow:8, luxury:4, nightlife:2, tier:7, hero:"https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1600&q=80" },
  { name:"Brundage", country:"US", state:"ID", region:"Idaho", pass:"Indy", crowd:4, lat:45.00, lon:-116.15, vertical:6, expert:6, groomers:5, snow:8, luxury:2, nightlife:1, tier:6, hero:"https://images.unsplash.com/photo-1516569422572-d9e0510c85fc?auto=format&fit=crop&w=1600&q=80" },

  // -----------------------------
  // CALIFORNIA (Tahoe + Mammoth)
  // -----------------------------
  { name:"Palisades Tahoe", country:"US", state:"CA", region:"California", pass:"Ikon", crowd:8, lat:39.20, lon:-120.24, vertical:8, expert:9, groomers:6, snow:7, luxury:6, nightlife:5, tier:9, hero:"https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1600&q=80" },
  { name:"Northstar", country:"US", state:"CA", region:"California", pass:"Epic", crowd:8, lat:39.27, lon:-120.12, vertical:6, expert:5, groomers:9, snow:6, luxury:7, nightlife:4, tier:7, hero:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80" },
  { name:"Heavenly", country:"US", state:"CA", region:"California", pass:"Epic", crowd:9, lat:38.94, lon:-119.94, vertical:7, expert:6, groomers:8, snow:6, luxury:6, nightlife:7, tier:7, hero:"https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1600&q=80" },
  { name:"Kirkwood", country:"US", state:"CA", region:"California", pass:"Epic", crowd:6, lat:38.68, lon:-120.07, vertical:7, expert:8, groomers:5, snow:8, luxury:2, nightlife:2, tier:8, hero:"https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80" },
  { name:"Sugar Bowl", country:"US", state:"CA", region:"California", pass:"None", crowd:6, lat:39.30, lon:-120.33, vertical:7, expert:7, groomers:6, snow:8, luxury:3, nightlife:2, tier:7, hero:"https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1600&q=80" },
  { name:"Mammoth", country:"US", state:"CA", region:"California", pass:"Ikon", crowd:8, lat:37.63, lon:-119.03, vertical:8, expert:8, groomers:8, snow:8, luxury:5, nightlife:5, tier:8, hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80" },

  // -----------------------------
  // OREGON / WASHINGTON
  // -----------------------------
  { name:"Mt Bachelor", country:"US", state:"OR", region:"PacificNW", pass:"Ikon", crowd:7, lat:43.98, lon:-121.69, vertical:7, expert:7, groomers:7, snow:7, luxury:4, nightlife:3, tier:7, hero:"https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1600&q=80" },
  { name:"Timberline", country:"US", state:"OR", region:"PacificNW", pass:"None", crowd:6, lat:45.33, lon:-121.71, vertical:4, expert:4, groomers:6, snow:7, luxury:2, nightlife:2, tier:4, hero:"https://images.unsplash.com/photo-1516569422572-d9e0510c85fc?auto=format&fit=crop&w=1600&q=80" },

  { name:"Crystal Mountain", country:"US", state:"WA", region:"PacificNW", pass:"Ikon", crowd:7, lat:46.93, lon:-121.50, vertical:7, expert:7, groomers:6, snow:8, luxury:3, nightlife:2, tier:7, hero:"https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80" },
  { name:"Stevens Pass", country:"US", state:"WA", region:"PacificNW", pass:"Epic", crowd:7, lat:47.75, lon:-121.09, vertical:7, expert:7, groomers:6, snow:8, luxury:2, nightlife:2, tier:7, hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80" },

  // -----------------------------
  // ARIZONA / NEW MEXICO
  // -----------------------------
  { name:"Arizona Snowbowl", country:"US", state:"AZ", region:"Southwest", pass:"Ikon", crowd:6, lat:35.33, lon:-111.71, vertical:5, expert:5, groomers:6, snow:5, luxury:2, nightlife:2, tier:4, hero:"https://images.unsplash.com/photo-1548263594-a71c2f11b0f8?auto=format&fit=crop&w=1600&q=80" },
  { name:"Sunrise Park", country:"US", state:"AZ", region:"Southwest", pass:"None", crowd:4, lat:34.00, lon:-109.56, vertical:4, expert:4, groomers:6, snow:4, luxury:1, nightlife:1, tier:3, hero:"https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1600&q=80" },

  { name:"Taos", country:"US", state:"NM", region:"Southwest", pass:"Ikon", crowd:6, lat:36.59, lon:-105.45, vertical:7, expert:9, groomers:4, snow:7, luxury:3, nightlife:4, tier:7, hero:"https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1600&q=80" },
  { name:"Angel Fire", country:"US", state:"NM", region:"Southwest", pass:"None", crowd:4, lat:36.39, lon:-105.29, vertical:5, expert:4, groomers:7, snow:5, luxury:2, nightlife:2, tier:4, hero:"https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1600&q=80" },

  // -----------------------------
  // CANADA — BC / AB / QC / ON
  // -----------------------------
  { name:"Whistler Blackcomb", country:"CA", state:"BC", region:"CanadaWest", pass:"Epic", crowd:9, lat:50.12, lon:-122.95, vertical:10, expert:9, groomers:9, snow:8, luxury:8, nightlife:8, tier:10, hero:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80" },
  { name:"Revelstoke", country:"CA", state:"BC", region:"CanadaWest", pass:"Ikon", crowd:6, lat:50.96, lon:-118.16, vertical:10, expert:10, groomers:5, snow:9, luxury:4, nightlife:3, tier:10, hero:"https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1600&q=80" },
  { name:"Kicking Horse", country:"CA", state:"BC", region:"CanadaWest", pass:"None", crowd:5, lat:51.30, lon:-117.05, vertical:9, expert:10, groomers:4, snow:8, luxury:3, nightlife:2, tier:9, hero:"https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80" },
  { name:"Big White", country:"CA", state:"BC", region:"CanadaWest", pass:"Ikon", crowd:6, lat:49.72, lon:-118.93, vertical:7, expert:6, groomers:8, snow:8, luxury:4, nightlife:3, tier:7, hero:"https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1600&q=80" },
  { name:"Sun Peaks", country:"CA", state:"BC", region:"CanadaWest", pass:"Ikon", crowd:6, lat:50.88, lon:-119.89, vertical:7, expert:5, groomers:9, snow:7, luxury:4, nightlife:3, tier:7, hero:"https://images.unsplash.com/photo-1516569422572-d9e0510c85fc?auto=format&fit=crop&w=1600&q=80" },

  { name:"Banff Sunshine", country:"CA", state:"AB", region:"CanadaRockies", pass:"Ikon", crowd:6, lat:51.12, lon:-115.76, vertical:8, expert:7, groomers:7, snow:7, luxury:4, nightlife:4, tier:8, hero:"https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1600&q=80" },
  { name:"Lake Louise", country:"CA", state:"AB", region:"CanadaRockies", pass:"Ikon", crowd:6, lat:51.44, lon:-116.16, vertical:8, expert:8, groomers:6, snow:7, luxury:5, nightlife:3, tier:8, hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80" },

  { name:"Mont Tremblant", country:"CA", state:"QC", region:"CanadaEast", pass:"Ikon", crowd:8, lat:46.21, lon:-74.59, vertical:6, expert:4, groomers:9, snow:5, luxury:6, nightlife:6, tier:6, hero:"https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1600&q=80" },

  { name:"Blue Mountain", country:"CA", state:"ON", region:"CanadaEast", pass:"None", crowd:8, lat:44.50, lon:-80.32, vertical:3, expert:2, groomers:7, snow:4, luxury:5, nightlife:5, tier:3, hero:"https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1600&q=80" }
];

// Make globally available
window.resorts = resorts;
