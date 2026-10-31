import './App.css'
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/common/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <ScrollToTop />
      <AppRoutes />
    </AuthProvider>
    </BrowserRouter>
  );
}
