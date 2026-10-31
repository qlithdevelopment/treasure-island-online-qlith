import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Award,
  Clock,
  ArrowRight,
  Sparkles,
  Building2,
  Home as HomeIcon,
  Trees,
  Briefcase,
  Layers,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";

// Curated high-resolution Unsplash architectural imagery
const aboutHeroImg =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85";
const storyShowcaseImg =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85";

// Specialized property categories handled by Treasure Island
const propertySpecialties = [
  {
    icon: <Layers className="w-6 h-6 text-[#F87907]" />,
    title: "Residential Plots",
    description:
      "Prime approved land parcels and plotted developments ideal for immediate home construction or long-term capital appreciation.",
  },
  {
    icon: <Building2 className="w-6 h-6 text-[#23ADD9]" />,
    title: "Luxury Apartments",
    description:
      "Modern flats and high-rise residences with world-class amenities, premium finishes, and strategic city connectivity.",
  },
  {
    icon: <HomeIcon className="w-6 h-6 text-[#F87907]" />,
    title: "Duplex Homes",
    description:
      "Contemporary two-level family residences engineered for spacious luxury, privacy, and modern living standards.",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-[#23ADD9]" />,
    title: "Independent Houses",
    description:
      "Bespoke standalone houses and custom-designed villas set in peaceful, upscale residential enclaves.",
  },
  {
    icon: <Briefcase className="w-6 h-6 text-[#F87907]" />,
    title: "Commercial Spaces",
    description:
      "High-visibility retail shops, corporate office complexes, and high-yield commercial investments across prime commercial hubs.",
  },
  {
    icon: <Trees className="w-6 h-6 text-emerald-500" />,
    title: "Farmland Investments",
    description:
      "High-potential agro-farmland and serene green estate acreage providing sustainable growth, peace of mind, and lasting value.",
  },
];

const pillars = [
  {
    icon: <ShieldCheck className="w-7 h-7 text-[#F87907]" />,
    title: "Uncompromising Transparency",
    description:
      "Clear title verifications, complete documentation support, and 100% upfront clarity on every property deal with zero hidden surprises.",
  },
  {
    icon: <HeartHandshake className="w-7 h-7 text-[#23ADD9]" />,
    title: "Personalized Guidance",
    description:
      "We understand that every client has unique aspirations. Our advisory is customized to your exact budget, timeline, and lifestyle needs.",
  },
  {
    icon: <Award className="w-7 h-7 text-[#F87907]" />,
    title: "15+ Years of Proven Trust",
    description:
      "Serving since 2010 with a solid track record of successful transactions, enduring customer relationships, and verified industry credibility.",
  },
];

export default function AboutUs() {
  return (
    <div className="w-full bg-white text-slate-800 select-none overflow-hidden">
      <section className="relative w-full overflow-hidden bg-slate-950 py-20 sm:py-28 text-white">
        {/* Background photo with cinematic overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={aboutHeroImg}
            alt="Treasure Island Luxury Architecture"
            className="w-full h-full object-cover object-center transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950/95" />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-[#F87907]/12 blur-[130px] rounded-full pointer-events-none" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-10">
          <div className="max-w-7xl mx-auto w-full text-center">
            {/* Top Tag Pill */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-amber-300 mb-5"
            >
              <Clock size={14} className="text-[#F87907]" />
              <span>Trusted Real Estate Excellence Since 2010</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              About Treasure Island
            </motion.h1>

            {/* Section Flourish Underline */}
            <div className="flex items-center justify-center gap-1.5 mt-2 mb-5">
              <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-[#F87907] to-[#F87907] rounded-full" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
              <span className="w-2.5 h-2.5 rotate-45 bg-[#F87907] shadow-[0_0_8px_rgba(248,121,7,0.7)]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
              <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-l from-transparent via-[#F87907] to-[#F87907] rounded-full" />
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto"
            >
              Helping clients make confident, informed real estate decisions
              with over 15 years of industry experience and personalized
              property guidance.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-10 w-full px-4 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-200/90 text-center transform hover:-translate-y-1 transition-transform">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F87907] font-serif">
                15+ Years
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                Industry Experience
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-200/90 text-center transform hover:-translate-y-1 transition-transform">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
                Since 2010
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                Trusted Real Estate Advisory
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-200/90 text-center transform hover:-translate-y-1 transition-transform">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#23ADD9] font-serif">
                6+ Segments
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                Plots, Homes, Commercial & Land
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-200/90 text-center transform hover:-translate-y-1 transition-transform">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-serif">
                100% Trust
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                Transparency & Client Priority
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full px-4 sm:px-8 lg:px-10 py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Story Column (lg:col-span-7) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F87907]">
                  About Our Foundation
                </span>
                <h2
                  className="text-3xl sm:text-4xl md:text-[2.65rem] font-serif font-bold text-[#0F172A] tracking-tight mt-1 mb-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Our Story
                </h2>

                <div className="flex items-center gap-1.5 mt-2 mb-5">
                  <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-[#F87907] to-[#F87907] rounded-full" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
                  <span className="w-2.5 h-2.5 rotate-45 bg-[#F87907] shadow-[0_0_8px_rgba(248,121,7,0.6)]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
                  <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-l from-transparent via-[#F87907] to-[#F87907] rounded-full" />
                </div>
              </div>

              {/* Story Paragraph 1 */}
              <p className="text-base sm:text-[17px] text-slate-600 leading-relaxed font-normal">
                Since 2010,{" "}
                <strong className="text-slate-900 font-semibold">
                  Treasure Island
                </strong>{" "}
                has been helping clients make confident and informed real estate
                decisions. With over{" "}
                <strong className="text-slate-900 font-semibold">
                  15 years of industry experience
                </strong>
                , we have built a strong reputation for delivering reliable
                guidance, personalized service, and valuable property
                opportunities.
              </p>

              {/* Founder Highlight Callout Box */}
              <div className="rounded-2xl p-6 sm:p-7 bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-slate-50 border border-[#F87907]/25 shadow-sm">
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="w-8 h-8 rounded-lg bg-[#F87907] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    TI
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                      Founded by Sujit Mohapatra
                    </h3>
                    <p className="text-xs text-[#F87907] font-semibold">
                      Founder & Managing Director
                    </p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mt-2">
                  Founded by{" "}
                  <strong className="text-slate-900 font-semibold">
                    Sujit Mohapatra
                  </strong>
                  , we specialize in a wide range of properties, including
                  residential plots, apartments, duplex homes, independent
                  houses, commercial spaces, and farmland investments. Whether
                  you’re looking to buy, sell, or invest, our goal is to
                  simplify the process and help you achieve the best possible
                  outcome.
                </p>
              </div>

              {/* Story Paragraph 2 */}
              <p className="text-base sm:text-[17px] text-slate-600 leading-relaxed font-normal">
                We understand that every client has unique needs and every
                property represents an important milestone. That’s why we focus
                on building lasting relationships through transparency,
                professional expertise, and a commitment to customer
                satisfaction.
              </p>

              {/* Vision Statement Quote */}
              <div className="border-l-4 border-[#F87907] pl-5 py-2 italic text-slate-700 text-base sm:text-lg font-serif">
                “At Treasure Island, we don’t just deal in properties, we help
                people find the right place to live, invest, and grow their
                future with confidence.”
              </div>
            </motion.div>

            {/* Right Showcase Column (lg:col-span-5) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
            >
              {/* Architectural Image Card with Floating Badge */}
              <div className="relative rounded-2xl overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.12)] border border-slate-200">
                <img
                  src={storyShowcaseImg}
                  alt="Treasure Island Masterpiece"
                  className="w-full h-[320px] sm:h-[380px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg text-slate-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#F87907] font-bold">
                        Committed Since 2010
                      </div>
                      <div className="text-base font-serif font-bold text-slate-900">
                        Trust • Transparency • Excellence
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#F87907] text-white text-xs font-semibold">
                      15+ Years
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Founder Contact Card */}
              <div className="rounded-2xl p-6 sm:p-7 bg-slate-900 text-white shadow-xl border border-slate-800">
                <div className="text-xs uppercase tracking-wider text-[#F87907] font-bold mb-1">
                  Direct Founder Contact
                </div>
                <h3
                  className="text-xl sm:text-2xl font-serif font-bold text-white mb-4"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Connect with Sujit Mohapatra
                </h3>

                <div className="space-y-3 text-sm text-slate-300">
                  <a
                    href="tel:+919348980948"
                    className="flex items-center gap-3 hover:text-[#F87907] transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/10 group-hover:bg-[#F87907] flex items-center justify-center text-white transition-colors">
                      <Phone size={16} />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">
                        Mobile Phone
                      </div>
                      <div className="font-semibold text-white group-hover:text-[#F87907]">
                        +91 9348980948
                      </div>
                    </div>
                  </a>

                  <a
                    href="mailto:sujit.masterjack@gmail.com"
                    className="flex items-center gap-3 hover:text-[#F87907] transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/10 group-hover:bg-[#F87907] flex items-center justify-center text-white transition-colors">
                      <Mail size={16} />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">
                        Official Email
                      </div>
                      <div className="font-semibold text-white group-hover:text-[#F87907] truncate">
                        sujit.masterjack@gmail.com
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white">
                      <MapPin size={16} className="text-[#F87907]" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">Location</div>
                      <div className="font-semibold text-white">
                        Bhubaneswar, Odisha, India
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <Link
                    to="/contact"
                    className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-[#F87907] to-[#FB923C] hover:from-[#EA580C] hover:to-[#F87907] text-white font-semibold text-xs sm:text-sm tracking-wide text-center flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(248,121,7,0.35)] transition-all cursor-pointer"
                  >
                    <span>Schedule a Consultation</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative w-full px-4 sm:px-8 lg:px-10 py-16 sm:py-24 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F87907]">
              Comprehensive Portfolio
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-[2.65rem] font-serif font-bold text-[#0F172A] tracking-tight mt-1 mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              What We Specialize In
            </h2>

            <div className="flex items-center justify-center gap-1.5 mt-2 mb-3.5">
              <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-[#F87907] to-[#F87907] rounded-full" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
              <span className="w-2.5 h-2.5 rotate-45 bg-[#F87907] shadow-[0_0_8px_rgba(248,121,7,0.6)]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
              <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-l from-transparent via-[#F87907] to-[#F87907] rounded-full" />
            </div>

            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
              From premium plots to luxury villas and high-growth farmland
              investments, we cover the full real estate spectrum.
            </p>
          </div>

          {/* 6 Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {propertySpecialties.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:border-[#F87907]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center mb-5 shadow-xs">
                    {item.icon}
                  </div>
                  <h3
                    className="text-xl font-bold font-serif text-slate-900 mb-2.5"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-[#F87907] group cursor-pointer">
                  <Link
                    to="/properties"
                    className="inline-flex items-center gap-1.5 hover:gap-2 transition-all"
                  >
                    <span>View Opportunities</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full px-4 sm:px-8 lg:px-10 py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F87907]">
              Our Guiding Principles
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-[2.65rem] font-serif font-bold text-[#0F172A] tracking-tight mt-1 mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Committed to Trust, Transparency & Excellence
            </h2>

            <div className="flex items-center justify-center gap-1.5 mt-2 mb-3.5">
              <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-[#F87907] to-[#F87907] rounded-full" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
              <span className="w-2.5 h-2.5 rotate-45 bg-[#F87907] shadow-[0_0_8px_rgba(248,121,7,0.6)]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
              <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-l from-transparent via-[#F87907] to-[#F87907] rounded-full" />
            </div>

            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
              Every property milestone represents a defining life chapter. Here
              is how we ensure your confidence at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="rounded-2xl p-7 bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-[#F87907]/40 hover:shadow-[0_12px_32px_rgba(248,121,7,0.12)] transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center mb-5 shadow-xs">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold font-serif text-slate-900 mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full px-4 sm:px-8 lg:px-10 pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-8 sm:p-12 lg:p-16 text-center text-white border border-white/10 shadow-2xl">
            {/* Ambient Warm Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#F87907]/15 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300 mb-4 inline-block">
                Start Your Property Journey Today
              </span>

              <h2
                className="text-2xl sm:text-4xl lg:text-[2.65rem] font-serif font-bold text-white tracking-tight mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Ready to Find Your Next Property Milestone?
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
                Whether you’re looking to buy a dream home, invest in prime
                land, or explore high-yield commercial spaces, our team is ready
                to guide you with integrity and expertise.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/properties"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F87907] to-[#FB923C] hover:from-[#EA580C] hover:to-[#F87907] text-white font-semibold text-sm tracking-wide shadow-[0_8px_24px_rgba(248,121,7,0.35)] transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <span>Explore Properties</span>
                  <ArrowRight size={16} />
                </Link>

                <a
                  href="tel:+919348980948"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm tracking-wide border border-white/20 backdrop-blur-md transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <Phone size={16} className="text-[#F87907]" />
                  <span>Call +91 9348980948</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
