
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);

  const { login, logout, isAuthenticated, user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleQuickDemoFill = () => {
    setEmail("admin@treasureisland.com");
    setPassword("admin123");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setError("Please provide both email address and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      await login({
        email: cleanEmail,
        password,
      });

      const destination =
        location.state?.from?.pathname || "/admin";

      navigate(destination, { replace: true });
    } catch (err) {
      const status = err.response?.status;

      if (status === 401 || status === 422) {
        setError(
          err.response?.data?.message ||
            "Invalid email address or password."
        );
      } else if (!err.response) {
        setError(
          "Unable to connect to the server. Please check that your API is running."
        );
      } else {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Login failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutExisting = async () => {
    setError("");
    setLoggingOut(true);

    try {
      await logout();
      setEmail("");
      setPassword("");
    } catch {
      setError("Unable to sign out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-b from-[#080E14] via-[#0D1721] to-[#0A121A] px-4 py-16 text-white sm:py-20">
      {/* Background effects */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[480px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#F87907]/15 via-[#FBBF24]/10 to-[#23ADD9]/10 blur-[140px]" />

      <div className="pointer-events-none absolute top-10 right-10 h-72 w-72 rounded-full bg-[#F87907]/8 blur-[100px]" />

      <div className="pointer-events-none absolute bottom-10 left-10 h-72 w-72 rounded-full bg-[#23ADD9]/8 blur-[100px]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Page header */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition-colors hover:text-[#F87907] sm:text-sm"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            <span>Back to Home</span>
          </Link>

          <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur-md">
            <Sparkles size={11} className="text-[#F87907]" />
            Secure Portal
          </span>
        </div>

        {/* Login card */}
        <div className="rounded-3xl border border-white/10 bg-[#0B151F]/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-9">
          {/* Logo and heading */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-400/20 via-orange-500/10 to-transparent p-3 shadow-[0_8px_24px_rgba(248,121,7,0.2)]">
              <img
                src={logoIcon}
                alt="Treasure Island"
                className="h-full w-full object-contain drop-shadow"
              />
            </div>

            <h1
              className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Portal Login
            </h1>

            <div className="mt-2 mb-2.5 flex items-center justify-center gap-1.5">
              <span className="h-[2px] w-10 rounded-full bg-gradient-to-r from-transparent via-[#F87907] to-[#F87907]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#F87907]/60" />
              <span className="h-2 w-2 rotate-45 bg-[#F87907] shadow-[0_0_8px_rgba(248,121,7,0.7)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#F87907]/60" />
              <span className="h-[2px] w-10 rounded-full bg-gradient-to-l from-transparent via-[#F87907] to-[#F87907]" />
            </div>

            <p className="text-xs leading-relaxed text-slate-300 sm:text-[13px]">
              Sign in to manage property inventory, client
              consultations, and portfolio listings
            </p>
          </div>

          {/* Existing authenticated session */}
          {isAuthenticated ? (
            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 size={24} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">
                  Active Session Detected
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  {user?.name
                    ? `Welcome back, ${user.name}.`
                    : "You are already logged into the Treasure Island administrative workspace."}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/admin", { replace: true })
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F9770B] to-[#EA580C] px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-all hover:from-[#EA580C] hover:to-[#F9770B] sm:text-sm"
                >
                  <LogIn size={15} />
                  <span>Go to Admin Dashboard</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogoutExisting}
                  disabled={loggingOut}
                  className="w-full rounded-xl bg-white/10 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-white/15 disabled:opacity-60"
                >
                  {loggingOut
                    ? "Signing out..."
                    : "Sign Out & Switch Account"}
                </button>
              </div>

              {error && (
                <p role="alert" className="text-xs text-red-300">
                  {error}
                </p>
              )}
            </div>
          ) : (
            <>
              {/* API error */}
              {error && (
                <div
                  role="alert"
                  className="mb-5 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-medium text-red-300"
                >
                  <AlertCircle
                    size={15}
                    className="shrink-0 text-red-400"
                  />
                  <span>{error}</span>
                </div>
              )}

              {/* Login form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="login-email"
                    className="mb-2 block text-xs font-semibold tracking-wider text-slate-300 uppercase"
                  >
                    Email Address{" "}
                    <span className="text-[#F87907]">*</span>
                  </label>

                  <div className="relative flex items-center">
                    <Mail
                      size={16}
                      className="pointer-events-none absolute left-3.5 text-slate-400"
                    />

                    <input
                      id="login-email"
                      name="email"
                      type="email"
                      autoComplete="username"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      placeholder="admin@treasureisland.com"
                      required
                      disabled={loading}
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-3 pr-4 pl-10 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-[#F87907] focus:ring-2 focus:ring-[#F87907]/20 disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="login-password"
                      className="block text-xs font-semibold tracking-wider text-slate-300 uppercase"
                    >
                      Password{" "}
                      <span className="text-[#F87907]">*</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-xs text-[#F87907] transition-colors hover:text-[#fb923c]"
                    >
                      Forgot?
                    </button>
                  </div>

                  <div className="relative flex items-center">
                    <Lock
                      size={16}
                      className="pointer-events-none absolute left-3.5 text-slate-400"
                    />

                    <input
                      id="login-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder="••••••••"
                      required
                      disabled={loading}
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-3 pr-11 pl-10 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-[#F87907] focus:ring-2 focus:ring-[#F87907]/20 disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((value) => !value)
                      }
                      className="absolute right-3.5 text-slate-400 transition-colors hover:text-white"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me and demo fill */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) =>
                        setRememberMe(event.target.checked)
                      }
                      className="h-4 w-4 cursor-pointer rounded border-slate-700 bg-slate-900 text-[#F87907] focus:ring-[#F87907] focus:ring-offset-0"
                    />
                    <span>Remember this device</span>
                  </label>

                  <button
                    type="button"
                    onClick={handleQuickDemoFill}
                    disabled={loading}
                    className="cursor-pointer text-[11px] font-semibold text-amber-300/90 underline hover:text-amber-200 disabled:opacity-50"
                    title="Fill test credentials"
                  >
                    Use Demo Access
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-5 flex w-full transform cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F9770B] via-[#F86E00] to-[#EA580C] px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_8px_25px_rgba(249,119,11,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:from-[#EA580C] hover:to-[#F9770B] hover:shadow-[0_12px_32px_rgba(249,119,11,0.5)] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      <span>Signing in...</span>
                    </>
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

          {/* Footer */}
          <div className="mt-8 flex items-center justify-center gap-4 border-t border-white/10 pt-6 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Secure Connection</span>
            </span>

            <span className="h-1 w-1 rounded-full bg-slate-600" />

            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-[#F87907]" />
              <span>RERA Authorized</span>
            </span>
          </div>
        </div>
      </div>

      {/* Forgot password modal */}
      {showForgotModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setShowForgotModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="forgot-password-title"
            className="relative w-full max-w-sm rounded-2xl border border-slate-700/80 bg-slate-900 p-6 text-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F87907]/20 text-[#F87907]">
              <HelpCircle size={20} />
            </div>

            <h4
              id="forgot-password-title"
              className="mb-2 font-serif text-base font-bold text-white"
            >
              Password Reset Assistance
            </h4>

            <p className="mb-4 text-xs leading-relaxed text-slate-300">
              For administrative password resets, please contact
              the system administrator.
            </p>

            <div className="space-y-2 rounded-xl border border-white/10 bg-slate-950/70 p-3 text-xs">
              <div className="text-slate-400">
                Contact:{" "}
                <strong className="text-white">
                  +91 9348980948
                </strong>
              </div>

              <div className="text-slate-400">
                Email:{" "}
                <strong className="break-all text-white">
                  sujit.masterjack@gmail.com
                </strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="mt-4 w-full cursor-pointer rounded-xl bg-[#F87907] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#ea580c]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
