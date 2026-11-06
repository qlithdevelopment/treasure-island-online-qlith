import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";
import ConfirmModal from "../components/common/ConfirmModal";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleConfirmLogout = async () => {
    setShowLogoutConfirm(false);
    try {
      await logout();
    } finally {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen bg-bg-light text-text">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => setShowLogoutConfirm(true)}
      />

      <div className="flex min-w-0 flex-1 flex-col md:pl-64">
        <AdminNavbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onLogout={() => setShowLogoutConfirm(true)}
        />

        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>

      <ConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleConfirmLogout}
        title="Are you sure you want to log out?"
        message="You will need to enter your credentials again to access the admin panel."
        confirmText="Yes, Log Out"
        cancelText="Cancel"
        danger={true}
        icon={LogOut}
      />
    </div>
  );
}
