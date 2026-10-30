import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Award, Handshake } from "lucide-react";

// Direct Image Links for Associated Developer Partners
const logoDnHomes = "https://img.icons8.com/3d-fluency/94/skyscrapers.png";
const logoSaswatRiverside = "https://img.icons8.com/3d-fluency/94/beach.png";
const logoMetroBuilders = "https://img.icons8.com/3d-fluency/94/city.png";
const logoAcrerise = "https://img.icons8.com/3d-fluency/94/bungalow.png";
const logoZEstates = "https://img.icons8.com/3d-fluency/94/real-estate.png";
const logoUtkalBuilders = "https://img.icons8.com/3d-fluency/94/monument.png";
const logoAssotech = "https://img.icons8.com/3d-fluency/94/commercial.png";
const logoPrimeLiving = "https://img.icons8.com/3d-fluency/94/home.png";
const logoMotwaniConstructions =
  "https://img.icons8.com/3d-fluency/94/foundation.png";
const logoEvosBuildcon = "https://img.icons8.com/3d-fluency/94/crown.png";

const partners = [
  {
    id: 1,
    name: "DN Homes",
    logo: logoDnHomes,
    role: "Premium Luxury Living",
    tag: "Grade A Developer",
  },
  {
    id: 2,
    name: "Saswat Riverside",
    logo: logoSaswatRiverside,
    role: "Scenic Waterfront Estates",
    tag: "Eco Communities",
  },
  {
    id: 3,
    name: "Metro Builders",
    logo: logoMetroBuilders,
    role: "Odisha's Real Estate Pioneer",
    tag: "Since 1993",
  },
  {
    id: 4,
    name: "AcreRise",
    logo: logoAcrerise,
    role: "Modern Smart Townships",
    tag: "Sustainable Living",
  },
  {
    id: 5,
    name: "Z Estates",
    logo: logoZEstates,
    role: "Iconic Luxury Landmarks",
    tag: "High-Rise Living",
  },
  {
    id: 6,
    name: "Utkal Builders",
    logo: logoUtkalBuilders,
    role: "Architectural Excellence",
    tag: "Trusted Quality",
  },
  {
    id: 7,
    name: "Assotech",
    logo: logoAssotech,
    role: "Integrated Smart Cities",
    tag: "National Presence",
  },
  {
    id: 8,
    name: "Prime Living",
    logo: logoPrimeLiving,
    role: "Bespoke Residences",
    tag: "Modern Lifestyle",
  },
  {
    id: 9,
    name: "Motwani Constructions",
    logo: logoMotwaniConstructions,
    role: "Crafted Commercial & Residential",
    tag: "Legacy Developer",
  },
  {
    id: 10,
    name: "Evos Buildcon",
    logo: logoEvosBuildcon,
    role: "Palatial Luxury Villas",
    tag: "Opulent Architecture",
  },
];

const trustStats = [
  {
    icon: <Handshake className="w-5 h-5 text-[#F87907]" />,
    value: "10+ Leading",
    label: "Developer Partners",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#23ADD9]" />,
    value: "100% Verified",
    label: "RERA Compliant Projects",
  },
  {
    icon: <Award className="w-5 h-5 text-[#F87907]" />,
    value: "25,000+",
    label: "Delivered Dream Homes",
  },
  {
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    value: "Direct Access",
    label: "Zero Brokerage Direct Pricing",
  },
];

export default function AssociatedWith() {
  const [activePartner, setActivePartner] = useState(null);

  return (
    <section className="relative w-full bg-gradient-to-b from-[#F8FAFC] via-[#FFFFFF] to-[#FAF9F6] px-4 sm:px-8 lg:px-10 pt-14 sm:pt-16 pb-20 sm:pb-24 text-slate-800 overflow-hidden select-none">
      {/* Ambient background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[350px] bg-gradient-to-r from-[#F87907]/6 via-[#23ADD9]/5 to-transparent blur-[110px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* ========================================================
            SECTION HEADER
            Unified title with identical luxury diamond flourish
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-12"
        >
          {/* Main Title */}
          <h2
            className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-bold text-[#0F172A] tracking-tight mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            We Are Proud to Be Associated With
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
          <p className="text-sm sm:text-base md:text-[17px] text-slate-500 font-normal leading-relaxed max-w-2xl mx-auto">
            Building strong relationships with trusted industry leaders to
            deliver exceptional value.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
          {partners.map((partner) => {
            const isHovered = activePartner === partner.id;

            return (
              <motion.div
                key={partner.id}
                whileHover={{ y: -5, scale: 1.02 }}
                onMouseEnter={() => setActivePartner(partner.id)}
                onMouseLeave={() => setActivePartner(null)}
                className={`group relative rounded-2xl bg-white p-4 sm:p-5 flex flex-col items-center justify-between border transition-all duration-300 cursor-pointer ${
                  isHovered
                    ? "border-[#F87907] ring-4 ring-[#F87907]/10 shadow-[0_12px_28px_rgba(248,121,7,0.16)]"
                    : "border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                }`}
              >
                {/* Top Corner Pill Tag */}
                <div className="w-full flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                    {partner.tag}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full transition-colors ${
                      isHovered ? "bg-[#F87907]" : "bg-slate-300"
                    }`}
                  />
                </div>

                {/* Logo Frame */}
                <div className="w-full h-16 sm:h-20 flex items-center justify-center py-2 px-1">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain filter transition-transform duration-300 group-hover:scale-108"
                    loading="lazy"
                  />
                </div>

                {/* Partner Details */}
                <div className="mt-3 text-center w-full pt-2 border-t border-slate-100">
                  <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#F87907] transition-colors truncate">
                    {partner.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-normal truncate mt-0.5">
                    {partner.role}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {trustStats.map((stat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-white/70 border border-slate-200/60 shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 shadow-xs">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
