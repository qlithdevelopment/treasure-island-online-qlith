
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  MapPinned,
  Headset,
  TrendingUp,
} from "lucide-react";

/* =========================================
   FEATURES DATA
========================================= */

const features = [
  {
    id: 1,
    title: "Trusted & Transparent",
    description: "Properties you can trust, deals you can understand.",
    icon: ShieldCheck,
    step: "01",
  },
  {
    id: 2,
    title: "Prime Location",
    description: "Where location meets opportunity.",
    icon: MapPinned,
    step: "02",
  },
  {
    id: 3,
    title: "Expert Talk",
    description: "Get guidance from real estate experts.",
    icon: Headset,
    step: "03",
  },
  {
    id: 4,
    title: "Best Investment",
    description: "Where smart investments create lasting value.",
    icon: TrendingUp,
    step: "04",
  },
];

/* =========================================
   ANIMATION VARIANTS
========================================= */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================
   BACKGROUND DECORATION
========================================= */

function BackgroundDecor() {
  return (
    <>
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#130C08] via-[#1A100A] to-[#0D0907]" />

      {/* Ambient lighting - background only */}
      <div className="absolute top-0 left-0 w-[450px] h-[300px] bg-orange-700/[0.07] blur-[120px] pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-[450px] h-[300px] bg-orange-700/[0.07] blur-[120px] pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_45%,rgba(120,55,15,0.10),transparent_70%)]" />

      {/* Left building silhouette */}
      <div className="absolute top-8 left-0 w-[30%] h-[230px] opacity-[0.09] pointer-events-none">
        <svg
          viewBox="0 0 600 300"
          fill="none"
          className="w-full h-full"
        >
          <path
            d="M0 145 L160 45 L330 145 V300 H0 Z"
            fill="#C56B27"
            fillOpacity=".08"
            stroke="#A75B27"
            strokeWidth="3"
          />

          <path
            d="M160 45 V0 M330 145 L410 90 L520 145 V300"
            stroke="#A75B27"
            strokeWidth="3"
          />

          <path
            d="M70 170 V260 H130 V170 Z M190 170 V260 H250 V170 Z"
            stroke="#A75B27"
            strokeWidth="3"
          />

          <path
            d="M0 145 L160 45 L330 145"
            stroke="#D17A32"
            strokeWidth="4"
          />
        </svg>
      </div>

      {/* Right building silhouette */}
      <div className="absolute top-5 right-0 w-[30%] h-[240px] opacity-[0.09] pointer-events-none">
        <svg
          viewBox="0 0 600 300"
          fill="none"
          className="w-full h-full"
        >
          <path
            d="M60 300 V130 L250 20 L450 130 V300"
            fill="#B76A31"
            fillOpacity=".08"
            stroke="#BD7437"
            strokeWidth="3"
          />

          <path
            d="M250 20 V0 M60 130 L250 20 L450 130"
            stroke="#D17A32"
            strokeWidth="4"
          />

          <path
            d="M120 170 H200 V250 H120 Z M280 170 H360 V250 H280 Z"
            stroke="#BD7437"
            strokeWidth="3"
          />
        </svg>
      </div>

      {/* Top left orange curves */}
      <svg
        className="absolute top-0 left-0 w-[300px] h-[150px] opacity-40 pointer-events-none"
        viewBox="0 0 350 200"
        fill="none"
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={`M -100 ${30 + i * 13} Q 50 ${-70 + i * 13} 350 ${-10 + i * 13}`}
            stroke="#F87907"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Bottom right orange curves */}
      <svg
        className="absolute bottom-0 right-0 w-[320px] h-[150px] opacity-40 pointer-events-none"
        viewBox="0 0 350 200"
        fill="none"
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={`M -100 ${30 + i * 13} Q 50 ${-70 + i * 13} 350 ${-10 + i * 13}`}
            stroke="#F87907"
            strokeWidth="1"
          />
        ))}
      </svg>
    </>
  );
}

/* =========================================
   BOTTOM HOUSE ILLUSTRATION
========================================= */

function BottomHouse() {
  return (
    <div className="relative w-full max-w-[420px] mx-auto pointer-events-none">
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-48 h-8 bg-orange-500/10 blur-[35px]" />

      <svg
        viewBox="0 0 800 150"
        fill="none"
        className="relative w-full h-auto"
      >
        <defs>
          <linearGradient
            id="houseGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#FFB04A" />
            <stop offset="100%" stopColor="#F87907" />
          </linearGradient>

          <filter id="houseGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g
          stroke="url(#houseGradient)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#houseGlow)"
          opacity=".8"
        >
          {/* Main house */}
          <path d="M315 112 V56 L400 12 L485 56 V112" />
          <path d="M305 56 L400 5 L495 56" />
          <path d="M325 56 H475" />
          <path d="M345 112 V67 H455 V112" />
          <path d="M390 112 V77 H410 V112" />

          {/* Windows */}
          <path d="M350 77 H375 V99 H350 Z" />
          <path d="M425 77 H450 V99 H425 Z" />

          {/* Left tree */}
          <path d="M175 112 V73 M175 86 L155 69 M175 86 L195 67" />
          <path d="M145 70 C125 65 132 43 150 43 C150 22 181 22 182 43 C208 41 211 70 190 75" />

          {/* Right tree */}
          <path d="M625 112 V73 M625 86 L605 69 M625 86 L645 67" />
          <path d="M595 70 C575 65 582 43 600 43 C600 22 631 22 632 43 C658 41 661 70 640 75" />

          {/* Small bushes */}
          <path d="M105 112 Q120 87 140 112 M80 112 Q92 98 110 112" />
          <path d="M665 112 Q680 87 700 112 M690 112 Q705 98 720 112" />
        </g>

        <path
          d="M0 115 Q200 111 400 115 T800 115"
          stroke="#F87907"
          strokeWidth="1.5"
          opacity=".7"
        />
      </svg>
    </div>
  );
}

/* =========================================
   FEATURE CARD
========================================= */

function FeatureCard({ feature, index, shouldReduceMotion }) {
  const Icon = feature.icon;

  return (
    <motion.div
      variants={shouldReduceMotion ? {} : cardVariants}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -7,
              scale: 1.015,
            }
      }
      className="
        group relative isolate
        flex flex-col items-center justify-center
        text-center
        min-h-[225px]
        lg:h-[235px]
        px-5 py-7
        rounded-[24px]
        border border-[#A85A25]/40
        bg-gradient-to-b from-[#21150E]/90 to-[#17100C]/95
        overflow-hidden
        transition-all duration-500
        hover:border-[#F87907]/80
        hover:shadow-[0_0_30px_rgba(248,121,7,0.22)]
      "
    >
      {/* Hover lighting */}
      <div
        className="
          absolute inset-0 -z-10
          bg-gradient-to-br from-[#F87907]/15 via-transparent to-transparent
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-500
          pointer-events-none
        "
      />

      {/* Top ambient glow - hover only */}
      <div
        className="
          absolute -top-16 left-1/2 -translate-x-1/2
          w-40 h-32 rounded-full
          bg-orange-500/30 blur-[65px]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          pointer-events-none
        "
      />

      {/* Number badge */}
      <span
        className="
          absolute top-0 right-6
          px-4 py-1.5
          rounded-b-lg
          bg-[#2A190D]
          text-[#F99A25]
          border-x border-b border-[#A85A25]/50
          text-xs font-bold tracking-widest
          group-hover:bg-[#F87907]
          group-hover:text-black
          group-hover:border-[#F87907]
          transition-all duration-300
        "
      >
        {feature.step}
      </span>

      {/* Icon container */}
      <motion.div
        whileHover={
          shouldReduceMotion
            ? {}
            : {
                scale: 1.08,
                rotate: 3,
              }
        }
        className="
          relative
          w-[66px] h-[66px]
          flex items-center justify-center
          rounded-[19px]
          border border-[#B76B32]/40
          bg-gradient-to-br from-[#543016]/60 to-[#21130A]/90
          mb-4
          group-hover:border-[#F87907]/80
          group-hover:shadow-[0_0_25px_rgba(248,121,7,0.3)]
          transition-all duration-500
        "
      >
        <Icon
          strokeWidth={1.8}
          className="
            relative w-9 h-9
            text-[#F58A19]
            transition-all duration-500
            group-hover:text-[#FF941B]
            group-hover:drop-shadow-[0_0_12px_rgba(248,121,7,0.9)]
          "
        />
      </motion.div>

      {/* Title */}
      <h3
        className="
          relative
          text-base sm:text-lg lg:text-[19px]
          font-bold tracking-tight
          mb-2
          text-white
          group-hover:text-[#FF941B]
          transition-colors duration-300
        "
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        className="
          relative
          text-xs sm:text-sm
          text-slate-300
          leading-relaxed
          max-w-[230px]
          mx-auto
        "
      >
        {feature.description}
      </p>

      {/* Bottom accent */}
      <div className="relative mt-4">
        <span
          className="
            block h-[3px] w-16 rounded-full
            bg-gradient-to-r from-[#F87907] to-[#FFB04A]
            group-hover:w-24
            group-hover:shadow-[0_0_14px_rgba(248,121,7,0.8)]
            transition-all duration-500
          "
        />
      </div>

      {/* Hover border highlight */}
      <div
        className="
          absolute inset-0
          rounded-[24px]
          border border-orange-400/0
          group-hover:border-orange-400/20
          pointer-events-none
          transition-all duration-500
        "
      />
    </motion.div>
  );
}

/* =========================================
   MAIN COMPONENT
========================================= */

export default function WhyChoose() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="why-choose"
      className="
        relative isolate w-full
        h-auto lg:h-[60vh]
        overflow-hidden
        bg-[#100905]
        text-white
        py-12 lg:py-5
        px-4 sm:px-8 lg:px-10
      "
    >
      {/* Background */}
      <BackgroundDecor />

      {/* Main content */}
      <div
        className="
          relative z-10
          max-w-[1400px]
          mx-auto
          h-full
          flex flex-col
          justify-center
        "
      >
        {/* Section heading */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: -20,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.65,
          }}
          className="text-center mb-7 lg:mb-8"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-10 sm:w-16 h-[2px] bg-gradient-to-r from-transparent to-[#F87907]" />

            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-white">
              Our Advantages
            </span>

            <span className="w-10 sm:w-16 h-[2px] bg-gradient-to-l from-transparent to-[#F87907]" />
          </div>

          {/* Main title */}
          <h2
            className="
              text-[30px]
              sm:text-4xl
              md:text-[42px]
              lg:text-[46px]
              leading-tight
              font-bold
              tracking-tight
            "
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            Why Choose{" "}
            <span
              className="
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-[#FFB04A]
                via-[#F87907]
                to-[#FF9A22]
              "
            >
              Treasure Island?
            </span>
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 mt-3 mb-3">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#F87907]" />

            <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]" />

            <span className="w-2.5 h-2.5 rotate-45 bg-[#F87907] shadow-[0_0_12px_rgba(248,121,7,0.8)]" />

            <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]" />

            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#F87907]" />
          </div>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl mx-auto">
            We provide transparent deals, verified properties and
            end-to-end support for a seamless buying experience.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
            lg:gap-6
          "
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </motion.div>

        {/* Bottom house illustration */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 15,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="hidden md:block mt-1"
        >
          <BottomHouse />
        </motion.div>
      </div>
    </section>
  );
}
