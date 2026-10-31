import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X,
  Sparkles,
} from "lucide-react";
import logoIcon from "../../assets/home/logo_icon_transparent.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(() => {
    return typeof window !== "undefined" && Boolean(localStorage.getItem("token"));
  });
  const navigate = useNavigate();

  const handleQuickDemoFill = () => {
    setEmail("admin@treasureisland.com");
    setPassword("admin123");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please provide both email address and password.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("token", "treasure_island_auth_token");
      if (rememberMe) {
        localStorage.setItem("user_email", email.trim());
      }
      setLoading(false);
      navigate("/admin");
    }, 600);
  };

  const handleLogoutExisting = () => {
    localStorage.removeItem("token");
    setIsAlreadyLoggedIn(false);
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center px-4 py-16 sm:py-20 bg-gradient-to-b from-[#080E14] via-[#0D1721] to-[#0A121A] text-white overflow-hidden select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[480px] bg-gradient-to-r from-[#F87907]/15 via-[#FBBF24]/10 to-[#23ADD9]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#F87907]/8 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#23ADD9]/8 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative z-10 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-400 hover:text-[#F87907] transition-colors group cursor-pointer"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            <span>Back to Home</span>
          </Link>

          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/5 border border-white/10 text-amber-300 backdrop-blur-md flex items-center gap-1">
            <Sparkles size={11} className="text-[#F87907]" />
            Secure Portal
          </span>
        </div>

        <div className="rounded-3xl bg-[#0B151F]/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 via-orange-500/10 to-transparent border border-amber-400/30 p-3 mb-4 shadow-[0_8px_24px_rgba(248,121,7,0.2)]">
              <img
                src={logoIcon}
                alt="Treasure Island"
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>

            <h1
              className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Portal Login
            </h1>

            <div className="flex items-center justify-center gap-1.5 mt-2 mb-2.5">
              <span className="w-10 h-[2px] bg-gradient-to-r from-transparent via-[#F87907] to-[#F87907] rounded-full" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
              <span className="w-2 h-2 rotate-45 bg-[#F87907] shadow-[0_0_8px_rgba(248,121,7,0.7)]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
              <span className="w-10 h-[2px] bg-gradient-to-l from-transparent via-[#F87907] to-[#F87907] rounded-full" />
            </div>

            <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
              Sign in to manage property inventory, client consultations, and portfolio listings
            </p>
          </div>

          {isAlreadyLoggedIn ? (
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Active Session Detected</h3>
                <p className="text-xs text-slate-400 mt-1">
                  You are already logged into the Treasure Island administrative workspace.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => navigate("/admin")}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#F9770B] to-[#EA580C] hover:from-[#EA580C] hover:to-[#F9770B] text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <LogIn size={15} />
                  <span>Go to Admin Dashboard</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogoutExisting}
                  className="w-full py-2 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 font-medium text-xs transition-colors cursor-pointer"
                >
                  Sign Out & Switch Account
                </button>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2 font-medium">
                  <AlertCircle size={15} className="shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Email Address <span className="text-[#F87907]">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Mail
                      size={16}
                      className="absolute left-3.5 text-slate-400 pointer-events-none"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@treasureisland.com"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder:text-slate-500 text-sm outline-none focus:border-[#F87907] focus:ring-2 focus:ring-[#F87907]/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Password <span className="text-[#F87907]">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-xs text-[#F87907] hover:text-[#fb923c] transition-colors cursor-pointer"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <Lock
                      size={16}
                      className="absolute left-3.5 text-slate-400 pointer-events-none"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder:text-slate-500 text-sm outline-none focus:border-[#F87907] focus:ring-2 focus:ring-[#F87907]/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-[#F87907] focus:ring-[#F87907] focus:ring-offset-0 cursor-pointer"
                    />
                    <span>Remember this device</span>
                  </label>

                  <button
                    type="button"
                    onClick={handleQuickDemoFill}
                    className="text-[11px] font-semibold text-amber-300/90 hover:text-amber-200 underline cursor-pointer"
                    title="Fill test credentials"
                  >
                    Use Demo Access
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-5 py-3 px-6 rounded-xl bg-gradient-to-r from-[#F9770B] via-[#F86E00] to-[#EA580C] hover:from-[#EA580C] hover:to-[#F9770B] text-white font-semibold text-sm tracking-wide shadow-[0_8px_25px_rgba(249,119,11,0.38)] hover:shadow-[0_12px_32px_rgba(249,119,11,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <LogIn size={16} />
                      <span>Sign In</span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>256-Bit SSL Encrypted</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-[#F87907]" />
              <span>RERA Authorized</span>
            </span>
          </div>
        </div>
      </div>

      {showForgotModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setShowForgotModal(false)}
        >
          <div
            className="relative max-w-sm w-full rounded-2xl bg-slate-900 border border-slate-700/80 p-6 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="w-10 h-10 rounded-xl bg-[#F87907]/20 text-[#F87907] flex items-center justify-center mb-3">
              <HelpCircle size={20} />
            </div>

            <h4 className="text-base font-bold font-serif text-white mb-2">
              Password Reset Assistance
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              For security compliance, administrative password resets are managed directly by the primary system administrator. Please reach out to:
            </p>

            <div className="space-y-2 p-3 rounded-xl bg-slate-950/70 border border-white/10 text-xs">
              <div className="text-slate-400">
                Contact: <strong className="text-white">+91 9348980948</strong>
              </div>
              <div className="text-slate-400">
                Email: <strong className="text-white">sujit.masterjack@gmail.com</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="w-full mt-4 py-2.5 rounded-xl bg-[#F87907] text-white font-semibold text-xs hover:bg-[#ea580c] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
