import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Share2,
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
  Video,
  Image as ImageIcon,
  Check,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Send,
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
} from "lucide-react";
import {
  getPropertyBySlug,
  propertiesData,
} from "../../data/propertiesData";
import sujitImg from "../../assets/Sujit_Mohapatra.png";

export default function PropertyDetails() {
  const { slug, id } = useParams();
  const navigate = useNavigate();

  const propertyKey = id || slug;
  const property = useMemo(() => getPropertyBySlug(propertyKey), [propertyKey]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [propertyKey]);

  const [activeMediaTab, setActiveMediaTab] = useState("photos");
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const tourVideoRef = useRef(null);
  const [isTourMuted, setIsTourMuted] = useState(true);

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
    return property.images && property.images.length > 0
      ? property.images
      : [property.image];
  }, [property]);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: property
      ? `Hello, I am interested in ${property.title}. Please provide pricing, floor plans, and site visit availability.`
      : "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const relatedProperties = useMemo(() => {
    if (!property) return [];
    if (property.relatedPropertyIds && property.relatedPropertyIds.length > 0) {
      return propertiesData.filter((p) =>
        property.relatedPropertyIds.includes(p.id)
      );
    }
    return propertiesData.filter((p) => p.id !== property.id).slice(0, 3);
  }, [property]);

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

  const handlePrevPhoto = useCallback((e) => {
    e?.stopPropagation();
    setActivePhotoIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  }, [galleryImages.length]);

  const handleNextPhoto = useCallback((e) => {
    e?.stopPropagation();
    setActivePhotoIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  }, [galleryImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") handlePrevPhoto();
      if (e.key === "ArrowRight") handleNextPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, handlePrevPhoto, handleNextPhoto]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setToastMessage("Inquiry submitted successfully! Our team will contact you shortly.");
      setTimeout(() => setToastMessage(""), 4000);
    }, 500);
  };

  if (!property) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-slate-50">
        <div className="w-16 h-16 rounded-3xl bg-[#FFF4EB] text-[#F87907] flex items-center justify-center mb-4 shadow-sm">
          <Building2 size={32} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2 font-serif">
          Property Not Found
        </h1>
        <p className="text-slate-600 max-w-md mb-6 text-sm">
          The property you are looking for might have been moved or is currently unavailable.
        </p>
        <button
          onClick={() => navigate("/properties")}
          className="px-6 py-2.5 rounded-full bg-[#F87907] hover:bg-[#ea580c] text-white font-semibold text-sm transition-all shadow-md cursor-pointer"
        >
          View All Available Properties
        </button>
      </div>
    );
  }

  const basicsList = [
    {
      label: "Category",
      value: property.category || "For Sale",
      sub: "Commercial Asset",
      icon: Tag,
      iconColor: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      label: "Property Type",
      value: property.type,
      sub: "High-Yield Business",
      icon: Building2,
      iconColor: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      label: "Status",
      value: property.status || "For Sale",
      sub: "Ready for Booking",
      isStatus: true,
      icon: CheckCircle2,
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      label: "Floors",
      value: property.floorsLabel || `${property.floors} Floors`,
      sub: "Ground + 5 Levels",
      icon: Layers,
      iconColor: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      label: "Total Units",
      value: `${property.units} Units`,
      sub: "Commercial Suites",
      icon: Building,
      iconColor: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      label: "Dedicated Tower",
      value: property.towerLabel || "1 Block",
      sub: "Exclusive Complex",
      icon: Compass,
      iconColor: "text-orange-600 bg-orange-50 border-orange-100",
    },
  ];

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

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    property.location
  )}`;

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-800 select-none pb-24 pt-[68px] sm:pt-[72px] lg:pt-[76px]">
      {/* Top Navigation & Breadcrumb Bar */}
      <div className="w-full bg-white border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-2.5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 text-xs sm:text-sm">
          <nav className="flex items-center gap-1.5 text-slate-500 min-w-0 flex-wrap sm:flex-nowrap">
            <Link to="/" className="hover:text-[#F87907] transition-colors font-medium shrink-0">
              Home
            </Link>
            <ChevronRight size={13} className="text-slate-400 shrink-0" />
            <Link to="/properties" className="hover:text-[#F87907] transition-colors font-medium shrink-0">
              Properties
            </Link>
            <ChevronRight size={13} className="text-slate-400 shrink-0" />
            <span className="text-slate-900 font-bold truncate max-w-[170px] xs:max-w-[240px] sm:max-w-xs md:max-w-md">
              {property.title}
            </span>
          </nav>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t border-slate-100 sm:border-t-0">
            <button
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

      {/* Hero Property Header & Pricing Showcase */}
      <section className="bg-gradient-to-b from-white via-slate-50/70 to-white border-b border-slate-200/90 pt-8 pb-9">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              {/* Badges Strip */}
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

              {/* Title */}
              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-serif font-bold text-[#0F172A] tracking-tight leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {property.title}
              </h1>

              {/* Location with Google Maps link */}
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-600 pt-1">
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin size={16} className="text-[#F87907] shrink-0" />
                  <span>{property.location}</span>
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

            {/* Pricing Card */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-[0_10px_25px_rgba(0,0,0,0.04)] lg:min-w-[280px] flex flex-col justify-center">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {property.pricePrefix || "Starting Price"}
              </div>
              <div
                className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] mt-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {property.price}
              </div>
              <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50/90 border border-emerald-200/80 rounded-xl px-2.5 py-1.5 mt-2.5 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                <span>Zero Brokerage • Direct Pricing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 pt-8">
        {/* Media Showcase (Photos & Video Tabs) */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-[0_12px_36px_rgba(0,0,0,0.05)] mb-8">
          <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 pb-3 sm:pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setActiveMediaTab("photos")}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeMediaTab === "photos"
                    ? "bg-[#0F172A] text-white shadow-sm scale-101"
                    : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
                }`}
              >
                <ImageIcon size={14} className="sm:w-[15px] sm:h-[15px]" />
                <span>Photos ({activePhotoIndex + 1}/{galleryImages.length})</span>
              </button>

              <button
                onClick={() => setActiveMediaTab("video")}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeMediaTab === "video"
                    ? "bg-[#F87907] text-white shadow-sm scale-101"
                    : "bg-slate-100 text-slate-600 hover:text-[#F87907] hover:bg-slate-200/70"
                }`}
              >
                <Video size={14} className="sm:w-[15px] sm:h-[15px]" />
                <span>Video Tour</span>
                <span className="px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] bg-white/20 font-bold uppercase tracking-wider">
                  HD
                </span>
              </button>
            </div>

            <button
              onClick={() => setLightboxOpen(true)}
              className="text-xs font-bold text-slate-700 hover:text-[#F87907] inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 hover:border-[#F87907] transition-all cursor-pointer bg-slate-50 shrink-0"
            >
              <Maximize2 size={13} />
              <span className="hidden xs:inline">Full Screen</span>
            </button>
          </div>

          {activeMediaTab === "photos" ? (
            <div>
              <div className="relative w-full h-[260px] xs:h-[320px] sm:h-[440px] md:h-[480px] lg:h-[530px] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 shadow-inner group">
                <img
                  src={galleryImages[activePhotoIndex]}
                  alt={`${property.title} view ${activePhotoIndex + 1}`}
                  onClick={() => setLightboxOpen(true)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 cursor-pointer"
                />

                {/* Left Arrow Button */}
                {galleryImages.length > 1 && (
                  <button
                    onClick={handlePrevPhoto}
                    aria-label="Previous Photo"
                    className="absolute left-2.5 sm:left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-lg hover:scale-110 cursor-pointer z-10"
                  >
                    <ChevronLeft size={20} className="sm:w-[22px] sm:h-[22px]" />
                  </button>
                )}

                {/* Right Arrow Button */}
                {galleryImages.length > 1 && (
                  <button
                    onClick={handleNextPhoto}
                    aria-label="Next Photo"
                    className="absolute right-2.5 sm:right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-lg hover:scale-110 cursor-pointer z-10"
                  >
                    <ChevronRight size={20} className="sm:w-[22px] sm:h-[22px]" />
                  </button>
                )}

                {/* Top Corner Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                    {property.type}
                  </span>
                </div>

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold pointer-events-none">
                  Photo {activePhotoIndex + 1} of {galleryImages.length}
                </div>

                {/* Bottom Overlay Hint */}
                <div
                  onClick={() => setLightboxOpen(true)}
                  className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-between cursor-pointer"
                >
                  <span className="text-white text-xs sm:text-sm font-medium flex items-center gap-2">
                    <Maximize2 size={15} />
                    <span>Click image to view in high-resolution lightbox</span>
                  </span>
                  <span className="text-white/80 text-xs hidden sm:inline">
                    Use arrow keys to browse
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-3 sm:mt-4">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`relative h-16 xs:h-20 sm:h-24 md:h-28 rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activePhotoIndex === idx
                          ? "border-[#F87907] ring-2 sm:ring-3 ring-[#F87907]/30 shadow-md scale-102"
                          : "border-slate-200 opacity-75 hover:opacity-100 hover:scale-101"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {activePhotoIndex === idx && (
                        <div className="absolute inset-0 bg-[#F87907]/10" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="relative w-full h-[260px] xs:h-[320px] sm:h-[440px] md:h-[480px] lg:h-[530px] rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-inner flex items-center justify-center">
              <video
                key={`tab-${property.videoUrl}`}
                src={property.videoUrl}
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={property.videoPoster || galleryImages[0]}
                className="w-full h-full object-cover"
              >
                <source src={property.videoUrl} type="video/mp4" />
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
                  type="video/mp4"
                />
                Your browser does not support HTML5 video.
              </video>
            </div>
          )}
        </div>

        {/* Quick Key Metrics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-8">
          <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
              <Tag size={18} className="sm:w-[22px] sm:h-[22px]" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Asset Class
              </div>
              <div className="text-xs sm:text-base font-bold text-slate-900 mt-0.5 truncate">
                {property.type} Unit
              </div>
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
              <Layers size={18} className="sm:w-[22px] sm:h-[22px]" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Total Height
              </div>
              <div className="text-xs sm:text-base font-bold text-slate-900 mt-0.5 truncate">
                {property.floorsLabel || `${property.floors} Floors`}
              </div>
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
              <Building2 size={18} className="sm:w-[22px] sm:h-[22px]" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Commercial Units
              </div>
              <div className="text-xs sm:text-base font-bold text-slate-900 mt-0.5 truncate">
                {property.units} Available
              </div>
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <ShieldCheck size={18} className="sm:w-[22px] sm:h-[22px]" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Structure
              </div>
              <div className="text-xs sm:text-base font-bold text-slate-900 mt-0.5 truncate">
                Earthquake R.C.C.
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout: Left 8 Cols (Details), Right 4 Cols (Sticky Inquire Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Quick Basics Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-slate-100">
                <span className="w-2.5 h-6 rounded-full bg-[#F87907]" />
                <h2
                  className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] tracking-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Property Basics & Overview
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {basicsList.map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-slate-300 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {item.label}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${item.iconColor}`}
                        >
                          <ItemIcon size={16} />
                        </div>
                      </div>
                      <div>
                        <div
                          className={`text-base font-bold ${
                            item.isStatus
                              ? "text-emerald-700 flex items-center gap-1.5"
                              : "text-slate-900"
                          }`}
                        >
                          {item.isStatus && <CheckCircle2 size={16} />}
                          <span>{item.value}</span>
                        </div>
                        <div className="text-xs text-slate-500 font-medium mt-0.5">
                          {item.sub}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Structural Safety Highlight Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-50/60 to-amber-50/60 border border-orange-200/80 col-span-1 sm:col-span-2 md:col-span-3">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF4EB] border border-[#F87907]/30 text-[#F87907] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#F87907]">
                        Floor Structure & Seismic Safety
                      </div>
                      <div className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                        {property.floorStructure || "Earthquake-resistant R.C.C. frame"}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        Engineered with certified high-grade seismic compliance, superior structural load distribution, and premium quality steel reinforcement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description & Project Details */}
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

            {/* Dedicated Walkthrough Video Showcase Section */}
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
                <video
                  ref={tourVideoRef}
                  key={`tour-${property.videoUrl}`}
                  src={property.videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="auto"
                  poster={property.videoPoster || galleryImages[0]}
                  className="w-full h-full object-cover"
                >
                  <source src={property.videoUrl} type="video/mp4" />
                  <source
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support HTML5 video.
                </video>

                {/* Floating Sound Toggle Button */}
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
              </div>
            </div>

            {/* Amenities & Features */}
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
            </div>

            {/* Building Specifications */}
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

            {/* Location & Neighborhoods */}
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

            {/* Nearby Educational Institutions */}
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

            {/* Project Documents */}
            {property.documents && property.documents.length > 0 && (
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
                  {property.documents.map((doc, idx) => (
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

          {/* Right Column: Sticky Inquire Property Sidebar */}
          <div className="lg:col-span-4 sticky top-20 space-y-6" id="inquire-form">
            {/* Direct Inquiry Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_16px_40px_rgba(0,0,0,0.07)]">
              {/* Agent Profile */}
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

              {/* Instant Call & WhatsApp Buttons */}
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
                  <h4 className="text-base font-bold text-emerald-950">Inquiry Received!</h4>
                  <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                    Thank you! Sujit Mohapatra and the property advisory team will contact you directly with pricing and floor plans.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 text-xs font-bold text-emerald-800 underline cursor-pointer hover:text-emerald-950"
                  >
                    Submit another inquiry
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
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F87907] to-[#FB923C] hover:from-[#ea580c] hover:to-[#F87907] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-98"
                  >
                    {isSubmitting ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Submit Property Inquiry</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                    <Lock size={11} />
                    <span>100% Privacy • No Spam Guarantee</span>
                  </div>
                </form>
              )}
            </div>

            {/* Direct Zero Brokerage Callout */}
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

        {/* Related Properties */}
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
                <div
                  key={rel.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden bg-slate-900">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {rel.badges?.slice(0, 2).map((b, bIdx) => (
                        <span
                          key={bIdx}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-slate-900 shadow-2xs backdrop-blur-xs"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div
                        className="text-xl font-serif font-bold text-[#0F172A] mb-1.5"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {rel.price}
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#F87907] transition-colors line-clamp-2 mb-2 leading-snug">
                        {rel.title}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                        <MapPin size={13} className="text-[#F87907] shrink-0" />
                        <span className="truncate">{rel.location}</span>
                      </div>
                    </div>

                    <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        to={`/property/${rel.id}`}
                        className="text-xs font-bold text-[#F87907] hover:text-[#ea580c] inline-flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ArrowRight size={13} />
                      </Link>
                      <span className="text-[11px] text-slate-500 font-semibold px-2 py-0.5 rounded-md bg-slate-100">
                        {rel.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal with Prev/Next Navigation */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            >
              {/* Prev Button */}
              {galleryImages.length > 1 && (
                <button
                  onClick={handlePrevPhoto}
                  aria-label="Previous image"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-xl hover:scale-110 cursor-pointer z-20 border border-white/20"
                >
                  <ChevronLeft size={26} />
                </button>
              )}

              {/* Next Button */}
              {galleryImages.length > 1 && (
                <button
                  onClick={handleNextPhoto}
                  aria-label="Next image"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-xl hover:scale-110 cursor-pointer z-20 border border-white/20"
                >
                  <ChevronRight size={26} />
                </button>
              )}

              <img
                src={galleryImages[activePhotoIndex]}
                alt={`${property.title} large view`}
                className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
              />

              <div className="flex items-center gap-3 mt-4 text-white text-xs sm:text-sm font-medium">
                <span className="truncate max-w-xs sm:max-w-md">{property.title}</span>
                <span>•</span>
                <span>Photo {activePhotoIndex + 1} of {galleryImages.length}</span>
              </div>

              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-2 right-2 sm:-top-3 sm:-right-3 w-10 h-10 rounded-full bg-white text-slate-900 font-bold flex items-center justify-center shadow-lg hover:bg-[#F87907] hover:text-white transition-colors cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
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
