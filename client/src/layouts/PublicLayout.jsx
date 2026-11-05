import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function PublicLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-bg text-text">
      {!isLoginPage && <Navbar />}

      <main>
        <Outlet />
      </main>

      {!isLoginPage && <Footer />}
    </div>
  );
}
