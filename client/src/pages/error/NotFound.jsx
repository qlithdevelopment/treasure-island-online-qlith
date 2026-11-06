import { Link } from "react-router-dom";
import { ArrowLeft, Home, Building2, Sparkles } from "lucide-react";
import logoIcon from "../../assets/home/logo_icon_transparent.png";

const currentYear = new Date().getFullYear();

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-50 min-h-screen w-full bg-[#070D08] overflow-y-auto flex flex-col justify-between items-center select-none px-4 sm:px-8 py-6 sm:py-8 text-white">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#F87907]/20 via-[#F87907]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-[#F87907]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />

      <header className="w-full max-w-7xl flex items-center justify-between z-10">
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/40 border border-white/10 p-1.5 flex items-center justify-center group-hover:border-[#F87907] transition-all shadow-md">
            <img
              src={logoIcon}
              alt="Treasure Island"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </div>
          <span
            className="text-white text-sm sm:text-base font-bold tracking-[0.16em] uppercase"
            style={{
              fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
            }}
          >
            Treasure Island
          </span>
        </Link>

        <Link
          to="/"
          className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-[#F87907] transition-colors inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#F87907]/40"
        >
          <Home size={15} className="text-[#F87907]" />
          <span>Return Home</span>
        </Link>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-8 px-4 max-w-2xl w-full">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-bold text-orange-400 mb-4 shadow-inner">
          <Sparkles size={13} className="text-[#F87907]" />
          <span>Error 404 • Destination Not Found</span>
        </div>

        <div className="relative">
          <span
            className="text-[110px] sm:text-[150px] md:text-[180px] font-black tracking-tight leading-none bg-gradient-to-b from-white via-orange-100 to-[#F87907] bg-clip-text text-transparent select-none drop-shadow-[0_15px_35px_rgba(248,121,7,0.35)] block"
            style={{ fontFamily: "'Cinzel', Georgia, serif" }}
          >
            404
          </span>
        </div>

        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight -mt-2 mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Lost in Luxury
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-lg mx-auto leading-relaxed mb-8 font-normal">
          The premium sanctuary, property listing, or page you are seeking may have been relocated, archived, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F87907] via-[#F9770B] to-[#EA580C] hover:from-[#EA580C] hover:to-[#F87907] text-white text-xs sm:text-sm font-bold shadow-[0_8px_25px_rgba(248,121,7,0.35)] hover:shadow-[0_12px_35px_rgba(248,121,7,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>

          <Link
            to="/properties"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 backdrop-blur-md text-xs sm:text-sm font-bold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Building2 size={16} className="text-[#F87907]" />
            <span>Browse Properties</span>
          </Link>
        </div>

        <p className="mt-8 text-xs text-slate-400">
          Need personal assistance?{" "}
          <Link
            to="/contact"
            className="text-[#F87907] hover:underline font-semibold"
          >
            Contact Our Advisory Team
          </Link>
        </p>
      </main>

      <footer className="w-full max-w-7xl text-center py-2 z-10">
        <p className="text-[11px] text-slate-500 font-medium">
          © {currentYear} Treasure Island Real Estate. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
