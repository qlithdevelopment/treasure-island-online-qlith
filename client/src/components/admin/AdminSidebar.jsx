
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Globe } from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Website", path: "/", icon: Globe },
];

export default function AdminSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-bg-light bg-bg p-5 md:block">
      <div className="mb-8 text-2xl font-bold text-primary">
        Admin Panel
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-text-light hover:bg-bg-light hover:text-primary"
                }`
              }
            >
              <Icon size={19} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
