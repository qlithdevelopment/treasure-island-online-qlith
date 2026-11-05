import { Routes, Route } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import AdminProperties from "../pages/admin/AdminProperties";
import AdminContacts from "../pages/admin/AdminContacts";
import NotFound from "../pages/error/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="properties" element={<AdminProperties />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>
      </Route>

      <Route path="/*" element={<PublicRoutes />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
