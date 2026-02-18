const resorts = [

/* ---------------- NEW ENGLAND ---------------- */

{ name:"Stowe", lat:44.53, lon:-72.78, vertical:8, expert:9, groomers:7, snow:7, luxury:8, nightlife:6, tier:8 },
{ name:"Sugarbush", lat:44.14, lon:-72.89, vertical:8, expert:8, groomers:6, snow:7, luxury:6, nightlife:5, tier:7 },
{ name:"Killington", lat:43.60, lon:-72.82, vertical:7, expert:7, groomers:8, snow:7, luxury:6, nightlife:8, tier:7 },
{ name:"Mount Snow", lat:42.96, lon:-72.90, vertical:6, expert:6, groomers:8, snow:6, luxury:6, nightlife:7, tier:6 },
{ name:"Okemo", lat:43.40, lon:-72.72, vertical:6, expert:5, groomers:9, snow:6, luxury:7, nightlife:6, tier:6 },
{ name:"Jay Peak", lat:44.93, lon:-72.53, vertical:8, expert:8, groomers:6, snow:9, luxury:5, nightlife:3, tier:8 },
{ name:"Cannon", lat:44.16, lon:-71.70, vertical:7, expert:8, groomers:5, snow:6, luxury:3, nightlife:2, tier:6 },
{ name:"Wildcat", lat:44.26, lon:-71.22, vertical:8, expert:8, groomers:5, snow:7, luxury:3, nightlife:2, tier:7 },
{ name:"Loon", lat:44.04, lon:-71.62, vertical:6, expert:6, groomers:8, snow:6, luxury:6, nightlife:6, tier:6 },
{ name:"Bretton Woods", lat:44.26, lon:-71.44, vertical:6, expert:5, groomers:9, snow:6, luxury:7, nightlife:4, tier:6 },
{ name:"Mount Sunapee", lat:43.38, lon:-72.06, vertical:5, expert:4, groomers:8, snow:5, luxury:5, nightlife:3, tier:5 },
{ name:"Sugarloaf", lat:45.03, lon:-70.31, vertical:9, expert:9, groomers:6, snow:8, luxury:5, nightlife:4, tier:8 },
{ name:"Sunday River", lat:44.47, lon:-70.85, vertical:7, expert:6, groomers:8, snow:7, luxury:6, nightlife:5, tier:7 },
{ name:"Saddleback", lat:44.94, lon:-70.51, vertical:8, expert:8, groomers:6, snow:8, luxury:4, nightlife:3, tier:7 },

/* ---------------- COLORADO ---------------- */

{ name:"Vail", lat:39.64, lon:-106.37, vertical:9, expert:8, groomers:9, snow:8, luxury:9, nightlife:8, tier:10 },
{ name:"Beaver Creek", lat:39.60, lon:-106.52, vertical:8, expert:6, groomers:9, snow:8, luxury:10, nightlife:7, tier:9 },
{ name:"Breckenridge", lat:39.48, lon:-106.04, vertical:8, expert:7, groomers:8, snow:8, luxury:8, nightlife:8, tier:9 },
{ name:"Keystone", lat:39.60, lon:-105.95, vertical:7, expert:6, groomers:8, snow:7, luxury:6, nightlife:7, tier:7 },
{ name:"Arapahoe Basin", lat:39.64, lon:-105.87, vertical:8, expert:9, groomers:4, snow:8, luxury:2, nightlife:1, tier:8 },
{ name:"Copper Mountain", lat:39.50, lon:-106.15, vertical:8, expert:7, groomers:8, snow:8, luxury:6, nightlife:5, tier:8 },
{ name:"Steamboat", lat:40.45, lon:-106.80, vertical:8, expert:7, groomers:8, snow:9, luxury:8, nightlife:7, tier:9 },
{ name:"Telluride", lat:37.94, lon:-107.84, vertical:9, expert:9, groomers:6, snow:8, luxury:9, nightlife:6, tier:9 },
{ name:"Crested Butte", lat:38.90, lon:-106.96, vertical:9, expert:9, groomers:5, snow:8, luxury:6, nightlife:5, tier:8 },
{ name:"Winter Park", lat:39.89, lon:-105.76, vertical:8, expert:8, groomers:7, snow:8, luxury:6, nightlife:5, tier:8 },

/* ---------------- UTAH ---------------- */

{ name:"Alta", lat:40.59, lon:-111.64, vertical:9, expert:9, groomers:4, snow:10, luxury:4, nightlife:2, tier:9 },
{ name:"Snowbird", lat:40.58, lon:-111.66, vertical:9, expert:9, groomers:5, snow:9, luxury:6, nightlife:4, tier:9 },
{ name:"Deer Valley", lat:40.62, lon:-111.48, vertical:8, expert:6, groomers:9, snow:8, luxury:10, nightlife:6, tier:9 },
{ name:"Park City", lat:40.65, lon:-111.51, vertical:8, expert:7, groomers:8, snow:7, luxury:8, nightlife:8, tier:8 },
{ name:"Snowbasin", lat:41.20, lon:-111.85, vertical:9, expert:8, groomers:8, snow:8, luxury:8, nightlife:4, tier:9 },
{ name:"Brighton", lat:40.60, lon:-111.58, vertical:7, expert:7, groomers:7, snow:9, luxury:3, nightlife:3, tier:7 },
{ name:"Solitude", lat:40.62, lon:-111.60, vertical:8, expert:8, groomers:6, snow:9, luxury:5, nightlife:3, tier:8 },
{ name:"Powder Mountain", lat:41.38, lon:-111.78, vertical:8, expert:8, groomers:6, snow:9, luxury:4, nightlife:2, tier:8 },

/* ---------------- WYOMING / MONTANA ---------------- */

{ name:"Jackson Hole", lat:43.59, lon:-110.83, vertical:10, expert:10, groomers:5, snow:9, luxury:7, nightlife:6, tier:10 },
{ name:"Grand Targhee", lat:43.79, lon:-110.93, vertical:8, expert:7, groomers:6, snow:10, luxury:4, nightlife:2, tier:8 },
{ name:"Big Sky", lat:45.28, lon:-111.40, vertical:10, expert:9, groomers:7, snow:8, luxury:7, nightlife:5, tier:9 },
{ name:"Whitefish", lat:48.48, lon:-114.35, vertical:8, expert:7, groomers:7, snow:8, luxury:6, nightlife:5, tier:8 },
{ name:"Bridger Bowl", lat:45.82, lon:-110.90, vertical:8, expert:9, groomers:5, snow:8, luxury:2, nightlife:1, tier:7 },

/* ---------------- CALIFORNIA ---------------- */

{ name:"Palisades Tahoe", lat:39.20, lon:-120.24, vertical:9, expert:9, groomers:6, snow:8, luxury:8, nightlife:6, tier:9 },
{ name:"Mammoth", lat:37.63, lon:-119.03, vertical:9, expert:8, groomers:8, snow:9, luxury:7, nightlife:6, tier:9 },
{ name:"Heavenly", lat:38.93, lon:-119.94, vertical:8, expert:7, groomers:8, snow:7, luxury:8, nightlife:9, tier:8 },
{ name:"Northstar", lat:39.27, lon:-120.12, vertical:7, expert:6, groomers:9, snow:7, luxury:9, nightlife:7, tier:8 },
{ name:"Kirkwood", lat:38.68, lon:-120.06, vertical:8, expert:9, groomers:5, snow:8, luxury:4, nightlife:3, tier:8 },

/* ---------------- PACIFIC NORTHWEST ---------------- */

{ name:"Crystal Mountain", lat:46.94, lon:-121.47, vertical:9, expert:8, groomers:7, snow:8, luxury:6, nightlife:4, tier:8 },
{ name:"Stevens Pass", lat:47.75, lon:-121.09, vertical:8, expert:7, groomers:7, snow:9, luxury:4, nightlife:3, tier:7 },
{ name:"Mt Bachelor", lat:43.98, lon:-121.69, vertical:9, expert:8, groomers:8, snow:9, luxury:7, nightlife:6, tier:9 }

];
