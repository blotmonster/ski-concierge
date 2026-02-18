const resorts = [

/* =====================
   NORTHEAST
===================== */

{ name:"Loon", state:"NH", pass:"Ikon",
  lat:44.0363, lon:-71.6210,
  verticalFeet:2100, snowfallInches:160,
  expertScore:6, groomerScore:8,
  luxuryScore:6, nightlifeScore:5,
  crowdScore:7, tier:6,
  hero:"https://images.unsplash.com/photo-1517821099602-ec2714fbd3f5"
},

{ name:"Cannon", state:"NH", pass:"Indy",
  lat:44.1564, lon:-71.6981,
  verticalFeet:2180, snowfallInches:200,
  expertScore:9, groomerScore:5,
  luxuryScore:3, nightlifeScore:2,
  crowdScore:5, tier:7,
  hero:"https://images.unsplash.com/photo-1483721310020-03333e577078"
},

{ name:"Killington", state:"VT", pass:"Ikon",
  lat:43.6260, lon:-72.7960,
  verticalFeet:3050, snowfallInches:250,
  expertScore:8, groomerScore:8,
  luxuryScore:7, nightlifeScore:8,
  crowdScore:8, tier:9,
  hero:"https://images.unsplash.com/photo-1483721310020-03333e577078"
},

{ name:"Sugarbush", state:"VT", pass:"Ikon",
  lat:44.1356, lon:-72.8920,
  verticalFeet:2600, snowfallInches:250,
  expertScore:9, groomerScore:6,
  luxuryScore:6, nightlifeScore:5,
  crowdScore:6, tier:8,
  hero:"https://images.unsplash.com/photo-1483721310020-03333e577078"
},

{ name:"Stowe", state:"VT", pass:"Epic",
  lat:44.53, lon:-72.78,
  verticalFeet:2360, snowfallInches:314,
  expertScore:9, groomerScore:7,
  luxuryScore:8, nightlifeScore:6,
  crowdScore:7, tier:8,
  hero:"https://images.unsplash.com/photo-1544551763-46a013bb70d5"
},

{ name:"Sugarloaf", state:"ME", pass:"Ikon",
  lat:45.03, lon:-70.31,
  verticalFeet:2820, snowfallInches:200,
  expertScore:9, groomerScore:6,
  luxuryScore:5, nightlifeScore:4,
  crowdScore:5, tier:8,
  hero:"https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5"
},

/* =====================
   UTAH
===================== */

{ name:"Alta", state:"UT", pass:"Ikon",
  lat:40.59, lon:-111.64,
  verticalFeet:3200, snowfallInches:550,
  expertScore:9, groomerScore:4,
  luxuryScore:4, nightlifeScore:2,
  crowdScore:6, tier:9,
  hero:"https://images.unsplash.com/photo-1483721310020-03333e577078"
},

{ name:"Snowbird", state:"UT", pass:"Ikon",
  lat:40.58, lon:-111.66,
  verticalFeet:3240, snowfallInches:500,
  expertScore:9, groomerScore:5,
  luxuryScore:6, nightlifeScore:4,
  crowdScore:6, tier:9,
  hero:"https://images.unsplash.com/photo-1483721310020-03333e577078"
},

{ name:"Deer Valley", state:"UT", pass:"Ikon",
  lat:40.62, lon:-111.48,
  verticalFeet:3000, snowfallInches:300,
  expertScore:6, groomerScore:9,
  luxuryScore:10, nightlifeScore:6,
  crowdScore:5, tier:9,
  hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba"
},

{ name:"Park City", state:"UT", pass:"Epic",
  lat:40.65, lon:-111.51,
  verticalFeet:3200, snowfallInches:355,
  expertScore:7, groomerScore:8,
  luxuryScore:8, nightlifeScore:8,
  crowdScore:8, tier:8,
  hero:"https://images.unsplash.com/photo-1482192596544-9eb780fc7f66"
},

/* =====================
   COLORADO
===================== */

{ name:"Vail", state:"CO", pass:"Epic",
  lat:39.64, lon:-106.37,
  verticalFeet:3450, snowfallInches:350,
  expertScore:8, groomerScore:9,
  luxuryScore:9, nightlifeScore:8,
  crowdScore:9, tier:10,
  hero:"https://images.unsplash.com/photo-1482192596544-9eb780fc7f66"
},

{ name:"Breckenridge", state:"CO", pass:"Epic",
  lat:39.48, lon:-106.07,
  verticalFeet:3400, snowfallInches:355,
  expertScore:8, groomerScore:8,
  luxuryScore:8, nightlifeScore:8,
  crowdScore:9, tier:9,
  hero:"https://images.unsplash.com/photo-1482192596544-9eb780fc7f66"
},

{ name:"Telluride", state:"CO", pass:"Epic",
  lat:37.94, lon:-107.84,
  verticalFeet:4425, snowfallInches:280,
  expertScore:9, groomerScore:6,
  luxuryScore:9, nightlifeScore:6,
  crowdScore:5, tier:9,
  hero:"https://images.unsplash.com/photo-1482192596544-9eb780fc7f66"
},

{ name:"Steamboat", state:"CO", pass:"Ikon",
  lat:40.45, lon:-106.80,
  verticalFeet:3668, snowfallInches:340,
  expertScore:7, groomerScore:8,
  luxuryScore:8, nightlifeScore:7,
  crowdScore:7, tier:9,
  hero:"https://images.unsplash.com/photo-1482192596544-9eb780fc7f66"
},

/* =====================
   WYOMING
===================== */

{ name:"Jackson Hole", state:"WY", pass:"Ikon",
  lat:43.59, lon:-110.83,
  verticalFeet:4139, snowfallInches:459,
  expertScore:10, groomerScore:5,
  luxuryScore:7, nightlifeScore:6,
  crowdScore:7, tier:10,
  hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba"
},

{ name:"Grand Targhee", state:"WY", pass:"Indy",
  lat:43.79, lon:-110.93,
  verticalFeet:2270, snowfallInches:500,
  expertScore:8, groomerScore:6,
  luxuryScore:4, nightlifeScore:2,
  crowdScore:4, tier:8,
  hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba"
},

/* =====================
   MONTANA
===================== */

{ name:"Big Sky", state:"MT", pass:"Ikon",
  lat:45.28, lon:-111.40,
  verticalFeet:4350, snowfallInches:400,
  expertScore:9, groomerScore:7,
  luxuryScore:7, nightlifeScore:5,
  crowdScore:6, tier:9,
  hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba"
},

{ name:"Whitefish", state:"MT", pass:"Indy",
  lat:48.48, lon:-114.35,
  verticalFeet:2353, snowfallInches:300,
  expertScore:7, groomerScore:7,
  luxuryScore:6, nightlifeScore:5,
  crowdScore:5, tier:8,
  hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba"
},

/* =====================
   CALIFORNIA
===================== */

{ name:"Palisades Tahoe", state:"CA", pass:"Ikon",
  lat:39.20, lon:-120.24,
  verticalFeet:2850, snowfallInches:400,
  expertScore:9, groomerScore:6,
  luxuryScore:8, nightlifeScore:6,
  crowdScore:8, tier:9,
  hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba"
},

{ name:"Mammoth", state:"CA", pass:"Ikon",
  lat:37.63, lon:-119.03,
  verticalFeet:3100, snowfallInches:400,
  expertScore:8, groomerScore:8,
  luxuryScore:7, nightlifeScore:6,
  crowdScore:7, tier:9,
  hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba"
},

{ name:"Heavenly", state:"CA", pass:"Epic",
  lat:38.93, lon:-119.94,
  verticalFeet:3500, snowfallInches:360,
  expertScore:7, groomerScore:8,
  luxuryScore:8, nightlifeScore:9,
  crowdScore:9, tier:8,
  hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba"
},

/* =====================
   OREGON
===================== */

{ name:"Mt Bachelor", state:"OR", pass:"Ikon",
  lat:43.98, lon:-121.69,
  verticalFeet:3365, snowfallInches:462,
  expertScore:8, groomerScore:8,
  luxuryScore:7, nightlifeScore:6,
  crowdScore:6, tier:9,
  hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba"
},

/* =====================
   WASHINGTON
===================== */

{ name:"Crystal Mountain", state:"WA", pass:"Ikon",
  lat:46.94, lon:-121.47,
  verticalFeet:3100, snowfallInches:486,
  expertScore:8, groomerScore:7,
  luxuryScore:6, nightlifeScore:4,
  crowdScore:7, tier:8,
  hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba"
},

{ name:"Mt Baker", state:"WA", pass:"Indy",
  lat:48.86, lon:-121.68,
  verticalFeet:2558, snowfallInches:600,
  expertScore:9, groomerScore:5,
  luxuryScore:2, nightlifeScore:1,
  crowdScore:3, tier:8,
  hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba"
},

/* =====================
   ARIZONA
===================== */

{ name:"Arizona Snowbowl", state:"AZ", pass:"Indy",
  lat:35.33, lon:-111.71,
  verticalFeet:2300, snowfallInches:260,
  expertScore:6, groomerScore:7,
  luxuryScore:4, nightlifeScore:3,
  crowdScore:6, tier:6,
  hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba"
},

/* =====================
   NEW MEXICO
===================== */

{ name:"Taos", state:"NM", pass:"Ikon",
  lat:36.59, lon:-105.45,
  verticalFeet:3281, snowfallInches:300,
  expertScore:9, groomerScore:6,
  luxuryScore:6, nightlifeScore:4,
  crowdScore:5, tier:8,
  hero:"https://images.unsplash.com/photo-1519681393784-d120267933ba"
}

];
