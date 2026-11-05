import {
  getPropertyBySlug as getBasePropertyBySlug,
  slugify,
} from "../data/propertiesData";
import { villa1, villa2, interiorLiving } from "../assets/properties";

const STORAGE_KEY = "treasure_island_custom_properties";

export function normalizeCustomProperty(p) {
  if (!p) return null;

  const rawPrice = p.listing_price ?? p.priceValue ?? p.price;
  let numPrice = 0;
  if (typeof rawPrice === "number") {
    numPrice = rawPrice;
  } else if (typeof rawPrice === "string" && rawPrice.trim()) {
    const clean = rawPrice.trim().toLowerCase();
    const parsed = parseFloat(clean.replace(/[^0-9.]/g, ""));
    if (!isNaN(parsed)) {
      if (clean.includes("cr")) numPrice = parsed * 10000000;
      else if (clean.includes("lac") || clean.includes("l")) numPrice = parsed * 100000;
      else numPrice = parsed;
    }
  }

  if (numPrice > 0 && numPrice < 1000) {
    numPrice = numPrice * 100000;
  }
  if (numPrice <= 0) {
    numPrice = 7500000;
  }

  let displayPrice = "₹75.00 Lacs";
  if (numPrice >= 10000000) {
    displayPrice = `₹${(numPrice / 10000000).toFixed(2)} Cr`;
  } else if (numPrice >= 100000) {
    displayPrice = `₹${(numPrice / 100000).toFixed(2)} Lacs`;
  } else {
    displayPrice = `₹${numPrice.toLocaleString("en-IN")}`;
  }

  const rawBeds = p.bedrooms ?? p.beds;
  const bedsCount = typeof rawBeds === "number" && rawBeds > 0 ? rawBeds : parseInt(String(rawBeds || "").replace(/[^0-9]/g, ""), 10) || 0;
  const bedroomsStr = p.bedrooms && p.bedrooms !== "Custom Units" && String(p.bedrooms).trim()
    ? String(p.bedrooms).trim()
    : bedsCount > 0
    ? `${bedsCount} BHK`
    : "";

  const rawBaths = p.bathrooms ?? p.baths;
  const bathsCount = typeof rawBaths === "number" && rawBaths > 0 ? rawBaths : parseInt(String(rawBaths || "").replace(/[^0-9]/g, ""), 10) || 0;
  const bathroomsStr = p.bathrooms && String(p.bathrooms).trim()
    ? String(p.bathrooms).trim()
    : bathsCount > 0
    ? `${bathsCount} Baths`
    : "";

  const rawArea = p.property_area ?? p.sqft;
  const sqftArea = typeof rawArea === "number" && rawArea > 0 ? rawArea : parseFloat(String(rawArea || "").replace(/[^0-9.]/g, "")) || 0;
  const areaUnitStr = p.area_unit || "Sq. Ft.";

  const loc = p.locality
    ? `${p.locality}${p.city ? `, ${p.city}` : ""}`
    : p.location || p.city || "";

  return {
    ...p,
    listing_price: numPrice,
    price: displayPrice,
    priceValue: numPrice,
    pricePrefix: p.price_type || p.pricePrefix || "Starting Price",
    price_type: p.price_type || p.pricePrefix || "Total Price",
    bedrooms: bedroomsStr,
    beds: bedsCount,
    bathrooms: bathroomsStr,
    baths: bathsCount,
    balconies: p.balconies || "",
    property_area: sqftArea,
    sqft: sqftArea,
    area_unit: areaUnitStr,
    location: loc,
    locality: p.locality || "",
    city: p.city || "",
  };
}

export function getCustomProperties() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list.map(normalizeCustomProperty) : [];
  } catch {
    return [];
  }
}

export function getAllProperties() {
  return getCustomProperties();
}

export function saveCustomProperty(propertyInput) {
  const custom = getCustomProperties();
  const id = propertyInput.id || Date.now();
  const slug = propertyInput.slug || slugify(propertyInput.title);

  const normalized = normalizeCustomProperty({
    ...propertyInput,
    id,
    slug,
    isCustom: true,
  });

  const coverImg =
    normalized.cover_image?.trim() ||
    normalized.image?.trim() ||
    villa1;

  let gallery = [];
  if (Array.isArray(normalized.gallery_images) && normalized.gallery_images.length > 0) {
    gallery = normalized.gallery_images.filter(Boolean);
  } else if (Array.isArray(normalized.images) && normalized.images.length > 0) {
    gallery = normalized.images.filter(Boolean);
  } else if (typeof normalized.gallery_images === "string" && normalized.gallery_images.trim()) {
    try {
      const parsed = JSON.parse(normalized.gallery_images);
      if (Array.isArray(parsed)) gallery = parsed.filter(Boolean);
      else gallery = normalized.gallery_images.split("\n").map((s) => s.trim()).filter(Boolean);
    } catch {
      gallery = normalized.gallery_images.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);
    }
  } else if (typeof normalized.images === "string" && normalized.images.trim()) {
    try {
      const parsed = JSON.parse(normalized.images);
      if (Array.isArray(parsed)) gallery = parsed.filter(Boolean);
      else gallery = normalized.images.split("\n").map((s) => s.trim()).filter(Boolean);
    } catch {
      gallery = normalized.images.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);
    }
  }

  if (!gallery.includes(coverImg)) {
    gallery.unshift(coverImg);
  }
  if (gallery.length === 0) {
    gallery = [
      coverImg,
      villa2,
      interiorLiving,
    ];
  }

  const badges = Array.isArray(normalized.badges)
    ? normalized.badges
    : typeof normalized.badges === "string" && normalized.badges.trim()
    ? normalized.badges.split(",").map((s) => s.trim()).filter(Boolean)
    : [normalized.type || normalized.property_type || "Apartment", normalized.listing_type || "For Sale"];

  const amenities = Array.isArray(normalized.amenities)
    ? normalized.amenities
    : typeof normalized.amenities === "string" && normalized.amenities.trim()
    ? normalized.amenities.split(",").map((s) => s.trim()).filter(Boolean)
    : [
        "Car Parking Facilities",
        "24/7 Water Supply",
        "100% Power Backup",
        "Gated 24/7 Security",
        "Vastu Compliant Planning",
        "Landscaped Green Areas",
      ];

  const newProperty = {
    ...normalized,
    id,
    slug,
    title: normalized.title?.trim() || "Luxury Property in Bhubaneswar",
    isCustom: true,
    badges,
    amenities,
    image: coverImg,
    cover_image: coverImg,
    images: gallery,
    gallery_images: gallery,
    video_url:
      normalized.video_url?.trim() ||
      normalized.videoUrl?.trim() ||
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    videoUrl:
      normalized.videoUrl?.trim() ||
      normalized.video_url?.trim() ||
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    virtual_tour_url:
      normalized.virtual_tour_url?.trim() ||
      normalized.virtualTourUrl?.trim() ||
      "",
    virtualTourUrl:
      normalized.virtualTourUrl?.trim() ||
      normalized.virtual_tour_url?.trim() ||
      "",
    description:
      normalized.description?.trim() ||
      `Discover ${normalized.title}, an exclusive ${normalized.type || "Apartment"} development located in ${normalized.location}. Designed to the highest architectural standards with luxury finishes and strategic highway connectivity.`,
  };

  const updated = [newProperty, ...custom.filter((p) => p.id !== id && p.slug !== slug)];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to save property to localStorage:", err);
  }
  return newProperty;
}

export function deleteCustomProperty(id) {
  const custom = getCustomProperties();
  const updated = custom.filter((p) => p.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
  return updated;
}

export function getPropertyBySlugOrId(slugOrId) {
  if (!slugOrId) return null;
  const normalized = String(slugOrId).trim().toLowerCase();

  const customList = getCustomProperties();
  const customMatch = customList.find(
    (p) => String(p.id) === normalized || p.slug === normalized
  );

  if (customMatch) {
    return {
      subtitle: `${customMatch.type} in Bhubaneswar`,
      category: customMatch.category || "For Sale",
      status: customMatch.listing_status || "For Sale",
      dateAdded: "Recently Added",
      floors: customMatch.beds > 0 ? customMatch.beds : 4,
      floorsLabel: customMatch.total_floors ? `${customMatch.total_floors} Floors` : "Ground + Upper Floors",
      units: customMatch.total_units || 1,
      contactPhone: "+91 9348980948",
      tower: 1,
      towerLabel: "Main Tower",
      floorStructure: "Earthquake-resistant R.C.C. frame",
      description:
        customMatch.description ||
        `Discover ${customMatch.title}, an exceptional ${String(customMatch.type).toLowerCase()} opportunity located in ${customMatch.location}. Developed with premium construction standards, thoughtful architecture, and supreme connectivity.`,
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
        parking: customMatch.parking_availability || "Dedicated Covered Car Parking",
        structure: "Earthquake-resistant R.C.C. frame",
      },
      documents: [
        {
          name: "Project-Brochure.pdf",
          size: "3.80 MB",
          type: "PDF Brochure",
        },
      ],
      amenities:
        customMatch.amenities && customMatch.amenities.length > 0
          ? customMatch.amenities
          : [
              "Car Parking Facilities",
              "24/7 Water Supply",
              "100% Power Backup",
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
      images:
        customMatch.images && customMatch.images.length > 0
          ? customMatch.images
          : [customMatch.image],
      videoUrl:
        customMatch.videoUrl ||
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      videoPoster: customMatch.image,
      relatedPropertyIds: customList.map((p) => p.id).filter((id) => id !== customMatch.id),
      ...customMatch,
    };
  }

  return getBasePropertyBySlug(slugOrId);
}
