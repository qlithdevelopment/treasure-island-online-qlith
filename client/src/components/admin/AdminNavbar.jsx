
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      navigate("/login", { replace: true });
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="flex items-center justify-between border-b border-bg-light bg-bg px-6 py-4">
      <h1 className="text-lg font-semibold text-text">
        Admin Dashboard
      </h1>

      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LogOut size={17} />
        {isLoggingOut ? "Logging out..." : "Logout"}
      </button>
    </header>
  );
}
