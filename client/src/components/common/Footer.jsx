import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import logo from "../../assets/home/logo_icon_transparent.png";

// Curated luxury architectural background image for Footer (Warm twilight estate)
const footerBg =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative w-full bg-[#020B0F] border-t border-white/10 text-slate-300 px-4 sm:px-8 lg:px-10 pt-16 sm:pt-20 pb-10 sm:pb-12 overflow-hidden select-none">
      {/* Clearly Visible Architectural Background Image with Balanced Contrast Overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={footerBg}
          alt="Footer Architectural Background"
          className="w-full h-full object-cover object-center transform scale-105"
          loading="lazy"
        />
        {/* Balanced dark gradient allowing the architecture to be clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020B0F]/82 via-[#020B0F]/65 to-[#020B0F]/88" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Ambient background soft glow accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[250px] bg-[#F87907]/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-[#23ADD9]/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 sm:pb-14 border-b border-white/10">
          {/* ========================================================
              COLUMN 1: BRAND OVERVIEW (lg:col-span-4)
              ======================================================== */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
            <Link to="/" className="flex items-center gap-3 group mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/10 border border-amber-400/30 flex items-center justify-center p-1.5 shadow-sm group-hover:border-[#F87907] transition-colors">
                <img
                  src={logo}
                  alt="Treasure Island"
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="text-lg font-serif font-bold tracking-widest text-white uppercase group-hover:text-[#F87907] transition-colors"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Treasure Island
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                  Contemporary Borderless Luxury
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-5">
              Experience elegance, modern luxury, and exceptional quality in
              every detail. Your premier destination for master-crafted
              residences and prime plots.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin size={14} className="text-[#F87907] shrink-0" />
              <span>Bhubaneswar, Odisha, India</span>
            </div>
          </div>

          {/* ========================================================
              COLUMN 2: MENU LINKS (lg:col-span-2)
              ======================================================== */}
          <div className="lg:col-span-2 sm:pl-2">
            <h3 className="text-sm font-semibold text-white tracking-wider mb-4 uppercase">
              Menu
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-[#F87907] transition-colors duration-200 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="text-slate-400 hover:text-[#F87907] transition-colors duration-200 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-slate-400 hover:text-[#F87907] transition-colors duration-200 inline-block"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-400 hover:text-[#F87907] transition-colors duration-200 inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* ========================================================
              COLUMN 3: CONTACTS & SOCIALS (lg:col-span-3)
              ======================================================== */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white tracking-wider mb-4 uppercase">
              Contacts
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <a
                href="mailto:treasureislandonline2010@gmail.com"
                className="flex items-center gap-2 text-slate-400 hover:text-[#F87907] transition-colors truncate"
              >
                <Mail size={14} className="text-[#F87907] shrink-0" />
                <span className="truncate">
                  treasureislandonline2010@gmail.com
                </span>
              </a>

              <a
                href="tel:+919348980948"
                className="flex items-center gap-2 text-slate-400 hover:text-[#F87907] transition-colors"
              >
                <Phone size={14} className="text-[#F87907] shrink-0" />
                <span>+91 9348980948</span>
              </a>
            </div>

            {/* Socials Subsection */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold text-white tracking-wider mb-3 uppercase">
                Socials
              </h4>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F87907] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs cursor-pointer"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F87907] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs cursor-pointer"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F87907] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs cursor-pointer"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ========================================================
              COLUMN 4: NEWSLETTER (lg:col-span-3)
              ======================================================== */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white tracking-wider mb-4 uppercase">
              Subscribe to our newsletter
            </h3>
            <p className="text-xs text-slate-400 mb-3.5 leading-relaxed">
              Stay informed with our latest property launches, market insights,
              and exclusive real estate offerings.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#F87907] transition-all shadow-xs"
              />

              <button
                type="submit"
                className="w-full py-2.5 px-6 rounded-lg bg-gradient-to-r from-[#F87907] to-[#FB923C] hover:from-[#EA580C] hover:to-[#F87907] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_16px_rgba(248,121,7,0.35)] hover:shadow-[0_6px_22px_rgba(248,121,7,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                SUBSCRIBE
              </button>
            </form>

            {subscribed && (
              <div className="mt-2.5 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <CheckCircle2 size={13} />
                <span>Thank you for subscribing!</span>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================
            BOTTOM COPYRIGHT BAR (Matching Screenshot)
            ======================================================== */}
        <div className="pt-6 sm:pt-8 text-center text-xs text-slate-400">
          <p>
            © 2026 Treasure Island. All rights reserved | Developed by{" "}
            <a
              href="https://qlith.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F87907] font-semibold hover:underline"
            >
              Qlith
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
