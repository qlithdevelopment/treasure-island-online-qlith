import Hero from "../../components/public/home/Hero";
import WhyChoose from "../../components/public/home/WhyChoose";
import FeaturedProperties from "../../components/public/home/FeaturedProperties";
import PropertyCategories from "../../components/public/home/PropertyCategories";
import OurGallery from "../../components/public/home/OurGallery";
import PrimeLocations from "../../components/public/home/PrimeLocations";
import AssociatedWith from "../../components/public/home/AssociatedWith";

export default function Home() {
  return (
    <div className="bg-[#0b130c] text-white">
      <Hero />
      <WhyChoose />
      <FeaturedProperties />
      <PropertyCategories />
      <OurGallery />
      <PrimeLocations />
      <AssociatedWith />
    </div>
  );
}
