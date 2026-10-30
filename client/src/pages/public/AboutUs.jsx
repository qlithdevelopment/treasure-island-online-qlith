
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function AboutUs() {
  return (
    <section className="bg-bg px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
          About Us
        </span>

        <h1 className="mt-3 text-4xl font-bold text-text sm:text-5xl">
          Who We Are
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-text-light">
          We help people discover the right properties with a simple,
          transparent, and convenient experience. Our goal is to make
          every step of your property journey easier.
        </p>

        <div className="mt-10 rounded-2xl bg-bg-light p-8">
          <h2 className="text-2xl font-semibold text-text">
            Our Mission
          </h2>

          <p className="mt-3 leading-7 text-text-light">
            To provide reliable property information and help our customers
            make confident decisions.
          </p>

          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:text-secondary"
          >
            Get in Touch <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
