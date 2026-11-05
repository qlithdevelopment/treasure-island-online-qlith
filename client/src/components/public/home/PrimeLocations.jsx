import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import primeLocationsBg from "../../../assets/home/prime_locations_bg.jpg";
import {
  apartment1,
  modernResidence,
  villa1,
  villa2,
  interiorDining,
  oceanVilla,
} from "../../../assets/properties";

const primeLocations = [
  {
    id: 1,
    name: "Patia",
    propertiesCount: "45+ Properties",
    description: "IT Corridor & Modern High-Rises",
    image: apartment1,
  },
  {
    id: 2,
    name: "Chandrasekharpur",
    propertiesCount: "38+ Properties",
    description: "Prime Corporate & Elite Residential",
    image: modernResidence,
  },
  {
    id: 3,
    name: "Khandagiri",
    propertiesCount: "29+ Properties",
    description: "Heritage Foothills & Green Enclaves",
    image: villa1,
  },
  {
    id: 4,
    name: "Pahala",
    propertiesCount: "34+ Properties",
    description: "Expressway Boulevard Townships",
    image: villa2,
  },
  {
    id: 5,
    name: "Tamando",
    propertiesCount: "26+ Properties",
    description: "South Growth Hub & Gated Villas",
    image: interiorDining,
  },
  {
    id: 6,
    name: "Jatni",
    propertiesCount: "22+ Properties",
    description: "Peaceful Suburban Retreat & IIT Zone",
    image: oceanVilla,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function PrimeLocations() {
  return (
    <section className="relative w-full overflow-hidden select-none py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={primeLocationsBg}
          alt="Prime Locations in Bhubaneswar Skyline"
          className="w-full h-full object-cover object-center transform scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/85" />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[0.5px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-[#F87907]/12 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-10 sm:mb-12"
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-serif font-bold text-white tracking-tight mb-2 drop-shadow-md"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Prime locations in Bhubneswar
            </h2>

            <div className="flex items-center justify-center gap-1.5 mt-2.5 mb-3">
              <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-[#F87907] to-[#F87907] rounded-full" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
              <span className="w-2.5 h-2.5 rotate-45 bg-[#F87907] shadow-[0_0_8px_rgba(248,121,7,0.7)]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
              <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-l from-transparent via-[#F87907] to-[#F87907] rounded-full" />
            </div>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl mx-auto drop-shadow-sm">
              Explore properties in the most sought-after locations
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5 items-stretch"
          >
            {primeLocations.map((loc) => (
              <motion.div
                key={loc.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-white/20 shadow-[0_8px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_36px_rgba(248,121,7,0.3)] hover:border-[#F87907]/80 transition-all duration-300 cursor-pointer aspect-[3/4] min-h-[200px] sm:min-h-[220px]"
              >
                <Link
                  to={`/properties?location=${encodeURIComponent(loc.name)}`}
                  className="block w-full h-full relative"
                >
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

                  <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-10">
                    <div className="w-full py-1.5 sm:py-2 px-2 bg-white text-[#0F172A] font-semibold text-xs sm:text-[13px] rounded-lg sm:rounded-xl text-center shadow-md transition-all duration-300 group-hover:bg-[#F87907] group-hover:text-white truncate">
                      {loc.name}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
