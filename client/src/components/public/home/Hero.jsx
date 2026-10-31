import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";

import heroBg from "../../../assets/home/hero_bg_hd.jpg";

const villa1 = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80";
const villa2 = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80";
const villa3 = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80";
const villa4 = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";

const villas = [
  {
    id: 1,
    number: "01",
    name: "Ocean View Villa",
    rating: "4.9",
    reviews: "Reviews",
    image: villa1,
  },
  {
    id: 2,
    number: "02",
    name: "Ocears View Villa",
    rating: "4.9",
    reviews: "Reviews",
    image: villa2,
  },
  {
    id: 3,
    number: "03",
    name: "Hillside Manor",
    rating: "4.9",
    reviews: "Reviews",
    image: villa3,
  },
  {
    id: 4,
    number: "04",
    name: "Evieluse Semurur",
    rating: "4.9",
    reviews: "Reviews",
    image: villa4,
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const isProgrammaticScroll = useRef(false);
  const isFirstRender = useRef(true);
  const touchStartX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
  };

  const scrollToCard = (index, smooth = true) => {
    const container = carouselRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;

    isProgrammaticScroll.current = true;

    const cardLeft = card.offsetLeft;
    const cardRight = cardLeft + card.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const viewRight = scrollLeft + container.clientWidth;

    if (cardLeft < scrollLeft) {
      container.scrollTo({ left: cardLeft, behavior: smooth ? "smooth" : "auto" });
    } else if (cardRight > viewRight) {
      container.scrollTo({
        left: cardRight - container.clientWidth,
        behavior: smooth ? "smooth" : "auto",
      });
    }

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 450);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? villas.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === villas.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const smooth = !isFirstRender.current;
    isFirstRender.current = false;
    scrollToCard(activeIndex, smooth);
  }, [activeIndex]);

  useEffect(() => {
    const handleResize = () => {
      scrollToCard(activeIndex, false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between select-none">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transform scale-100 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 42% 0%, rgba(255, 235, 175, 0.32) 0%, rgba(255, 205, 120, 0.15) 45%, transparent 75%)",
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(10, 18, 12, 0.65) 0%, rgba(10, 18, 12, 0.35) 40%, rgba(10, 18, 12, 0.05) 75%, transparent 100%)",
          }}
        />

        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(9, 16, 10, 0.6) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-10 pt-32 sm:pt-36 lg:pt-40 pb-12 flex-1 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-[13px] font-medium tracking-[0.24em] text-stone-300 uppercase mb-3 sm:mb-4">
              Welcome to Treasure Island
            </p>

            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] leading-[1.04] tracking-tight mb-4 sm:mb-5 font-serif"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              <span className="block text-white font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                Contemporary
              </span>
              <span
                className="block font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
                style={{ color: "#F4C48D" }}
              >
                Borderless
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-[1.15rem] leading-relaxed text-stone-200/95 font-light max-w-xl mb-7 sm:mb-9 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
              Experience elegance and modern luxury in every detail.
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <Link
                to="/properties"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#F9770B] via-[#F86E00] to-[#EA580C] px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-white shadow-[0_10px_25px_rgba(249,119,11,0.38)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_14px_30px_rgba(249,119,11,0.55)] active:scale-[0.98]"
              >
                <span>Explore Now</span>
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <button
                type="button"
                className="group inline-flex items-center gap-2.5 rounded-full bg-black/30 backdrop-blur-md border border-white/25 px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-white shadow-lg transition-all duration-300 hover:bg-white/10 hover:border-white/40 active:scale-[0.98]"
              >
                <Play
                  size={16}
                  className="fill-white/30 text-white transition-transform duration-300 group-hover:scale-110"
                />
                <span>Watch Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 w-full px-4 sm:px-8 lg:px-10 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-5 lg:gap-8">
            <div className="shrink-0 self-center lg:self-end pb-2 lg:pb-3">
              <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-white/30">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 active:scale-90 transition-all duration-200 cursor-pointer"
                  aria-label="Previous property"
                >
                  <ChevronLeft size={20} strokeWidth={2.4} className="-translate-x-0.5" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white bg-gradient-to-b from-stone-800/95 via-stone-900/95 to-black border border-[#E5A96E]/50 shadow-[0_0_18px_rgba(229,169,110,0.3)] hover:border-[#E5A96E] hover:shadow-[0_0_26px_rgba(229,169,110,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                  aria-label="Next property"
                >
                  <ChevronRight size={20} strokeWidth={2.4} className="translate-x-0.5" />
                </button>
              </div>
            </div>

            <div
              className="lg:hidden w-full flex flex-col items-center"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="w-full max-w-[320px] sm:max-w-[360px] rounded-2xl overflow-hidden border-2 border-[#E5A96E] shadow-[0_0_25px_rgba(229,169,110,0.35)] transition-all duration-300">
                <div className="relative w-full h-[140px] sm:h-[160px] overflow-hidden bg-stone-900">
                  <img
                    src={villas[activeIndex].image}
                    alt={villas[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="bg-black/85 backdrop-blur-md px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-medium text-white tracking-wide truncate pr-2">
                    {villas[activeIndex].number}. {villas[activeIndex].name}
                  </span>
                  <span className="flex items-center gap-1 text-white/90 shrink-0 font-medium">
                    <span className="text-[#FBBF24]">★</span>
                    <span>
                      {villas[activeIndex].rating} {villas[activeIndex].reviews}
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 mt-3">
                {villas.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === idx
                        ? "w-5 bg-[#E5A96E]"
                        : "w-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <div
              ref={carouselRef}
              className="hidden lg:flex items-end gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth w-full pb-1"
            >
              {villas.map((villa, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <div
                    key={villa.id}
                    ref={(el) => (cardRefs.current[idx] = el)}
                    onClick={() => setActiveIndex(idx)}
                    className={`group relative shrink-0 cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
                      isActive
                        ? "w-[320px] border-2 border-[#E5A96E] shadow-[0_0_25px_rgba(229,169,110,0.35)] scale-100 z-10"
                        : "w-[270px] border border-white/15 bg-black/35 backdrop-blur-sm opacity-90 hover:opacity-100 hover:border-white/30"
                    }`}
                  >
                    <div
                      className={`relative w-full overflow-hidden bg-stone-900 ${
                        isActive ? "h-[140px]" : "h-[125px]"
                      }`}
                    >
                      <img
                        src={villa.image}
                        alt={villa.name}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <div className="bg-black/85 backdrop-blur-md px-3.5 py-2.5 flex items-center justify-between text-xs">
                      <span className="font-medium text-white tracking-wide truncate pr-2">
                        {villa.number}. {villa.name}
                      </span>
                      <span className="flex items-center gap-1 text-white/90 shrink-0 font-medium">
                        <span className="text-[#FBBF24] text-[13px]">★</span>
                        <span>
                          {villa.rating} {villa.reviews}
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
