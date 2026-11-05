import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProperties } from "../../../services/propertyService";
import { getAllProperties } from "../../../utils/propertyStorage";
import PropertyCard from "../../common/PropertyCard";
import {
  Building2,
  Check,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

const categories = [
  "All",
  "Apartment",
  "Commercial",
  "Duplex",
  "Villa",
  "House",
  "Penthouse",
  "Land",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.25 },
  },
};

export default function FeaturedProperties() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [pageIndex, setPageIndex] = useState(0);
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
    queryKey: ["properties", "featured_home", activeCategory],
    queryFn: ({ pageParam = 1 }) =>
      getProperties({
        page: pageParam,
        per_page: 10,
        property_type: activeCategory === "All" ? undefined : activeCategory,
      }),
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

  const activeProperties = properties.length > 0 ? properties : getAllProperties();

  const formattedList = useMemo(() => {
    return activeProperties.map((p, idx) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.property_type || p.type || p.category || "Apartment",
      type: p.property_type || p.type || "Apartment",
      property_type: p.property_type || p.type || "Apartment",
      tag:
        p.isFeatured || p.is_featured
          ? "Featured"
          : idx % 2 === 0
          ? "Luxury"
          : "Exclusive",
      tagType: p.isFeatured || p.is_featured ? "light" : "dark",
      isFeatured: Boolean(p.isFeatured ?? p.is_featured),
      is_negotiable: Boolean(p.is_negotiable),
      price: p.price,
      pricePrefix: p.pricePrefix || p.price_type || null,
      image: p.image || p.cover_image,
      specs: {
        beds: p.bedrooms && p.bedrooms !== "Custom Units" ? p.bedrooms : p.beds > 0 ? `${p.beds} BHK` : "",
        baths: p.bathrooms
          ? String(p.bathrooms).includes("bath") || String(p.bathrooms).includes("Bath")
          ? p.bathrooms
          : `${p.bathrooms} Baths`
          : p.baths > 0
          ? `${p.baths} Baths`
          : "",
        area: (p.property_area || p.sqft) ? `${p.property_area || p.sqft} ${p.area_unit || "Sq. Ft."}` : "",
      },
      location: p.location,
      badges: (() => {
        const list = Array.isArray(p.badges) && p.badges.length > 0
          ? [...p.badges]
          : [p.property_type || p.type || "Apartment", p.listing_type || "For Sale"];
        const pType = p.property_type || p.type;
        if (pType && !list.includes(pType)) {
          list.push(pType);
        }
        return list;
      })(),
      showSpecsLabel: false,
      activeDotIndex: idx % 3,
    }));
  }, [activeProperties]);

  const categoryMatched = useMemo(() => {
    if (activeCategory === "All") return formattedList;
    const target = activeCategory.trim().toLowerCase().replace(/s$/, "");
    return formattedList.filter((p) => {
      const pType = String(p.type || p.property_type || "").trim().toLowerCase().replace(/s$/, "");
      const pCat = String(p.category || "").trim().toLowerCase().replace(/s$/, "");
      return pType === target || pCat === target;
    });
  }, [formattedList, activeCategory]);

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.max(1, Math.ceil(categoryMatched.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(pageIndex, totalPages - 1);
  const displayedProperties = useMemo(() => {
    return categoryMatched.slice(
      currentPage * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
    );
  }, [categoryMatched, currentPage]);

  const handlePrev = () => {
    setPageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = async () => {
    if (currentPage >= totalPages - 1 && hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
      setPageIndex((prev) => prev + 1);
    } else if (currentPage < totalPages - 1) {
      setPageIndex((prev) => prev + 1);
    }
  };

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

  return (
    <section className="relative w-full bg-[#F4F5F7] px-4 sm:px-8 lg:px-10 pt-10 sm:pt-14 pb-18 sm:pb-24 text-slate-800 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto w-full">
        <div className="relative mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-bold text-[#0F172A] tracking-tight mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Featured Properties
            </h2>

            <div className="flex items-center justify-center gap-1.5 mt-2.5 mb-3.5">
              <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-[#F87907] to-[#F87907] rounded-full" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
              <span className="w-2.5 h-2.5 rotate-45 bg-[#F87907] shadow-[0_0_8px_rgba(248,121,7,0.6)]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
              <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-l from-transparent via-[#F87907] to-[#F87907] rounded-full" />
            </div>

            <p className="text-sm sm:text-base md:text-[17px] text-slate-500 font-normal leading-relaxed max-w-xl mx-auto">
              Handpicked luxury properties that define elegance and comfort
            </p>
          </motion.div>

          {(totalPages > 1 || hasNextPage) && (
            <div className="flex items-center gap-2 absolute right-0 bottom-1">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentPage <= 0}
                className={`inline-flex items-center gap-1 text-xs sm:text-sm font-medium transition-colors cursor-pointer group ${
                  currentPage <= 0
                    ? "text-slate-300 cursor-not-allowed opacity-50"
                    : "text-slate-500 hover:text-[#F87907]"
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft
                  size={16}
                  className="transition-transform group-hover:-translate-x-0.5"
                />
                <span>Previous</span>
              </button>
              <span className="text-slate-400 text-xs font-semibold">
                {currentPage + 1} / {totalPages}
              </span>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentPage >= totalPages - 1 && !hasNextPage}
                className={`inline-flex items-center gap-1 text-xs sm:text-sm font-medium transition-colors cursor-pointer group ${
                  currentPage >= totalPages - 1 && !hasNextPage
                    ? "text-slate-300 cursor-not-allowed opacity-50"
                    : "text-slate-500 hover:text-[#F87907]"
                }`}
                aria-label="Next page"
              >
                <span>Next</span>
                <ChevronRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10 pb-2">
          <div className="text-xs sm:text-sm font-medium italic text-slate-500">
            Showing{" "}
            <span className="font-semibold text-[#F87907] not-italic">
              {displayedProperties.length}
            </span>{" "}
            exclusive {activeCategory === "All" ? "properties" : `${activeCategory} properties`}
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setPageIndex(0);
                  }}
                  className={`relative px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#FFF4EB] border border-[#F87907] text-[#F87907] shadow-sm font-semibold"
                      : "bg-white border border-slate-200/90 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {isLoading && properties.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/80 p-4 shadow-sm animate-pulse space-y-4"
              >
                <div className="w-full h-[190px] sm:h-[205px] bg-slate-200 rounded-xl" />
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
        ) : categoryMatched.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF4EB] text-[#F87907] flex items-center justify-center mx-auto mb-3.5">
              <Building2 size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No properties available</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              No properties have been added yet. Please check back later or contact us for upcoming listings.
            </p>
          </div>
        ) : (
          <motion.div
            key={`${activeCategory}-${currentPage}`}
            layout
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {displayedProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  copiedId={copiedId}
                  onCopy={handleCopyLink}
                  onShare={handleShare}
                  variants={cardVariants}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <div ref={observerTarget} className="h-2 w-full pointer-events-none" />

        {isFetchingNextPage && (
          <div className="flex items-center justify-center gap-2 py-4 text-xs font-semibold text-slate-500">
            <Loader2 size={16} className="animate-spin text-[#F87907]" />
            <span>Loading more properties...</span>
          </div>
        )}

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

        {categoryMatched.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mt-12 sm:mt-16"
          >
            <Link
              to="/properties"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#F9770B] via-[#F86E00] to-[#EA580C] px-8 sm:px-9 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-[0_8px_25px_rgba(249,119,11,0.38)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_12px_32px_rgba(249,119,11,0.5)] active:scale-[0.98] cursor-pointer"
            >
              <span>Show More</span>
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
