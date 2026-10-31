import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";
import logoIcon from "../../assets/home/logo_icon_transparent.png";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/aboutus" },
  { name: "Properties", path: "/properties" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isHero, setIsHero] = useState(true);
  const [showOtherNav, setShowOtherNav] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const checkScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      if (isHomePage) {
        if (currentScrollY <= 80) {
          setIsHero(true);
          setShowOtherNav(false);
        } else {
          setIsHero(false);
          if (diff > 4) {
            setShowOtherNav(false);
          } else if (diff < -4) {
            setShowOtherNav(true);
          }
        }
      } else {
        setIsHero(false);
        if (currentScrollY <= 20) {
          setShowOtherNav(true);
        } else if (diff > 4) {
          setShowOtherNav(false);
        } else if (diff < -4) {
          setShowOtherNav(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();

    return () => window.removeEventListener("scroll", checkScroll);
  }, [isHomePage]);

  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setMobileMenuOpen(false);
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full px-4 sm:px-8 lg:px-10 py-4 sm:py-5 pointer-events-none transition-all duration-500 ease-out ${isHero && isHomePage
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-8 scale-95 pointer-events-none"
          }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link
            to="/"
            className="pointer-events-auto group flex items-center gap-3 rounded-2xl bg-black/35 backdrop-blur-md border border-white/10 px-4 sm:px-5 py-2.5 sm:py-3 shadow-2xl transition-all duration-300 hover:bg-black/50 hover:border-white/20"
          >
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10">
              <img
                src={logoIcon}
                alt="Treasure Island Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
              />
            </div>

            <span
              className="text-white text-sm sm:text-base lg:text-lg font-bold tracking-[0.16em] uppercase whitespace-nowrap"
              style={{
                fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
              }}
            >
              Treasure Island
            </span>
          </Link>

          <nav className="pointer-events-auto hidden md:flex items-center gap-6 lg:gap-8 rounded-full bg-[#182617]/40 backdrop-blur-md border border-white/10 px-7 lg:px-8 py-2.5 sm:py-3 shadow-2xl">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${isActive
                    ? "text-[#F4C48D]"
                    : "text-white/80 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/login"
              className="rounded-full border border-[#E5A96E]/70 px-5 py-1.5 text-sm font-medium text-white/95 transition-all duration-300 hover:border-[#E5A96E] hover:bg-[#E5A96E]/15 hover:shadow-[0_0_15px_rgba(229,169,110,0.3)] flex items-center gap-1.5"
            >
              <LogIn size={15} />
              <span>Login</span>
            </Link>
          </nav>

          <div className="pointer-events-auto md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10 rounded-xl bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-center text-white shadow-xl active:scale-95 transition-all duration-200"
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-8 lg:px-10 py-3 sm:py-3.5 transition-all duration-300 ease-in-out ${isHero && isHomePage
            ? "opacity-0 -translate-y-full pointer-events-none"
            : showOtherNav
              ? "opacity-100 translate-y-0 pointer-events-auto bg-[#0c140d]/92 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
              : "opacity-0 -translate-y-full pointer-events-none"
          }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 flex items-center justify-center">
              <img
                src={logoIcon}
                alt="Treasure Island Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span
              className="text-white text-sm sm:text-base lg:text-lg font-bold tracking-[0.14em] uppercase whitespace-nowrap"
              style={{
                fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
              }}
            >
              Treasure Island
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 relative py-1 ${isActive
                    ? "text-[#F4C48D] font-semibold"
                    : "text-stone-300 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F4C48D] rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            <Link
              to="/login"
              className="rounded-full bg-gradient-to-r from-[#F9770B] via-[#F86E00] to-[#EA580C] px-5 sm:px-6 py-2 text-sm font-medium text-white shadow-[0_4px_15px_rgba(249,119,11,0.3)] hover:shadow-[0_6px_20px_rgba(249,119,11,0.45)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 flex items-center gap-1.5"
            >
              <LogIn size={15} />
              <span>Login</span>
            </Link>
          </nav>

          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white active:scale-95 transition-all duration-200"
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 left-0 bg-[#0c140d]/95 backdrop-blur-2xl border-b border-white/15 p-6 shadow-2xl transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img
                src={logoIcon}
                alt="Treasure Island Logo"
                className="w-8 h-8 object-contain"
              />
              <span
                className="text-white text-base font-bold tracking-[0.15em] uppercase"
                style={{
                  fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
                }}
              >
                Treasure Island
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white active:scale-95 transition-all"
              aria-label="Close navigation menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-2 py-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-base font-medium py-2.5 px-4 rounded-xl transition-colors ${isActive
                    ? "text-[#F4C48D] bg-white/10 font-semibold"
                    : "text-stone-300 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F9770B] via-[#F86E00] to-[#EA580C] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-orange-500/30 active:scale-95 transition-all"
            >
              <LogIn size={16} />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
