import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { villa1 as defaultFallbackImg } from "../../assets/properties";

export default function ImageLightbox({
  isOpen,
  onClose,
  images = [],
  currentIndex = 0,
  onPrev,
  onNext,
  title = "",
  label = "Photo",
  fallbackImage = defaultFallbackImg,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  const currentList = Array.isArray(images) && images.length > 0 ? images : [];
  const currentImgSrc = currentList[currentIndex] || currentList[0] || "";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full max-h-[92vh] flex flex-col items-center justify-center"
          >
            {currentList.length > 1 && (
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous image"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95 cursor-pointer z-20 border border-white/20"
              >
                <ChevronLeft size={26} />
              </button>
            )}

            {currentList.length > 1 && (
              <button
                type="button"
                onClick={onNext}
                aria-label="Next image"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95 cursor-pointer z-20 border border-white/20"
              >
                <ChevronRight size={26} />
              </button>
            )}

            {currentImgSrc ? (
              <img
                src={currentImgSrc}
                alt={title ? `${title} preview` : "Preview"}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackImage;
                }}
                className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
              />
            ) : null}

            <div className="flex items-center gap-3 mt-4 text-white text-xs sm:text-sm font-medium">
              {title && <span className="truncate max-w-xs sm:max-w-md">{title}</span>}
              {title && currentList.length > 0 && <span>•</span>}
              <span>{label} {currentIndex + 1} of {currentList.length}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="absolute top-2 right-2 sm:-top-3 sm:-right-3 w-10 h-10 rounded-full bg-white text-slate-900 font-bold flex items-center justify-center shadow-lg hover:bg-[#F87907] hover:text-white transition-colors cursor-pointer text-sm"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
