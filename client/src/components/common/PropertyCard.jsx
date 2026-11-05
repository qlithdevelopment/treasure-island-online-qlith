import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Share2,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import { apartment1 as defaultFallbackImg } from "../../assets/properties";

export default function PropertyCard({
  property,
  copiedId = null,
  onCopy = null,
  onShare = null,
  variants = null,
  className = "",
  fallbackImage = defaultFallbackImg,
  footer = null,
}) {
  const [internalCopied, setInternalCopied] = useState(false);

  if (!property) return null;

  const propId = property.id;
  const propSlug = property.slug || property.id;
  const isCopied = copiedId ? copiedId === propId : internalCopied;

  const handleCopyClick = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (onCopy) {
      onCopy(property);
      return;
    }
    const url = `${window.location.origin}/property/${propSlug}`;
    navigator.clipboard?.writeText(url);
    setInternalCopied(true);
    setTimeout(() => setInternalCopied(false), 2000);
  };

  const handleShareClick = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (onShare) {
      onShare(property);
      return;
    }
    const url = `${window.location.origin}/property/${propSlug}`;
    if (navigator.share) {
      navigator
        .share({
          title: property.title,
          text: `Check out ${property.title} on Treasure Island`,
          url,
        })
        .catch(() => {});
    } else {
      handleCopyClick(e);
    }
  };

  const displayPrice = (() => {
    if (
      property.price &&
      property.price !== "Price on Request" &&
      property.price !== "₹0"
    ) {
      return property.price;
    }
    let numPrice =
      Number(property.listing_price || property.priceValue) || 0;
    if (numPrice > 0 && numPrice < 1000) {
      numPrice = numPrice * 100000;
    }
    if (numPrice >= 10000000) return `₹${(numPrice / 10000000).toFixed(2)} Cr`;
    if (numPrice >= 100000) return `₹${(numPrice / 100000).toFixed(2)} Lacs`;
    if (numPrice > 0) return `₹${numPrice.toLocaleString("en-IN")}`;
    return property.price || "Price on Request";
  })();

  const beds =
    property.specs?.beds ||
    property.bedrooms ||
    (property.beds ? `${property.beds} BHK` : null);

  const baths =
    property.specs?.baths ||
    property.bathrooms ||
    (property.baths ? `${property.baths} Baths` : null);

  const area =
    property.specs?.area ||
    (property.property_area || property.sqft
      ? `${property.property_area || property.sqft} ${
          property.area_unit || "Sq. Ft."
        }`
      : null);

  const locationText =
    property.location || property.city || property.locality || "";

  const tagLabel =
    property.tag || property.type || property.property_type || "Apartment";

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:border-slate-300 transition-all duration-300 overflow-hidden ${className}`}
    >
      <div>
        <div className="relative w-full h-[195px] sm:h-[210px] overflow-hidden bg-slate-100">
          <Link to={`/property/${propSlug}`} className="block w-full h-full">
            <img
              src={property.image || property.cover_image}
              alt={property.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackImage;
              }}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </Link>

          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm ${
                property.tagType === "dark"
                  ? "bg-black/60 text-white border border-white/20"
                  : "bg-black/60 text-white border border-white/20"
              }`}
            >
              {tagLabel}
            </span>

            <div className="flex items-center gap-1.5 pointer-events-auto">
              <button
                type="button"
                onClick={handleCopyClick}
                className="w-7 h-7 rounded-full bg-white/95 hover:bg-white text-slate-700 hover:text-[#F87907] flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer border border-white/40"
                title="Copy direct property link"
                aria-label="Copy property link"
              >
                {isCopied ? (
                  <Check size={13} className="text-emerald-500" />
                ) : (
                  <Copy size={13} className="text-[#F87907]" />
                )}
              </button>

              <button
                type="button"
                onClick={handleShareClick}
                className="px-2.5 py-1 rounded-full bg-white/95 hover:bg-white text-slate-700 hover:text-[#F87907] text-xs font-medium flex items-center gap-1 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer border border-white/40"
                title="Share this property"
                aria-label="Share property"
              >
                <Share2 size={13} className="text-[#F87907]" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {property.isFeatured && (
            <div className="absolute bottom-2.5 left-3 pointer-events-none">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F87907] text-white shadow-sm flex items-center gap-1">
                <Sparkles size={11} />
                Featured
              </span>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2 mb-1.5 min-w-0">
            <h3
              className="text-base sm:text-[17px] font-bold text-[#0F172A] tracking-tight leading-snug group-hover:text-[#F87907] transition-colors truncate min-w-0 flex-1"
              title={property.title}
            >
              <Link to={`/property/${propSlug}`} className="block truncate">
                {property.title}
              </Link>
            </h3>
          </div>

          {property.short_description && (
            <p className="text-xs text-slate-400 font-medium line-clamp-1 mb-2">
              {property.short_description}
            </p>
          )}

          <div className="mb-3">
            <div className="flex items-center justify-between">
              <span className="block text-xs text-slate-500 font-normal">
                {property.pricePrefix || property.price_type || "Starting Price"}
              </span>
              {property.is_negotiable && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  Negotiable
                </span>
              )}
            </div>
            <span className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight font-serif">
              {displayPrice}
            </span>
          </div>

          {(beds || baths || area) && (
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-slate-600 mb-3 pb-2.5 border-b border-slate-100">
              {beds && (
                <span className="flex items-center gap-1.5">
                  <Bed size={14} className="text-slate-400" />
                  <span>{beds}</span>
                </span>
              )}
              {baths && (
                <span className="flex items-center gap-1.5">
                  <Bath size={14} className="text-slate-400" />
                  <span>{baths}</span>
                </span>
              )}
              {area && (
                <span className="flex items-center gap-1.5">
                  <Maximize size={13} className="text-slate-400" />
                  <span>{area}</span>
                </span>
              )}
            </div>
          )}

          {locationText && (
            <div className="flex items-center justify-between text-xs text-slate-500 mb-3.5">
              <span className="flex items-center gap-1.5 truncate pr-2">
                <MapPin size={13} className="shrink-0 text-slate-400" />
                <span className="truncate">{locationText}</span>
              </span>
            </div>
          )}

          {property.badges && property.badges.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {property.badges.map((b, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200"
                >
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {footer}
    </motion.div>
  );
}
