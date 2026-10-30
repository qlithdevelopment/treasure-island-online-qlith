
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-bg-light">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="text-xl font-bold text-primary">
          BrandName
        </Link>

        <p className="text-sm text-text-light">
          © {new Date().getFullYear()} BrandName. All rights reserved.
        </p>

        <div className="flex gap-5 text-sm">
          <Link to="/aboutus" className="text-text-light hover:text-secondary">
            About Us
          </Link>

          <Link to="/properties" className="text-text-light hover:text-secondary">
            Properties
          </Link>

          <Link to="/contact" className="text-text-light hover:text-secondary">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
