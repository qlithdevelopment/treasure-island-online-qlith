import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";

import Home from "../pages/public/Home";
import AboutUs from "../pages/public/AboutUs";
import Properties from "../pages/public/Properties";
import PropertyDetails from "../pages/public/PropertyDetails";
import Contact from "../pages/public/Contact";
import Login from "../pages/public/Login";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:slug" element={<PropertyDetails />} />
        <Route path="/property" element={<Properties />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
