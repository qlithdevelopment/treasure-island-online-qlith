import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Award, Handshake } from "lucide-react";

import logoAcrerise from "../../../assets/Associated_With/acrerise.png";
import logoAssotech from "../../../assets/Associated_With/assotech.png";
import logoDnHomes from "../../../assets/Associated_With/DN_Homes.png";
import logoEvos from "../../../assets/Associated_With/evos.png";
import logoLaxmi from "../../../assets/Associated_With/laxmi.png";
import logoMetro from "../../../assets/Associated_With/metro.png";
import logoMotwani from "../../../assets/Associated_With/motwani.png";
import logoSaswat from "../../../assets/Associated_With/Saswat_riverside_trisulia.png";
import logoUtkal from "../../../assets/Associated_With/utkal.png";
import logoZEstates from "../../../assets/Associated_With/z_estates.png";

const row1 = [
  {
    id: 1,
    name: "DN Homes",
    logo: logoDnHomes,
  },
  {
    id: 2,
    name: "Saswat Riverside",
    logo: logoSaswat,
  },
  {
    id: 3,
    name: "Metro Builders",
    logo: logoMetro,
  },
  {
    id: 4,
    name: "AcreRise",
    logo: logoAcrerise,
  },
  {
    id: 5,
    name: "Z Estates",
    logo: logoZEstates,
  },
];

const row2 = [
  {
    id: 6,
    name: "Utkal Builders",
    logo: logoUtkal,
  },
  {
    id: 7,
    name: "Assotech",
    logo: logoAssotech,
  },
  {
    id: 8,
    name: "Laxmi",
    logo: logoLaxmi,
  },
  {
    id: 9,
    name: "Motwani Constructions",
    logo: logoMotwani,
  },
  {
    id: 10,
    name: "Evos Buildcon",
    logo: logoEvos,
  },
];

const row1Duplicated = [
  ...row1,
  ...row1,
  ...row1,
  ...row1,
  ...row1,
  ...row1,
];
const row2Duplicated = [
  ...row2,
  ...row2,
  ...row2,
  ...row2,
  ...row2,
  ...row2,
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

function PartnerCard({ partner }) {
  return (
    <div
      className="group relative flex items-center justify-center px-6 py-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-md hover:border-[#F87907] transition-all duration-300 w-[170px] sm:w-[195px] h-[80px] sm:h-[90px] shrink-0 select-none cursor-pointer"
    >
      <img
        src={partner.logo}
        alt={partner.name}
        className="max-h-12 max-w-[130px] sm:max-w-[150px] object-contain filter group-hover:scale-108 transition-transform duration-300"
        loading="lazy"
      />
    </div>
  );
}

export default function AssociatedWith() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#F8FAFC] via-[#FFFFFF] to-[#FAF9F6] pt-14 sm:pt-16 pb-20 sm:pb-24 text-slate-800 overflow-hidden select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[350px] bg-gradient-to-r from-[#F87907]/6 via-[#23ADD9]/5 to-transparent blur-[110px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-10 mb-8 sm:mb-10">
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
            We Are Proud to Be Associated With
          </h2>

          <div className="flex items-center justify-center gap-1.5 mt-2.5 mb-3.5">
            <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-[#F87907] to-[#F87907] rounded-full" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
            <span className="w-2.5 h-2.5 rotate-45 bg-[#F87907] shadow-[0_0_8px_rgba(248,121,7,0.6)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
            <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-l from-transparent via-[#F87907] to-[#F87907] rounded-full" />
          </div>

          <p className="text-sm sm:text-base md:text-[17px] text-slate-500 font-normal leading-relaxed max-w-2xl mx-auto">
            Building strong relationships with trusted industry leaders to
            deliver exceptional value.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden py-3 sm:py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF9F6] to-transparent z-10" />

        <div className="flex overflow-hidden py-2 mb-3 sm:mb-4">
          <motion.div
            className="flex gap-4 sm:gap-5 w-max"
            initial={{ x: "0%" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30,
            }}
          >
            {row1Duplicated.map((partner, index) => (
              <PartnerCard
                key={`row1-${partner.id}-${index}`}
                partner={partner}
              />
            ))}
          </motion.div>
        </div>

        <div className="flex overflow-hidden py-2.5 sm:py-3">
          <motion.div
            className="flex gap-4 sm:gap-5 w-max"
            initial={{ x: "-50%" }}
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30,
            }}
          >
            {row2Duplicated.map((partner, index) => (
              <PartnerCard
                key={`row2-${partner.id}-${index}`}
                partner={partner}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-10">
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
