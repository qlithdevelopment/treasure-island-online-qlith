import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
  ArrowRight,
} from "lucide-react";

// Curated high-resolution Unsplash architectural imagery for luxury real estate
const galleryItems = [
  {
    id: 1,
    title: "The Grand Horizon Villa",
    subtitle: "Oceanfront Contemporary Estate with Infinity Pool",
    category: "Villas",
    location: "Marine Drive, Puri Coast",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85",
    badge: "Signature Project",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Royal Amber Penthouse",
    subtitle: "Panoramic Sky Lounge & Private Terrace",
    category: "Penthouses",
    location: "Patia Hills, Bhubaneswar",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
    badge: "Penthouse",
    isFeatured: false,
  },
  {
    id: 3,
    title: "Serene Meadow Residence",
    subtitle: "Contemporary Glass Pavilion & Minimalist Grounds",
    category: "Exteriors",
    location: "Khandagiri Green Valley",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=85",
    badge: "Exterior",
    isFeatured: false,
  },
  {
    id: 4,
    title: "Milano Luxury Living Suite",
    subtitle: "Double-Height Italian Marble Lounge & Bespoke Woodwork",
    category: "Interiors",
    location: "Jayadev Vihar Heights",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
    badge: "Interior",
    isFeatured: false,
  },
  {
    id: 5,
    title: "Azure Riviera Courtyard",
    subtitle: "Private Heated Pool with Sunken Firepit Deck",
    category: "Villas",
    location: "Dhauli Eco Enclave",
    image:
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1000&q=85",
    badge: "Villa",
    isFeatured: false,
  },
  {
    id: 6,
    title: "Opal Crest Glasshouse",
    subtitle: "Architectural Geometric Masterpiece with Sunlit Atrium",
    category: "Architecture",
    location: "Chandrasekharpur Prime",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=85",
    badge: "Architecture",
    isFeatured: false,
  },
];

const categories = [
  "All",
  "Villas",
  "Penthouses",
  "Interiors",
  "Exteriors",
  "Architecture",
];

export default function OurGallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalIndex, setModalIndex] = useState(null);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const handleOpenModal = (index) => {
    setModalIndex(index);
  };

  const handleCloseModal = () => {
    setModalIndex(null);
  };

  const handleNext = useCallback(() => {
    if (modalIndex !== null) {
      setModalIndex((prev) => (prev + 1) % filteredItems.length);
    }
  }, [modalIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (modalIndex !== null) {
      setModalIndex(
        (prev) => (prev - 1 + filteredItems.length) % filteredItems.length,
      );
    }
  }, [modalIndex, filteredItems.length]);

  // Handle keyboard arrow keys & Escape for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalIndex === null) return;
      if (e.key === "Escape") handleCloseModal();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalIndex, handleNext, handlePrev]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (modalIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalIndex]);

  return (
    <section className="relative w-full bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9] px-4 sm:px-8 lg:px-10 pt-10 sm:pt-14 pb-24 sm:pb-32 text-slate-800 overflow-hidden select-none">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#F87907]/6 via-[#23ADD9]/5 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#F87907]/5 blur-[90px] pointer-events-none rounded-full" />

      {/* Decorative star accents matching luxury theme */}
      <div className="absolute top-20 right-10 sm:right-20 w-8 h-8 opacity-30 pointer-events-none">
        <svg viewBox="0 0 24 24" className="w-full h-full fill-amber-400">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-10"
        >
          {/* Main Heading */}
          <h2
            className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-bold text-[#0F172A] tracking-tight mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Our Gallery
          </h2>

          {/* Elegant Section Underline Flourish - exactly unified across all sections */}
          <div className="flex items-center justify-center gap-1.5 mt-2.5 mb-3.5">
            <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-[#F87907] to-[#F87907] rounded-full" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
            <span className="w-2.5 h-2.5 rotate-45 bg-[#F87907] shadow-[0_0_8px_rgba(248,121,7,0.6)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
            <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-l from-transparent via-[#F87907] to-[#F87907] rounded-full" />
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-[17px] text-slate-500 font-normal leading-relaxed max-w-xl mx-auto">
            A visual showcase of our master-crafted residences, landmark
            architecture, and bespoke interior spaces
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#F87907] to-[#FB923C] text-white shadow-[0_4px_16px_rgba(248,121,7,0.35)] scale-105"
                    : "bg-white/90 text-slate-600 hover:text-[#F87907] border border-slate-200/90 hover:border-[#F87907]/40 shadow-xs hover:shadow-sm"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => {
              // Bento layout: When on "All", item 1 takes 2 cols and 2 rows on desktop
              const isLarge = activeCategory === "All" && item.isFeatured;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 20 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => handleOpenModal(idx)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-200/80 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.22)] transition-all duration-500 ${
                    isLarge
                      ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[380px] sm:min-h-[460px] lg:min-h-[560px]"
                      : "min-h-[280px] sm:min-h-[310px] lg:min-h-[268px]"
                  }`}
                >
                  {/* Image with smooth zoom effect */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />

                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/10 group-hover:from-slate-950/95 group-hover:via-slate-950/40 transition-colors duration-300" />

                  {/* Top floating pill & maximize button */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-3.5 py-1 rounded-full text-xs font-medium text-white bg-black/45 backdrop-blur-md border border-white/20 shadow-sm flex items-center gap-1.5">
                      <Sparkles size={12} className="text-[#FBBF24]" />
                      {item.badge}
                    </span>

                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-85 group-hover:opacity-100 group-hover:bg-[#F87907] group-hover:border-[#F87907] transition-all duration-300 transform group-hover:scale-110 shadow-sm">
                      <Maximize2 size={16} />
                    </div>
                  </div>

                  {/* Bottom details card */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 text-white transform transition-transform duration-300">
                    <div className="flex items-center gap-1.5 text-xs text-amber-300/90 font-medium mb-1.5">
                      <MapPin size={13} className="text-[#F87907]" />
                      <span>{item.location}</span>
                    </div>

                    <h3
                      className={`font-serif font-bold text-white group-hover:text-[#FBBF24] transition-colors leading-tight mb-1.5 ${
                        isLarge
                          ? "text-xl sm:text-2xl lg:text-3xl"
                          : "text-lg sm:text-xl"
                      }`}
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`text-slate-300/90 font-normal leading-relaxed line-clamp-2 ${
                        isLarge ? "text-xs sm:text-sm max-w-lg" : "text-xs"
                      }`}
                    >
                      {item.subtitle}
                    </p>

                    {/* View Details Indicator */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F87907] group-hover:text-amber-300 mt-3 pt-3 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>View Gallery Preview</span>
                      <ArrowRight
                        size={13}
                        className="transform group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <div className="mt-14 sm:mt-16 text-center">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#F87907] to-[#FB923C] hover:from-[#EA580C] hover:to-[#F87907] shadow-[0_8px_24px_rgba(248,121,7,0.35)] hover:shadow-[0_12px_32px_rgba(248,121,7,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explore All Properties & Projects</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {modalIndex !== null && filteredItems[modalIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-5xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-slate-700/60"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-[#F87907] text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 border border-white/20 cursor-pointer shadow-lg"
                aria-label="Close Preview"
              >
                <X size={20} />
              </button>

              {/* Prev / Next Navigation Controls */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-[#F87907] text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 border border-white/20 cursor-pointer shadow-lg"
                aria-label="Previous Image"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-[#F87907] text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 border border-white/20 cursor-pointer shadow-lg"
                aria-label="Next Image"
              >
                <ChevronRight size={22} />
              </button>

              {/* Large Image Frame */}
              <div className="relative w-full h-[360px] sm:h-[480px] md:h-[540px] bg-black">
                <img
                  src={filteredItems[modalIndex].image}
                  alt={filteredItems[modalIndex].title}
                  className="w-full h-full object-cover sm:object-contain select-none"
                />
              </div>

              {/* Modal Caption Footer */}
              <div className="p-5 sm:p-6 bg-slate-950/95 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F87907]/20 text-[#F87907] border border-[#F87907]/30">
                      {filteredItems[modalIndex].category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin size={12} className="text-[#F87907]" />
                      {filteredItems[modalIndex].location}
                    </span>
                  </div>

                  <h4
                    className="text-xl sm:text-2xl font-serif font-bold text-white"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {filteredItems[modalIndex].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    {filteredItems[modalIndex].subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-slate-400 font-medium">
                    {modalIndex + 1} / {filteredItems.length}
                  </span>

                  <Link
                    to="/contact"
                    className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#F87907] to-[#FB923C] hover:from-[#EA580C] hover:to-[#F87907] transition-all cursor-pointer shadow-sm"
                  >
                    Inquire Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
