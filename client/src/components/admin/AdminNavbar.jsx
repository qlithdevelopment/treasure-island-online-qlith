
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex items-center justify-between border-b border-bg-light bg-bg px-6 py-4">
      <h1 className="text-lg font-semibold text-text">
        Admin Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        <LogOut size={17} />
        Logout
      </button>
    </header>
  );
}
