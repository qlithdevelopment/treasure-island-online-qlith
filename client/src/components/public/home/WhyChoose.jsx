import { motion } from "framer-motion";

// Authentic 3D Luxury Emblems from design mockup
const icon1 = "https://img.icons8.com/3d-fluency/94/shield.png";
const icon2 = "https://img.icons8.com/3d-fluency/94/map-pin.png";
const icon3 = "https://img.icons8.com/3d-fluency/94/headset.png";
const icon4 = "https://img.icons8.com/3d-fluency/94/investment.png";

const features = [
  {
    id: 1,
    title: "Trusted & Transparent",
    description: "Properties You Can Trust, Deals You Can Understand",
    icon: icon1,
    step: "01",
  },
  {
    id: 2,
    title: "Prime Location",
    description: "Where Location Meets Opportunity",
    icon: icon2,
    step: "02",
  },
  {
    id: 3,
    title: "Expert Talk",
    description: "Building Wealth Through Real Estate",
    icon: icon3,
    step: "03",
  },
  {
    id: 4,
    title: "Best Investment",
    description: "Where Smart Investments Create Lasting Value",
    icon: icon4,
    step: "04",
  },
];

// Staggered container: opens items sequentially (Trusted -> Prime -> Expert -> Best)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.32,
      delayChildren: 0.15,
    },
  },
};

// Item entrance animation: smooth spring opening
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.82,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 14,
      mass: 0.9,
    },
  },
};

// Emblem icon entrance animation
const iconVariants = {
  hidden: {
    scale: 0.3,
    rotate: -12,
    opacity: 0,
  },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 12,
    },
  },
};

export default function WhyChoose() {
  return (
    <section className="relative w-full pt-14 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-8 lg:px-10 bg-[#F4F5F7] text-slate-800 overflow-hidden select-none">
      {/* Ambient warm center background highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-gradient-to-r from-amber-200/25 via-orange-100/20 to-transparent blur-[120px] pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif tracking-tight mb-2 text-black font-semibold"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Why choose Treasure Island
          </h2>

          {/* Elegant Section Underline Flourish */}
          <div className="flex items-center justify-center gap-1.5 mt-2.5 mb-3.5">
            <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-[#F87907] to-[#F87907] rounded-full" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
            <span className="w-2.5 h-2.5 rotate-45 bg-[#F87907] shadow-[0_0_8px_rgba(248,121,7,0.6)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
            <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-l from-transparent via-[#F87907] to-[#F87907] rounded-full" />
          </div>

          <p className="text-sm sm:text-base md:text-[17px] text-slate-600 font-normal leading-relaxed">
            We provide transparent deals, Verified properties and
            end-to-end-support
          </p>
        </motion.div>

        {/* Frameless Feature Icons Flow with Framer Motion Sequential Opening */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10 lg:gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col items-center text-center px-4 cursor-default"
            >
              {/* Authentic 3D Emblem with Framer Motion float & hover physics (No Box) */}
              <motion.div
                variants={iconVariants}
                whileHover={{ scale: 1.12, rotate: [0, -3, 3, 0] }}
                transition={{ duration: 0.4 }}
                className="relative mb-6"
              >
                {/* Radiant Golden Glow Halo behind the icon */}
                <div className="absolute inset-0 rounded-full bg-[#F87907]/15 blur-xl group-hover:bg-[#F87907]/30 transition-all duration-300 scale-125" />

                {/* 3D Emblem Graphic */}
                <div className="relative w-22 h-22 sm:w-24 sm:h-24 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(248,121,7,0.18)] group-hover:drop-shadow-[0_16px_28px_rgba(248,121,7,0.35)] transition-all duration-300">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Step Tag Pill */}
                <span className="absolute -bottom-1 right-0 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider bg-white text-[#F87907] border border-amber-200/90 shadow-sm group-hover:bg-[#F87907] group-hover:text-white transition-colors duration-300">
                  {feature.step}
                </span>
              </motion.div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#0F172A] mb-2 group-hover:text-[#F87907] transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[220px] mx-auto font-normal">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
