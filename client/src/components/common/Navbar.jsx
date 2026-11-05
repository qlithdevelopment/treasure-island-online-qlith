import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, Sparkles } from "lucide-react";
import logoIcon from "../../assets/home/logo_icon_transparent.png";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/aboutus" },
  { name: "Properties", path: "/properties" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isScrolledTop, setIsScrolledTop] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isLoggedIn =
    isAuthenticated ||
    (typeof window !== "undefined" && Boolean(localStorage.getItem("token")));
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 60) {
        setIsScrolledTop(true);
        setShowNav(true);
      } else {
        setIsScrolledTop(false);
        if (diff > 8) {
          setShowNav(false);
        } else if (diff < -6) {
          setShowNav(true);
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setMobileMenuOpen(false);
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: showNav ? 0 : -100,
          opacity: showNav ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ${
          isHomePage && isScrolledTop
            ? "py-4 sm:py-5 px-4 sm:px-8 lg:px-10 bg-transparent pointer-events-none"
            : "py-3 sm:py-3.5 px-4 sm:px-8 lg:px-10 bg-[#0c140d]/92 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)] pointer-events-auto"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link
            to="/"
            className={`pointer-events-auto group flex items-center gap-3 transition-all duration-300 ${
              isHomePage && isScrolledTop
                ? "rounded-2xl bg-black/35 backdrop-blur-md border border-white/10 px-4 sm:px-5 py-2 sm:py-2.5 shadow-2xl hover:bg-black/50 hover:border-white/20"
                : "hover:opacity-90"
            }`}
          >
            <motion.div
              whileHover={{ rotate: 10, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9"
            >
              <img
                src={logoIcon}
                alt="Treasure Island Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
              />
            </motion.div>

            <span
              className="text-white text-sm sm:text-base lg:text-lg font-bold tracking-[0.16em] uppercase whitespace-nowrap"
              style={{
                fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
              }}
            >
              Treasure Island
            </span>
          </Link>

          <nav
            onMouseLeave={() => setHoveredPath(null)}
            className={`pointer-events-auto hidden md:flex items-center transition-all duration-300 ${
              isHomePage && isScrolledTop
                ? "rounded-full bg-[#182617]/40 backdrop-blur-md border border-white/10 px-5 sm:px-6 py-1.5 sm:py-2 shadow-2xl gap-1"
                : "gap-1 lg:gap-2"
            }`}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => setHoveredPath(link.path)}
                  className="relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors"
                >
                  {hoveredPath === link.path && (
                    <motion.div
                      layoutId="navHoverPill"
                      className="absolute inset-0 rounded-full bg-white/12 backdrop-blur-xs"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive
                        ? "text-[#F4C48D] font-bold"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-[#F87907] via-[#F4C48D] to-[#F87907] shadow-[0_0_10px_rgba(248,121,7,0.8)]"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                </NavLink>
              );
            })}

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="ml-2"
            >
              <Link
                to={isLoggedIn ? "/admin" : "/login"}
                className={`rounded-full px-5 py-1.5 text-sm font-semibold text-white flex items-center gap-1.5 shadow-md transition-all duration-300 ${
                  isHomePage && isScrolledTop
                    ? "border border-[#E5A96E]/70 hover:border-[#E5A96E] hover:bg-[#E5A96E]/20 hover:shadow-[0_0_20px_rgba(229,169,110,0.35)]"
                    : "bg-gradient-to-r from-[#F9770B] via-[#F86E00] to-[#EA580C] shadow-[0_4px_16px_rgba(249,119,11,0.4)] hover:shadow-[0_6px_22px_rgba(249,119,11,0.55)]"
                }`}
              >
                <LogIn size={15} />
                <span>{isLoggedIn ? "Dashboard" : "Login"}</span>
              </Link>
            </motion.div>
          </nav>

          <div className="pointer-events-auto md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10 rounded-xl bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-center text-white shadow-xl cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ y: -60, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              className="absolute top-0 inset-x-0 bg-[#0c140d]/98 backdrop-blur-2xl border-b border-white/15 p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <motion.img
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
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

                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X size={20} />
                </motion.button>
              </div>

              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
                  },
                }}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-2 py-5"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.path}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between text-base font-medium py-3 px-4 rounded-xl transition-all ${
                          isActive
                            ? "text-[#F4C48D] bg-white/10 font-bold border border-[#F4C48D]/30"
                            : "text-stone-300 hover:text-white hover:bg-white/5"
                        }`
                      }
                    >
                      <span>{link.name}</span>
                      <Sparkles size={14} className="text-[#F87907] opacity-60" />
                    </NavLink>
                  </motion.div>
                ))}

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    to={isLoggedIn ? "/admin" : "/login"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-3 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F9770B] via-[#F86E00] to-[#EA580C] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/35 active:scale-95 transition-all"
                  >
                    <LogIn size={16} />
                    <span>{isLoggedIn ? "Dashboard" : "Login"}</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
