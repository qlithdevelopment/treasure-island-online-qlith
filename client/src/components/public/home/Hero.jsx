
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="flex min-h-[80vh] items-center bg-bg-light px-6 py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
            Welcome to Our Website
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-text sm:text-5xl lg:text-7xl">
            Find Your Perfect
            <span className="block text-primary">
              Property With Us
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-text-light sm:text-lg">
            Discover exceptional properties and find a place that feels like
            home. We make your property search simple and convenient.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              Explore Properties
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/contact"
              className="rounded-lg border border-secondary px-6 py-3 font-semibold text-secondary transition-colors hover:bg-secondary hover:text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
