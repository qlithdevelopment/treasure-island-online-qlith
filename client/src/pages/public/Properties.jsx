
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

const properties = [
  {
    id: 1,
    name: "Modern Family Home",
    location: "Bhubaneswar, Odisha",
    price: "₹45,00,000",
    type: "Residential",
  },
  {
    id: 2,
    name: "Premium Apartment",
    location: "Patia, Bhubaneswar",
    price: "₹65,00,000",
    type: "Apartment",
  },
  {
    id: 3,
    name: "Commercial Space",
    location: "Rasulgarh, Bhubaneswar",
    price: "₹85,00,000",
    type: "Commercial",
  },
];

export default function Properties() {
  return (
    <section className="bg-bg-light px-4 sm:px-8 lg:px-10 py-20">
      <div className="mx-auto max-w-7xl w-full">
        <div className="mb-10">
          <p className="font-semibold text-secondary">Our Listings</p>

          <h1 className="mt-2 text-4xl font-bold text-text">
            Explore Properties
          </h1>

          <p className="mt-3 text-text-light">
            Find a property that matches your needs and budget.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <article
              key={property.id}
              className="rounded-2xl border border-bg-light bg-bg p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="inline-block rounded-full bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary">
                {property.type}
              </span>

              <h2 className="mt-4 text-xl font-semibold text-text">
                {property.name}
              </h2>

              <p className="mt-3 flex items-center gap-2 text-sm text-text-light">
                <MapPin size={17} className="text-secondary" />
                {property.location}
              </p>

              <p className="mt-5 text-2xl font-bold text-primary">
                {property.price}
              </p>

              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-secondary hover:text-primary"
              >
                Enquire Now <ArrowRight size={18} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
