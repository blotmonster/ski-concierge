// =====================================================
// data.js — Ski Concierge National Dataset (Segmented)
// =====================================================

const resorts = [

/* ===========================
   VERMONT
=========================== */

{ name:"Stowe",state:"VT",region:"Northeast",pass:"Epic",crowd:7,lat:44.53,lon:-72.78,vertical:7,expert:8,groomers:8,snow:6,luxury:7,tier:8 },

{ name:"Killington",state:"VT",region:"Northeast",pass:"Ikon",crowd:8,lat:43.63,lon:-72.80,vertical:7,expert:6,groomers:9,snow:6,luxury:5,tier:7 },

{ name:"Sugarbush",state:"VT",region:"Northeast",pass:"Ikon",crowd:6,lat:44.14,lon:-72.89,vertical:7,expert:8,groomers:6,snow:6,luxury:5,tier:7 },

{ name:"Jay Peak",state:"VT",region:"Northeast",pass:"None",crowd:4,lat:44.94,lon:-72.50,vertical:7,expert:8,groomers:5,snow:8,luxury:3,tier:6 },

{ name:"Okemo",state:"VT",region:"Northeast",pass:"Epic",crowd:8,lat:43.40,lon:-72.72,vertical:6,expert:4,groomers:9,snow:5,luxury:5,tier:6 },

{ name:"Stratton",state:"VT",region:"Northeast",pass:"Ikon",crowd:7,lat:43.11,lon:-72.91,vertical:6,expert:5,groomers:8,snow:5,luxury:6,tier:6 },

{ name:"Mad River Glen",state:"VT",region:"Northeast",pass:"None",crowd:4,lat:44.20,lon:-72.92,vertical:7,expert:9,groomers:3,snow:6,luxury:2,tier:7 },

{ name:"Smugglers Notch",state:"VT",region:"Northeast",pass:"None",crowd:5,lat:44.58,lon:-72.78,vertical:6,expert:7,groomers:6,snow:6,luxury:4,tier:6 },

{ name:"Mount Snow",state:"VT",region:"Northeast",pass:"Epic",crowd:8,lat:42.96,lon:-72.93,vertical:6,expert:5,groomers:8,snow:5,luxury:5,tier:6 },

{ name:"Burke Mountain",state:"VT",region:"Northeast",pass:"None",crowd:4,lat:44.58,lon:-71.89,vertical:6,expert:7,groomers:6,snow:6,luxury:2,tier:5 },

{ name:"Bolton Valley",state:"VT",region:"Northeast",pass:"Indy",crowd:5,lat:44.42,lon:-72.85,vertical:6,expert:6,groomers:5,snow:6,luxury:2,tier:5 },

{ name:"Magic Mountain",state:"VT",region:"Northeast",pass:"Indy",crowd:4,lat:43.20,lon:-72.80,vertical:6,expert:8,groomers:4,snow:5,luxury:2,tier:5 },

/* ===========================
   NEW HAMPSHIRE
=========================== */

{ name:"Loon",state:"NH",region:"Northeast",pass:"Ikon",crowd:8,lat:44.04,lon:-71.62,vertical:6,expert:5,groomers:8,snow:5,luxury:4,tier:6 },

{ name:"Cannon",state:"NH",region:"Northeast",pass:"None",crowd:6,lat:44.16,lon:-71.70,vertical:7,expert:8,groomers:5,snow:6,luxury:2,tier:6 },

{ name:"Bretton Woods",state:"NH",region:"Northeast",pass:"None",crowd:6,lat:44.26,lon:-71.44,vertical:5,expert:3,groomers:9,snow:5,luxury:6,tier:6 },

{ name:"Wildcat",state:"NH",region:"Northeast",pass:"Epic",crowd:5,lat:44.26,lon:-71.23,vertical:7,expert:8,groomers:5,snow:6,luxury:3,tier:6 },

{ name:"Attitash",state:"NH",region:"Northeast",pass:"Epic",crowd:6,lat:44.08,lon:-71.23,vertical:6,expert:6,groomers:6,snow:5,luxury:3,tier:5 },

{ name:"Waterville Valley",state:"NH",region:"Northeast",pass:"Indy",crowd:6,lat:43.96,lon:-71.50,vertical:5,expert:4,groomers:7,snow:5,luxury:3,tier:5 },

{ name:"Sunapee",state:"NH",region:"Northeast",pass:"Epic",crowd:7,lat:43.33,lon:-72.08,vertical:5,expert:3,groomers:8,snow:4,luxury:4,tier:5 },

{ name:"Gunstock",state:"NH",region:"Northeast",pass:"None",crowd:6,lat:43.53,lon:-71.37,vertical:5,expert:4,groomers:7,snow:5,luxury:3,tier:4 },

/* ===========================
   MAINE
=========================== */

{ name:"Sunday River",state:"ME",region:"Northeast",pass:"None",crowd:7,lat:44.47,lon:-70.85,vertical:6,expert:5,groomers:8,snow:6,luxury:4,tier:6 },

{ name:"Sugarloaf",state:"ME",region:"Northeast",pass:"Ikon",crowd:5,lat:45.03,lon:-70.31,vertical:8,expert:8,groomers:6,snow:7,luxury:3,tier:7 },

{ name:"Saddleback",state:"ME",region:"Northeast",pass:"Indy",crowd:4,lat:44.94,lon:-70.63,vertical:7,expert:8,groomers:5,snow:7,luxury:2,tier:6 },

/* ===========================
   NEW YORK
=========================== */

{ name:"Whiteface",state:"NY",region:"Northeast",pass:"Ikon",crowd:6,lat:44.37,lon:-73.90,vertical:8,expert:8,groomers:5,snow:7,luxury:3,tier:7 },

{ name:"Gore",state:"NY",region:"Northeast",pass:"None",crowd:5,lat:43.67,lon:-74.00,vertical:7,expert:7,groomers:6,snow:6,luxury:2,tier:6 },

{ name:"Hunter",state:"NY",region:"Northeast",pass:"Epic",crowd:9,lat:42.20,lon:-74.21,vertical:5,expert:4,groomers:7,snow:4,luxury:2,tier:5 },

{ name:"Windham",state:"NY",region:"Northeast",pass:"Ikon",crowd:7,lat:42.29,lon:-74.25,vertical:5,expert:4,groomers:8,snow:5,luxury:5,tier:5 },

{ name:"Holiday Valley",state:"NY",region:"Northeast",pass:"None",crowd:6,lat:42.26,lon:-78.67,vertical:5,expert:4,groomers:7,snow:6,luxury:4,tier:5 },

/* ===========================
   MASSACHUSETTS
=========================== */

{ name:"Wachusett",state:"MA",region:"Northeast",pass:"None",crowd:8,lat:42.50,lon:-71.89,vertical:2,expert:1,groomers:6,snow:3,luxury:1,tier:3 },/* ===========================
   COLORADO
=========================== */

{ name:"Vail",state:"CO",region:"Colorado",pass:"Epic",crowd:9,lat:39.64,lon:-106.37,vertical:9,expert:7,groomers:9,snow:7,luxury:9,tier:9 },

{ name:"Beaver Creek",state:"CO",region:"Colorado",pass:"Epic",crowd:7,lat:39.60,lon:-106.52,vertical:8,expert:6,groomers:9,snow:7,luxury:10,tier:9 },

{ name:"Breckenridge",state:"CO",region:"Colorado",pass:"Epic",crowd:9,lat:39.48,lon:-106.07,vertical:8,expert:7,groomers:8,snow:7,luxury:7,tier:8 },

{ name:"Keystone",state:"CO",region:"Colorado",pass:"Epic",crowd:8,lat:39.61,lon:-105.95,vertical:7,expert:6,groomers:8,snow:6,luxury:5,tier:7 },

{ name:"Copper Mountain",state:"CO",region:"Colorado",pass:"Ikon",crowd:7,lat:39.50,lon:-106.15,vertical:7,expert:7,groomers:7,snow:7,luxury:4,tier:7 },

{ name:"Winter Park",state:"CO",region:"Colorado",pass:"Ikon",crowd:7,lat:39.89,lon:-105.76,vertical:7,expert:7,groomers:7,snow:7,luxury:4,tier:7 },

{ name:"Arapahoe Basin",state:"CO",region:"Colorado",pass:"Ikon",crowd:6,lat:39.64,lon:-105.87,vertical:7,expert:9,groomers:3,snow:7,luxury:1,tier:7 },

{ name:"Aspen Snowmass",state:"CO",region:"Colorado",pass:"Ikon",crowd:7,lat:39.21,lon:-106.95,vertical:8,expert:8,groomers:8,snow:7,luxury:10,tier:9 },

{ name:"Steamboat",state:"CO",region:"Colorado",pass:"Ikon",crowd:7,lat:40.46,lon:-106.80,vertical:7,expert:6,groomers:8,snow:8,luxury:6,tier:8 },

{ name:"Telluride",state:"CO",region:"Colorado",pass:"Epic",crowd:6,lat:37.94,lon:-107.81,vertical:8,expert:8,groomers:7,snow:7,luxury:9,tier:9 },

{ name:"Crested Butte",state:"CO",region:"Colorado",pass:"Epic",crowd:5,lat:38.90,lon:-106.97,vertical:7,expert:9,groomers:4,snow:7,luxury:3,tier:8 },

{ name:"Monarch Mountain",state:"CO",region:"Colorado",pass:"Indy",crowd:4,lat:38.51,lon:-106.33,vertical:6,expert:6,groomers:5,snow:7,luxury:2,tier:5 },/* ===========================
   UTAH
=========================== */

{ name:"Deer Valley",state:"UT",region:"Utah",pass:"Ikon",crowd:7,lat:40.64,lon:-111.48,vertical:7,expert:5,groomers:10,snow:8,luxury:10,tier:9 },

{ name:"Snowbird",state:"UT",region:"Utah",pass:"Ikon",crowd:7,lat:40.58,lon:-111.65,vertical:9,expert:10,groomers:4,snow:9,luxury:4,tier:9 },

{ name:"Alta",state:"UT",region:"Utah",pass:"Ikon",crowd:6,lat:40.59,lon:-111.64,vertical:8,expert:10,groomers:3,snow:10,luxury:2,tier:9 },

{ name:"Park City",state:"UT",region:"Utah",pass:"Epic",crowd:9,lat:40.65,lon:-111.50,vertical:8,expert:6,groomers:9,snow:8,luxury:7,tier:8 },

{ name:"Snowbasin",state:"UT",region:"Utah",pass:"Ikon",crowd:6,lat:41.22,lon:-111.86,vertical:8,expert:7,groomers:8,snow:8,luxury:5,tier:8 },

{ name:"Powder Mountain",state:"UT",region:"Utah",pass:"Indy",crowd:3,lat:41.38,lon:-111.78,vertical:7,expert:7,groomers:4,snow:9,luxury:2,tier:8 },

{ name:"Solitude",state:"UT",region:"Utah",pass:"Ikon",crowd:6,lat:40.62,lon:-111.59,vertical:6,expert:7,groomers:6,snow:9,luxury:3,tier:7 },

{ name:"Brighton",state:"UT",region:"Utah",pass:"Ikon",crowd:7,lat:40.60,lon:-111.58,vertical:6,expert:7,groomers:5,snow:9,luxury:2,tier:7 },

/* ===========================
   WYOMING
=========================== */

{ name:"Jackson Hole",state:"WY",region:"Wyoming",pass:"Ikon",crowd:7,lat:43.59,lon:-110.83,vertical:10,expert:10,groomers:4,snow:8,luxury:7,tier:10 },

{ name:"Grand Targhee",state:"WY",region:"Wyoming",pass:"Ikon",crowd:4,lat:43.79,lon:-110.96,vertical:7,expert:7,groomers:5,snow:9,luxury:3,tier:8 },

/* ===========================
   MONTANA
=========================== */

{ name:"Big Sky",state:"MT",region:"Montana",pass:"Ikon",crowd:6,lat:45.28,lon:-111.40,vertical:10,expert:9,groomers:7,snow:8,luxury:7,tier:9 },

{ name:"Whitefish",state:"MT",region:"Montana",pass:"Ikon",crowd:5,lat:48.48,lon:-114.35,vertical:7,expert:7,groomers:6,snow:8,luxury:4,tier:7 },

{ name:"Bridger Bowl",state:"MT",region:"Montana",pass:"None",crowd:4,lat:45.82,lon:-110.90,vertical:7,expert:8,groomers:5,snow:8,luxury:2,tier:7 },

/* ===========================
   IDAHO
=========================== */

{ name:"Sun Valley",state:"ID",region:"Idaho",pass:"Ikon",crowd:5,lat:43.70,lon:-114.35,vertical:8,expert:7,groomers:8,snow:7,luxury:7,tier:8 },

{ name:"Schweitzer",state:"ID",region:"Idaho",pass:"Ikon",crowd:5,lat:48.37,lon:-116.62,vertical:7,expert:7,groomers:6,snow:8,luxury:4,tier:7 },

{ name:"Brundage",state:"ID",region:"Idaho",pass:"Indy",crowd:4,lat:45.00,lon:-116.15,vertical:6,expert:6,groomers:5,snow:8,luxury:2,tier:6 },

{ name:"Tamarack",state:"ID",region:"Idaho",pass:"Ikon",crowd:5,lat:44.67,lon:-116.12,vertical:6,expert:6,groomers:6,snow:7,luxury:4,tier:6 },/* ===========================
   CALIFORNIA — TAHOE + MAMMOTH
=========================== */

{ name:"Palisades Tahoe",state:"CA",region:"California",pass:"Ikon",crowd:8,lat:39.20,lon:-120.24,vertical:8,expert:9,groomers:6,snow:7,luxury:6,tier:9 },

{ name:"Northstar",state:"CA",region:"California",pass:"Epic",crowd:8,lat:39.27,lon:-120.12,vertical:6,expert:5,groomers:9,snow:6,luxury:7,tier:7 },

{ name:"Heavenly",state:"CA",region:"California",pass:"Epic",crowd:9,lat:38.94,lon:-119.94,vertical:7,expert:6,groomers:8,snow:6,luxury:6,tier:7 },

{ name:"Kirkwood",state:"CA",region:"California",pass:"Epic",crowd:6,lat:38.68,lon:-120.07,vertical:7,expert:8,groomers:5,snow:8,luxury:2,tier:8 },

{ name:"Sugar Bowl",state:"CA",region:"California",pass:"None",crowd:6,lat:39.30,lon:-120.33,vertical:7,expert:7,groomers:6,snow:8,luxury:3,tier:7 },

{ name:"Sierra-at-Tahoe",state:"CA",region:"California",pass:"None",crowd:6,lat:38.80,lon:-120.08,vertical:6,expert:6,groomers:6,snow:7,luxury:3,tier:6 },

{ name:"Mammoth Mountain",state:"CA",region:"California",pass:"Ikon",crowd:8,lat:37.63,lon:-119.03,vertical:9,expert:8,groomers:8,snow:8,luxury:5,tier:8 },/* ===========================
   WASHINGTON
=========================== */

{ name:"Crystal Mountain",state:"WA",region:"PacificNW",pass:"Ikon",crowd:7,lat:46.93,lon:-121.50,vertical:8,expert:7,groomers:6,snow:8,luxury:3,tier:7 },

{ name:"Stevens Pass",state:"WA",region:"PacificNW",pass:"Epic",crowd:7,lat:47.75,lon:-121.09,vertical:7,expert:7,groomers:6,snow:8,luxury:2,tier:7 },

{ name:"Mt Baker",state:"WA",region:"PacificNW",pass:"None",crowd:5,lat:48.86,lon:-121.68,vertical:7,expert:8,groomers:3,snow:10,luxury:1,tier:8 },

{ name:"Mission Ridge",state:"WA",region:"PacificNW",pass:"None",crowd:4,lat:47.29,lon:-120.40,vertical:6,expert:6,groomers:6,snow:6,luxury:2,tier:5 },

/* ===========================
   OREGON
=========================== */

{ name:"Mt Bachelor",state:"OR",region:"PacificNW",pass:"Ikon",crowd:7,lat:43.98,lon:-121.69,vertical:7,expert:7,groomers:7,snow:7,luxury:4,tier:7 },

{ name:"Mt Hood Meadows",state:"OR",region:"PacificNW",pass:"None",crowd:7,lat:45.33,lon:-121.66,vertical:7,expert:7,groomers:6,snow:7,luxury:3,tier:6 },

{ name:"Timberline",state:"OR",region:"PacificNW",pass:"None",crowd:6,lat:45.33,lon:-121.71,vertical:4,expert:4,groomers:6,snow:7,luxury:2,tier:4 },/* ===========================
   CANADA — BRITISH COLUMBIA
=========================== */

{ name:"Whistler Blackcomb",state:"BC",region:"CanadaWest",pass:"Epic",crowd:9,lat:50.12,lon:-122.95,vertical:10,expert:9,groomers:9,snow:8,luxury:8,tier:10 },

{ name:"Revelstoke",state:"BC",region:"CanadaWest",pass:"Ikon",crowd:6,lat:50.96,lon:-118.16,vertical:10,expert:10,groomers:5,snow:9,luxury:4,tier:10 },

{ name:"Kicking Horse",state:"BC",region:"CanadaWest",pass:"None",crowd:5,lat:51.30,lon:-117.05,vertical:9,expert:10,groomers:4,snow:8,luxury:3,tier:9 },

{ name:"Big White",state:"BC",region:"CanadaWest",pass:"Ikon",crowd:6,lat:49.72,lon:-118.93,vertical:7,expert:6,groomers:8,snow:8,luxury:4,tier:7 },

{ name:"Sun Peaks",state:"BC",region:"CanadaWest",pass:"Ikon",crowd:6,lat:50.88,lon:-119.89,vertical:7,expert:5,groomers:9,snow:7,luxury:4,tier:7 },

{ name:"SilverStar",state:"BC",region:"CanadaWest",pass:"Ikon",crowd:5,lat:50.36,lon:-119.06,vertical:6,expert:5,groomers:8,snow:7,luxury:4,tier:6 },

/* ===========================
   CANADA — ALBERTA (ROCKIES)
=========================== */

{ name:"Lake Louise",state:"AB",region:"CanadaRockies",pass:"Ikon",crowd:6,lat:51.44,lon:-116.16,vertical:8,expert:8,groomers:6,snow:7,luxury:5,tier:8 },

{ name:"Banff Sunshine",state:"AB",region:"CanadaRockies",pass:"Ikon",crowd:6,lat:51.12,lon:-115.76,vertical:8,expert:7,groomers:7,snow:7,luxury:4,tier:8 },

{ name:"Norquay",state:"AB",region:"CanadaRockies",pass:"None",crowd:4,lat:51.20,lon:-115.60,vertical:5,expert:5,groomers:6,snow:6,luxury:2,tier:5 },

/* ===========================
   CANADA — QUEBEC
=========================== */

{ name:"Mont Tremblant",state:"QC",region:"CanadaEast",pass:"Ikon",crowd:8,lat:46.21,lon:-74.59,vertical:6,expert:4,groomers:9,snow:5,luxury:6,tier:6 },

{ name:"Le Massif",state:"QC",region:"CanadaEast",pass:"None",crowd:5,lat:47.07,lon:-70.63,vertical:7,expert:7,groomers:6,snow:6,luxury:3,tier:7 },

{ name:"Mont Sainte Anne",state:"QC",region:"CanadaEast",pass:"None",crowd:5,lat:47.07,lon:-70.88,vertical:6,expert:6,groomers:7,snow:6,luxury:3,tier:6 }

];

// Make globally available
window.resorts = resorts;
