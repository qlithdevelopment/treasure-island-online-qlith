import { Link, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Building2, MessageSquare, Globe, LogOut, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logoIcon from "../../assets/home/logo_icon_transparent.png";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Properties", path: "/admin/properties", icon: Building2 },
  { name: "Contact Inquiries", path: "/admin/contacts", icon: MessageSquare },
  { name: "View Website", path: "/", icon: Globe },
];

export default function AdminSidebar({ isOpen, onClose, onLogout }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

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

  const navContent = (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-2.5 group cursor-pointer"
            title="Go to Home Page"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50/80 p-1.5 border border-orange-200/90 group-hover:border-[#F87907] transition-all shadow-xs group-hover:scale-105">
              <img
                src={logoIcon}
                alt="Treasure Island Logo"
                className="h-full w-full object-contain filter drop-shadow-xs"
              />
            </div>
            <div>
              <div className="text-base font-bold text-slate-900 leading-tight group-hover:text-[#F87907] transition-colors">
                Treasure Island
              </div>
              <div className="text-[11px] font-medium text-slate-400">
                Admin Management
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/admin"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#F87907] text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#F87907]"
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-200 mt-auto">
        <button
          type="button"
          onClick={() => {
            if (onClose) onClose();
            handleLogout();
          }}
          className="w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all cursor-pointer group"
          title="Sign out of Admin Dashboard"
        >
          <LogOut size={18} className="text-rose-500 group-hover:text-rose-700 transition-colors" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:block fixed top-0 left-0 bottom-0 w-64 h-screen z-30 border-r border-slate-200 bg-white p-5 overflow-y-auto">
        {navContent}
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <aside className="fixed top-0 left-0 bottom-0 w-72 max-w-[85vw] h-screen z-50 bg-white p-5 shadow-2xl overflow-y-auto">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
