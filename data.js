// =====================================================
// data.js
// Curated US + Canada dataset
// Schema aligned with Engine V4
// =====================================================

const resorts = [

/* =============================
   NORTHEAST
============================= */

{ name:"Stowe", country:"US", state:"VT", region:"Northeast", pass:"Epic", crowd:7, lat:44.53, lon:-72.78, vertical:7, expert:7, groomers:7, snow:6, luxury:7, nightlife:6, tier:"destination", hero:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80" },

{ name:"Killington", country:"US", state:"VT", region:"Northeast", pass:"Ikon", crowd:8, lat:43.63, lon:-72.80, vertical:7, expert:6, groomers:8, snow:6, luxury:5, nightlife:7, tier:"regional", hero:"https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1600&q=80" },

{ name:"Sugarbush", country:"US", state:"VT", region:"Northeast", pass:"Ikon", crowd:6, lat:44.14, lon:-72.89, vertical:7, expert:7, groomers:6, snow:6, luxury:5, nightlife:4, tier:"regional", hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80" },

{ name:"Jay Peak", country:"US", state:"VT", region:"Northeast", pass:"None", crowd:4, lat:44.94, lon:-72.50, vertical:7, expert:7, groomers:5, snow:8, luxury:3, nightlife:2, tier:"regional", hero:"https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80" },

{ name:"Okemo", country:"US", state:"VT", region:"Northeast", pass:"Epic", crowd:8, lat:43.40, lon:-72.72, vertical:6, expert:4, groomers:9, snow:5, luxury:5, nightlife:4, tier:"regional", hero:"https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=80" },

{ name:"Loon", country:"US", state:"NH", region:"Northeast", pass:"Ikon", crowd:8, lat:44.04, lon:-71.62, vertical:6, expert:5, groomers:8, snow:5, luxury:4, nightlife:3, tier:"regional", hero:"https://images.unsplash.com/photo-1516569422572-22b62b24e493?auto=format&fit=crop&w=1600&q=80" },

{ name:"Cannon", country:"US", state:"NH", region:"Northeast", pass:"None", crowd:6, lat:44.16, lon:-71.70, vertical:6, expert:6, groomers:5, snow:6, luxury:2, nightlife:2, tier:"regional", hero:"https://images.unsplash.com/photo-1548263594-a71c2f11b0f8?auto=format&fit=crop&w=1600&q=80" },

{ name:"Bretton Woods", country:"US", state:"NH", region:"Northeast", pass:"None", crowd:6, lat:44.26, lon:-71.44, vertical:5, expert:3, groomers:8, snow:5, luxury:6, nightlife:2, tier:"regional", hero:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80" },

{ name:"Sunapee", country:"US", state:"NH", region:"Northeast", pass:"Epic", crowd:7, lat:43.33, lon:-72.08, vertical:5, expert:3, groomers:8, snow:4, luxury:4, nightlife:2, tier:"regional", hero:"https://images.unsplash.com/photo-1542736667-069246bdbc74?auto=format&fit=crop&w=1600&q=80" },

{ name:"Waterville Valley", country:"US", state:"NH", region:"Northeast", pass:"Indy", crowd:6, lat:43.96, lon:-71.50, vertical:5, expert:4, groomers:7, snow:5, luxury:3, nightlife:2, tier:"regional", hero:"https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1600&q=80" },

{ name:"Pats Peak", country:"US", state:"NH", region:"Northeast", pass:"None", crowd:6, lat:43.16, lon:-71.79, vertical:2, expert:2, groomers:6, snow:3, luxury:1, nightlife:1, tier:"local", hero:"https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1600&q=80" },

{ name:"Sunday River", country:"US", state:"ME", region:"Northeast", pass:"None", crowd:7, lat:44.47, lon:-70.85, vertical:6, expert:5, groomers:8, snow:6, luxury:4, nightlife:3, tier:"regional", hero:"https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1600&q=80" },

{ name:"Sugarloaf", country:"US", state:"ME", region:"Northeast", pass:"Ikon", crowd:5, lat:45.03, lon:-70.31, vertical:7, expert:7, groomers:6, snow:7, luxury:3, nightlife:3, tier:"regional", hero:"https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80" },

{ name:"Wachusett", country:"US", state:"MA", region:"Northeast", pass:"None", crowd:8, lat:42.50, lon:-71.89, vertical:2, expert:1, groomers:6, snow:3, luxury:1, nightlife:1, tier:"local", hero:"https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1600&q=80" },

/* =============================
   ROCKIES / WEST / CANADA
============================= */

{ name:"Vail", country:"US", state:"CO", region:"Colorado", pass:"Epic", crowd:9, lat:39.64, lon:-106.37, vertical:9, expert:7, groomers:9, snow:7, luxury:9, nightlife:8, tier:"destination", hero:"https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=80" },

{ name:"Aspen Snowmass", country:"US", state:"CO", region:"Colorado", pass:"Ikon", crowd:7, lat:39.21, lon:-106.95, vertical:8, expert:8, groomers:8, snow:7, luxury:10, nightlife:8, tier:"destination", hero:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80" },

{ name:"Snowbird", country:"US", state:"UT", region:"Utah", pass:"Ikon", crowd:7, lat:40.58, lon:-111.65, vertical:8, expert:10, groomers:4, snow:9, luxury:4, nightlife:3, tier:"destination", hero:"https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1600&q=80" },

{ name:"Alta", country:"US", state:"UT", region:"Utah", pass:"Ikon", crowd:6, lat:40.59, lon:-111.64, vertical:8, expert:10, groomers:3, snow:10, luxury:2, nightlife:2, tier:"destination", hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80" },

{ name:"Jackson Hole", country:"US", state:"WY", region:"Wyoming", pass:"Ikon", crowd:7, lat:43.59, lon:-110.83, vertical:10, expert:10, groomers:4, snow:8, luxury:7, nightlife:6, tier:"destination", hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80" },

{ name:"Whistler Blackcomb", country:"CA", state:"BC", region:"CanadaWest", pass:"Epic", crowd:9, lat:50.12, lon:-122.95, vertical:10, expert:9, groomers:9, snow:8, luxury:8, nightlife:8, tier:"destination", hero:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80" },

{ name:"Revelstoke", country:"CA", state:"BC", region:"CanadaWest", pass:"Ikon", crowd:6, lat:50.96, lon:-118.16, vertical:10, expert:10, groomers:5, snow:9, luxury:4, nightlife:3, tier:"destination", hero:"https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1600&q=80" }

];

window.resorts = resorts;
