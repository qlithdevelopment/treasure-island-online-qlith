import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Share2,
  Download,
  Layers,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Card images embedded directly inside code
const propPanorama =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80";
const propSaiCommercial =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";
const propSaiResidency =
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80";

const propertiesData = [
  // Page 1
  {
    id: 1,
    title: "Codename Panorama - Luxury Apartments...",
    category: "Apartments",
    tag: "Luxury",
    tagType: "dark",
    isFeatured: false,
    hasActiveOffer: false,
    price: "₹1.38 Cr",
    pricePrefix: null,
    image: propPanorama,
    specs: {
      beds: "5 beds",
      baths: "5 baths",
      area: "3810 sq ft",
    },
    location: "Kalinga Vihar, Bhubaneswar",
    badges: ["2 BHK", "3 BHK + Servant"],
    showSpecsLabel: false,
    activeDotIndex: 0,
    page: 0,
  },
  {
    id: 2,
    title: "Sai Krishna Residency - Commercial Units",
    category: "Commercials",
    tag: "Active Offer",
    tagType: "orange",
    isFeatured: false,
    hasActiveOffer: true,
    price: "₹42 L*",
    pricePrefix: "Starts from",
    image: propSaiCommercial,
    specs: {
      beds: "5 beds",
      baths: null,
      area: "3810 sq ft",
    },
    location: null,
    badges: ["For Sale", "Commercial Unit"],
    showSpecsLabel: true,
    activeDotIndex: 1,
    page: 0,
  },
  {
    id: 3,
    title: "Sai Krishna Residency - 1|2|3 BHK...",
    category: "Apartments",
    tag: "Featured",
    tagType: "light",
    isFeatured: true,
    hasActiveOffer: false,
    price: "₹4,200,000",
    pricePrefix: null,
    image: propSaiResidency,
    specs: {
      beds: null,
      baths: "Baths",
      area: "1451 sq ft",
    },
    location: "Near CV Raman College, Bhubaneswar, Odisha",
    badges: ["1 BHK Apartment", "2 BHK Apartment"],
    showSpecsLabel: false,
    activeDotIndex: 2,
    page: 0,
  },
  // Page 2
  {
    id: 4,
    title: "Royal Palm Enclave - Modern Villas...",
    category: "Apartments",
    tag: "Luxury",
    tagType: "dark",
    isFeatured: false,
    hasActiveOffer: false,
    price: "₹2.10 Cr",
    pricePrefix: null,
    image: propPanorama,
    specs: {
      beds: "4 beds",
      baths: "4 baths",
      area: "3200 sq ft",
    },
    location: "Patia, Bhubaneswar",
    badges: ["3 BHK Villa", "4 BHK Villa"],
    showSpecsLabel: false,
    activeDotIndex: 0,
    page: 1,
  },
  {
    id: 5,
    title: "Utkal Signature - Retail & Commercial Hub",
    category: "Commercials",
    tag: "Active Offer",
    tagType: "orange",
    isFeatured: false,
    hasActiveOffer: true,
    price: "₹85 L*",
    pricePrefix: "Starts from",
    image: propSaiCommercial,
    specs: {
      beds: "6 units",
      baths: null,
      area: "4200 sq ft",
    },
    location: null,
    badges: ["Ready to Move", "High ROI"],
    showSpecsLabel: true,
    activeDotIndex: 1,
    page: 1,
  },
  {
    id: 6,
    title: "Metro Heights - Premium Condominiums",
    category: "Apartments",
    tag: "Featured",
    tagType: "light",
    isFeatured: true,
    hasActiveOffer: false,
    price: "₹6,800,000",
    pricePrefix: null,
    image: propSaiResidency,
    specs: {
      beds: "3 beds",
      baths: "3 Baths",
      area: "1950 sq ft",
    },
    location: "Khandagiri, Bhubaneswar, Odisha",
    badges: ["2 BHK Luxury", "3 BHK Penthouse"],
    showSpecsLabel: false,
    activeDotIndex: 2,
    page: 1,
  },
];

const categories = ["All", "Apartments", "Commercials"];

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
  const [savedIds, setSavedIds] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  const toggleSave = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Filter by category first, then select page slice
  const categoryMatched =
    activeCategory === "All"
      ? propertiesData
      : propertiesData.filter((p) => p.category === activeCategory);

  const totalPages = Math.max(1, Math.ceil(categoryMatched.length / 3));
  const currentPage = Math.min(pageIndex, totalPages - 1);
  const displayedProperties = categoryMatched.slice(
    currentPage * 3,
    currentPage * 3 + 3,
  );

  const handlePrev = () => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setPageIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section className="relative w-full bg-[#F4F5F7] px-4 sm:px-8 lg:px-10 pt-10 sm:pt-14 pb-18 sm:pb-24 text-slate-800 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto w-full">
        {/* ========================================================
            1. SECTION HEADER
            Title with golden line & dots decoration + Pagination
            ======================================================== */}
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

            {/* Elegant Section Underline Flourish */}
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

          {/* Desktop Top-Right Pagination Controls (< Previous / Next >) */}
          <div className="hidden md:flex items-center gap-2 absolute right-0 bottom-1">
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-500 hover:text-[#F87907] transition-colors cursor-pointer group"
              aria-label="Previous page"
            >
              <ChevronLeft
                size={16}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              <span>Previous</span>
            </button>
            <span className="text-slate-300 text-sm">/</span>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-500 hover:text-[#F87907] transition-colors cursor-pointer group"
              aria-label="Next page"
            >
              <span>Next</span>
              <ChevronRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10 pb-2">
          {/* Left: Showing 27 exclusive properties */}
          <div className="text-xs sm:text-sm font-medium italic text-slate-500">
            Showing{" "}
            <span className="font-semibold text-[#F87907] not-italic">27</span>{" "}
            exclusive properties
          </div>

          {/* Right: Category Filter Pills */}
          <div className="flex items-center gap-2 sm:gap-2.5">
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

        <motion.div
          key={`${activeCategory}-${currentPage}`}
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {displayedProperties.map((prop) => {
              const isSaved = savedIds.includes(prop.id);

              return (
                <motion.div
                  key={prop.id}
                  layout
                  variants={cardVariants}
                  whileHover={{ y: -6 }}
                  className={`group relative flex flex-col justify-between rounded-2xl bg-white transition-all duration-300 overflow-hidden ${
                    prop.hasActiveOffer
                      ? "border-2 border-[#F87907] ring-4 ring-[#F87907]/10 shadow-[0_12px_36px_rgba(248,121,7,0.18)]"
                      : "border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.12)] hover:border-slate-300"
                  }`}
                >
                  {/* Top Part: Image + Meta Badges */}
                  <div>
                    {/* Property Image Container */}
                    <div className="relative w-full h-[190px] sm:h-[205px] overflow-hidden bg-slate-100">
                      <img
                        src={prop.image}
                        alt={prop.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Top Overlay Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        {/* Left Badge (Luxury or Featured) */}
                        {prop.tag && !prop.hasActiveOffer && (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm ${
                              prop.tagType === "dark"
                                ? "bg-black/60 text-white border border-white/20"
                                : "bg-white/95 text-slate-800 border border-slate-200"
                            }`}
                          >
                            {prop.tag}
                          </span>
                        )}

                        {/* Spacer if no left badge */}
                        {prop.hasActiveOffer && <div />}

                        {/* Active Offer Badge (Right) */}
                        {prop.hasActiveOffer && (
                          <span className="px-3.5 py-1 rounded-full text-xs font-bold text-white bg-[#F87907] shadow-md shadow-orange-500/30">
                            {prop.tag}
                          </span>
                        )}

                        {/* Top-Right Quick Action: Heart or Share */}
                        {prop.tagType === "dark" && (
                          <button
                            type="button"
                            onClick={() => toggleSave(prop.id)}
                            className="pointer-events-auto w-8 h-8 rounded-full bg-white/95 hover:bg-white flex items-center justify-center text-slate-700 shadow-md transition-transform active:scale-90 cursor-pointer"
                            aria-label="Save property"
                          >
                            <Heart
                              size={15}
                              className={`transition-colors ${
                                isSaved
                                  ? "fill-red-500 text-red-500"
                                  : "text-slate-600 hover:text-red-500"
                              }`}
                            />
                          </button>
                        )}

                        {prop.isFeatured && (
                          <button
                            type="button"
                            className="pointer-events-auto px-2.5 py-1 rounded-full bg-white/95 text-slate-700 text-xs font-medium flex items-center gap-1 shadow-md hover:bg-white transition-all cursor-pointer"
                          >
                            <Share2 size={13} />
                            <span>Share</span>
                          </button>
                        )}
                      </div>

                      {/* Image Bottom Center: Carousel Dots Indicator */}
                      <div className="absolute bottom-2.5 left-0 right-0 flex items-center justify-center gap-1.5 pointer-events-none">
                        {[0, 1, 2].map((dotIdx) => (
                          <span
                            key={dotIdx}
                            className={`rounded-full transition-all duration-300 ${
                              dotIdx === prop.activeDotIndex
                                ? "w-4 h-1.5 bg-white shadow-sm"
                                : "w-1.5 h-1.5 bg-white/60"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-4 sm:p-5">
                      {/* Title & Save Button Header Row */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] tracking-tight leading-snug group-hover:text-[#F87907] transition-colors line-clamp-1">
                          {prop.title}
                        </h3>

                        {/* Save Action for Card 1 & 2 */}
                        {!prop.isFeatured && (
                          <button
                            type="button"
                            onClick={() => toggleSave(prop.id)}
                            className="shrink-0 flex flex-col items-center gap-0.5 text-[10px] font-medium text-slate-500 hover:text-[#F87907] transition-colors cursor-pointer group/save"
                            aria-label="Save property"
                          >
                            <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center group-hover/save:border-[#F87907]">
                              <Heart
                                size={12}
                                className={
                                  isSaved
                                    ? "fill-red-500 text-red-500"
                                    : "text-slate-400 group-hover/save:text-[#F87907]"
                                }
                              />
                            </div>
                            <span>Save</span>
                          </button>
                        )}

                        {/* Share Action for Card 3 */}
                        {prop.isFeatured && (
                          <button
                            type="button"
                            className="shrink-0 w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#F87907] hover:border-[#F87907] transition-colors cursor-pointer"
                            aria-label="Share property"
                          >
                            <Share2 size={13} />
                          </button>
                        )}
                      </div>

                      {/* For Sale & Commercial Unit Pills above price */}
                      {prop.hasActiveOffer && (
                        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                          {prop.badges.map((b, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Price Section */}
                      <div className="mb-3">
                        {prop.pricePrefix && (
                          <span className="block text-xs text-slate-500 font-normal">
                            {prop.pricePrefix}
                          </span>
                        )}
                        <span className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                          {prop.price}
                        </span>
                      </div>

                      {/* Specs Row */}
                      {prop.showSpecsLabel && (
                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                          Specs
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 mb-3 pb-1 border-b border-slate-100">
                        {prop.specs.beds && (
                          <span className="flex items-center gap-1.5">
                            <Bed size={14} className="text-slate-400" />
                            <span>{prop.specs.beds}</span>
                          </span>
                        )}
                        {prop.specs.baths && (
                          <span className="flex items-center gap-1.5">
                            <Bath size={14} className="text-slate-400" />
                            <span>{prop.specs.baths}</span>
                          </span>
                        )}
                        {prop.specs.area && (
                          <span className="flex items-center gap-1.5">
                            <Maximize size={13} className="text-slate-400" />
                            <span>{prop.specs.area}</span>
                          </span>
                        )}
                      </div>

                      {/* Location Row */}
                      {prop.location && (
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-3.5">
                          <span className="flex items-center gap-1.5 truncate pr-2">
                            <MapPin
                              size={13}
                              className="shrink-0 text-slate-400"
                            />
                            <span className="truncate">{prop.location}</span>
                          </span>

                          {/* Action icons for Card 1 */}
                          {prop.id === 1 && (
                            <div className="flex items-center gap-2 shrink-0 text-slate-400">
                              <Download
                                size={13}
                                className="hover:text-slate-700 cursor-pointer transition-colors"
                              />
                              <Layers
                                size={13}
                                className="hover:text-slate-700 cursor-pointer transition-colors"
                              />
                              <Share2
                                size={13}
                                className="hover:text-slate-700 cursor-pointer transition-colors"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Bottom Tag Pills (Card 1 & 3) */}
                      {!prop.hasActiveOffer && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {prop.badges.map((b, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

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
      </div>
    </section>
  );
}
