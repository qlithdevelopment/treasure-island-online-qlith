import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

// Curated high-resolution Unsplash architectural imagery links
const imgApartment =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80";
const imgLand =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80";
const imgHouse =
  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80";
const imgVilla =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80";

const categories = [
  {
    id: 1,
    title: "Apartment",
    badge: "80+ Apartments",
    description:
      "Luxury apartments with elegant interiors and excellent facilities.",
    image: imgApartment,
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="w-12 h-12 text-[#FDE68A] filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.7)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 42h36" />
        <path d="M10 42V14l14-6 14 6v28" />
        <path d="M16 20h4v4h-4zM28 20h4v4h-4zM16 28h4v4h-4zM28 28h4v4h-4z" />
        <path d="M22 42v-6h4v6" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Land",
    badge: "45+ Lands",
    description:
      "Prime land plots ideal for residential and commercial development.",
    image: imgLand,
    hasExplore: true,
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="w-12 h-12 text-[#FDE68A] filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.7)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 34l12-6 12 6 12-6" />
        <path d="M12 20a6 6 0 1012 0c0-5-6-12-6-12s-6 7-6 12z" />
        <circle cx="18" cy="20" r="2" />
        <path d="M6 24v14l12 6 12-6 12 6V30" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "House",
    badge: "home/building",
    description: "Comfortable houses designed for modern family living.",
    image: imgHouse,
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="w-12 h-12 text-[#FDE68A] filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.7)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 20l16-12 16 12v20H8V20z" />
        <path d="M20 40V26h8v14" />
        <path d="M30 10h4v6h-4z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Villa",
    badge: "mansion/estate",
    description:
      "Exclusive villas with beautiful architecture and serene surroundings.",
    image: imgVilla,
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="w-12 h-12 text-[#FDE68A] filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.7)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 40h40" />
        <path d="M8 40V20l16-8 16 8v20" />
        <path d="M18 12l6-4 6 4" />
        <path d="M14 26h4v4h-4zM22 26h4v4h-4zM30 26h4v4h-4z" />
        <path d="M21 40v-6h6v6" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function PropertyCategories() {
  const [activeId, setActiveId] = useState(2); // Card 2 ("Land") highlighted by default matching mockup

  return (
    <section className="relative w-full bg-gradient-to-b from-[#F4F5F7] via-[#FAF9F6] to-[#FFFFFF] px-4 sm:px-8 lg:px-10 pt-10 sm:pt-14 pb-24 sm:pb-32 text-slate-800 overflow-hidden select-none">
      {/* Center Ambient Warm Radial Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[480px] bg-gradient-to-r from-[#F87907]/8 via-[#FBBF24]/10 to-[#23ADD9]/6 blur-[110px] pointer-events-none rounded-full" />

      {/* Decorative Sparkling Star Accents (matching screenshot) */}
      <div className="absolute bottom-10 right-8 sm:right-16 w-12 h-12 opacity-35 pointer-events-none transition-transform duration-1000 hover:scale-125">
        <svg viewBox="0 0 24 24" className="w-full h-full fill-amber-300">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>

      <div className="absolute top-16 left-8 sm:left-14 w-8 h-8 opacity-25 pointer-events-none">
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
          {/* Heading */}
          <h2
            className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-bold text-[#0F172A] tracking-tight mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Property Categories
          </h2>

          {/* Elegant Section Underline Flourish */}
          <div className="flex items-center justify-center gap-1.5 mt-2.5 mb-3.5">
            <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-[#F87907] to-[#F87907] rounded-full" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
            <span className="w-2.5 h-2.5 rotate-45 bg-[#F87907] shadow-[0_0_8px_rgba(248,121,7,0.6)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
            <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-l from-transparent via-[#F87907] to-[#F87907] rounded-full" />
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-[17px] text-slate-500 font-normal leading-relaxed max-w-xl mx-auto">
            We help you find the right property for every need
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 items-stretch"
        >
          {categories.map((cat) => {
            const isHighlighted = activeId === cat.id;

            return (
              <motion.div
                key={cat.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                onClick={() => setActiveId(cat.id)}
                className={`group relative flex flex-col justify-between rounded-2xl bg-white transition-all duration-300 overflow-hidden cursor-pointer ${
                  isHighlighted
                    ? "border-2 border-[#F87907] ring-4 ring-[#F87907]/10 shadow-[0_12px_36px_rgba(248,121,7,0.18)] scale-[1.02] z-10"
                    : "border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:border-slate-300"
                }`}
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative w-full h-[180px] sm:h-[195px] overflow-hidden bg-slate-100">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient Overlay for Icon Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10 pointer-events-none" />

                    {/* Center Glowing Golden Outline Emblem */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-300 group-hover:scale-110">
                      {cat.icon}
                    </div>

                    {/* Bottom Frosted Pill Badge */}
                    <div className="absolute bottom-2.5 left-0 right-0 flex items-center justify-center pointer-events-none">
                      <span className="px-3.5 py-1 rounded-full text-xs font-medium text-slate-800 bg-white/85 backdrop-blur-md shadow-sm border border-white/40">
                        {cat.badge}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 text-center">
                    <h3
                      className={`text-xl font-bold tracking-tight mb-2 transition-colors ${
                        isHighlighted ? "text-[#F87907]" : "text-[#0F172A]"
                      } group-hover:text-[#F87907]`}
                    >
                      {cat.title}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal">
                      {cat.description}
                    </p>

                    {/* Explore Link (for Active Card or on Hover) */}
                    {cat.hasExplore && (
                      <Link
                        to="/properties"
                        className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-[#F87907] hover:text-[#EA580C] hover:gap-1.5 transition-all mt-4 cursor-pointer"
                      >
                        <span>Explore</span>
                        <ChevronRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
