import { useState, useMemo, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Check,
  ArrowRight,
  SlidersHorizontal,
  Building2,
  Sparkles,
  ChevronDown,
  X,
  Phone,
  Loader2,
} from "lucide-react";
import PageHero from "../../components/common/PageHero";
import PropertyCard from "../../components/common/PropertyCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProperties } from "../../services/propertyService";
import { getAllProperties } from "../../utils/propertyStorage";
import {
  oceanVilla,
  villa1,
  villa2,
  interiorLiving,
  apartment1 as fallbackPropertyImg,
} from "../../assets/properties";

const galleryShowcase = [
  {
    id: 1,
    title: "The Grand Horizon Villa",
    location: "Marine Drive, Puri Coast",
    image: oceanVilla,
  },
  {
    id: 2,
    title: "Royal Amber Penthouse",
    location: "Patia Hills, Bhubaneswar",
    image: villa1,
  },
  {
    id: 3,
    title: "Serene Meadow Residence",
    location: "Khandagiri Green Valley",
    image: villa2,
  },
  {
    id: 4,
    title: "Milano Luxury Living Suite",
    location: "Jayadev Vihar Heights",
    image: interiorLiving,
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

  const handleCopyLink = async (prop) => {
    const shareUrl = `${window.location.origin}/property/${prop.slug || prop.id}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopiedId(prop.id);
      setToastMessage("Property link copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2500);
      setTimeout(() => setToastMessage(""), 3000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
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

  const handleShare = async (prop) => {
    const shareUrl = `${window.location.origin}/property/${prop.slug || prop.id}`;
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

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["properties", "public_catalog"],
    queryFn: ({ pageParam }) => getProperties({ page: pageParam, per_page: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = Number(lastPage?.current_page) || 1;
      const lastPageNum = Number(lastPage?.last_page) || 1;
      return currentPage < lastPageNum ? currentPage + 1 : undefined;
    },
  });

  const properties = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => (Array.isArray(page) ? page : []));
  }, [data]);

  const totalCount = useMemo(() => {
    const firstPage = data?.pages?.[0];
    if (typeof firstPage?.total === "number") return firstPage.total;
    return properties.length;
  }, [data, properties.length]);

  const filteredProperties = useMemo(() => {
    let result = properties.length > 0 ? [...properties] : [...getAllProperties()];

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
      const target = selectedType.toLowerCase();
      result = result.filter((p) => {
        const pt = String(p.type || p.property_type || "").toLowerCase();
        return pt === target;
      });
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
    properties,
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

  const observerTarget = useRef(null);

  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "300px", threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const displayedProperties = filteredProperties;

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

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
                  <option value="Commercial">Commercial</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Villa">Villa</option>
                  <option value="House">House</option>
                  <option value="Penthouse">Penthouse</option>
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
                Showing {filteredProperties.length} of {hasActiveFilters ? filteredProperties.length : totalCount} results
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

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-sm animate-pulse space-y-4"
                >
                  <div className="w-full h-[200px] sm:h-[215px] bg-slate-200 rounded-xl" />
                  <div className="space-y-2">
                    <div className="h-5 bg-slate-200 rounded-md w-3/4" />
                    <div className="h-4 bg-slate-100 rounded-md w-1/2" />
                  </div>
                  <div className="h-7 bg-slate-200 rounded-md w-1/3" />
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                    <div className="h-4 bg-slate-100 rounded w-16" />
                    <div className="h-4 bg-slate-100 rounded w-16" />
                    <div className="h-4 bg-slate-100 rounded w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">
                {hasActiveFilters ? "No properties found" : "No properties available"}
              </h3>
              <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                {hasActiveFilters
                  ? "No listings matched your active filter criteria. Try adjusting your search keyword or clearing the filters."
                  : "No properties are currently available. Please check back later."}
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 px-6 py-2.5 rounded-full bg-[#F87907] text-white text-xs sm:text-sm font-semibold hover:bg-[#ea580c] transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
                {displayedProperties.map((prop) => (
                  <PropertyCard
                    key={prop.id || prop.slug}
                    property={prop}
                    copiedId={copiedId}
                    onCopy={handleCopyLink}
                    onShare={handleShare}
                    footer={
                      <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-slate-100/90 flex items-center justify-between">
                        <Link
                          to={`/property/${prop.slug || prop.id}`}
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
                    }
                  />
                ))}
              </div>

              <div ref={observerTarget} className="h-6 w-full" />

              {isFetchingNextPage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2.5 py-8 text-sm font-semibold text-slate-500"
                >
                  <Loader2 size={18} className="animate-spin text-[#F87907]" />
                  <span>Loading next properties...</span>
                </motion.div>
              )}

              {hasNextPage && !isFetchingNextPage && (
                <div className="flex justify-center pt-8 pb-4">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    className="px-6 py-3 rounded-full bg-slate-900 hover:bg-[#F87907] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 active:scale-98"
                  >
                    <span>Load Next Properties</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}

              {!hasNextPage && filteredProperties.length > 0 && (
                <div className="text-center pt-8 pb-4 text-xs font-semibold text-slate-400">
                  You have viewed all {filteredProperties.length} properties
                </div>
              )}
            </>
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
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackPropertyImg;
                  }}
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
