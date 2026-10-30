
import { Routes, Route } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import NotFound from "../pages/error/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route element={<PrivateRoutes />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Route>

      {/* Public Routes */}
      <Route path="/*" element={<PublicRoutes />} />

      {/* Error Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
