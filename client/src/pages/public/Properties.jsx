import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Share2,
  Check,
  ArrowRight,
  SlidersHorizontal,
  Building2,
  Sparkles,
  ChevronDown,
  X,
  Phone,
} from "lucide-react";
import PageHero from "../../components/common/PageHero";
import { propertiesData } from "../../data/propertiesData";

const galleryShowcase = [
  {
    id: 1,
    title: "The Grand Horizon Villa",
    location: "Marine Drive, Puri Coast",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Royal Amber Penthouse",
    location: "Patia Hills, Bhubaneswar",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Serene Meadow Residence",
    location: "Khandagiri Green Valley",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Milano Luxury Living Suite",
    location: "Jayadev Vihar Heights",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Properties() {
  const [searchParams] = useSearchParams();
  const initialLocation = searchParams.get("location") || "";

  const [searchQuery, setSearchQuery] = useState(initialLocation);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedBeds, setSelectedBeds] = useState("All");
  const [selectedBaths, setSelectedBaths] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const handleShare = async (prop) => {
    const shareUrl = `${window.location.origin}/properties?id=${prop.id}`;
    const shareData = {
      title: prop.title,
      text: `Check out ${prop.title} (${prop.price}) on Treasure Island!`,
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err.name !== "AbortError") {
        } else {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedId(prop.id);
      setToastMessage("Property link copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2500);
      setTimeout(() => setToastMessage(""), 3000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedId(prop.id);
      setToastMessage("Property link copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2500);
      setTimeout(() => setToastMessage(""), 3000);
    }
  };

  const filteredProperties = useMemo(() => {
    let result = [...propertiesData];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.badges.some((b) => b.toLowerCase().includes(q)),
      );
    }

    if (selectedType !== "All") {
      result = result.filter((p) => p.type === selectedType);
    }

    if (selectedPrice !== "All") {
      if (selectedPrice === "under-50l") {
        result = result.filter((p) => p.priceValue < 5000000);
      } else if (selectedPrice === "50l-1cr") {
        result = result.filter(
          (p) => p.priceValue >= 5000000 && p.priceValue <= 10000000,
        );
      } else if (selectedPrice === "1cr-2cr") {
        result = result.filter(
          (p) => p.priceValue > 10000000 && p.priceValue <= 20000000,
        );
      } else if (selectedPrice === "above-2cr") {
        result = result.filter((p) => p.priceValue > 20000000);
      }
    }

    if (selectedBeds !== "All") {
      const bedsNum = parseInt(selectedBeds, 10);
      if (bedsNum === 5) {
        result = result.filter((p) => p.beds >= 5);
      } else {
        result = result.filter((p) => p.beds === bedsNum);
      }
    }

    if (selectedBaths !== "All") {
      const bathsNum = parseInt(selectedBaths, 10);
      if (bathsNum === 4) {
        result = result.filter((p) => p.baths >= 4);
      } else {
        result = result.filter((p) => p.baths === bathsNum);
      }
    }

    if (sortBy === "lowest-price") {
      result.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortBy === "highest-price") {
      result.sort((a, b) => b.priceValue - a.priceValue);
    } else if (sortBy === "largest-sqft") {
      result.sort((a, b) => b.sqft - a.sqft);
    } else if (sortBy === "lowest-sqft") {
      result.sort((a, b) => a.sqft - b.sqft);
    } else if (sortBy === "bedrooms") {
      result.sort((a, b) => b.beds - a.beds);
    } else if (sortBy === "bathrooms") {
      result.sort((a, b) => b.baths - a.baths);
    } else {
      result.sort((a, b) => a.id - b.id);
    }

    return result;
  }, [
    searchQuery,
    selectedType,
    selectedPrice,
    selectedBeds,
    selectedBaths,
    sortBy,
  ]);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedType !== "All" ||
    selectedPrice !== "All" ||
    selectedBeds !== "All" ||
    selectedBaths !== "All";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType("All");
    setSelectedPrice("All");
    setSelectedBeds("All");
    setSelectedBaths("All");
    setSortBy("newest");
  };

  return (
    <div className="w-full bg-white select-none overflow-hidden">
      <PageHero
        badge="Luxury Residences"
        badgeIcon={Sparkles}
        title="Properties"
        subtitle="Curated premium homes with unrivaled elegance and stunning details."
      />

      <section className="relative z-20 -mt-10 px-4 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-slate-200/90">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-4">
              <div>
                <h3
                  className="text-lg sm:text-xl font-bold font-serif text-[#0F172A]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Find Your Perfect Home
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Search across verified plots, luxury apartments, and duplexes in Bhubaneswar
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                    showFilters
                      ? "bg-[#FFF4EB] border-[#F87907] text-[#F87907]"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <SlidersHorizontal size={15} />
                  <span>More filters</span>
                </button>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-red-600 bg-slate-50 hover:bg-red-50 border border-slate-200 transition-colors cursor-pointer"
                  >
                    <X size={14} />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              <div className="relative sm:col-span-2 lg:col-span-2">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Search by title, location, or developer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/90 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#F87907] focus:ring-2 focus:ring-[#F87907]/20 transition-all"
                />
              </div>

              <div className="relative">
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/90 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-[#F87907] appearance-none cursor-pointer"
                >
                  <option value="All">Price: All</option>
                  <option value="under-50l">Under ₹50 L</option>
                  <option value="50l-1cr">₹50 L - ₹1 Cr</option>
                  <option value="1cr-2cr">₹1 Cr - ₹2 Cr</option>
                  <option value="above-2cr">Above ₹2 Cr</option>
                </select>
                <ChevronDown
                  size={15}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>

              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/90 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-[#F87907] appearance-none cursor-pointer"
                >
                  <option value="All">Type: All</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House & Villa</option>
                  <option value="Villa">Villa</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Land">Land</option>
                </select>
                <ChevronDown
                  size={15}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>

              <div className="relative">
                <select
                  value={selectedBeds}
                  onChange={(e) => setSelectedBeds(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/90 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-[#F87907] appearance-none cursor-pointer"
                >
                  <option value="All">Bedrooms: All</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4 Bedrooms</option>
                  <option value="5">5+ Bedrooms</option>
                </select>
                <ChevronDown
                  size={15}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden pt-4 mt-4 border-t border-slate-100"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    <div className="relative">
                      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        Bathrooms
                      </label>
                      <select
                        value={selectedBaths}
                        onChange={(e) => setSelectedBaths(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/90 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-[#F87907] appearance-none cursor-pointer"
                      >
                        <option value="All">Bathrooms: Any</option>
                        <option value="1">1 Bathroom</option>
                        <option value="2">2 Bathrooms</option>
                        <option value="3">3 Bathrooms</option>
                        <option value="4">4+ Bathrooms</option>
                      </select>
                      <ChevronDown
                        size={15}
                        className="absolute right-3.5 top-[34px] text-slate-400 pointer-events-none"
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        Sorting Order
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/90 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-[#F87907] appearance-none cursor-pointer"
                      >
                        <option value="newest">Sort by: Newest</option>
                        <option value="lowest-price">Sort by: Lowest price</option>
                        <option value="highest-price">Sort by: Highest price</option>
                        <option value="largest-sqft">Sort by: Largest sq ft</option>
                        <option value="lowest-sqft">Sort by: Lowest sq ft</option>
                        <option value="bedrooms">Sort by: Bedrooms</option>
                        <option value="bathrooms">Sort by: Bathrooms</option>
                      </select>
                      <ChevronDown
                        size={15}
                        className="absolute right-3.5 top-[34px] text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="bg-slate-50/70 px-4 sm:px-8 lg:px-10 pt-10 pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200/80">
            <div>
              <span className="text-xl sm:text-2xl font-bold font-serif text-[#0F172A]">
                {filteredProperties.length} results
              </span>
              <span className="text-xs sm:text-sm text-slate-500 ml-2">
                available in prime Odisha locations
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#F87907] cursor-pointer shadow-xs"
              >
                <option value="newest">Newest</option>
                <option value="lowest-price">Lowest price</option>
                <option value="highest-price">Highest price</option>
                <option value="largest-sqft">Largest sq ft</option>
                <option value="lowest-sqft">Lowest sq ft</option>
                <option value="bedrooms">Bedrooms</option>
                <option value="bathrooms">Bathrooms</option>
              </select>
            </div>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">No properties found</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                No listings matched your active filter criteria. Try adjusting your search keyword or clearing the filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 px-6 py-2.5 rounded-full bg-[#F87907] text-white text-xs sm:text-sm font-semibold hover:bg-[#ea580c] transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
              {filteredProperties.map((prop) => (
                <motion.article
                  key={prop.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:border-slate-300 transition-all duration-300 overflow-hidden"
                >
                  <div>
                    <div className="relative w-full h-[200px] sm:h-[215px] overflow-hidden bg-slate-100">
                      <Link to={`/property/${prop.id}`} className="block w-full h-full">
                        <img
                          src={prop.image}
                          alt={prop.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                      </Link>

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm bg-black/60 text-white border border-white/20">
                          {prop.type}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleShare(prop)}
                          className="pointer-events-auto px-2.5 py-1 rounded-full bg-white/95 hover:bg-white text-slate-700 hover:text-[#F87907] text-xs font-medium flex items-center gap-1 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer border border-white/40"
                          title="Share property"
                          aria-label="Share property"
                        >
                          {copiedId === prop.id ? (
                            <>
                              <Check size={13} className="text-emerald-500" />
                              <span className="text-emerald-600 font-semibold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Share2 size={13} className="text-[#F87907]" />
                              <span>Share</span>
                            </>
                          )}
                        </button>
                      </div>

                      {prop.isFeatured && (
                        <div className="absolute bottom-2.5 left-3 pointer-events-none">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F87907] text-white shadow-sm flex items-center gap-1">
                            <Sparkles size={11} />
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h2 className="text-base sm:text-[17px] font-bold text-[#0F172A] tracking-tight leading-snug group-hover:text-[#F87907] transition-colors line-clamp-2">
                          <Link to={`/property/${prop.id}`}>
                            {prop.title}
                          </Link>
                        </h2>
                      </div>

                      <div className="mb-3">
                        {prop.pricePrefix && (
                          <span className="block text-xs text-slate-500 font-normal">
                            {prop.pricePrefix}
                          </span>
                        )}
                        <span className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight font-serif">
                          {prop.price}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-slate-600 mb-3 pb-3 border-b border-slate-100">
                        {prop.beds > 0 && (
                          <span className="flex items-center gap-1.5">
                            <Bed size={14} className="text-slate-400" />
                            <span>{prop.beds} beds</span>
                          </span>
                        )}
                        {prop.baths > 0 && (
                          <span className="flex items-center gap-1.5">
                            <Bath size={14} className="text-slate-400" />
                            <span>{prop.baths} baths</span>
                          </span>
                        )}
                        {prop.sqft > 0 && (
                          <span className="flex items-center gap-1.5">
                            <Maximize size={13} className="text-slate-400" />
                            <span>{prop.sqft} sq ft</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3.5">
                        <MapPin size={13} className="shrink-0 text-[#F87907]" />
                        <span className="truncate">{prop.location}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {prop.badges.slice(0, 3).map((b, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[10px] font-medium text-slate-600 bg-slate-100 border border-slate-200"
                          >
                            {b}
                          </span>
                        ))}
                        {prop.badges.length > 3 && (
                          <span className="text-[10px] text-slate-400 font-medium">
                            +{prop.badges.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-slate-100/90 flex items-center justify-between">
                    <Link
                      to={`/property/${prop.id}`}
                      className="text-xs font-semibold text-[#F87907] hover:text-[#ea580c] inline-flex items-center gap-1 group-hover:gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Inquire Property</span>
                      <ArrowRight size={13} />
                    </Link>

                    <a
                      href="tel:+919348980948"
                      className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200/80 hover:bg-[#F87907] hover:text-white text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                      title="Call agent"
                    >
                      <Phone size={13} />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative w-full bg-white px-4 sm:px-8 lg:px-10 py-16 sm:py-24 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F87907]">
              Visual Showcase
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-[2.65rem] font-serif font-bold text-[#0F172A] tracking-tight mt-1 mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Gallery
            </h2>

            <div className="flex items-center justify-center gap-1.5 mt-2.5 mb-3.5">
              <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-[#F87907] to-[#F87907] rounded-full" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
              <span className="w-2.5 h-2.5 rotate-45 bg-[#F87907] shadow-[0_0_8px_rgba(248,121,7,0.6)]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
              <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-l from-transparent via-[#F87907] to-[#F87907] rounded-full" />
            </div>

            <p className="text-sm sm:text-base text-slate-500 font-normal leading-relaxed max-w-xl mx-auto">
              A curated glimpse into Treasure Island’s finest luxury estates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {galleryShowcase.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 min-h-[220px]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-[11px] text-amber-300 flex items-center gap-1 mb-0.5">
                    <MapPin size={11} className="text-[#F87907]" />
                    <span>{item.location}</span>
                  </div>
                  <h3
                    className="font-serif font-bold text-sm text-white"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F87907] to-[#FB923C] hover:from-[#EA580C] hover:to-[#F87907] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-[0_8px_24px_rgba(248,121,7,0.35)] transition-all cursor-pointer"
            >
              <span>Speak with Our Property Advisor</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/95 text-white text-xs sm:text-sm font-medium shadow-2xl backdrop-blur-md border border-white/10"
          >
            <Check size={16} className="text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
