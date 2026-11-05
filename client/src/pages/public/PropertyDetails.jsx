import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Share2,
  Copy,
  Calendar,
  Building2,
  Building,
  ShieldCheck,
  CheckCircle2,
  Maximize2,
  ArrowRight,
  Download,
  FileText,
  Play,
  Check,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
  Compass,
  Layers,
  Car,
  Paintbrush,
  Tag,
  ExternalLink,
  Lock,
  User,
  BadgeCheck,
  Volume2,
  VolumeX,
  Bed,
  Bath,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getPropertyById, getProperties } from "../../services/propertyService";
import {
  getPropertyBySlugOrId as getPropertyBySlug,
} from "../../utils/propertyStorage";
import NotFound from "../error/NotFound";
import sujitImg from "../../assets/Sujit_Mohapatra.png";
import { villa1 } from "../../assets/properties";
import ImageLightbox from "../../components/common/ImageLightbox";
import PropertyCard from "../../components/common/PropertyCard";

function getYouTubeEmbedUrl(url, autoplay = true, mute = true) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  if (trimmed.includes("<iframe") && trimmed.includes("src=")) {
    const srcMatch = trimmed.match(/src=["']([^"']+)["']/);
    if (srcMatch && srcMatch[1]) {
      let src = srcMatch[1].trim();
      const params = [];
      if (!src.includes("controls=")) params.push("controls=1");
      if (autoplay && !src.includes("autoplay=")) params.push("autoplay=1");
      if (mute && !src.includes("mute=")) params.push("mute=1");
      if (params.length > 0) {
        src += (src.includes("?") ? "&" : "?") + params.join("&");
      }
      return src;
    }
  }

  let id = null;

  if (
    trimmed.includes("youtube.com/embed/") ||
    trimmed.includes("youtube-nocookie.com/embed/")
  ) {
    const parts = trimmed.split(/\/embed\//)[1];
    id = parts?.split(/[?&#\s"']/)[0];
  } else {
    const ytRegex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
    const match = trimmed.match(ytRegex);
    if (match && match[1]) {
      id = match[1];
    }
  }

  if (id) {
    const autoParam = autoplay ? "&autoplay=1" : "";
    const muteParam = mute ? "&mute=1" : "";
    return `https://www.youtube-nocookie.com/embed/${id}?controls=1${autoParam}${muteParam}&rel=0&playsinline=1&modestbranding=1`;
  }

  if (trimmed.includes("matterport.com") || trimmed.includes("/embed/")) {
    let src = trimmed;
    if (trimmed.includes("matterport.com") && !src.includes("play=1")) {
      src += (src.includes("?") ? "&" : "?") + "play=1";
    }
    return src;
  }

  return null;
}

export default function PropertyDetails() {
  const { slug, id } = useParams();
  const navigate = useNavigate();

  const propertyKey = id || slug;

  const { data: fetchedProperty, isLoading } = useQuery({
    queryKey: ["property", propertyKey],
    queryFn: () => getPropertyById(propertyKey),
    enabled: Boolean(propertyKey),
  });

  const { data: allProperties = [] } = useQuery({
    queryKey: ["properties", "related"],
    queryFn: () => getProperties({ per_page: 20 }),
  });

  const property = useMemo(() => {
    if (fetchedProperty) return fetchedProperty;
    return getPropertyBySlug(propertyKey);
  }, [fetchedProperty, propertyKey]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [propertyKey]);

  useEffect(() => {
    if (property?.slug && propertyKey !== property.slug) {
      navigate(`/property/${property.slug}`, { replace: true });
    }
  }, [property, propertyKey, navigate]);

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const galleryScrollRef = useRef(null);
  const thumbnailScrollRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxList, setLightboxList] = useState([]);
  const [lightboxLabel, setLightboxLabel] = useState("Photo");
  const [toastMessage, setToastMessage] = useState("");
  const tourVideoRef = useRef(null);
  const [isTourMuted, setIsTourMuted] = useState(true);

  const openImageLightbox = (images, index = 0, label = "Photo") => {
    if (!Array.isArray(images) || images.length === 0) return;
    setLightboxList(images);
    setActivePhotoIndex(index);
    setLightboxLabel(label);
    setLightboxOpen(true);
  };

  const handleCopyLink = () => {
    const shareUrl = window.location.href;
    navigator.clipboard?.writeText(shareUrl);
    setCopiedLink(true);
    setToastMessage("Property link copied to clipboard!");
    setTimeout(() => setCopiedLink(false), 2500);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const scrollToPhoto = (index) => {
    setActivePhotoIndex(index);
    const container = galleryScrollRef.current;
    if (!container) return;
    const targetX = index * container.clientWidth;
    container.scrollTo({ left: targetX, behavior: "smooth" });
  };

  const handleGalleryScroll = () => {
    const container = galleryScrollRef.current;
    if (!container || !container.clientWidth) return;
    const newIndex = Math.round(container.scrollLeft / container.clientWidth);
    if (newIndex >= 0 && newIndex < galleryImages.length && newIndex !== activePhotoIndex) {
      setActivePhotoIndex(newIndex);
    }
  };

  useEffect(() => {
    if (!thumbnailScrollRef.current) return;
    const activeBtn = thumbnailScrollRef.current.children[activePhotoIndex];
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activePhotoIndex]);

  useEffect(() => {
    if (tourVideoRef.current) {
      tourVideoRef.current.muted = true;
      tourVideoRef.current.play().catch(() => {});
    }
  }, [property?.videoUrl]);

  const toggleTourMute = (e) => {
    e?.stopPropagation();
    if (tourVideoRef.current) {
      const nextMuted = !tourVideoRef.current.muted;
      tourVideoRef.current.muted = nextMuted;
      setIsTourMuted(nextMuted);
    }
  };

  const galleryImages = useMemo(() => {
    if (!property) return [];
    const cover = property.cover_image || property.image;
    const additionalRaw = [
      ...(Array.isArray(property.gallery_images) ? property.gallery_images : []),
      ...(Array.isArray(property.images) ? property.images : []),
    ];
    const additional = Array.from(
      new Set(
        additionalRaw.filter(
          (c) =>
            Boolean(c) &&
            typeof c === "string" &&
            c.trim().length > 0 &&
            c !== cover &&
            !c.includes("cover_synced")
        )
      )
    );
    if (additional.length > 0) {
      return [cover, ...additional].filter(Boolean);
    }
    return cover
      ? [cover]
      : [villa1];
  }, [property]);

  const videoTourUrl = (property?.videoUrl || property?.video_url || "").trim();
  const hasVideo = Boolean(videoTourUrl);

  const virtualTourUrl = (property?.virtualTourUrl || property?.virtual_tour_url || "").trim();
  const hasVirtualTour = Boolean(virtualTourUrl);

  const floorPlans = Array.isArray(property?.floor_plan_images)
    ? property.floor_plan_images.filter(Boolean)
    : [];
  const hasFloorPlans = floorPlans.length > 0;

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: property
      ? `Hello, I am interested in ${property.title}. Please provide pricing, floor plans, and site visit availability.`
      : "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const relatedProperties = useMemo(() => {
    if (!property) return [];
    const list = Array.isArray(allProperties)
      ? allProperties
      : Array.isArray(allProperties?.data)
      ? allProperties.data
      : [];
    const others = list.filter(
      (p) =>
        p &&
        String(p.id) !== String(property.id) &&
        String(p.slug || "") !== String(property.slug || "")
    );
    if (others.length === 0) return [];

    if (Array.isArray(property.relatedPropertyIds) && property.relatedPropertyIds.length > 0) {
      const explicit = others.filter((p) => property.relatedPropertyIds.includes(p.id));
      if (explicit.length > 0) return explicit.slice(0, 3);
    }

    const currentType = String(property.type || property.property_type || "").trim().toLowerCase();
    const currentCat = String(property.category || "").trim().toLowerCase();
    const currentLoc = String(property.locality || property.city || "").trim().toLowerCase();

    const matchingType = others.filter((p) => {
      const pType = String(p.type || p.property_type || "").trim().toLowerCase();
      return pType && pType === currentType;
    });

    if (matchingType.length >= 3) {
      return matchingType.slice(0, 3);
    }

    const matchingCatOrLoc = others.filter((p) => {
      if (matchingType.some((m) => m.id === p.id)) return false;
      const pCat = String(p.category || "").trim().toLowerCase();
      const pLoc = String(p.locality || p.city || "").trim().toLowerCase();
      return (pCat && pCat === currentCat) || (pLoc && currentLoc && pLoc.includes(currentLoc));
    });

    const combined = [...matchingType, ...matchingCatOrLoc];
    if (combined.length >= 3) {
      return combined.slice(0, 3);
    }

    const remaining = others.filter((p) => !combined.some((c) => c.id === p.id));
    return [...combined, ...remaining].slice(0, 3);
  }, [property, allProperties]);

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: property?.title,
          text: `Explore ${property?.title} on Treasure Island Real Estate`,
          url: shareUrl,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(shareUrl);
      setToastMessage("Property link copied to clipboard!");
      setTimeout(() => setToastMessage(""), 3000);
    }
  };

  const handlePrevPhoto = useCallback(
    (e) => {
      e?.stopPropagation();
      const list = lightboxList.length > 0 && lightboxOpen ? lightboxList : galleryImages;
      if (list.length <= 1) return;
      setActivePhotoIndex((prev) => {
        const nextIdx = prev === 0 ? list.length - 1 : prev - 1;
        if (!lightboxOpen && galleryScrollRef.current) {
          const targetX = nextIdx * galleryScrollRef.current.clientWidth;
          galleryScrollRef.current.scrollTo({ left: targetX, behavior: "smooth" });
        }
        return nextIdx;
      });
    },
    [lightboxList, lightboxOpen, galleryImages]
  );

  const handleNextPhoto = useCallback(
    (e) => {
      e?.stopPropagation();
      const list = lightboxList.length > 0 && lightboxOpen ? lightboxList : galleryImages;
      if (list.length <= 1) return;
      setActivePhotoIndex((prev) => {
        const nextIdx = prev === list.length - 1 ? 0 : prev + 1;
        if (!lightboxOpen && galleryScrollRef.current) {
          const targetX = nextIdx * galleryScrollRef.current.clientWidth;
          galleryScrollRef.current.scrollTo({ left: targetX, behavior: "smooth" });
        }
        return nextIdx;
      });
    },
    [lightboxList, lightboxOpen, galleryImages]
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim()) {
      setToastMessage("Please enter your name and phone number.");
      setTimeout(() => setToastMessage(""), 3000);
      return;
    }

    const lines = [
      `*New Property Inquiry - Treasure Island*`,
      ``,
      `*Property:* ${property.title}`,
      `*Location:* ${property.location}`,
      `*Price:* ${displayPrice}`,
      ``,
      `*Client Details:*`,
      `• *Name:* ${formState.name.trim()}`,
      `• *Phone:* ${formState.phone.trim()}`,
    ];

    if (formState.email?.trim()) {
      lines.push(`• *Email:* ${formState.email.trim()}`);
    }

    if (formState.message?.trim()) {
      lines.push(``, `*Inquiry Message:*`, formState.message.trim());
    }

    const text = lines.join("\n");
    const whatsappUrl = `https://wa.me/919348980948?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setToastMessage("Opening WhatsApp with your inquiry details...");
    setIsSubmitted(true);
    setTimeout(() => setToastMessage(""), 4000);
  };

  if (isLoading && !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#F87907] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-slate-500">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return <NotFound />;
  }

  const displayPrice = (() => {
    let p = property?.price;
    let numPrice = Number(property?.listing_price || property?.priceValue) || 0;
    if (numPrice > 0 && numPrice < 1000) {
      numPrice = numPrice * 100000;
    }
    if (!p || p === "Price on Request" || p === "₹0") {
      if (numPrice >= 10000000) return `₹${(numPrice / 10000000).toFixed(2)} Cr`;
      if (numPrice >= 100000) return `₹${(numPrice / 100000).toFixed(2)} Lacs`;
      if (numPrice > 0) return `₹${numPrice.toLocaleString("en-IN")}`;
      return "₹75.00 Lacs";
    }
    return p;
  })();

  const basicsList = property
    ? [
        {
          label: "Bedrooms & Config",
          value: property.bedrooms || (property.beds > 0 ? `${property.beds} BHK` : property.type ? `${property.type} Unit` : "Not Specified"),
          sub: property.bedrooms ? "Configurations" : "Unit Configuration",
          icon: Bed,
          iconColor: "text-amber-600 bg-amber-50 border-amber-100",
        },
        {
          label: "Bathrooms & Balconies",
          value: property.bathrooms || property.baths || property.balconies
            ? `${property.bathrooms || property.baths || 1} Baths${property.balconies ? `, ${property.balconies} Balconies` : ""}`
            : "Not Specified",
          sub: "Fittings & Fixtures",
          icon: Bath,
          iconColor: "text-blue-600 bg-blue-50 border-blue-100",
        },
        {
          label: "Super Built-up Area",
          value: property.property_area || property.sqft
            ? `${property.property_area || property.sqft} ${property.area_unit || "Sq. Ft."}`
            : "Contact for Area",
          sub: "Carpet & Built-up",
          icon: Maximize2,
          iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
        },
        {
          label: "Floor Level",
          value: property.floor_number !== undefined && property.floor_number !== null && property.floor_number !== ""
            ? `Floor ${property.floor_number}${property.total_floors ? ` of ${property.total_floors}` : ""}`
            : property.total_floors
            ? `${property.total_floors} Floors`
            : "Ground Floor",
          sub: property.floorsLabel || "Floor Information",
          icon: Layers,
          iconColor: "text-indigo-600 bg-indigo-50 border-indigo-100",
        },
        {
          label: "Furnishing Status",
          value: property.furnishing_status || "Unfurnished",
          sub: "Interior Status",
          icon: Paintbrush,
          iconColor: "text-purple-600 bg-purple-50 border-purple-100",
        },
        {
          label: "Facing Direction",
          value: property.facing_direction || "Not Specified",
          sub: "Vastu Orientation",
          icon: Compass,
          iconColor: "text-orange-600 bg-orange-50 border-orange-100",
        },
        {
          label: "Possession Status",
          value: property.possession_status || property.construction_status || "Available",
          sub: property.year_of_completion ? `Completed ${property.year_of_completion}` : "Project Status",
          isStatus: true,
          icon: CheckCircle2,
          iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
        },
        {
          label: "Property Age",
          value: property.property_age || "New",
          sub: "Construction Age",
          icon: Calendar,
          iconColor: "text-rose-600 bg-rose-50 border-rose-100",
        },
        {
          label: "Parking Availability",
          value: property.parking_availability || "Available",
          sub: "Vehicle Parking",
          icon: Car,
          iconColor: "text-cyan-600 bg-cyan-50 border-cyan-100",
        },
        {
          label: "RERA Registration",
          value: property.rera_number || "Verified / In Process",
          sub: "Legal Registration",
          icon: ShieldCheck,
          iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
        },
        {
          label: "Builder / Project",
          value: property.builder_name || property.project_name || "Treasure Island Developers",
          sub: property.project_name || "Project Portfolio",
          icon: Building2,
          iconColor: "text-blue-600 bg-blue-50 border-blue-100",
        },
        {
          label: "Property Category",
          value: `${property.category || "Residential"} • ${property.type || property.property_type || "Apartment"}`,
          sub: property.listing_type || "For Sale",
          icon: Tag,
          iconColor: "text-amber-600 bg-amber-50 border-amber-100",
        },
        ...(property.total_units
          ? [
              {
                label: "Units / Inventory",
                value: `${property.total_units} Total Units${
                  property.available_units
                    ? ` (${property.available_units} Available)`
                    : ""
                }`,
                sub: "Development Scale",
                icon: Building,
                iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
              },
            ]
          : []),
      ]
    : [];

  const buildingSpecs = property.buildingDetails
    ? [
        {
          label: "Floor Covering",
          value: Array.isArray(property.buildingDetails.floorCovering)
            ? property.buildingDetails.floorCovering.join(", ")
            : property.buildingDetails.floorCovering,
          icon: Layers,
        },
        {
          label: "Exterior Material",
          value: property.buildingDetails.exteriorMaterial,
          icon: Paintbrush,
        },
        {
          label: "Parking Facilities",
          value: property.buildingDetails.parking,
          icon: Car,
        },
        {
          label: "Structural Design",
          value: property.buildingDetails.structure || "Earthquake-resistant R.C.C. frame",
          icon: ShieldCheck,
        },
      ]
    : [];

  const googleMapsUrl =
    property.google_maps_url && property.google_maps_url.trim()
      ? property.google_maps_url.trim()
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          property.location
        )}`;

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-800 select-none pb-24 pt-[68px] sm:pt-[72px] lg:pt-[76px]">
      <div className="w-full bg-white border-b border-slate-200/90 shadow-2xs px-4 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto w-full py-2.5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 text-xs sm:text-sm">
          <nav className="flex items-center gap-1.5 text-slate-500 min-w-0 flex-wrap sm:flex-nowrap">
            <Link to="/" className="hover:text-[#F87907] transition-colors font-medium shrink-0">
              Home
            </Link>
            <ChevronRight size={13} className="text-slate-400 shrink-0" />
            <Link to="/properties" className="hover:text-[#F87907] transition-colors font-medium shrink-0">
              Properties
            </Link>
            <ChevronRight size={13} className="text-slate-400 shrink-0" />
            <span
              className="text-slate-900 font-bold truncate max-w-[170px] xs:max-w-[240px] sm:max-w-xs md:max-w-md"
              title={property.title}
            >
              {property.title}
            </span>
          </nav>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t border-slate-100 sm:border-t-0">
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-[#F87907] hover:text-[#F87907] text-slate-700 bg-white transition-all text-xs font-semibold cursor-pointer shadow-xs active:scale-95"
              title="Copy property link"
            >
              {copiedLink ? (
                <>
                  <Check size={13} className="text-emerald-500" />
                  <span className="text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-[#F87907] hover:text-[#F87907] text-slate-700 bg-white transition-all text-xs font-semibold cursor-pointer shadow-xs active:scale-95"
            >
              <Share2 size={13} />
              <span>Share</span>
            </button>

            <a
              href="tel:+919348980948"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-800 text-slate-800 bg-slate-50 hover:bg-slate-100 transition-all text-xs font-semibold cursor-pointer shadow-xs active:scale-95"
            >
              <Phone size={13} className="text-[#F87907]" />
              <span className="hidden xs:inline sm:hidden md:inline">+91 9348980948</span>
              <span className="inline xs:hidden sm:inline md:hidden">Call</span>
            </a>

            <a
              href="#inquire-form"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#F87907] to-[#FB923C] hover:from-[#ea580c] hover:to-[#F87907] text-white font-bold text-xs transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95 whitespace-nowrap"
            >
              <Mail size={13} />
              <span>Inquire</span>
              <span className="hidden xs:inline"> Property</span>
            </a>
          </div>
        </div>
      </div>

      <section className="w-full bg-gradient-to-b from-white via-slate-50/70 to-white border-b border-slate-200/90 pt-8 pb-9 px-4 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 min-w-0">
            <div className="space-y-3 max-w-3xl min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                  <BadgeCheck size={14} className="text-emerald-600" />
                  <span>Verified Direct Listing</span>
                </span>

                {property.badges?.map((badge, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-2xs ${
                      badge.toLowerCase().includes("commercial")
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : badge.toLowerCase().includes("featured")
                        ? "bg-amber-50 text-amber-800 border border-amber-200"
                        : "bg-[#FFF4EB] text-[#F87907] border border-[#F87907]/30"
                    }`}
                  >
                    {badge}
                  </span>
                ))}

                {property.dateAdded && (
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1 ml-1">
                    <Calendar size={13} className="text-slate-400" />
                    <span>{property.dateAdded}</span>
                  </span>
                )}
              </div>

              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-serif font-bold text-[#0F172A] tracking-tight leading-tight break-words [overflow-wrap:anywhere] line-clamp-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                title={property.title}
              >
                {property.title}
              </h1>

              {property.short_description && (
                <p className="text-xs sm:text-sm text-slate-500 font-medium pt-1 line-clamp-2">
                  {property.short_description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-600 pt-1">
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin size={16} className="text-[#F87907] shrink-0" />
                  <span>{property.location}</span>
                  {property.landmark && (
                    <span className="text-slate-400 text-xs">
                      (Near {property.landmark})
                    </span>
                  )}
                </div>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#F87907] hover:text-[#ea580c] hover:underline cursor-pointer"
                >
                  <span>View on Google Maps</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-[0_10px_25px_rgba(0,0,0,0.04)] lg:w-[280px] lg:shrink-0 flex flex-col justify-center">
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {property.pricePrefix || "Starting Price"}
                </div>
                {property.is_negotiable && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    Negotiable
                  </span>
                )}
              </div>
              <div
                className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] mt-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {displayPrice}
              </div>
              {property.maintenance_charges && Number(property.maintenance_charges) > 0 && (
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                  + ₹{Number(property.maintenance_charges).toLocaleString("en-IN")}/mo Maintenance
                </div>
              )}
              <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50/90 border border-emerald-200/80 rounded-xl px-2.5 py-1.5 mt-2.5 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                <span>Zero Brokerage • Direct Pricing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full px-4 sm:px-8 lg:px-10 pt-8">
        <div className="max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-[0_12px_36px_rgba(0,0,0,0.05)] mb-8">
          <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 border-b border-slate-100">
            <span className="text-xs sm:text-sm font-serif font-bold text-[#0F172A] tracking-tight">
              Property Gallery
            </span>
          </div>

          <div>
            <div className="relative w-full h-[260px] xs:h-[320px] sm:h-[440px] md:h-[480px] lg:h-[530px] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 shadow-inner group">
              <div
                ref={galleryScrollRef}
                onScroll={handleGalleryScroll}
                className={`w-full h-full flex ${
                  galleryImages.length > 1
                    ? "overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar select-none"
                    : "overflow-hidden"
                }`}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-full h-full shrink-0 snap-center relative cursor-pointer"
                    onClick={() => openImageLightbox(galleryImages, idx, "Photo")}
                  >
                    <img
                      src={img}
                      alt={`${property.title} view ${idx + 1}`}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = villa1;
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-101"
                    />
                  </div>
                ))}
              </div>

              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevPhoto();
                    }}
                    aria-label="Previous Photo"
                    className="absolute left-2.5 sm:left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-lg hover:scale-110 active:scale-95 cursor-pointer z-10"
                  >
                    <ChevronLeft size={20} className="sm:w-[22px] sm:h-[22px]" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextPhoto();
                    }}
                    aria-label="Next Photo"
                    className="absolute right-2.5 sm:right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-lg hover:scale-110 active:scale-95 cursor-pointer z-10"
                  >
                    <ChevronRight size={20} className="sm:w-[22px] sm:h-[22px]" />
                  </button>
                </>
              )}

              <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none z-10">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                  {property.type}
                </span>
              </div>

              {galleryImages.length > 1 && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold pointer-events-none z-10">
                  Photo {activePhotoIndex + 1} of {galleryImages.length}
                </div>
              )}

              <div
                onClick={() => openImageLightbox(galleryImages, activePhotoIndex, "Photo")}
                className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-between cursor-pointer z-10 pointer-events-auto"
              >
                <span className="text-white text-xs sm:text-sm font-medium flex items-center gap-2">
                  <Maximize2 size={15} />
                  <span>Click image to view in high-resolution lightbox</span>
                </span>
                {galleryImages.length > 1 && (
                  <span className="text-white/80 text-xs hidden sm:inline">
                    Swipe or scroll to browse photos
                  </span>
                )}
              </div>
            </div>

            {galleryImages.length > 1 && (
              <div
                ref={thumbnailScrollRef}
                className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto no-scrollbar py-2 px-0.5 mt-3 sm:mt-4 scroll-smooth select-none"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToPhoto(idx)}
                    className={`relative w-20 sm:w-28 md:w-32 h-14 sm:h-20 md:h-22 shrink-0 rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activePhotoIndex === idx
                        ? "border-[#F87907] ring-2 sm:ring-3 ring-[#F87907]/30 shadow-md scale-102"
                        : "border-slate-200 opacity-70 hover:opacity-100 hover:scale-101"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = villa1;
                      }}
                      className="w-full h-full object-cover"
                    />
                    {activePhotoIndex === idx && (
                      <div className="absolute inset-0 bg-[#F87907]/15" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-6">
          <div className="p-2 sm:p-2.5 lg:p-3 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-2 sm:gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-amber-50 text-[#F87907] border border-amber-100 flex items-center justify-center shrink-0">
              <Bed size={15} />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Bedrooms
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 truncate">
                {property.bedrooms || (property.beds > 0 ? `${property.beds} BHK` : property.type ? `${property.type} Unit` : "—")}
              </div>
            </div>
          </div>

          <div className="p-2 sm:p-2.5 lg:p-3 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-2 sm:gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <Maximize2 size={15} />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Super Area
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 truncate">
                {property.property_area || property.sqft
                  ? `${property.property_area || property.sqft} ${property.area_unit || "Sq. Ft."}`
                  : "—"}
              </div>
            </div>
          </div>

          <div className="p-2 sm:p-2.5 lg:p-3 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-2 sm:gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
              <Bath size={15} />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Bathrooms
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 truncate">
                {property.bathrooms
                  ? String(property.bathrooms).includes("Bath")
                    ? property.bathrooms
                    : `${property.bathrooms} Baths`
                  : property.baths > 0
                  ? `${property.baths} Baths`
                  : "—"}
              </div>
            </div>
          </div>

          <div className="p-2 sm:p-2.5 lg:p-3 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-2 sm:gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
              <CheckCircle2 size={15} />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Possession Status
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 truncate">
                {property.possession_status || property.construction_status || property.status || "Available"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                <span className="w-2 h-5 rounded-full bg-[#F87907]" />
                <h2
                  className="text-lg sm:text-xl font-serif font-bold text-[#0F172A] tracking-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Property Basics & Overview
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 lg:gap-3">
                {basicsList.map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-slate-300 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
                          {item.label}
                        </span>
                        <div
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 ${item.iconColor}`}
                        >
                          <ItemIcon size={13} />
                        </div>
                      </div>
                      <div>
                        <div
                          className={`text-xs sm:text-[13px] font-bold leading-snug truncate ${
                            item.isStatus
                              ? "text-emerald-700 flex items-center gap-1"
                              : "text-slate-900"
                          }`}
                        >
                          {item.isStatus && <CheckCircle2 size={13} className="shrink-0" />}
                          <span className="truncate">{item.value}</span>
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 truncate">
                          {item.sub}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-orange-50/60 to-amber-50/60 border border-orange-200/80 col-span-2 sm:col-span-3">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FFF4EB] border border-[#F87907]/30 text-[#F87907] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <ShieldCheck size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#F87907]">
                        Floor Structure & Seismic Safety
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                        {property.floorStructure || "Earthquake-resistant R.C.C. frame"}
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-relaxed">
                        Engineered with certified high-grade seismic compliance, superior structural load distribution, and premium quality steel reinforcement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] space-y-6">
              <div>
                <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-slate-100">
                  <span className="w-2.5 h-6 rounded-full bg-[#23ADD9]" />
                  <h2
                    className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] tracking-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Property Description
                  </h2>
                </div>
                <p className="text-base sm:text-[17px] text-slate-700 leading-relaxed font-normal">
                  {property.description}
                </p>
              </div>

              {property.commercialProjectDetails && (
                <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-blue-50/70 border border-blue-200/80 shadow-2xs">
                  <h3 className="text-base sm:text-lg font-bold text-blue-950 mb-4 flex items-center gap-2.5">
                    <Building2 size={20} className="text-blue-600" />
                    <span>Commercial Project Details</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-3.5 rounded-2xl bg-white border border-blue-100 shadow-2xs">
                      <span className="text-[11px] font-bold text-blue-500 uppercase tracking-wider block">
                        Commercial Block
                      </span>
                      <strong className="text-base sm:text-lg font-bold text-blue-950 mt-1 block">
                        {property.commercialProjectDetails.block}
                      </strong>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white border border-blue-100 shadow-2xs">
                      <span className="text-[11px] font-bold text-blue-500 uppercase tracking-wider block">
                        Commercial Floors
                      </span>
                      <strong className="text-base sm:text-lg font-bold text-blue-950 mt-1 block">
                        {property.commercialProjectDetails.floors}
                      </strong>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white border border-blue-100 shadow-2xs">
                      <span className="text-[11px] font-bold text-blue-500 uppercase tracking-wider block">
                        Total Commercial Units
                      </span>
                      <strong className="text-base sm:text-lg font-bold text-blue-950 mt-1 block">
                        {property.commercialProjectDetails.totalUnits}
                      </strong>
                    </div>
                  </div>
                </div>
              )}

              {property.projectHighlights && property.projectHighlights.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3.5 flex items-center gap-2">
                    <Sparkles size={18} className="text-[#F87907]" />
                    <span>Project Highlights</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.projectHighlights.map((hl, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-slate-300 transition-all"
                      >
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={13} className="stroke-[3]" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                          {hl}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {property.enquiriesNote && (
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs sm:text-sm text-amber-900 leading-relaxed flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-amber-200/70 text-amber-900 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    i
                  </div>
                  <div>
                    <strong className="font-bold text-amber-950 block mb-0.5">Official Sales Enquiries:</strong>
                    <span>{property.enquiriesNote}</span>
                  </div>
                </div>
              )}
            </div>

            {hasVideo && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F87907]">
                      Walkthrough Video Tour
                    </span>
                    <h2
                      className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] tracking-tight mt-0.5"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      Experience The Property
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#FFF4EB] text-[#F87907] text-xs font-bold border border-[#F87907]/20 flex items-center gap-1 shadow-2xs">
                    <Play size={12} className="fill-current" />
                    <span>Full HD Tour</span>
                  </span>
                </div>

                <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-lg group">
                  {getYouTubeEmbedUrl(videoTourUrl, true, true) ? (
                    <iframe
                      src={getYouTubeEmbedUrl(videoTourUrl, true, true)}
                      title={property.title || "Property Walkthrough Tour"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <>
                      <video
                        ref={tourVideoRef}
                        key={`tour-${videoTourUrl}`}
                        src={videoTourUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        preload="auto"
                        poster={property.videoPoster || galleryImages[0]}
                        className="w-full h-full object-cover"
                      >
                        <source src={videoTourUrl} type="video/mp4" />
                        Your browser does not support HTML5 video.
                      </video>

                      <button
                        type="button"
                        onClick={toggleTourMute}
                        aria-label={isTourMuted ? "Unmute video tour audio" : "Mute video tour audio"}
                        className="absolute bottom-16 right-4 sm:bottom-16 sm:right-6 px-3.5 py-2 rounded-xl bg-black/75 hover:bg-black/90 text-white backdrop-blur-md flex items-center gap-2 text-xs font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer border border-white/20"
                      >
                        {isTourMuted ? (
                          <>
                            <VolumeX size={15} className="text-amber-400" />
                            <span>Unmute Audio</span>
                          </>
                        ) : (
                          <>
                            <Volume2 size={15} className="text-emerald-400" />
                            <span>Mute Audio</span>
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {hasVirtualTour && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#23ADD9]">
                      Interactive 3D Experience
                    </span>
                    <h2
                      className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] tracking-tight mt-0.5"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      3D Virtual Tour & 360° Walkthrough
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan-50 text-[#23ADD9] text-xs font-bold border border-[#23ADD9]/20 flex items-center gap-1 shadow-2xs">
                    <Compass size={12} />
                    <span>360° Interactive</span>
                  </span>
                </div>

                <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-lg">
                  {getYouTubeEmbedUrl(virtualTourUrl, false, false) ? (
                    <iframe
                      src={getYouTubeEmbedUrl(virtualTourUrl, false, false)}
                      title={property.title || "Property 3D Virtual Tour"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="w-full h-full border-0"
                    />
                  ) : virtualTourUrl.startsWith("http") ? (
                    <iframe
                      src={virtualTourUrl}
                      title={property.title || "Property 3D Virtual Tour"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <video
                      src={virtualTourUrl}
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={virtualTourUrl} type="video/mp4" />
                      Your browser does not support HTML5 video.
                    </video>
                  )}
                </div>
              </div>
            )}

            {hasFloorPlans && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Architectural Blueprint
                    </span>
                    <h2
                      className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] tracking-tight mt-0.5"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      Floor Plans & Layout ({floorPlans.length})
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1 shadow-2xs">
                    <Layers size={12} />
                    <span>Verified Layout</span>
                  </span>
                </div>

                <div className={`grid gap-4 w-full ${floorPlans.length === 1 ? "max-w-md mx-auto grid-cols-1" : floorPlans.length === 2 ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
                  {floorPlans.map((plan, idx) => (
                    <div
                      key={idx}
                      onClick={() => openImageLightbox(floorPlans, idx, "Floor Plan Layout")}
                      className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-white p-2.5 shadow-xs cursor-pointer hover:border-[#F87907] transition-all"
                    >
                      <div className="relative overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center h-[200px] sm:h-[220px]">
                        <img
                          src={plan}
                          alt={`Floor Plan ${idx + 1}`}
                          className="max-h-full max-w-full object-contain p-2 rounded-lg mx-auto group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                            <Maximize2 size={13} /> Click to expand
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 text-center text-xs font-bold text-slate-700">
                        Floor Plan Layout #{idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] space-y-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <span className="w-2.5 h-6 rounded-full bg-emerald-500" />
                <h2
                  className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] tracking-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Amenities & Project Features
                </h2>
              </div>

              {property.amenities && property.amenities.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Project Amenities
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-[#F87907]/50 hover:bg-orange-50/20 transition-all shadow-2xs"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F87907] shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-slate-800">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {property.features && property.features.length > 0 && (
                <div className="pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Key Architectural Features
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 hover:border-blue-200 transition-all shadow-2xs"
                      >
                        <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-blue-950">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {Array.isArray(property.amenities_images) && property.amenities_images.length > 0 && (
                <div className="pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Clubhouse & Facility Photos
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {property.amenities_images.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => openImageLightbox(property.amenities_images, idx, "Clubhouse & Facility Photo")}
                        className="relative group rounded-2xl overflow-hidden border border-slate-200 aspect-video bg-slate-100 shadow-2xs hover:border-[#F87907] transition-all cursor-pointer"
                      >
                        <img
                          src={img}
                          alt={`Amenity ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                            <Maximize2 size={12} /> View
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {buildingSpecs.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2.5 pb-3 mb-5 border-b border-slate-100">
                  <span className="w-2.5 h-6 rounded-full bg-purple-500" />
                  <h2
                    className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] tracking-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Building Specifications
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {buildingSpecs.map((spec, idx) => {
                    const SpecIcon = spec.icon;
                    return (
                      <div
                        key={idx}
                        className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-slate-300 transition-all flex items-start gap-3.5"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center shrink-0 shadow-2xs">
                          <SpecIcon size={18} className="text-[#F87907]" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            {spec.label}
                          </div>
                          <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                            {spec.value}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <span className="w-2.5 h-6 rounded-full bg-amber-500" />
                <h2
                  className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] tracking-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Location & Connected Neighborhoods
                </h2>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-slate-700">
                <div className="flex items-center gap-2.5">
                  <MapPin size={18} className="text-[#F87907] shrink-0" />
                  <div>
                    <strong className="text-slate-900 block font-bold">Project Address:</strong>
                    <span className="text-slate-600">{property.location}</span>
                  </div>
                </div>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-[#F87907] hover:text-[#F87907] text-slate-800 text-xs font-bold transition-all shadow-2xs shrink-0 cursor-pointer"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {property.neighborhoods && property.neighborhoods.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    Connected Arterials & Strategic Corridors
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {property.neighborhoods.map((nh, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 shadow-2xs hover:border-[#F87907] hover:text-[#F87907] transition-all cursor-default"
                      >
                        <MapPin size={11} className="text-[#F87907]" />
                        <span>{nh}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {Array.isArray(property.nearby_places) && property.nearby_places.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2.5 pb-3 mb-5 border-b border-slate-100">
                  <span className="w-2.5 h-6 rounded-full bg-emerald-500" />
                  <h2
                    className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] tracking-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Nearby Landmarks & Connectivity
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {property.nearby_places.map((place, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-[#F87907] transition-all flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {place.place_name}
                        </div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-white text-slate-600 border border-slate-200">
                          {place.place_category || "Landmark"}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-extrabold text-[#F87907]">
                          {place.distance} {place.distance_unit || "km"}
                        </span>
                        <div className="text-[10px] text-slate-400">away</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {property.nearbySchools && property.nearbySchools.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2.5 pb-3 mb-5 border-b border-slate-100">
                  <span className="w-2.5 h-6 rounded-full bg-sky-500" />
                  <h2
                    className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] tracking-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Nearby Schools & Colleges
                  </h2>
                </div>

                <div className="space-y-3">
                  {property.nearbySchools.map((school, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-slate-300 transition-all flex items-start gap-3.5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center shrink-0 shadow-2xs">
                        <GraduationCap size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#F87907] tracking-wider px-2 py-0.5 rounded-md bg-[#FFF4EB]">
                          {school.level}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                          {school.name}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                          {school.address}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {((property.documents && property.documents.length > 0) || property.brochure) && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2.5 pb-3 mb-5 border-b border-slate-100">
                  <span className="w-2.5 h-6 rounded-full bg-rose-500" />
                  <h2
                    className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] tracking-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Project Documents & Official Brochure
                  </h2>
                </div>

                <div className="space-y-3">
                  {property.brochure && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-orange-50/60 border border-orange-200 hover:border-[#F87907] transition-all group shadow-2xs">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-12 h-12 rounded-2xl bg-[#F87907]/10 border border-[#F87907]/20 text-[#F87907] flex items-center justify-center shrink-0 shadow-2xs">
                          <FileText size={22} />
                        </div>
                        <div className="min-w-0">
                          <div
                            className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#F87907] transition-colors truncate"
                            title={property.brochure_name || "Official Property Brochure"}
                          >
                            {property.brochure_name || "Official Property Brochure"}
                          </div>
                          <div className="text-xs text-slate-500 font-medium">
                            Verified Project Document • PDF Format
                          </div>
                        </div>
                      </div>

                      <a
                        href={property.brochure}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F87907] hover:bg-[#ea6a00] text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 w-full sm:w-auto shrink-0"
                      >
                        <Download size={14} />
                        <span>Download Brochure</span>
                      </a>
                    </div>
                  )}

                  {property.documents && property.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-[#F87907] transition-all group shadow-2xs"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shrink-0 shadow-2xs">
                          <FileText size={22} />
                        </div>
                        <div>
                          <div className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#F87907] transition-colors">
                            {doc.name}
                          </div>
                          <div className="text-xs text-slate-500 font-medium">
                            {doc.type || "Document"} • {doc.size}
                          </div>
                        </div>
                      </div>

                      <a
                        href="tel:+919348980948"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#F87907] hover:text-[#F87907] text-slate-800 text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 w-full sm:w-auto"
                      >
                        <Download size={14} />
                        <span>Request Copy</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 sticky top-20 space-y-6" id="inquire-form">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_16px_40px_rgba(0,0,0,0.07)]">
              <div className="flex items-center gap-3.5 pb-5 mb-5 border-b border-slate-100">
                <div className="relative shrink-0">
                  <img
                    src={sujitImg}
                    alt="Sujit Mohapatra"
                    className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-[#F87907] shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                    <Check size={10} className="text-white stroke-[3]" />
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#F87907] bg-[#FFF4EB] px-2 py-0.5 rounded-full inline-block">
                    Founder & Managing Director
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mt-1">
                    Sujit Mohapatra
                  </h3>
                  <div className="text-xs text-slate-500 font-medium">
                    Treasure Island Real Estate
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 mb-5">
                <a
                  href="tel:+919348980948"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-98"
                >
                  <Phone size={15} className="text-[#F87907]" />
                  <span>Call +91 9348980948</span>
                </a>

                <a
                  href={`https://wa.me/919348980948?text=${encodeURIComponent(
                    `Hello Sujit, I am inquiring about ${property.title} in Bhubaneswar.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-98"
                >
                  <MessageSquare size={15} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <div className="relative py-2.5 flex items-center justify-center mb-3">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 absolute">
                  Or Send Inquiry
                </span>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center my-3"
                >
                  <CheckCircle2 size={36} className="text-emerald-500 mx-auto mb-2" />
                  <h4 className="text-base font-bold text-emerald-950">Inquiry Opened on WhatsApp!</h4>
                  <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                    WhatsApp has been opened with your property inquiry details. Sujit Mohapatra will respond to you directly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 text-xs font-bold text-emerald-800 underline cursor-pointer hover:text-emerald-950"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="What's your name?"
                        value={formState.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#F87907] focus:ring-2 focus:ring-[#F87907]/20 transition-all bg-slate-50/50 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. +91 9348980948"
                        value={formState.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#F87907] focus:ring-2 focus:ring-[#F87907]/20 transition-all bg-slate-50/50 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="What's your email?"
                        value={formState.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#F87907] focus:ring-2 focus:ring-[#F87907]/20 transition-all bg-slate-50/50 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Inquiry Message
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formState.message}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#F87907] focus:ring-2 focus:ring-[#F87907]/20 transition-all bg-slate-50/50 resize-none font-medium text-slate-700 leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F87907] to-[#FB923C] hover:from-[#ea580c] hover:to-[#F87907] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <MessageSquare size={16} />
                    <span>Send Inquiry on WhatsApp</span>
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                    <Lock size={11} />
                    <span>100% Privacy • No Spam Guarantee</span>
                  </div>
                </form>
              )}
            </div>

            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white shadow-xl border border-slate-800">
              <div className="text-[10px] font-bold text-amber-300 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                <Sparkles size={12} />
                <span>Zero Brokerage Direct Pricing</span>
              </div>
              <h4 className="text-base sm:text-lg font-serif font-bold text-white mb-2">
                Need Instant Assistance?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Speak directly with Sujit Mohapatra for private site inspections, commercial master plans, and unit reservation discounts.
              </p>
              <a
                href="tel:+919348980948"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-amber-300 transition-all active:scale-95"
              >
                <Phone size={13} className="text-[#F87907]" />
                <span>+91 9348980948</span>
              </a>
            </div>
          </div>
        </div>

        {relatedProperties.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F87907]">
                  Similar Opportunities
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] tracking-tight mt-1"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Related Properties in Bhubaneswar
                </h2>
              </div>
              <Link
                to="/properties"
                className="text-xs sm:text-sm font-bold text-[#F87907] hover:text-[#ea580c] inline-flex items-center gap-1.5"
              >
                <span>View All Available Properties</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProperties.map((rel) => (
                <PropertyCard key={rel.id} property={rel} />
              ))}
            </div>
          </div>
        )}
        </div>
      </div>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => {
          setLightboxOpen(false);
          setLightboxList([]);
        }}
        images={lightboxList && lightboxList.length > 0 ? lightboxList : galleryImages}
        currentIndex={activePhotoIndex}
        onPrev={handlePrevPhoto}
        onNext={handleNextPhoto}
        title={property.title}
        label={lightboxLabel}
        fallbackImage={villa1}
      />

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/95 text-white text-xs sm:text-sm font-semibold shadow-2xl backdrop-blur-md border border-white/10"
          >
            <Check size={16} className="text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
