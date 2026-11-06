import api from "./api";
import {
  getAllProperties,
  deleteCustomProperty,
  getPropertyBySlugOrId,
} from "../utils/propertyStorage";
import {
  villa1,
  villa2,
  apartment1,
  interiorLiving,
} from "../assets/properties";

const FALLBACK_JPEG_BASE64 =
  "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=";

function createFallbackImageFile(filename = "image.jpg") {
  try {
    const binary = atob(FALLBACK_JPEG_BASE64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new File([bytes], filename, { type: "image/jpeg" });
  } catch {
    return null;
  }
}

function dataURLtoBlob(dataurl) {
  try {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch {
    return null;
  }
}

async function convertToFile(val, filename = "image.jpg") {
  if (!val) return null;

  if (val instanceof File) return val;
  if (val instanceof Blob) {
    return new File([val], filename, { type: val.type || "image/jpeg" });
  }

  if (typeof val === "string") {
    const trimmed = val.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("data:image/")) {
      const blob = dataURLtoBlob(trimmed);
      if (blob) {
        return new File([blob], filename, { type: blob.type || "image/jpeg" });
      }
    }

    let url = trimmed;
    if (url.includes("/storage/")) {
      url = url.substring(url.indexOf("/storage/"));
    } else if (!url.startsWith("http://") && !url.startsWith("https://") && !url.startsWith("data:")) {
      const cleanPath = url.replace(/^\/+/, "");
      url = `/storage/${cleanPath}`;
    }

    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const blob = await res.blob();
          if (blob && blob.size > 0) {
            const type = blob.type && blob.type.startsWith("image/") ? blob.type : "image/jpeg";
            const ext = type.includes("png") ? "png" : type.includes("webp") ? "webp" : "jpg";
            const safeName = filename.includes(".") ? filename : `${filename}.${ext}`;
            return new File([blob], safeName, { type });
          }
        }
      } catch {}
    }

    return createFallbackImageFile(filename);
  }

  return null;
}

export const formatProperty = (item) => {
  if (!item) return null;

  let numPrice = 0;
  const rawPrice = item.listing_price ?? item.priceValue ?? item.price;
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

  let formattedPrice = "Price on Request";
  if (typeof item.price === "string" && item.price.trim() && isNaN(Number(item.price.replace(/[^0-9.]/g, "")))) {
    formattedPrice = item.price.trim();
  }
  if (numPrice >= 10000000) {
    formattedPrice = `₹${(numPrice / 10000000).toFixed(2)} Cr`;
  } else if (numPrice >= 100000) {
    formattedPrice = `₹${(numPrice / 100000).toFixed(2)} Lacs`;
  } else if (numPrice > 0) {
    formattedPrice = `₹${numPrice.toLocaleString("en-IN")}`;
  }

  const resolveImage = (img) => {
    if (!img) return villa1;
    if (typeof img !== "string") return "";
    const trimmed = img.trim();
    if (!trimmed) return villa1;
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:")) {
      return trimmed;
    }
    const lower = trimmed.toLowerCase();
    if (lower.includes("sample.jpg") || lower.includes("cover/sample")) {
      return apartment1;
    }
    if (lower.includes("sample1")) {
      return villa2;
    }
    if (lower.includes("sample2")) {
      return interiorLiving;
    }
    if (lower.includes("sample")) {
      return villa1;
    }
    const cleanPath = trimmed.replace(/^\/+/, "");
    return `${import.meta.env.VITE_BACKEND_URL}/storage/${cleanPath}`;
  };

  const coverImg = resolveImage(item.cover_image || item.image);

  let gallery = [];
  if (Array.isArray(item.gallery_images) && item.gallery_images.length > 0) {
    gallery = item.gallery_images.map(resolveImage);
  } else if (Array.isArray(item.images) && item.images.length > 0) {
    gallery = item.images.map(resolveImage);
  } else if (typeof item.gallery_images === "string" && item.gallery_images.trim()) {
    try {
      const parsed = JSON.parse(item.gallery_images);
      if (Array.isArray(parsed)) gallery = parsed.map(resolveImage);
      else gallery = item.gallery_images.split("\n").map((s) => s.trim()).filter(Boolean).map(resolveImage);
    } catch {
      gallery = item.gallery_images.split(/[\n,]/).map((s) => s.trim()).filter(Boolean).map(resolveImage);
    }
  } else if (typeof item.images === "string" && item.images.trim()) {
    try {
      const parsed = JSON.parse(item.images);
      if (Array.isArray(parsed)) gallery = parsed.map(resolveImage);
      else gallery = item.images.split("\n").map((s) => s.trim()).filter(Boolean).map(resolveImage);
    } catch {
      gallery = item.images.split(/[\n,]/).map((s) => s.trim()).filter(Boolean).map(resolveImage);
    }
  }

  gallery = gallery.filter(
    (g) =>
      Boolean(g) &&
      typeof g === "string" &&
      g.trim().length > 0 &&
      g !== coverImg &&
      !g.includes("cover_synced")
  );
  gallery = Array.from(new Set(gallery));

  const rawAmenities = Array.isArray(item.amenities)
    ? item.amenities
    : typeof item.amenities === "string" && item.amenities.trim()
    ? (() => {
        try {
          const parsed = JSON.parse(item.amenities);
          return Array.isArray(parsed) ? parsed : item.amenities.split(",").map((s) => s.trim()).filter(Boolean);
        } catch {
          return item.amenities.split(",").map((s) => s.trim()).filter(Boolean);
        }
      })()
    : [];

  const rawNearby = Array.isArray(item.nearby_places)
    ? item.nearby_places
    : typeof item.nearby_places === "string" && item.nearby_places.trim()
    ? (() => {
        try {
          const parsed = JSON.parse(item.nearby_places);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      })()
    : [];

  const resolveFile = (file) => {
    if (!file || typeof file !== "string") return "";
    const trimmed = file.trim();
    if (!trimmed) return "";
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:")) {
      return trimmed;
    }
    const cleanPath = trimmed.replace(/^\/+/, "");
    return `${import.meta.env.VITE_BACKEND_URL}/storage/${cleanPath}`;
  };

  let floorPlans = [];
  if (Array.isArray(item.floor_plan_images)) {
    floorPlans = item.floor_plan_images.map(resolveFile).filter(Boolean);
  } else if (typeof item.floor_plan_images === "string" && item.floor_plan_images.trim()) {
    try {
      const parsed = JSON.parse(item.floor_plan_images);
      if (Array.isArray(parsed)) floorPlans = parsed.map(resolveFile).filter(Boolean);
      else floorPlans = item.floor_plan_images.split("\n").map((s) => s.trim()).filter(Boolean).map(resolveFile);
    } catch {
      floorPlans = item.floor_plan_images.split(/[\n,]/).map((s) => s.trim()).filter(Boolean).map(resolveFile);
    }
  }

  let amenitiesImages = [];
  if (Array.isArray(item.amenities_images)) {
    amenitiesImages = item.amenities_images.map(resolveFile).filter(Boolean);
  } else if (typeof item.amenities_images === "string" && item.amenities_images.trim()) {
    try {
      const parsed = JSON.parse(item.amenities_images);
      if (Array.isArray(parsed)) amenitiesImages = parsed.map(resolveFile).filter(Boolean);
      else amenitiesImages = item.amenities_images.split("\n").map((s) => s.trim()).filter(Boolean).map(resolveFile);
    } catch {
      amenitiesImages = item.amenities_images.split(/[\n,]/).map((s) => s.trim()).filter(Boolean).map(resolveFile);
    }
  }

  const brochureUrl = resolveFile(item.brochure);

  const loc = item.locality
    ? `${item.locality}${item.city ? `, ${item.city}` : ""}`
    : item.location || item.city || "";

  const rawBeds = item.bedrooms ?? item.beds;
  const bedsCount = typeof rawBeds === "number" && rawBeds > 0 ? rawBeds : parseInt(String(rawBeds || "").replace(/[^0-9]/g, ""), 10) || 0;
  const bedroomsStr = item.bedrooms && item.bedrooms !== "Custom Units" && String(item.bedrooms).trim()
    ? String(item.bedrooms).trim()
    : bedsCount > 0
    ? `${bedsCount} BHK`
    : "";

  const rawBaths = item.bathrooms ?? item.baths;
  const bathsCount = typeof rawBaths === "number" && rawBaths > 0 ? rawBaths : parseInt(String(rawBaths || "").replace(/[^0-9]/g, ""), 10) || 0;
  const bathroomsStr = item.bathrooms && String(item.bathrooms).trim()
    ? String(item.bathrooms).trim()
    : bathsCount > 0
    ? `${bathsCount} Baths`
    : "";

  const rawArea = item.property_area ?? item.sqft;
  const sqftArea = typeof rawArea === "number" && rawArea > 0 ? rawArea : parseFloat(String(rawArea || "").replace(/[^0-9.]/g, "")) || 0;
  const areaUnitStr = item.area_unit || "Sq. Ft.";

  return {
    ...item,
    id: item.id,
    title: item.title,
    slug: item.slug,
    type: item.property_type || item.type || "Apartment",
    property_type: item.property_type || item.type || "Apartment",
    listing_type: item.listing_type || "For Sale",
    category: item.category || "Residential",
    listing_status: item.listing_status || "Published",
    isFeatured: Boolean(item.is_featured ?? item.isFeatured),
    is_featured: Boolean(item.is_featured ?? item.isFeatured),
    price: formattedPrice,
    pricePrefix: item.price_type || item.pricePrefix || "Starting Price",
    priceValue: numPrice,
    listing_price: numPrice > 0 ? numPrice : (Number(item.listing_price) || 0),
    price_type: item.price_type || "Total Price",
    is_negotiable: Boolean(item.is_negotiable),
    maintenance_charges: item.maintenance_charges,
    property_area: sqftArea,
    area_unit: areaUnitStr,
    sqft: sqftArea,
    beds: bedsCount,
    bedrooms: bedroomsStr,
    baths: bathsCount,
    bathrooms: bathroomsStr,
    balconies: item.balconies || "",
    floor_number: item.floor_number !== undefined && item.floor_number !== null ? item.floor_number : "",
    total_floors: item.total_floors !== undefined && item.total_floors !== null ? item.total_floors : "",
    furnishing_status: item.furnishing_status || "",
    property_age: item.property_age || "",
    facing_direction: item.facing_direction || "",
    possession_status: item.possession_status || "",
    country: item.country || "",
    state: item.state || "",
    city: item.city || "",
    locality: item.locality || "",
    location: loc,
    full_address: item.full_address || loc,
    pin_code: item.pin_code || "",
    landmark: item.landmark || "",
    google_maps_url: item.google_maps_url || "",
    latitude: item.latitude || "",
    longitude: item.longitude || "",
    cover_image: coverImg,
    image: coverImg,
    gallery_images: gallery,
    images: gallery,
    floor_plan_images: floorPlans,
    amenities_images: amenitiesImages,
    video_url: item.video_url || item.videoUrl || "",
    videoUrl: item.video_url || item.videoUrl || "",
    virtual_tour_url: item.virtual_tour_url || item.virtualTourUrl || "",
    virtualTourUrl: item.virtual_tour_url || item.virtualTourUrl || "",
    brochure: brochureUrl,
    brochure_name: item.brochure_name || "",
    project_name: item.project_name || "",
    builder_name: item.builder_name || "",
    construction_status: item.construction_status || "",
    year_of_completion: item.year_of_completion || "",
    total_units: item.total_units || "",
    available_units: item.available_units || "",
    parking_availability: item.parking_availability || "",
    rera_number: item.rera_number || "",
    amenities: rawAmenities,
    nearby_places: rawNearby,
    short_description: item.short_description || "",
    description: item.description || "",
    badges: [
      item.listing_type || "For Sale",
      item.category || "Residential",
      item.property_type || item.type || "Apartment",
    ].filter(Boolean),
  };
};

export const getProperties = async (params = {}) => {
  try {
    const page = Number(params.page) || 1;
    const perPage = Number(params.per_page || params.pageSize) || 10;
    const cleanParams = { ...params, page, per_page: perPage };
    delete cleanParams.pageSize;
    if (!cleanParams.property_type || cleanParams.property_type === "All") {
      delete cleanParams.property_type;
    }
    if (!cleanParams.search || !String(cleanParams.search).trim()) {
      delete cleanParams.search;
    } else {
      cleanParams.search = String(cleanParams.search).trim();
    }

    const res = await api.get("/properties", { params: cleanParams });
    const payload = res.data?.data;

    let items = [];

    if (payload && Array.isArray(payload.data)) {
      items = payload.data;
      if (typeof window !== "undefined" && Array.isArray(items)) {
        try {
          localStorage.removeItem("treasure_island_custom_properties");
          localStorage.removeItem("custom_properties");
        } catch {}
      }
      const formatted = items.map(formatProperty).filter(Boolean);
      formatted.total = typeof payload.total === "number" ? payload.total : items.length;
      formatted.last_page = typeof payload.last_page === "number" ? payload.last_page : Math.max(1, Math.ceil(formatted.total / perPage));
      formatted.current_page = typeof payload.current_page === "number" ? payload.current_page : page;
      formatted.per_page = typeof payload.per_page === "number" ? payload.per_page : perPage;
      return formatted;
    } else if (Array.isArray(payload)) {
      items = payload;
      if (typeof window !== "undefined" && Array.isArray(items)) {
        try {
          localStorage.removeItem("treasure_island_custom_properties");
          localStorage.removeItem("custom_properties");
        } catch {}
      }
      let filtered = items.map(formatProperty).filter(Boolean);
      if (params.property_type && params.property_type !== "All") {
        const pt = String(params.property_type).trim().toLowerCase();
        filtered = filtered.filter(
          (p) => String(p.property_type || p.type || "").trim().toLowerCase() === pt
        );
      }
      if (params.search && typeof params.search === "string" && params.search.trim()) {
        const q = params.search.trim().toLowerCase();
        filtered = filtered.filter((p) => {
          const title = String(p.title || "").toLowerCase();
          const locality = String(p.locality || p.location || p.city || "").toLowerCase();
          const slug = String(p.slug || "").toLowerCase();
          return title.includes(q) || locality.includes(q) || slug.includes(q);
        });
      }
      const startIndex = (page - 1) * perPage;
      const paged = filtered.slice(startIndex, startIndex + perPage);
      paged.total = filtered.length;
      paged.last_page = Math.max(1, Math.ceil(filtered.length / perPage));
      paged.current_page = page;
      paged.per_page = perPage;
      return paged;
    }

    return [];
  } catch {
    const all = getAllProperties();
    let filtered = all;
    if (params.search && String(params.search).trim()) {
      const q = String(params.search).trim().toLowerCase();
      filtered = filtered.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.locality && p.locality.toLowerCase().includes(q)) ||
          (p.location && p.location.toLowerCase().includes(q)) ||
          (p.slug && p.slug.toLowerCase().includes(q))
      );
    }
    if (params.property_type && params.property_type !== "All") {
      const pt = String(params.property_type).trim().toLowerCase();
      filtered = filtered.filter(
        (p) => String(p.property_type || p.type || "").trim().toLowerCase() === pt
      );
    }
    const page = Number(params.page) || 1;
    const perPage = Number(params.per_page || params.pageSize) || 10;
    const startIndex = (page - 1) * perPage;
    const paged = filtered.slice(startIndex, startIndex + perPage);
    paged.total = filtered.length;
    paged.last_page = Math.max(1, Math.ceil(filtered.length / perPage));
    paged.current_page = page;
    paged.per_page = perPage;
    return paged;
  }
};

export const getPropertyById = async (idOrSlug) => {
  if (!idOrSlug) return null;
  const normalized = String(idOrSlug).trim();
  const isNumeric = /^\d+$/.test(normalized);

  if (isNumeric) {
    try {
      const res = await api.get(`/properties/${encodeURIComponent(normalized)}`);
      if (res.data?.data) {
        return formatProperty(res.data.data);
      }
    } catch {}
  }

  try {
    const res = await api.get("/properties", { params: { search: normalized, per_page: 50 } });
    const payload = res.data?.data;
    const list = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.data)
      ? payload.data
      : [];
    const match = list.find((item) => item.slug === normalized || String(item.id) === normalized);
    if (match) {
      return formatProperty(match);
    }
  } catch {}

  const fallback = getPropertyBySlugOrId(idOrSlug);
  if (fallback) return fallback;

  return null;
};

function isValidHttpUrl(str) {
  if (!str || typeof str !== "string") return false;
  const trimmed = str.trim();
  if (!trimmed) return false;
  try {
    const url = new URL(trimmed.startsWith("http://") || trimmed.startsWith("https://") ? trimmed : `https://${trimmed}`);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function toHttpUrl(str) {
  if (!str || typeof str !== "string") return "";
  const trimmed = str.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return `https://${trimmed}`;
}

async function prepareFormDataPayload(data, isUpdate = false) {
  if (typeof FormData === "undefined") {
    return data;
  }
  if (data instanceof FormData) {
    return data;
  }

  const fd = new FormData();

  const rawCover = data.cover_image || data.image;
  let coverFile = null;
  if (rawCover instanceof File) {
    coverFile = rawCover;
  } else if (rawCover instanceof Blob) {
    coverFile = new File([rawCover], "cover.jpg", { type: rawCover.type || "image/jpeg" });
  } else if (typeof rawCover === "string" && rawCover.trim().startsWith("data:image/")) {
    const blob = dataURLtoBlob(rawCover.trim());
    if (blob) {
      coverFile = new File([blob], "cover.jpg", { type: blob.type || "image/jpeg" });
    }
  }

  const galleryList = Array.isArray(data.gallery_images)
    ? data.gallery_images
    : Array.isArray(data.images)
    ? data.images
    : typeof data.gallery_images === "string" && data.gallery_images.trim()
    ? data.gallery_images.split("\n").map((s) => s.trim()).filter(Boolean)
    : [];

  const hasNewGalleryUploads = galleryList.some(
    (item) =>
      item instanceof File ||
      item instanceof Blob ||
      (typeof item === "string" && item.trim().startsWith("data:image/"))
  );

  const galleryFiles = [];
  if (hasNewGalleryUploads || !isUpdate) {
    const timestamp = Date.now();
    for (let idx = 0; idx < galleryList.length; idx++) {
      const file = await convertToFile(galleryList[idx], `property_gallery_${timestamp}_${idx}.jpg`);
      if (file) {
        galleryFiles.push(file);
      }
    }
  }

  if (!isUpdate) {
    if (!coverFile) {
      coverFile = createFallbackImageFile("cover.jpg");
    }
    if (coverFile) {
      fd.append("cover_image", coverFile, coverFile.name || "cover.jpg");
    }
    if (galleryFiles.length > 0) {
      galleryFiles.forEach((file, idx) => {
        fd.append("gallery_images[]", file, file.name || `property_gallery_${idx}.jpg`);
      });
    }
  } else {
    if (coverFile) {
      fd.append("cover_image", coverFile, coverFile.name || "cover.jpg");
    }
    if (galleryFiles.length > 0) {
      galleryFiles.forEach((file, idx) => {
        fd.append("gallery_images[]", file, file.name || `property_gallery_${idx}.jpg`);
      });
    }
  }

  const floorPlanList = Array.isArray(data.floor_plan_images)
    ? data.floor_plan_images
    : typeof data.floor_plan_images === "string" && data.floor_plan_images.trim()
    ? data.floor_plan_images.split("\n").map((s) => s.trim()).filter(Boolean)
    : [];

  const hasNewFloorPlanUploads = floorPlanList.some(
    (item) =>
      item instanceof File ||
      item instanceof Blob ||
      (typeof item === "string" && item.trim().startsWith("data:image/"))
  );

  const floorPlanFiles = [];
  if (hasNewFloorPlanUploads || !isUpdate) {
    for (let idx = 0; idx < floorPlanList.length; idx++) {
      const file = await convertToFile(floorPlanList[idx], `floor_plan_${idx}.jpg`);
      if (file) {
        floorPlanFiles.push(file);
      }
    }
  }

  if (floorPlanFiles.length > 0) {
    floorPlanFiles.forEach((file, idx) => {
      fd.append("floor_plan_images[]", file, file.name || `floor_plan_${idx}.jpg`);
    });
  }

  const amenitiesImagesList = Array.isArray(data.amenities_images)
    ? data.amenities_images
    : typeof data.amenities_images === "string" && data.amenities_images.trim()
    ? data.amenities_images.split("\n").map((s) => s.trim()).filter(Boolean)
    : [];

  const hasNewAmenitiesUploads = amenitiesImagesList.some(
    (item) =>
      item instanceof File ||
      item instanceof Blob ||
      (typeof item === "string" && item.trim().startsWith("data:image/"))
  );

  const amenitiesFiles = [];
  if (hasNewAmenitiesUploads || !isUpdate) {
    for (let idx = 0; idx < amenitiesImagesList.length; idx++) {
      const file = await convertToFile(amenitiesImagesList[idx], `amenity_${idx}.jpg`);
      if (file) {
        amenitiesFiles.push(file);
      }
    }
  }

  if (amenitiesFiles.length > 0) {
    amenitiesFiles.forEach((file, idx) => {
      fd.append("amenities_images[]", file, file.name || `amenity_${idx}.jpg`);
    });
  }

  let brochureFile = null;
  if (data.brochure instanceof File) {
    brochureFile = data.brochure;
  } else if (data.brochure instanceof Blob) {
    brochureFile = new File([data.brochure], "brochure.pdf", { type: data.brochure.type || "application/pdf" });
  } else if (typeof data.brochure === "string" && data.brochure.trim().startsWith("data:application/pdf")) {
    const blob = dataURLtoBlob(data.brochure.trim());
    if (blob) {
      brochureFile = new File([blob], "brochure.pdf", { type: "application/pdf" });
    }
  }
  if (brochureFile) {
    fd.append("brochure", brochureFile, brochureFile.name || "brochure.pdf");
  }

  fd.append("title", String(data.title || "Luxury Property").trim().slice(0, 255));
  fd.append("property_type", String(data.property_type || data.type || "Apartment").trim());

  const validListingTypes = ["For Sale", "For Rent", "For Lease"];
  const listingType = validListingTypes.includes(data.listing_type) ? data.listing_type : "For Sale";
  fd.append("listing_type", listingType);

  const validCategories = ["Residential", "Commercial", "Land"];
  const category = validCategories.includes(data.category) ? data.category : "Residential";
  fd.append("category", category);

  const shortDesc = String(data.short_description || data.description?.slice(0, 150) || "Luxury property in prime Bhubaneswar location").trim();
  fd.append("short_description", shortDesc || "Luxury property in prime Bhubaneswar location");

  const fullDesc = String(data.description || "Exceptional luxury property featuring modern architectural design, world-class specifications, and unmatched highway connectivity.").trim();
  fd.append("description", fullDesc || "Exceptional luxury property featuring modern architectural design, world-class specifications, and unmatched highway connectivity.");

  const validListingStatuses = ["Draft", "Published", "Sold", "Rented", "Under Offer", "Withdrawn"];
  const listingStatus = validListingStatuses.includes(data.listing_status) ? data.listing_status : "Published";
  fd.append("listing_status", listingStatus);

  fd.append("is_featured", data.is_featured ? "1" : "0");

  const rawNum = data.listing_price !== undefined && data.listing_price !== null && data.listing_price !== ""
    ? Number(data.listing_price)
    : Number(data.priceValue);
  let numPrice = isNaN(rawNum) ? 0 : rawNum;
  if (numPrice > 0 && numPrice < 1000) {
    numPrice = numPrice * 100000;
  }
  fd.append("listing_price", String(numPrice));

  const validPriceTypes = ["Total Price", "Per Sq. Ft."];
  const priceType = validPriceTypes.includes(data.price_type) ? data.price_type : "Total Price";
  fd.append("price_type", priceType);

  fd.append("is_negotiable", data.is_negotiable ? "1" : "0");

  if (
    data.maintenance_charges !== undefined &&
    data.maintenance_charges !== null &&
    String(data.maintenance_charges).trim() !== "" &&
    !isNaN(Number(data.maintenance_charges)) &&
    Number(data.maintenance_charges) >= 0
  ) {
    fd.append("maintenance_charges", String(Number(data.maintenance_charges)));
  }

  const numArea = Number(data.property_area || data.sqft) || 1000;
  fd.append("property_area", String(numArea));

  const validAreaUnits = ["Sq. Ft.", "Sq. M.", "Acre", "Decimal"];
  const areaUnit = validAreaUnits.includes(data.area_unit) ? data.area_unit : "Sq. Ft.";
  fd.append("area_unit", areaUnit);

  if (data.bedrooms !== undefined && data.bedrooms !== null && String(data.bedrooms).trim() !== "") {
    fd.append("bedrooms", String(data.bedrooms).trim());
  }
  if (data.bathrooms !== undefined && data.bathrooms !== null && String(data.bathrooms).trim() !== "") {
    fd.append("bathrooms", String(data.bathrooms).trim());
  }
  if (data.balconies !== undefined && data.balconies !== null && String(data.balconies).trim() !== "") {
    fd.append("balconies", String(data.balconies).trim());
  }

  if (
    data.floor_number !== undefined &&
    data.floor_number !== null &&
    String(data.floor_number).trim() !== "" &&
    !isNaN(Number(data.floor_number)) &&
    Number(data.floor_number) >= 0
  ) {
    fd.append("floor_number", String(Math.floor(Number(data.floor_number))));
  }

  if (
    data.total_floors !== undefined &&
    data.total_floors !== null &&
    String(data.total_floors).trim() !== "" &&
    !isNaN(Number(data.total_floors)) &&
    Number(data.total_floors) >= 0
  ) {
    fd.append("total_floors", String(Math.floor(Number(data.total_floors))));
  }

  const validFurnishing = ["Furnished", "Semi-Furnished", "Unfurnished"];
  if (validFurnishing.includes(data.furnishing_status)) {
    fd.append("furnishing_status", data.furnishing_status);
  }

  const normalizedAge = String(data.property_age || "")
    .replace("0-5", "0\u20135")
    .replace("5-10", "5\u201310");
  const validAges = ["New", "0\u20135 Years", "5\u201310 Years", "10+ Years"];
  if (validAges.includes(normalizedAge)) {
    fd.append("property_age", normalizedAge);
  }

  const validFacings = [
    "North", "South", "East", "West",
    "North-East", "North-West",
    "South-East", "South-West"
  ];
  if (validFacings.includes(data.facing_direction)) {
    fd.append("facing_direction", data.facing_direction);
  }

  const validPossession = ["Ready to Move", "Under Construction"];
  const possessionStatus = validPossession.includes(data.possession_status) ? data.possession_status : "Ready to Move";
  fd.append("possession_status", possessionStatus);

  const validConstruction = ["Under Construction", "Ready to Move", "Completed"];
  const constructionStatus = validConstruction.includes(data.construction_status) ? data.construction_status : "Ready to Move";
  fd.append("construction_status", constructionStatus);

  fd.append("country", String(data.country || "India").trim() || "India");
  fd.append("state", String(data.state || "Odisha").trim() || "Odisha");
  fd.append("city", String(data.city || "Bhubaneswar").trim() || "Bhubaneswar");
  const loc = String(data.locality || data.location || "Bhubaneswar").trim() || "Bhubaneswar";
  fd.append("locality", loc);
  const fullAddress = String(data.full_address || data.location || `${loc}, Bhubaneswar, Odisha`).trim() || `${loc}, Bhubaneswar, Odisha`;
  fd.append("full_address", fullAddress);
  const pinCode = String(data.pin_code || "751001").replace(/\D/g, "").slice(0, 10) || "751001";
  fd.append("pin_code", pinCode);

  if (data.landmark !== undefined && data.landmark !== null && String(data.landmark).trim() !== "") {
    fd.append("landmark", String(data.landmark).trim());
  }

  if (isValidHttpUrl(data.google_maps_url)) {
    fd.append("google_maps_url", toHttpUrl(data.google_maps_url));
  }

  if (
    data.latitude !== undefined &&
    data.latitude !== null &&
    String(data.latitude).trim() !== "" &&
    !isNaN(Number(data.latitude))
  ) {
    const lat = Number(data.latitude);
    if (lat >= -90 && lat <= 90) {
      fd.append("latitude", String(lat));
    }
  }

  if (
    data.longitude !== undefined &&
    data.longitude !== null &&
    String(data.longitude).trim() !== "" &&
    !isNaN(Number(data.longitude))
  ) {
    const lng = Number(data.longitude);
    if (lng >= -180 && lng <= 180) {
      fd.append("longitude", String(lng));
    }
  }

  if (data.video_url !== undefined && data.video_url !== null && String(data.video_url).trim() !== "") {
    const rawVideo = String(data.video_url).trim();
    let urlStr = rawVideo;
    if (rawVideo.includes("<iframe") && rawVideo.includes("src=")) {
      const m = rawVideo.match(/src=["']([^"']+)["']/);
      if (m && m[1]) urlStr = m[1].trim();
    }
    if (!/^https?:\/\//i.test(urlStr)) {
      urlStr = "https://" + urlStr;
    }
    if (isValidHttpUrl(urlStr)) {
      fd.append("video_url", urlStr);
    }
  }

  if (data.virtual_tour_url !== undefined && data.virtual_tour_url !== null && String(data.virtual_tour_url).trim() !== "") {
    const rawTour = String(data.virtual_tour_url).trim();
    let tourStr = rawTour;
    if (rawTour.includes("<iframe") && rawTour.includes("src=")) {
      const m = rawTour.match(/src=["']([^"']+)["']/);
      if (m && m[1]) tourStr = m[1].trim();
    }
    if (!/^https?:\/\//i.test(tourStr)) {
      tourStr = "https://" + tourStr;
    }
    if (isValidHttpUrl(tourStr)) {
      fd.append("virtual_tour_url", tourStr);
    }
  }

  if (data.project_name !== undefined && data.project_name !== null && String(data.project_name).trim() !== "") {
    fd.append("project_name", String(data.project_name).trim().slice(0, 255));
  }

  if (data.builder_name !== undefined && data.builder_name !== null && String(data.builder_name).trim() !== "") {
    fd.append("builder_name", String(data.builder_name).trim().slice(0, 255));
  }

  if (
    data.year_of_completion !== undefined &&
    data.year_of_completion !== null &&
    String(data.year_of_completion).trim() !== "" &&
    !isNaN(Number(data.year_of_completion))
  ) {
    const yr = Math.floor(Number(data.year_of_completion));
    if (yr >= 1900 && yr <= 2100) {
      fd.append("year_of_completion", String(yr));
    }
  }

  if (
    data.total_units !== undefined &&
    data.total_units !== null &&
    String(data.total_units).trim() !== "" &&
    !isNaN(Number(data.total_units)) &&
    Number(data.total_units) >= 0
  ) {
    fd.append("total_units", String(Math.floor(Number(data.total_units))));
  }

  if (
    data.available_units !== undefined &&
    data.available_units !== null &&
    String(data.available_units).trim() !== "" &&
    !isNaN(Number(data.available_units)) &&
    Number(data.available_units) >= 0
  ) {
    fd.append("available_units", String(Math.floor(Number(data.available_units))));
  }

  const validParking = ["Available", "Not Available"];
  if (validParking.includes(data.parking_availability)) {
    fd.append("parking_availability", data.parking_availability);
  }

  if (data.rera_number !== undefined && data.rera_number !== null && String(data.rera_number).trim() !== "") {
    fd.append("rera_number", String(data.rera_number).trim().slice(0, 255));
  }

  const rawAmenities = Array.isArray(data.amenities)
    ? data.amenities
    : typeof data.amenities === "string" && data.amenities.trim()
    ? data.amenities.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const cleanAmenities = rawAmenities
    .filter((s) => typeof s === "string" && s.trim())
    .map((s) => s.trim().slice(0, 255));
  if (cleanAmenities.length > 0 || isUpdate) {
    fd.append("amenities", JSON.stringify(cleanAmenities));
  }

  let nearbyList = [];
  if (Array.isArray(data.nearby_places)) {
    nearbyList = data.nearby_places;
  } else if (typeof data.nearby_places === "string" && data.nearby_places.trim()) {
    try {
      const parsed = JSON.parse(data.nearby_places);
      if (Array.isArray(parsed)) nearbyList = parsed;
    } catch {}
  }
  const validPlaceCategories = [
    "School",
    "College",
    "Hospital",
    "Shopping Mall",
    "Railway Station",
    "Airport",
    "Bus Stop",
    "Market",
    "Other"
  ];
  const validNearby = nearbyList
    .filter((np) => np && typeof np === "object" && String(np.place_name || "").trim())
    .map((np) => ({
      place_name: String(np.place_name).trim().slice(0, 255),
      place_category: validPlaceCategories.includes(np.place_category) ? np.place_category : "Other",
      distance: Math.max(0, parseFloat(np.distance) || 0),
      distance_unit: np.distance_unit === "m" ? "m" : "km",
    }));
  if (validNearby.length > 0 || isUpdate) {
    fd.append("nearby_places", JSON.stringify(validNearby));
  }

  return fd;
}

export const createProperty = async (data) => {
  try {
    const payload = await prepareFormDataPayload(data, false);
    const res = await api.post("/properties", payload);
    if (res.data?.data) {
      return formatProperty(res.data.data);
    }
  } catch (err) {
    console.error("Failed to store property in database:", err.response?.data || err.message);
    throw err;
  }
  return formatProperty(data);
};

export const updateProperty = async ({ id, data }) => {
  try {
    const isLocalOnly = typeof id === "number" ? id > 1000000000000 : String(id).length >= 12 && /^\d+$/.test(String(id));
    if (!isLocalOnly) {
      const payload = await prepareFormDataPayload(data, true);
      payload.append("_method", "PUT");
      const res = await api.post(`/properties/${id}`, payload);
      if (res.data?.data) {
        return formatProperty(res.data.data);
      }
    }
  } catch (err) {
    console.error("Failed to update property in database:", err.response?.data || err.message);
    throw err;
  }
  return formatProperty({ id, ...data });
};

export const patchProperty = async ({ id, data }) => {
  return updateProperty({ id, data });
};

export const deleteProperty = async (id) => {
  const isLocalOnly = typeof id === "number" ? id > 1000000000000 : String(id).length >= 12 && /^\d+$/.test(String(id));
  deleteCustomProperty(id);
  if (isLocalOnly) {
    return { success: true, message: "Property deleted" };
  }
  try {
    const res = await api.delete(`/properties/${id}`);
    return res.data;
  } catch (err) {
    if (err.response?.status !== 404) {
      console.error("Failed to delete property from database:", err.response?.data || err.message);
    }
    return null;
  }
};
