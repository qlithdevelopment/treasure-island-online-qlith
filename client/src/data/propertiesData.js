export function slugify(title) {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/[|&/\\#,+()$~%.'":*?<>{}]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export const propertiesData = [
  {
    id: 1,
    slug: "codename-panorama-luxury-apartments-in-bhubaneswar",
    title: "Codename Panorama – Luxury Apartments in Bhubaneswar",
    price: "₹1.38 Cr",
    priceValue: 13800000,
    pricePrefix: "Starting Price",
    beds: 5,
    baths: 5,
    sqft: 3810,
    location: "Kalinga Vihar, Subudhipur, Bhubaneswar, Odisha, India",
    type: "Apartment",
    badges: [
      "2 BHK + Study Apartments",
      "3 BHK + Servant Unit Apartments",
      "4 BHK + Servant Unit Apartments",
      "Luxury Apartments",
      "Residential Apartments",
      "For Sale",
    ],
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
  },
  {
    id: 2,
    slug: "sai-krishna-residency-commercial-units",
    title: "Sai Krishna Residency – Commercial Units",
    price: "₹42 L*",
    priceValue: 4200000,
    pricePrefix: "Starts from",
    beds: 0,
    baths: 0,
    sqft: 3810,
    location: "Near CV Raman College, Bhubaneswar, Odisha, India",
    type: "Commercial",
    badges: ["Commercial Unit", "For Sale", "Featured"],
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
  },
  {
    id: 3,
    slug: "sai-krishna-residency-1-2-3-bhk-residential-apartments",
    title: "Sai Krishna Residency – 1|2|3 BHK Residential Apartments",
    price: "₹4,200,000",
    priceValue: 4200000,
    pricePrefix: "Starts From",
    beds: 2,
    baths: 2,
    sqft: 1451,
    location: "Near CV Raman College, Bhubaneswar, Odisha, India",
    type: "Apartment",
    badges: [
      "1 BHK Apartment",
      "2 BHK Apartment",
      "3 BHK Apartment",
      "Apartment",
      "For Sale",
      "Featured",
    ],
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
  },
  {
    id: 4,
    slug: "mahima-villa-luxury-duplex-triplex-homes",
    title: "Mahima Villa – Luxury Duplex & Triplex Homes",
    price: "₹1.04 Cr",
    priceValue: 10400000,
    pricePrefix: "Starts From",
    beds: 4,
    baths: 3,
    sqft: 2200,
    location: "Kalarahanga, Patia, Bhubaneswar",
    type: "House",
    badges: ["Residential houses", "For Sale", "Featured", "Luxury"],
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
  },
  {
    id: 5,
    slug: "codename-citycentre-premium-3-bhk-residences-for-elevated-living-in-bhubaneswar",
    title:
      "Codename CityCentre – Premium 3 BHK Residences for Elevated Living in Bhubaneswar",
    price: "₹0.85 Cr",
    priceValue: 8500000,
    pricePrefix: "Starting Price",
    beds: 3,
    baths: 3,
    sqft: 1875,
    location: "Near Pandara, Bhubaneswar",
    type: "Apartment",
    badges: [
      "Residential Apartments",
      "For Sale",
      "Featured",
      "Luxury",
    ],
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
  },
  {
    id: 6,
    slug: "codename-citycentre-premium-4-bhk-residences-for-elevated-living-in-bhubaneswar",
    title:
      "Codename CityCentre – Premium 4 BHK Residences for Elevated Living in Bhubaneswar",
    price: "₹1.43 Cr",
    priceValue: 14300000,
    pricePrefix: "Starting Price",
    beds: 4,
    baths: 4,
    sqft: 3000,
    location: "Pandara, Bhubaneswar",
    type: "Apartment",
    badges: ["Residential Apartments", "For Sale"],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
  },
  {
    id: 7,
    slug: "one-world-london-tower-premium-3-bhk-apartment",
    title: "ONE WORLD | London Tower | Premium 3 BHK Apartment",
    price: "₹12,500,000",
    priceValue: 12500000,
    pricePrefix: "Starting Price",
    beds: 3,
    baths: 3,
    sqft: 1920,
    location:
      "Plot No. 423, Uttarmundamuhan, Janla, NH 16, Bhubaneswar – 752054, Odisha.",
    type: "Apartment",
    badges: ["Residential Apartment", "For Sale"],
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
  },
  {
    id: 8,
    slug: "one-world-paris-tower-premium-4-bhk-apartment",
    title: "ONE WORLD | Paris Tower | Premium 4 BHK Apartment",
    price: "₹17,900,000",
    priceValue: 17900000,
    pricePrefix: "Starting Price",
    beds: 4,
    baths: 4,
    sqft: 2650,
    location:
      "Plot No. 423, Uttarmundamuhan, Janla, NH 16, Bhubaneswar – 752054, Odisha.",
    type: "Apartment",
    badges: ["Residential Apartments", "For Sale"],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
  },
  {
    id: 9,
    slug: "niladri-heritage",
    title: "Niladri Heritage",
    price: "₹38 L",
    priceValue: 3800000,
    pricePrefix: "Starting Price",
    beds: 1,
    baths: 1,
    sqft: 462.78,
    location: "Plot No. 3, Atharnala, Puri, Odisha",
    type: "Apartment",
    badges: ["Apartment", "For Sale"],
    image:
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
  },
  {
    id: 10,
    slug: "dn-kingsland",
    title: "DN Kingsland",
    price: "₹2.85 Cr",
    priceValue: 28500000,
    pricePrefix: "Onwards",
    beds: 5,
    baths: 5,
    sqft: 4760,
    location: "Beside Maharshi College, Saheed Nagar, Bhubaneswar, Odisha",
    type: "Apartment",
    badges: ["Apartment", "For Sale", "Luxury"],
    image:
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
  },
  {
    id: 11,
    slug: "dn-yoo-odisha-luxury-branded-residences-in-gajapati-nagar-bhubaneswar",
    title:
      "DN YOO Odisha | Luxury Branded Residences in Gajapati Nagar, Bhubaneswar",
    price: "₹3.58 Cr",
    priceValue: 35800000,
    pricePrefix: "onwards",
    beds: 4,
    baths: 4,
    sqft: 3600,
    location: "Gajapati Nagar, Bhubaneswar, Odisha",
    type: "Apartment",
    badges: ["Apartment", "For Sale", "Featured"],
    image:
      "https://images.unsplash.com/photo-151295922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
  },
  {
    id: 12,
    slug: "dn-fairytale-extension",
    title: "DN Fairytale Extension",
    price: "Call for price",
    priceValue: 6500000,
    pricePrefix: null,
    beds: 3,
    baths: 2,
    sqft: 995,
    location:
      "Plot No. 313, 314, 315 & Others, Mouza-Madanpur, Dist. Khurda, Bhubaneswar – 752054",
    type: "Apartment",
    badges: ["Apartment", "For Sale"],
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
  },
  {
    id: 13,
    slug: "dn-pallaciya-kohinoor-1-bhk-fully-furnished-studio-appartment",
    title:
      "DN Pallaciya (Kohinoor) (1 BHK fully furnished Studio Appartment)",
    price: "₹45 L",
    priceValue: 4500000,
    pricePrefix: "Onwards",
    beds: 1,
    baths: 1,
    sqft: 995,
    location: "Sundarpur, Patia, Bhubaneswar",
    type: "Apartment",
    badges: ["Hotel Cum Residential", "Featured"],
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
  },
  {
    id: 14,
    slug: "amani-by-evos",
    title: "Amani by EVOS",
    price: "₹1.65 Cr",
    priceValue: 16500000,
    pricePrefix: "Onwards",
    beds: 3,
    baths: 3,
    sqft: 1850,
    location: "Plot No: 2161/7460, AT/PO/PS: Chandaka, Bhubaneswar",
    type: "Apartment",
    badges: ["Apartment", "For Sale", "Featured"],
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
  },
  {
    id: 15,
    slug: "evos-alchemy",
    title: "EVOS Alchemy",
    price: "₹2.10 Cr",
    priceValue: 21000000,
    pricePrefix: "Onwards",
    beds: 3,
    baths: 3,
    sqft: 2150,
    location: "Raghunathpur, Nandankanan Road, Bhubaneswar",
    type: "Apartment",
    badges: ["Apartment", "For Sale", "Featured"],
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
  },
  {
    id: 16,
    slug: "dn-pallaciya",
    title: "DN Pallaciya",
    price: "Rs. 1.91 Crore",
    priceValue: 19100000,
    pricePrefix: "Starting at",
    beds: 4,
    baths: 4,
    sqft: 2850,
    location:
      "Plot No. 192, 193, 194 & others, Mouza – Sundarpur, Dist. Khurda, Bhubaneswar",
    type: "Apartment",
    badges: ["Apartment", "For Sale", "Featured"],
    image:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
  },
  {
    id: 17,
    slug: "qala-a-work-of-art",
    title: "QALA – A Work of Art",
    price: "Call for price",
    priceValue: 11500000,
    pricePrefix: null,
    beds: 3,
    baths: 3,
    sqft: 1785,
    location:
      "Plot No. 1113/7105, Khata No. 432/6033, Mouza – Dumduma, Tehsil – Bhubaneswar",
    type: "Apartment",
    badges: ["Apartment", "For Sale", "Featured"],
    image:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
  },
  {
    id: 18,
    slug: "metro-kings-court",
    title: "Metro King’s Court",
    price: "Call for price",
    priceValue: 17500000,
    pricePrefix: null,
    beds: 4,
    baths: 5,
    sqft: 2100,
    location: "Near Jatani Gate, South Bhubaneswar – 752050",
    type: "Villa",
    badges: ["Villa", "For Sale", "Featured"],
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
  },
  {
    id: 19,
    slug: "panchawati-residency-premium-2-3-bhk-apartments-at-kalarahanga-patia-bhubaneswar",
    title:
      "Panchawati Residency | Premium 2 & 3 BHK Apartments at Kalarahanga, Patia, Bhubaneswar",
    price: "Call for price",
    priceValue: 7200000,
    pricePrefix: null,
    beds: 2,
    baths: 2,
    sqft: 1250,
    location: "Kalarahanga, Patia, Bhubaneswar",
    type: "Apartment",
    badges: ["Apartment", "Residential Apartment", "Featured"],
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
  },
  {
    id: 20,
    slug: "saswat-riverside-trisulia-premium-2bhk-3bhk-apartments-in-cuttack",
    title: "Saswat Riverside Trisulia | Premium 2BHK & 3BHK Apartments in Cuttack",
    price: "Call for price",
    priceValue: 6800000,
    pricePrefix: null,
    beds: 3,
    baths: 2,
    sqft: 1350,
    location: "Plot No. 108/107, Patapur, Trisulia, Cuttack",
    type: "Apartment",
    badges: ["Apartment", "For Sale"],
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
  },
  {
    id: 21,
    slug: "laxmi-fresh-living-premium-residential-apartments",
    title: "Laxmi Fresh Living – Premium Residential Apartments",
    price: "Call for price",
    priceValue: 5800000,
    pricePrefix: null,
    beds: 3,
    baths: 3,
    sqft: 1680,
    location:
      "laxmi fresh living, between twin city of cuttack&bhubaneswar, beside nh-16",
    type: "Apartment",
    badges: ["Apartment", "For Sale"],
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
  },
  {
    id: 22,
    slug: "sradha-aangan-premium-residential-apartments",
    title: "Sradha Aangan – Premium Residential Apartments",
    price: "₹7,500,000",
    priceValue: 7500000,
    pricePrefix: null,
    beds: 2,
    baths: 2,
    sqft: 1220,
    location: "Palasuni Canal Road, Bhubaneswar",
    type: "Apartment",
    badges: ["Apartment", "For Sale"],
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
  },
  {
    id: 23,
    slug: "shree-kalyan-mega-plotting-project",
    title: "Shree Kalyan Mega Plotting Project",
    price: "₹18 L",
    priceValue: 1800000,
    pricePrefix: "Onwards",
    beds: 0,
    baths: 0,
    sqft: 1800,
    location: "Shree Kalyan, Bhubaneswar, Odisha",
    type: "Land",
    badges: ["Land", "For Sale"],
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
  },
  {
    id: 24,
    slug: "luxurious-3-bhk-apartment-satya-vihar",
    title: "Luxurious 3 BHK Apartment – Satya Vihar",
    price: "₹9,800,000",
    priceValue: 9800000,
    pricePrefix: null,
    beds: 3,
    baths: 3,
    sqft: 1720,
    location: "Satya Vihar, Bhubaneswar, Odisha",
    type: "Apartment",
    badges: ["Apartment", "For Sale"],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
  },
  {
    id: 25,
    slug: "gls-chandrama",
    title: "GLS Chandrama",
    price: "₹24,300,000",
    priceValue: 24300000,
    pricePrefix: "Onwards",
    beds: 3,
    baths: 3,
    sqft: 2100,
    location: "Master Canteen Square, Bhubaneswar",
    type: "Apartment",
    badges: ["Apartment", "For Sale"],
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
  },
  {
    id: 26,
    slug: "anjani-niwas-ready-to-move-3-bhk-apartment",
    title: "Anjani Niwas – Ready-to-Move 3 BHK Apartment",
    price: "₹82 L",
    priceValue: 8200000,
    pricePrefix: "Onwards",
    beds: 3,
    baths: 3,
    sqft: 1350,
    location: "Anjani Niwas, Rajeev Nagar, Kalarahanga, Patia, Bhubaneswar",
    type: "Apartment",
    badges: ["Apartment", "For Sale"],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
  },
  {
    id: 27,
    slug: "bharat-residency-premium-4-bhk-residences-with-servant-room",
    title: "Bharat Residency – Premium 4 BHK Residences with Servant Room",
    price: "Call for price",
    priceValue: 18500000,
    pricePrefix: null,
    beds: 4,
    baths: 4,
    sqft: 3004,
    location: "Bhubaneswar, Odisha",
    type: "Apartment",
    badges: ["Apartment", "For Sale"],
    image:
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
  },
];

const saiKrishnaCommercial = {
  id: 2,
  slug: "2",
  title: "Sai Krishna Residency – Commercial Units",
  subtitle: "Premium Commercial Spaces in Bhubaneswar",
  price: "₹42 L*",
  pricePrefix: "Starts From",
  category: "For Sale",
  type: "Commercial Unit",
  status: "For Sale",
  dateAdded: "Added 1 week ago",
  location: "Near CV Raman College, Bhubaneswar, Odisha, India",
  floors: 6,
  floorsLabel: "Ground + 5 Floors",
  units: 12,
  contactPhone: "+91 9348980948",
  tower: 1,
  towerLabel: "Dedicated Commercial Block",
  floorStructure: "Earthquake-resistant R.C.C. frame",
  sqft: 3810,
  badges: ["Commercial Unit", "For Sale", "Featured"],
  description:
    "Discover Sai Krishna Residency, a residential and commercial development in Bhubaneswar, Odisha, featuring a dedicated commercial complex designed to serve the surrounding community.",
  commercialProjectDetails: {
    block: "1",
    floors: "Ground + 5 floors",
    totalUnits: "12",
  },
  projectHighlights: [
    "Dedicated commercial complex",
    "Located within Sai Krishna Residency",
    "Residential development with 486 residential units across 11 residential blocks",
    "Car parking facilities and other project amenities are mentioned in the project brochure",
  ],
  enquiriesNote:
    "For commercial unit pricing, availability, unit sizes, permitted business uses and site visits, please contact the project sales team.",
  neighborhoods: [
    "AIIMS Bhubaneswar",
    "Bhubaneswar",
    "National Highway",
    "Near C. V. Raman College",
    "Odisha",
    "Retang Railway Station",
  ],
  buildingDetails: {
    floorCovering: ["Anti-Skid Ceramic Tiles", "Floor Tiles"],
    exteriorMaterial: "Cement Paint",
    parking: "Car Parking Facilities",
    structure: "Earthquake-resistant R.C.C. frame",
  },
  documents: [
    {
      name: "SKR-NEW-BROUCHER.pdf",
      size: "4.05 MB",
      type: "PDF Brochure",
    },
  ],
  amenities: [
    "Badminton Court",
    "Basketball Court",
    "Borewell Water Supply",
    "Car Parking Facilities",
    "Power Backup Supply",
    "24/7 Security & CCTV",
    "Gated Community Access",
    "Landscaped Greenery",
  ],
  features: [
    "12 Commercial Units",
    "Dedicated Commercial Block",
    "Gated Community",
    "Ground + 5 Floors",
    "High Visibility Road Frontage",
    "Visitor Vehicle Bays",
  ],
  nearbySchools: [
    {
      level: "Elementary School",
      name: "St. Xavier’s High School",
      address:
        "Near Tarini Mandir, Samantarapur, Old Town, Bhubaneswar, Odisha 751002",
    },
    {
      level: "Secondary School",
      name: "Navajyoti Science Higher Secondary School",
      address:
        "6RJX+882, Mahaveer Nagar, Bhubaneswar, Odisha 751002",
    },
    {
      level: "High School",
      name: "C.V. Raman Public School",
      address:
        "Near Lewis Rd, Samantarapur, Mahaveer Nagar, Bhubaneswar, Odisha 751002",
    },
  ],
  images: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
  ],
  videoUrl:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  videoPoster:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
  relatedPropertyIds: [3, 1, 4],
};

export const detailedProperties = {
  "2": saiKrishnaCommercial,
  "sai-krishna-residency-commercial-units": saiKrishnaCommercial,
};

export function getPropertyBySlug(slug) {
  if (!slug) return null;
  const normalizedSlug = String(slug).toLowerCase().trim();

  if (detailedProperties[normalizedSlug]) {
    return detailedProperties[normalizedSlug];
  }

  const detailedMatch = Object.values(detailedProperties).find(
    (item) => String(item.id) === normalizedSlug || item.slug === normalizedSlug
  );
  if (detailedMatch) {
    return detailedMatch;
  }

  const found = propertiesData.find(
    (p) => String(p.id) === normalizedSlug || p.slug === normalizedSlug
  );

  if (!found) return null;

  return {
    ...found,
    subtitle: `${found.type} in Bhubaneswar`,
    category: "For Sale",
    status: "For Sale",
    dateAdded: "Recently Added",
    floors: found.beds > 0 ? found.beds : 4,
    floorsLabel: "Ground + Upper Floors",
    units: 1,
    contactPhone: "+91 9348980948",
    tower: 1,
    towerLabel: "Main Tower",
    floorStructure: "Earthquake-resistant R.C.C. frame",
    description: `Discover ${found.title}, an exceptional ${found.type.toLowerCase()} opportunity located in ${found.location}. Developed with premium construction standards, thoughtful architecture, and supreme connectivity.`,
    commercialProjectDetails: null,
    projectHighlights: [
      "Prime Bhubaneswar Strategic Location",
      "RERA Compliant & Verified Documentation",
      "Premium Quality Construction & Finishes",
      "Clear Title & Direct Developer Pricing",
    ],
    enquiriesNote:
      "For property unit pricing, current availability, site visits, and customized payment plans, please contact our property advisory team.",
    neighborhoods: [
      "Bhubaneswar",
      "National Highway Corridor",
      "Odisha",
      "Prime City Hub",
    ],
    buildingDetails: {
      floorCovering: ["Vitrified Floor Tiles", "Anti-Skid Ceramic Tiles"],
      exteriorMaterial: "Weather-proof Premium Emulsion Paint",
      parking: "Dedicated Covered Car Parking",
      structure: "Earthquake-resistant R.C.C. frame",
    },
    documents: [
      {
        name: "Project-Brochure.pdf",
        size: "3.80 MB",
        type: "PDF Brochure",
      },
    ],
    amenities: [
      "Car Parking Facilities",
      "24/7 Water Supply",
      "Power Backup",
      "Gated Security",
      "Landscaped Open Areas",
    ],
    features: [
      "Modern Architectural Design",
      "Vastu Compliant Planning",
      "High Speed Elevators",
      "Clear Title Documentation",
    ],
    nearbySchools: [
      {
        level: "School",
        name: "Renowned International School",
        address: "Near Central Highway, Bhubaneswar, Odisha",
      },
    ],
    images: [
      found.image,
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    ],
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    videoPoster: found.image,
    relatedPropertyIds: [1, 2, 3].filter((id) => id !== found.id),
  };
}
