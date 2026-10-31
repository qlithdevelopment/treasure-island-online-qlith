import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// Default luxury architectural imagery for common hero banners
const defaultHeroBg =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85";

export default function PageHero({
  badge,
  badgeIcon: BadgeIcon = Sparkles,
  title,
  subtitle,
  bgImage = defaultHeroBg,
  children,
  className = "",
}) {
  return (
    <section
      className={`relative w-full overflow-hidden bg-slate-950 py-20 sm:py-28 text-white select-none ${className}`}
    >
      {/* Background image with cinematic dark gradient overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={bgImage}
          alt={title || "Treasure Island Banner"}
          className="w-full h-full object-cover object-center transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950/95" />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-[#F87907]/12 blur-[130px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto w-full text-center">
          {/* Top Badge Pill */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-amber-300 mb-5"
            >
              {BadgeIcon && <BadgeIcon size={14} className="text-[#F87907]" />}
              <span>{badge}</span>
            </motion.div>
          )}

          {/* Main Title */}
          {title && (
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight mb-4 drop-shadow-md"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {title}
            </motion.h1>
          )}

          {/* Unified Luxury Gold Diamond Flourish */}
          <div className="flex items-center justify-center gap-1.5 mt-2 mb-5">
            <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-[#F87907] to-[#F87907] rounded-full" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
            <span className="w-2.5 h-2.5 rotate-45 bg-[#F87907] shadow-[0_0_8px_rgba(248,121,7,0.7)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
            <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-l from-transparent via-[#F87907] to-[#F87907] rounded-full" />
          </div>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-sm"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Optional Children content (e.g. search bars, extra CTAs) */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
