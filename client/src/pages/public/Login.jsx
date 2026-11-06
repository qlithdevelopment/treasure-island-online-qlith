import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import logoIcon from "../../assets/home/logo_icon_transparent.png";
import loginSunsetBg from "../../assets/home/login_sunset_bg.jpg";
import api from "../../services/api";
import { storeToken } from "../../utils/tokenCrypto";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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

    try {
      const res = await api.post("/login", {
        email: email.trim(),
        password: password.trim(),
      });

      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token);
        try {
          await storeToken(res.data.token);
        } catch {}

        if (rememberMe) {
          localStorage.setItem("user_email", email.trim());
        }

        setLoading(false);
        navigate("/admin");
      } else {
        setLoading(false);
        setError("Invalid response from server. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Invalid email or password. Please try again.";
      setError(msg);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-end px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 py-8 text-white overflow-hidden select-none">
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url(${loginSunsetBg})`,
          filter: "contrast(96%) brightness(96%) saturate(102%)",
        }}
      />
      <div className="absolute inset-0 bg-slate-950/15 backdrop-blur-[0.5px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/15 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(4,8,15,0.3)_100%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[430px] my-auto pt-3 sm:pt-6">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
          className="mb-5 sm:mb-6 flex items-center justify-start"
        >
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full bg-[#08121d]/85 hover:bg-[#08121d] border border-amber-400/35 hover:border-[#F87907] backdrop-blur-xl transition-all duration-300 shadow-[0_4px_22px_rgba(248,121,7,0.25)] hover:shadow-[0_6px_30px_rgba(248,121,7,0.45)] group cursor-pointer"
            >
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F9770B] to-[#EA580C] text-white flex items-center justify-center shadow-[0_2px_10px_rgba(249,119,11,0.5)] transition-transform duration-300 group-hover:-translate-x-1 group-hover:scale-105">
                <ArrowLeft size={13} className="stroke-[2.5]" />
              </span>
              <span className="text-xs font-bold text-slate-100 group-hover:text-white tracking-wide transition-colors">
                Back to Home
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] transition-all duration-300 group-hover:bg-[#F87907] group-hover:shadow-[0_0_8px_rgba(248,121,7,0.9)]" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 75, scale: 0.94, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative w-full"
        >
          <svg
            className="absolute -inset-2.5 w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none z-0"
            viewBox="0 0 440 560"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="neonCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="neonGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient id="outerCyanGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="60%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>

              <linearGradient id="innerGoldCyanGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F87907" />
                <stop offset="35%" stopColor="#fbbf24" />
                <stop offset="68%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>

            <motion.path
              d="M 18 200 C 18 80, 150 18, 335 18 L 398 18 A 24 24 0 0 1 422 42 L 422 516 A 28 28 0 0 1 394 544 L 46 544 A 28 28 0 0 1 18 516 Z"
              vectorEffect="non-scaling-stroke"
              fill="rgba(7, 16, 26, 0.88)"
              stroke="url(#outerCyanGrad)"
              strokeWidth="2.5"
              filter="url(#neonCyanGlow)"
              initial={{ pathLength: 0.1, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
            />

            <motion.path
              d="M 28 202 C 28 92, 152 28, 332 28 L 392 28 A 18 18 0 0 1 410 46 L 410 508 A 20 20 0 0 1 390 534 L 54 534 A 20 20 0 0 1 28 508 Z"
              vectorEffect="non-scaling-stroke"
              fill="none"
              stroke="url(#innerGoldCyanGrad)"
              strokeWidth="1.8"
              filter="url(#neonGoldGlow)"
              initial={{ pathLength: 0.1, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: "easeOut", delay: 0.45 }}
            />
          </svg>

          <div className="relative z-10 pt-10 sm:pt-12 pb-8 px-7 sm:px-9">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mb-5"
            >
              <motion.div
                initial={{ scale: 0.8, rotate: -6 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.45, type: "spring" }}
                className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#091522] border border-amber-400/40 p-2.5 mb-2.5 shadow-[0_8px_25px_rgba(248,121,7,0.35)] backdrop-blur-md"
              >
                <img
                  src={logoIcon}
                  alt="Treasure Island"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#08131e] shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </motion.div>

              <div className="text-[10px] uppercase tracking-[0.22em] text-[#F87907] font-bold mb-1">
                Treasure Island Real Estate
              </div>

              <h1
                className="text-2xl sm:text-[28px] font-serif font-bold text-white tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Admin Login
              </h1>

              <div className="flex items-center justify-center gap-2 mt-2 mb-1.5">
                <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#F87907]" />
                <span className="w-1.5 h-1.5 rotate-45 bg-[#F87907] shadow-[0_0_6px_rgba(248,121,7,0.8)]" />
                <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#F87907]" />
              </div>

              <p className="text-xs text-slate-300 font-normal">
                Sign in to manage property inventory and inquiries
              </p>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs flex items-center gap-2 font-medium"
              >
                <AlertCircle size={15} className="shrink-0 text-red-400" />
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                  >
                    <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-[#F87907]">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <Mail
                        size={15}
                        className="absolute left-3.5 text-slate-400 pointer-events-none"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@treasureisland.com"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0a1726]/80 border border-slate-700/80 text-white placeholder:text-slate-400 text-xs sm:text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25 transition-all font-medium"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.65 }}
                  >
                    <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                      Password <span className="text-[#F87907]">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <Lock
                        size={15}
                        className="absolute left-3.5 text-slate-400 pointer-events-none"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-[#0a1726]/80 border border-slate-700/80 text-white placeholder:text-slate-400 text-xs sm:text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25 transition-all font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.75 }}
                    className="flex items-center justify-between pt-0.5"
                  >
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer"
                      />
                      <span>Remember this device</span>
                    </label>
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.85 }}
                    whileHover={{ scale: 1.025, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full mt-4 py-3.5 px-6 rounded-2xl rounded-tr-3xl bg-gradient-to-r from-[#F9770B] via-[#F86E00] to-[#EA580C] hover:from-[#EA580C] hover:to-[#F9770B] text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_10px_28px_rgba(249,119,11,0.5)] hover:shadow-[0_14px_38px_rgba(249,119,11,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <ArrowRight size={16} />
                        <span>Sign In to Dashboard</span>
                      </>
                    )}
                  </motion.button>
                </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
