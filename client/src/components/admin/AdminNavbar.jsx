import { useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminNavbar({ onToggleSidebar, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const getPageTitle = () => {
    if (location.pathname.startsWith("/admin/properties")) {
      return "Properties Management";
    }
    if (location.pathname.startsWith("/admin/contacts")) {
      return "Contact Inquiries";
    }
    return "Admin Dashboard";
  };

  const handleLogout = async () => {
    if (onLogout) {
      onLogout();
      return;
    }
    try {
      await logout();
    } finally {
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="flex items-center justify-between border-b border-bg-light bg-bg px-4 sm:px-6 py-3.5 sm:py-4">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="md:hidden p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-base sm:text-lg font-semibold text-text truncate">
          {getPageTitle()}
        </h1>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-lg bg-primary px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white transition-opacity hover:opacity-90 cursor-pointer shrink-0"
      >
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </header>
  );
}
