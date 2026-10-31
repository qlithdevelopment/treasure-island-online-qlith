
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/public/Home";
import AboutUs from "../pages/public/AboutUs";
import Properties from "../pages/public/Properties";
import PropertyDetails from "../pages/public/PropertyDetails";
import Contact from "../pages/public/Contact";
import Login from "../pages/public/Login";
import NotFound from "../pages/error/NotFound";

function GuestRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg text-text">
        Checking authentication...
      </div>
    );
  }

  return isAuthenticated
    ? <Navigate to="/admin" replace />
    : <Login />;
}

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<GuestRoute />} />

      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:slug" element={<PropertyDetails />} />
        <Route path="/property" element={<Properties />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
