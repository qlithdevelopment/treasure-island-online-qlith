import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
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
  CheckCircle2,
} from "lucide-react";
import PageHero from "../../components/common/PageHero";
import sujitImg from "../../assets/Sujit_Mohapatra.png";

const aboutHeroImg =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85";

const propertySpecialties = [
  {
    icon: <Layers className="w-6 h-6 text-[#F87907]" />,
    title: "Residential Plots",
    tag: "High Capital Growth",
    description:
      "Prime approved land parcels and plotted developments ideal for immediate home construction or long-term capital appreciation.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    filterParam: "Land",
  },
  {
    icon: <Building2 className="w-6 h-6 text-[#23ADD9]" />,
    title: "Luxury Apartments",
    tag: "High-Rise Living",
    description:
      "Modern flats and high-rise residences with world-class amenities, premium finishes, and strategic city connectivity.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    filterParam: "Apartment",
  },
  {
    icon: <HomeIcon className="w-6 h-6 text-[#F87907]" />,
    title: "Duplex Homes",
    tag: "Spacious Comfort",
    description:
      "Contemporary two-level family residences engineered for spacious luxury, privacy, and modern living standards.",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    filterParam: "House",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-[#23ADD9]" />,
    title: "Independent Houses",
    tag: "Bespoke Freedom",
    description:
      "Bespoke standalone houses and custom-designed villas set in peaceful, upscale residential enclaves.",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    filterParam: "House",
  },
  {
    icon: <Briefcase className="w-6 h-6 text-[#F87907]" />,
    title: "Commercial Spaces",
    tag: "Prime High-Yield ROI",
    description:
      "High-visibility retail shops, corporate office complexes, and high-yield commercial investments across prime commercial hubs.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    filterParam: "Commercial",
  },
  {
    icon: <Trees className="w-6 h-6 text-emerald-500" />,
    title: "Farmland Investments",
    tag: "Eco Sustainable",
    description:
      "High-potential agro-farmland and serene green estate acreage providing sustainable growth, peace of mind, and lasting value.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    filterParam: "Land",
  },
];

const pillars = [
  {
    icon: <ShieldCheck className="w-7 h-7 text-[#F87907]" />,
    title: "Uncompromising Transparency",
    description:
      "Clear title verifications, complete documentation support, and 100% upfront clarity on every property deal with zero hidden surprises.",
    stat: "100% Verified",
  },
  {
    icon: <HeartHandshake className="w-7 h-7 text-[#23ADD9]" />,
    title: "Personalized Guidance",
    description:
      "We understand that every client has unique aspirations. Our advisory is customized to your exact budget, timeline, and lifestyle needs.",
    stat: "Tailored Advisory",
  },
  {
    icon: <Award className="w-7 h-7 text-[#F87907]" />,
    title: "15+ Years of Proven Trust",
    description:
      "Serving since 2010 with a solid track record of successful transactions, enduring customer relationships, and verified industry credibility.",
    stat: "Since 2010",
  },
];

const milestones = [
  {
    year: "2010",
    title: "Foundation of Treasure Island",
    description:
      "Founded by Sujit Mohapatra with a vision to bring integrity, transparent advisory, and trusted guidance to Odisha real estate.",
  },
  {
    year: "2015",
    title: "Portfolio Diversification",
    description:
      "Expanded across residential plots, gated duplex communities, and commercial business complexes throughout Bhubaneswar.",
  },
  {
    year: "2020",
    title: "Strategic Developer Alliances",
    description:
      "Formed direct partnerships with leading Grade-A builders including DN Homes, Utkal, Assotech, Evos, and Metro Builders.",
  },
  {
    year: "2025+",
    title: "15+ Years of Excellence",
    description:
      "Over 25,000+ happy families guided home with zero brokerage direct pricing, solid RERA compliance, and trusted advisory.",
  },
];

export default function AboutUs() {
  return (
    <div className="w-full bg-white text-slate-800 select-none overflow-hidden">
      <PageHero
        badge="Trusted Real Estate Excellence Since 2010"
        badgeIcon={Clock}
        title="About Treasure Island"
        subtitle="Helping clients make confident, informed real estate decisions with over 15 years of industry experience and personalized property guidance."
        bgImage={aboutHeroImg}
      />

      <section className="relative z-20 -mt-10 w-full px-4 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
            <div className="group relative bg-white rounded-2xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-200/90 hover:border-[#F87907]/50 hover:shadow-[0_16px_36px_rgba(248,121,7,0.12)] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#F87907]/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="text-2xl sm:text-4xl font-extrabold text-[#F87907] font-serif tracking-tight">
                15+ Years
              </div>
              <div className="text-xs sm:text-sm text-slate-700 font-semibold mt-1">
                Industry Experience
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Committed Since 2010
              </div>
            </div>

            <div className="group relative bg-white rounded-2xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-200/90 hover:border-slate-400 hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-900/5 to-transparent rounded-bl-full pointer-events-none" />
              <div className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
                25,000+
              </div>
              <div className="text-xs sm:text-sm text-slate-700 font-semibold mt-1">
                Happy Families
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Guided into Dream Homes
              </div>
            </div>

            <div className="group relative bg-white rounded-2xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-200/90 hover:border-[#23ADD9]/50 hover:shadow-[0_16px_36px_rgba(35,173,217,0.15)] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#23ADD9]/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="text-2xl sm:text-4xl font-extrabold text-[#23ADD9] font-serif tracking-tight">
                6+ Segments
              </div>
              <div className="text-xs sm:text-sm text-slate-700 font-semibold mt-1">
                Diverse Portfolio
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Plots, Villas, Flats & Land
              </div>
            </div>

            <div className="group relative bg-white rounded-2xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-200/90 hover:border-emerald-500/50 hover:shadow-[0_16px_36px_rgba(16,185,129,0.15)] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="text-2xl sm:text-4xl font-extrabold text-emerald-600 font-serif tracking-tight">
                100% Trust
              </div>
              <div className="text-xs sm:text-sm text-slate-700 font-semibold mt-1">
                RERA & Transparency
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Clear Titles & Direct Deals
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full px-4 sm:px-8 lg:px-10 py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/70 to-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              <h2
                className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-bold text-[#0F172A] tracking-tight mb-5 sm:mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Our Story
              </h2>

              <div className="space-y-4 text-base sm:text-[17px] text-slate-600 leading-relaxed font-normal">
                <p>
                  Since 2010, Treasure Island has been helping clients make confident and informed real estate decisions. With over 15 years of industry experience, we have built a strong reputation for delivering reliable guidance, personalized service, and valuable property opportunities.
                </p>

                <p>
                  Founded by <strong className="font-bold text-slate-900">Sujit Mohapatra</strong>, we specialize in a wide range of properties, including residential plots, apartments, duplex homes, independent houses, commercial spaces, and farmland investments. Whether you’re looking to buy, sell, or invest, our goal is to simplify the process and help you achieve the best possible outcome.
                </p>

                <p>
                  We understand that every client has unique needs and every property represents an important milestone. That’s why we focus on building lasting relationships through transparency, professional expertise, and a commitment to customer satisfaction.
                </p>

                <p>
                  At Treasure Island, we don’t just deal in properties, we help people find the right place to live, invest, and grow their future with confidence.
                </p>
              </div>

              <div className="mt-6 mb-5 text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                15+ Years of Experience • Trusted Since 2010 • Residential, Commercial & Farmland Properties • Committed to Trust, Transparency & Excellence
              </div>

              <div className="space-y-2 pt-1 text-sm sm:text-base text-slate-800">
                <div className="flex items-center gap-2.5">
                  <Phone size={16} className="text-slate-900 shrink-0" />
                  <span className="font-semibold text-slate-900">Mobile:</span>
                  <a
                    href="tel:+919348980948"
                    className="font-bold text-slate-900 hover:text-[#F87907] transition-colors"
                  >
                    +91 9348980948
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail size={16} className="text-slate-900 shrink-0" />
                  <span className="font-semibold text-slate-900">Email:</span>
                  <a
                    href="mailto:sujit.masterjack@gmail.com"
                    className="italic text-slate-800 hover:text-[#F87907] transition-colors underline decoration-slate-300 hover:decoration-[#F87907]"
                  >
                    sujit.masterjack@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex justify-center items-center"
            >
              <div className="relative w-full max-w-[480px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-200/80 bg-white">
                <img
                  src={sujitImg}
                  alt="Sujit Mohapatra - Founder of Treasure Island"
                  className="w-full h-auto object-cover rounded-3xl block"
                />
              </div>
            </motion.div>
          </div>

          <div className="mt-16 sm:mt-20 pt-10 border-t border-slate-200/80">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F87907]">
                Our Journey
              </span>
              <h3
                className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight mt-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                15+ Years Proven Legacy
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#F87907]/40 hover:shadow-md transition-all duration-300"
                >
                  <span className="self-start px-3 py-1 rounded-full text-xs font-bold bg-[#FFF4EB] text-[#F87907] border border-[#F87907]/20 shrink-0 mb-3">
                    {milestone.year}
                  </span>
                  <h5 className="text-base font-bold text-slate-900 group-hover:text-[#F87907] transition-colors mb-1.5">
                    {milestone.title}
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full px-4 sm:px-8 lg:px-10 py-16 sm:py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#F87907]/15 via-[#23ADD9]/10 to-transparent blur-[140px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="text-center mb-12 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Comprehensive Portfolio
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-[2.65rem] font-serif font-bold text-white tracking-tight mt-1 mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              What We Specialize In
            </h2>

            <div className="flex items-center justify-center gap-1.5 mt-2 mb-3.5">
              <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-[#F87907] to-[#F87907] rounded-full" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
              <span className="w-2.5 h-2.5 rotate-45 bg-[#F87907] shadow-[0_0_8px_rgba(248,121,7,0.8)]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
              <span className="w-12 sm:w-16 h-[2px] bg-gradient-to-l from-transparent via-[#F87907] to-[#F87907] rounded-full" />
            </div>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              From premium plots to luxury villas and high-growth farmland investments, we cover the full real estate spectrum.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {propertySpecialties.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl overflow-hidden bg-slate-950/70 border border-white/10 hover:border-[#F87907]/60 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_40px_rgba(248,121,7,0.25)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 backdrop-blur-md text-amber-300 border border-white/20">
                      {item.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-slate-900/90 border border-white/20 flex items-center justify-center shadow-md">
                    {item.icon}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className="text-lg sm:text-xl font-bold font-serif text-white group-hover:text-[#F87907] transition-colors mb-2"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#F87907]">
                    <Link
                      to={`/properties?type=${encodeURIComponent(item.filterParam)}`}
                      className="inline-flex items-center gap-1.5 hover:gap-2 transition-all cursor-pointer text-amber-300 hover:text-white"
                    >
                      <span>Explore Properties</span>
                      <ArrowRight size={14} />
                    </Link>
                    <span className="text-[10px] text-slate-400 font-normal">
                      Verified
                    </span>
                  </div>
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
              Every property milestone represents a defining life chapter. Here is how we ensure your confidence at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="group rounded-3xl p-7 sm:p-8 bg-gradient-to-b from-slate-50 to-white border border-slate-200/90 hover:border-[#F87907]/50 hover:shadow-[0_16px_36px_rgba(248,121,7,0.12)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
                      {pillar.icon}
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFF4EB] text-[#F87907] border border-[#F87907]/20">
                      {pillar.stat}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold font-serif text-slate-900 group-hover:text-[#F87907] transition-colors mb-2.5"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#F87907]">
                  <CheckCircle2 size={15} className="text-emerald-500" />
                  <span>Guaranteed Client Priority</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full px-4 sm:px-8 lg:px-10 pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-[#0F172A] to-slate-950 p-8 sm:p-12 lg:p-16 text-center text-white border border-white/10 shadow-2xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-[#F87907]/18 blur-[130px] rounded-full pointer-events-none" />

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
                Whether you’re looking to buy a dream home, invest in prime land, or explore high-yield commercial spaces, our team is ready to guide you with integrity and expertise.
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
