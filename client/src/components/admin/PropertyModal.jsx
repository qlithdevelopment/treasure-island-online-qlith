import {
  X,
  Pencil,
  Building2,
  Upload,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Plus,
  IndianRupee,
  MapPin,
  Sparkles,
  FileText,
} from "lucide-react";
import { villa1 } from "../../assets/properties";

export default function PropertyModal({
  isOpen,
  modalMode = "add",
  modalTab = "basic",
  setModalTab,
  modalTabs,
  stepKeys,
  currentStepIndex,
  isFirstStep,
  isLastStep,
  formData,
  setFormData,
  formErrors = {},
  handleInputChange,
  handleCoverFileUpload,
  handleGalleryFilesUpload,
  handleRemoveGalleryImage,
  handleFloorPlanFilesUpload,
  handleRemoveFloorPlanImage,
  handleAmenitiesFilesUpload,
  handleRemoveAmenitiesImage,
  handleBrochureUpload,
  handleRemoveBrochure,
  handleAddNearbyPlace,
  handleRemoveNearbyPlace,
  handleNearbyPlaceChange,
  handleCloseModal,
  handleNextStep,
  handlePrevStep,
  handleSubmitProperty,
  isSubmitting = false,
}) {
  if (!isOpen || !formData) return null;

  const tabs = modalTabs || [
    { id: "basic", label: "Basic & Pricing", icon: IndianRupee },
    { id: "specs", label: "Specs & Location", icon: MapPin },
    { id: "media", label: "Media & Building", icon: Building2 },
    { id: "amenities", label: "Amenities", icon: Sparkles },
  ];

  const steps = stepKeys || ["basic", "specs", "media", "amenities"];
  const stepIdx =
    typeof currentStepIndex === "number"
      ? currentStepIndex
      : Math.max(0, steps.indexOf(modalTab));
  const firstStep = typeof isFirstStep === "boolean" ? isFirstStep : stepIdx === 0;
  const lastStep =
    typeof isLastStep === "boolean" ? isLastStep : stepIdx === steps.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-4"
      onClick={handleCloseModal}
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl border border-slate-200 h-[92vh] max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 px-6 pt-5 pb-3 border-b border-slate-100 bg-white">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100 text-[#F87907] shrink-0">
                {modalMode === "edit" ? <Pencil size={20} /> : <Building2 size={20} />}
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {modalMode === "edit" ? "Edit Property Listing" : "Add New Property Listing"}
                </h2>
                <p className="text-xs text-slate-500">
                  {modalMode === "edit"
                    ? "Update specifications, pricing, location, media, and features."
                    : "Enter specifications, pricing, location, media, and building details."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCloseModal}
              className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F87907] text-white text-[11px] font-bold shadow-xs">
                {stepIdx + 1}
              </span>
              <span className="text-xs font-bold text-slate-800">
                Step {stepIdx + 1} of 4: {tabs[stepIdx]?.label}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {steps.map((step, idx) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => setModalTab(step)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === stepIdx
                      ? "w-7 bg-[#F87907]"
                      : idx < stepIdx
                      ? "w-3.5 bg-emerald-500"
                      : "w-3.5 bg-slate-200"
                  }`}
                  title={`Go to Step ${idx + 1}: ${tabs[idx]?.label}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = modalTab === tab.id;
              const tabHasError =
                (tab.id === "basic" &&
                  Boolean(formErrors.title || formErrors.listing_price)) ||
                (tab.id === "specs" &&
                  Boolean(
                    formErrors.property_area ||
                      formErrors.locality ||
                      formErrors.pin_code ||
                      formErrors.full_address
                  )) ||
                (tab.id === "media" &&
                  Boolean(
                    formErrors.cover_image ||
                      formErrors.gallery_images ||
                      formErrors.video_url ||
                      formErrors.virtual_tour_url
                  ));
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setModalTab(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[#F87907] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Icon size={13} />
                  <span>{tab.label}</span>
                  {tabHasError && (
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <form
            onSubmit={(e) => e.preventDefault()}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
                e.preventDefault();
              }
            }}
            noValidate
            className="space-y-6"
          >
            {modalTab === "basic" && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#F87907] mb-3">
                    Basic Information & Status
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Property Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g. Royal Palm Luxury Villas & Penthouse"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-hidden font-medium transition-all ${
                          formErrors.title
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                            : "border-slate-200 focus:border-[#F87907] focus:ring-2 focus:ring-[#F87907]/20"
                        }`}
                      />
                      {formErrors.title && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {formErrors.title}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Property Type *
                      </label>
                      <select
                        name="property_type"
                        value={formData.property_type}
                        onChange={handleInputChange}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:border-[#F87907] outline-hidden font-medium bg-white transition-all ${
                          formErrors.property_type
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                            : "border-slate-200"
                        }`}
                      >
                        <option value="" disabled hidden>Select Property Type</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Land">Land</option>
                        <option value="House">House</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Duplex">Duplex</option>
                      </select>
                      {formErrors.property_type && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {formErrors.property_type}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Listing Type *
                      </label>
                      <select
                        name="listing_type"
                        value={formData.listing_type}
                        onChange={handleInputChange}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:border-[#F87907] outline-hidden font-medium bg-white transition-all ${
                          formErrors.listing_type
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                            : "border-slate-200"
                        }`}
                      >
                        <option value="" disabled hidden>Select Listing Type</option>
                        <option value="For Sale">For Sale</option>
                        <option value="For Rent">For Rent</option>
                        <option value="For Lease">For Lease</option>
                      </select>
                      {formErrors.listing_type && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {formErrors.listing_type}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:border-[#F87907] outline-hidden font-medium bg-white transition-all ${
                          formErrors.category
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                            : "border-slate-200"
                        }`}
                      >
                        <option value="" disabled hidden>Select Category</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Land">Land</option>
                      </select>
                      {formErrors.category && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {formErrors.category}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Listing Status *
                      </label>
                      <select
                        name="listing_status"
                        value={formData.listing_status}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#F87907] outline-hidden font-medium bg-white"
                      >
                        <option value="" disabled hidden>Select Listing Status</option>
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                        <option value="Sold">Sold</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Short Description
                      </label>
                      <input
                        type="text"
                        name="short_description"
                        value={formData.short_description}
                        onChange={handleInputChange}
                        placeholder="Brief one-line summary highlight"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#F87907] outline-hidden font-medium"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Description
                      </label>
                      <textarea
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Detailed overview about architecture, views, neighbourhood, and luxury features..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#F87907] outline-hidden font-medium resize-none"
                      />
                    </div>

                    <div className="sm:col-span-2 flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="modal_is_featured"
                        name="is_featured"
                        checked={formData.is_featured}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-slate-300 text-[#F87907] focus:ring-[#F87907] cursor-pointer"
                      />
                      <label htmlFor="modal_is_featured" className="text-xs font-bold text-slate-700 cursor-pointer">
                        Mark as Featured Property (Promoted in top banners)
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#F87907] mb-3">
                    Pricing Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Listing Price (in ₹) *
                      </label>
                      <input
                        type="number"
                        name="listing_price"
                        min="0"
                        value={formData.listing_price}
                        onChange={handleInputChange}
                        placeholder="e.g. 7500000"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-hidden font-medium transition-all ${
                          formErrors.listing_price
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                            : "border-slate-200 focus:border-[#F87907]"
                        }`}
                      />
                      {formErrors.listing_price && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {formErrors.listing_price}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Price Type *
                      </label>
                      <select
                        name="price_type"
                        value={formData.price_type}
                        onChange={handleInputChange}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:border-[#F87907] outline-hidden font-medium bg-white transition-all ${
                          formErrors.price_type
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                            : "border-slate-200"
                        }`}
                      >
                        <option value="" disabled hidden>Select Price Type</option>
                        <option value="Total Price">Total Price</option>
                        <option value="Per Sq. Ft.">Per Sq. Ft.</option>
                      </select>
                      {formErrors.price_type && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {formErrors.price_type}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Maintenance Charges (₹/month)
                      </label>
                      <input
                        type="number"
                        name="maintenance_charges"
                        min="0"
                        value={formData.maintenance_charges}
                        onChange={handleInputChange}
                        placeholder="e.g. 4500"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#F87907] outline-hidden font-medium"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-6">
                      <input
                        type="checkbox"
                        id="modal_is_negotiable"
                        name="is_negotiable"
                        checked={formData.is_negotiable}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-slate-300 text-[#F87907] focus:ring-[#F87907] cursor-pointer"
                      />
                      <label htmlFor="modal_is_negotiable" className="text-xs font-bold text-slate-700 cursor-pointer">
                        Price is Negotiable
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {modalTab === "specs" && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#F87907] mb-3">
                    Property Specifications
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Property Area *
                      </label>
                      <input
                        type="number"
                        name="property_area"
                        min="0"
                        value={formData.property_area}
                        onChange={handleInputChange}
                        placeholder="e.g. 1850"
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-medium outline-hidden transition-all ${
                          formErrors.property_area
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                            : "border-slate-200 focus:border-[#F87907]"
                        }`}
                      />
                      {formErrors.property_area && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {formErrors.property_area}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Area Unit *
                      </label>
                      <select
                        name="area_unit"
                        value={formData.area_unit}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden bg-white"
                      >
                        <option value="Sq. Ft.">Sq. Ft.</option>
                        <option value="Sq. M.">Sq. M.</option>
                        <option value="Acre">Acre</option>
                        <option value="Decimal">Decimal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Bedrooms
                      </label>
                      <input
                        type="text"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        placeholder="e.g. 3 BHK"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Bathrooms
                      </label>
                      <input
                        type="text"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        placeholder="e.g. 3"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Balconies
                      </label>
                      <input
                        type="text"
                        name="balconies"
                        value={formData.balconies}
                        onChange={handleInputChange}
                        placeholder="e.g. 2"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Floor Number
                      </label>
                      <input
                        type="number"
                        name="floor_number"
                        min="0"
                        value={formData.floor_number}
                        onChange={handleInputChange}
                        placeholder="e.g. 1"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Total Floors
                      </label>
                      <input
                        type="number"
                        name="total_floors"
                        min="0"
                        value={formData.total_floors}
                        onChange={handleInputChange}
                        placeholder="e.g. 10"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Furnishing Status
                      </label>
                      <select
                        name="furnishing_status"
                        value={formData.furnishing_status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden bg-white"
                      >
                        <option value="" disabled hidden>Select Furnishing Status</option>
                        <option value="Furnished">Furnished</option>
                        <option value="Semi-Furnished">Semi-Furnished</option>
                        <option value="Unfurnished">Unfurnished</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Possession Status *
                      </label>
                      <select
                        name="possession_status"
                        value={formData.possession_status}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-medium focus:border-[#F87907] outline-hidden bg-white transition-all ${
                          formErrors.possession_status
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                            : "border-slate-200"
                        }`}
                      >
                        <option value="" disabled hidden>Select Possession Status</option>
                        <option value="Ready to Move">Ready to Move</option>
                        <option value="Under Construction">Under Construction</option>
                      </select>
                      {formErrors.possession_status && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {formErrors.possession_status}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Property Age
                      </label>
                      <select
                        name="property_age"
                        value={formData.property_age || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden bg-white"
                      >
                        <option value="">Select Property Age</option>
                        <option value="New">New</option>
                        <option value="0–5 Years">0–5 Years</option>
                        <option value="5–10 Years">5–10 Years</option>
                        <option value="10+ Years">10+ Years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Facing Direction (Vastu)
                      </label>
                      <select
                        name="facing_direction"
                        value={formData.facing_direction || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden bg-white"
                      >
                        <option value="">Select Facing Direction</option>
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                        <option value="North-East">North-East</option>
                        <option value="North-West">North-West</option>
                        <option value="South-East">South-East</option>
                        <option value="South-West">South-West</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#F87907] mb-3">
                    Location Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g. Bhubaneswar"
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-medium outline-hidden transition-all ${
                          formErrors.city
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                            : "border-slate-200 focus:border-[#F87907]"
                        }`}
                      />
                      {formErrors.city && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {formErrors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="e.g. Odisha"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="e.g. India"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Locality / Area *
                      </label>
                      <input
                        type="text"
                        name="locality"
                        value={formData.locality}
                        onChange={handleInputChange}
                        placeholder="e.g. Patia"
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-medium outline-hidden transition-all ${
                          formErrors.locality
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                            : "border-slate-200 focus:border-[#F87907]"
                        }`}
                      />
                      {formErrors.locality && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {formErrors.locality}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Pin Code *
                      </label>
                      <input
                        type="text"
                        name="pin_code"
                        value={formData.pin_code}
                        onChange={handleInputChange}
                        placeholder="e.g. 751024"
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-medium outline-hidden transition-all ${
                          formErrors.pin_code
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                            : "border-slate-200 focus:border-[#F87907]"
                        }`}
                      />
                      {formErrors.pin_code && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {formErrors.pin_code}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Address *
                      </label>
                      <input
                        type="text"
                        name="full_address"
                        value={formData.full_address}
                        onChange={handleInputChange}
                        placeholder="Plot number, Street, Landmark, City"
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-medium outline-hidden transition-all ${
                          formErrors.full_address
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                            : "border-slate-200 focus:border-[#F87907]"
                        }`}
                      />
                      {formErrors.full_address && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {formErrors.full_address}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Landmark
                      </label>
                      <input
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        placeholder="e.g. Near KIIT University"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Latitude
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleInputChange}
                        placeholder="e.g. 20.2961"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Longitude
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleInputChange}
                        placeholder="e.g. 85.8245"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden"
                      />
                    </div>

                    <div className="col-span-1 sm:col-span-3">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Google Maps Location URL
                      </label>
                      <input
                        type="url"
                        name="google_maps_url"
                        value={formData.google_maps_url || ""}
                        onChange={handleInputChange}
                        placeholder="e.g. https://maps.google.com/?q=20.2961,85.8245"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#F87907]">
                          Nearby Landmarks & Connectivity
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Add schools, hospitals, transit, and markets around the property
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddNearbyPlace}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F87907] border border-orange-200 text-xs font-bold cursor-pointer transition-colors shadow-2xs"
                      >
                        <Plus size={13} />
                        <span>Add Landmark</span>
                      </button>
                    </div>

                    {Array.isArray(formData.nearby_places) && formData.nearby_places.length > 0 ? (
                      <div className="space-y-2.5">
                        {formData.nearby_places.map((place, pIdx) => (
                          <div
                            key={pIdx}
                            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 rounded-2xl bg-slate-50 border border-slate-200"
                          >
                            <input
                              type="text"
                              value={place.place_name || ""}
                              onChange={(e) => handleNearbyPlaceChange(pIdx, "place_name", e.target.value)}
                              placeholder="Place name (e.g. AIIMS Hospital)"
                              className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#F87907] outline-hidden bg-white"
                            />
                            <select
                              value={place.place_category || "School"}
                              onChange={(e) => handleNearbyPlaceChange(pIdx, "place_category", e.target.value)}
                              className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#F87907] outline-hidden bg-white sm:w-36"
                            >
                              <option value="School">School</option>
                              <option value="College">College</option>
                              <option value="Hospital">Hospital</option>
                              <option value="Shopping Mall">Shopping Mall</option>
                              <option value="Railway Station">Railway Station</option>
                              <option value="Airport">Airport</option>
                              <option value="Bus Stop">Bus Stop</option>
                              <option value="Market">Market</option>
                              <option value="Other">Other</option>
                            </select>
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                step="any"
                                min="0"
                                value={place.distance !== undefined ? place.distance : ""}
                                onChange={(e) => handleNearbyPlaceChange(pIdx, "distance", e.target.value)}
                                placeholder="Dist"
                                className="w-20 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#F87907] outline-hidden bg-white"
                              />
                              <select
                                value={place.distance_unit || "km"}
                                onChange={(e) => handleNearbyPlaceChange(pIdx, "distance_unit", e.target.value)}
                                className="px-2 py-1.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#F87907] outline-hidden bg-white"
                              >
                                <option value="km">km</option>
                                <option value="m">m</option>
                              </select>
                              <button
                                type="button"
                                onClick={() => handleRemoveNearbyPlace(pIdx)}
                                className="p-1.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Remove landmark"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-center">
                        <p className="text-xs text-slate-500">No nearby landmarks added yet</p>
                        <button
                          type="button"
                          onClick={handleAddNearbyPlace}
                          className="mt-1 text-xs font-bold text-[#F87907] hover:underline cursor-pointer"
                        >
                          + Click to add your first landmark
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {modalTab === "media" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#F87907] mb-3">
                    Media Showcase & Video
                  </h3>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Cover Image *
                      </label>

                      {formData.cover_image ? (
                        <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-50 group">
                          <img
                            src={formData.cover_image}
                            alt="Cover Preview"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = villa1;
                            }}
                            className="w-full h-48 sm:h-56 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <label
                              htmlFor="cover-file-input"
                              className="px-3.5 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-lg hover:bg-slate-100 cursor-pointer flex items-center gap-1.5"
                            >
                              <Upload size={13} />
                              <span>Change Image</span>
                            </label>
                            <button
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  cover_image: "",
                                  image: "",
                                }))
                              }
                              className="px-3.5 py-2 rounded-xl bg-red-600 text-white text-xs font-bold shadow-lg hover:bg-red-700 cursor-pointer flex items-center gap-1.5"
                            >
                              <Trash2 size={13} />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label
                          htmlFor="cover-file-input"
                          className={`flex flex-col items-center justify-center p-7 sm:p-9 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
                            formErrors.cover_image
                              ? "border-red-500 bg-red-50/20"
                              : "border-slate-300 hover:border-[#F87907] bg-slate-50/60 hover:bg-orange-50/20"
                          }`}
                        >
                          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#F87907] flex items-center justify-center mb-2">
                            <Upload size={22} />
                          </div>
                          <p className="text-xs font-bold text-slate-800">
                            Click to upload Cover Image
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            PNG, JPG, WEBP direct file upload
                          </p>
                        </label>
                      )}

                      <input
                        id="cover-file-input"
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleCoverFileUpload}
                        className="hidden"
                      />

                      {formErrors.cover_image && (
                        <p className="mt-1.5 text-xs font-semibold text-red-500">
                          {formErrors.cover_image}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <label className="block text-xs font-bold text-slate-700">
                            Additional Gallery Images *
                          </label>
                          <p className="text-[11px] text-slate-400">
                            Upload multiple photos to showcase different angles of the property
                          </p>
                        </div>
                        <label
                          htmlFor="gallery-files-input"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F87907] border border-orange-200 text-xs font-bold cursor-pointer transition-colors shadow-2xs"
                        >
                          <Upload size={13} />
                          <span>Upload Photos</span>
                        </label>
                        <input
                          id="gallery-files-input"
                          type="file"
                          multiple
                          accept="image/png, image/jpeg, image/webp"
                          onChange={handleGalleryFilesUpload}
                          className="hidden"
                        />
                      </div>

                      {Array.isArray(formData.gallery_images) &&
                      formData.gallery_images.length > 0 ? (
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 mt-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold text-slate-700">
                              {formData.gallery_images.length} gallery image
                              {formData.gallery_images.length > 1 ? "s" : ""} uploaded
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  gallery_images: [],
                                  images: [],
                                }))
                              }
                              className="text-[11px] font-semibold text-red-600 hover:underline cursor-pointer"
                            >
                              Clear all
                            </button>
                          </div>
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                            {formData.gallery_images.map((img, idx) => (
                              <div
                                key={idx}
                                className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-200 shadow-2xs"
                              >
                                <img
                                  src={img}
                                  alt={`Gallery ${idx + 1}`}
                                  onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = villa1;
                                  }}
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveGalleryImage(idx)}
                                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/75 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                                  title="Remove image"
                                >
                                  <X size={11} />
                                </button>
                                <span className="absolute bottom-1 left-1 text-[9px] font-bold text-white bg-black/60 px-1 rounded">
                                  #{idx + 1}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <label
                          htmlFor="gallery-files-input"
                          className={`flex flex-col items-center justify-center p-6 rounded-2xl border border-dashed transition-colors cursor-pointer mt-2 text-center ${
                            formErrors.gallery_images
                              ? "border-red-400 bg-red-50/20 hover:bg-red-50/30"
                              : "border-slate-300 bg-slate-50 hover:bg-orange-50/10"
                          }`}
                        >
                          <Upload size={18} className="text-slate-400 mb-1" />
                          <p className="text-xs font-semibold text-slate-600">
                            No gallery images uploaded yet
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            Click here to choose multiple photos
                          </p>
                        </label>
                      )}

                      {formErrors.gallery_images && (
                        <p className="mt-1.5 text-xs font-semibold text-red-500">
                          {formErrors.gallery_images}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <label className="block text-xs font-bold text-slate-700">
                            Floor Plans (Optional)
                          </label>
                          <p className="text-[11px] text-slate-400">
                            Upload architectural layout diagrams and unit blueprints
                          </p>
                        </div>
                        <label
                          htmlFor="floorplan-files-input"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F87907] border border-orange-200 text-xs font-bold cursor-pointer transition-colors shadow-2xs"
                        >
                          <Upload size={13} />
                          <span>Upload Floor Plans</span>
                        </label>
                        <input
                          id="floorplan-files-input"
                          type="file"
                          multiple
                          accept="image/png, image/jpeg, image/webp"
                          onChange={handleFloorPlanFilesUpload}
                          className="hidden"
                        />
                      </div>

                      {Array.isArray(formData.floor_plan_images) &&
                      formData.floor_plan_images.length > 0 ? (
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 mt-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold text-slate-700">
                              {formData.floor_plan_images.length} floor plan
                              {formData.floor_plan_images.length > 1 ? "s" : ""} uploaded
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  floor_plan_images: [],
                                }))
                              }
                              className="text-[11px] font-semibold text-red-600 hover:underline cursor-pointer"
                            >
                              Clear all
                            </button>
                          </div>
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                            {formData.floor_plan_images.map((img, idx) => (
                              <div
                                key={idx}
                                className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-200 shadow-2xs"
                              >
                                <img
                                  src={img}
                                  alt={`Floor Plan ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFloorPlanImage(idx)}
                                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/75 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                                  title="Remove floor plan"
                                >
                                  <X size={11} />
                                </button>
                                <span className="absolute bottom-1 left-1 text-[9px] font-bold text-white bg-black/60 px-1 rounded">
                                  Plan #{idx + 1}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <label
                          htmlFor="floorplan-files-input"
                          className="flex flex-col items-center justify-center p-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 hover:bg-orange-50/10 transition-colors cursor-pointer mt-2 text-center"
                        >
                          <Upload size={16} className="text-slate-400 mb-1" />
                          <p className="text-xs font-semibold text-slate-600">
                            No floor plans uploaded
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            Click to upload 2D/3D layout diagrams
                          </p>
                        </label>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <label className="block text-xs font-bold text-slate-700">
                            Amenities & Clubhouse Photos (Optional)
                          </label>
                          <p className="text-[11px] text-slate-400">
                            Upload photos showcasing swimming pool, gym, garden, and facilities
                          </p>
                        </div>
                        <label
                          htmlFor="amenities-files-input"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F87907] border border-orange-200 text-xs font-bold cursor-pointer transition-colors shadow-2xs"
                        >
                          <Upload size={13} />
                          <span>Upload Facility Photos</span>
                        </label>
                        <input
                          id="amenities-files-input"
                          type="file"
                          multiple
                          accept="image/png, image/jpeg, image/webp"
                          onChange={handleAmenitiesFilesUpload}
                          className="hidden"
                        />
                      </div>

                      {Array.isArray(formData.amenities_images) &&
                      formData.amenities_images.length > 0 ? (
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 mt-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold text-slate-700">
                              {formData.amenities_images.length} facility photo
                              {formData.amenities_images.length > 1 ? "s" : ""} uploaded
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  amenities_images: [],
                                }))
                              }
                              className="text-[11px] font-semibold text-red-600 hover:underline cursor-pointer"
                            >
                              Clear all
                            </button>
                          </div>
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                            {formData.amenities_images.map((img, idx) => (
                              <div
                                key={idx}
                                className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-200 shadow-2xs"
                              >
                                <img
                                  src={img}
                                  alt={`Amenity ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveAmenitiesImage(idx)}
                                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/75 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                                  title="Remove photo"
                                >
                                  <X size={11} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <label
                          htmlFor="amenities-files-input"
                          className="flex flex-col items-center justify-center p-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 hover:bg-orange-50/10 transition-colors cursor-pointer mt-2 text-center"
                        >
                          <Upload size={16} className="text-slate-400 mb-1" />
                          <p className="text-xs font-semibold text-slate-600">
                            No amenity photos uploaded
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            Click to upload images of amenities
                          </p>
                        </label>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Official Project Brochure (PDF, Max 10MB)
                      </label>

                      {formData.brochure ? (
                        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                          <div className="flex items-center gap-2.5 truncate min-w-0">
                            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                              <FileText size={16} />
                            </div>
                            <span
                              className="text-xs font-bold text-slate-800 truncate"
                              title={formData.brochure_name || "Official_Brochure.pdf"}
                            >
                              {formData.brochure_name || "Official_Brochure.pdf"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {typeof formData.brochure === "string" && (
                              <a
                                href={formData.brochure}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded-lg text-xs font-bold text-[#F87907] hover:bg-orange-50 cursor-pointer"
                              >
                                View
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={handleRemoveBrochure}
                              className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"
                              title="Remove brochure"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label
                          htmlFor="brochure-file-input"
                          className="flex items-center justify-center gap-2 p-3.5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 hover:bg-orange-50/10 transition-colors cursor-pointer"
                        >
                          <FileText size={16} className="text-slate-400" />
                          <span className="text-xs font-bold text-slate-600">
                            Click to upload official PDF brochure
                          </span>
                        </label>
                      )}

                      <input
                        id="brochure-file-input"
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={handleBrochureUpload}
                        className="hidden"
                      />
                    </div>

                    <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Video Tour URL (YouTube, Vimeo, or MP4)
                        </label>
                        <input
                          type="text"
                          name="video_url"
                          value={formData.video_url}
                          onChange={handleInputChange}
                          placeholder="e.g. https://www.youtube.com/watch?v=..."
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium outline-hidden transition-all ${
                            formErrors.video_url
                              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                              : "border-slate-200 focus:border-[#F87907] focus:ring-2 focus:ring-[#F87907]/20"
                          }`}
                        />
                        {formErrors.video_url && (
                          <p className="mt-1.5 text-xs font-semibold text-red-500 flex items-center gap-1">
                            <AlertCircle size={13} className="shrink-0" />
                            <span>{formErrors.video_url}</span>
                          </p>
                        )}
                        {!formErrors.video_url && formData.video_url && (
                          <p className="mt-1.5 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 size={12} />
                            <span>Video recognized — will embed with full player on user side</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Virtual Tour 3D URL
                        </label>
                        <input
                          type="text"
                          name="virtual_tour_url"
                          value={formData.virtual_tour_url}
                          onChange={handleInputChange}
                          placeholder="e.g. https://my.matterport.com/show/?m=..."
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium outline-hidden transition-all ${
                            formErrors.virtual_tour_url
                              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                              : "border-slate-200 focus:border-[#F87907] focus:ring-2 focus:ring-[#F87907]/20"
                          }`}
                        />
                        {formErrors.virtual_tour_url && (
                          <p className="mt-1.5 text-xs font-semibold text-red-500 flex items-center gap-1">
                            <AlertCircle size={13} className="shrink-0" />
                            <span>{formErrors.virtual_tour_url}</span>
                          </p>
                        )}
                        {!formErrors.virtual_tour_url && formData.virtual_tour_url && (
                          <p className="mt-1.5 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 size={12} />
                            <span>3D Walkthrough linked</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#F87907] mb-3">
                        Builder & Development Details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Project Name
                          </label>
                          <input
                            type="text"
                            name="project_name"
                            value={formData.project_name}
                            onChange={handleInputChange}
                            placeholder="e.g. Sai Krishna Residency"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Builder / Developer Name
                          </label>
                          <input
                            type="text"
                            name="builder_name"
                            value={formData.builder_name}
                            onChange={handleInputChange}
                            placeholder="e.g. Treasure Island Developers"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Construction Status
                          </label>
                          <select
                            name="construction_status"
                            value={formData.construction_status}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden bg-white"
                          >
                            <option value="" disabled hidden>Select Construction Status</option>
                            <option value="Ready to Move">Ready to Move</option>
                            <option value="Under Construction">Under Construction</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Year of Completion
                          </label>
                          <input
                            type="number"
                            name="year_of_completion"
                            min="1950"
                            max="2100"
                            value={formData.year_of_completion}
                            onChange={handleInputChange}
                            placeholder="e.g. 2024"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            RERA Registration Number
                          </label>
                          <input
                            type="text"
                            name="rera_number"
                            value={formData.rera_number}
                            onChange={handleInputChange}
                            placeholder="e.g. RP/19/2024/00452"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Parking Availability
                          </label>
                          <select
                            name="parking_availability"
                            value={formData.parking_availability}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden bg-white"
                          >
                            <option value="" disabled hidden>Select Parking Availability</option>
                            <option value="Available">Available</option>
                            <option value="Not Available">Not Available</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Total Units in Project
                          </label>
                          <input
                            type="number"
                            name="total_units"
                            min="0"
                            value={formData.total_units !== undefined ? formData.total_units : ""}
                            onChange={handleInputChange}
                            placeholder="e.g. 120"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Available Units
                          </label>
                          <input
                            type="number"
                            name="available_units"
                            min="0"
                            value={formData.available_units !== undefined ? formData.available_units : ""}
                            onChange={handleInputChange}
                            placeholder="e.g. 18"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#F87907] outline-hidden"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {modalTab === "amenities" && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#F87907] mb-3">
                    Amenities & Facilities
                  </h3>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Amenities (comma-separated)
                  </label>
                  <textarea
                    name="amenities"
                    rows={4}
                    value={formData.amenities}
                    onChange={handleInputChange}
                    placeholder="e.g. Swimming Pool, Covered Parking, 24/7 Security, Gym, Power Backup, Clubhouse"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:border-[#F87907] outline-hidden resize-none"
                  />
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="shrink-0 px-6 py-4 border-t border-slate-100 bg-slate-50/90 backdrop-blur-xs flex items-center justify-between gap-3">
          <div>
            {!firstStep ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>← Previous</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {!lastStep ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#F87907] to-[#EA580C] hover:from-[#EA580C] hover:to-[#F87907] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Next: {tabs[stepIdx + 1]?.label}</span>
                <span>→</span>
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmitProperty}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#F87907] via-[#F9770B] to-[#EA580C] hover:from-[#EA580C] hover:to-[#F87907] text-white text-xs font-bold tracking-wide shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {modalMode === "edit" ? (
                  <>
                    <Pencil size={15} />
                    <span>
                      {isSubmitting
                        ? "Saving Changes..."
                        : "Save Changes"}
                    </span>
                  </>
                ) : (
                  <>
                    <Plus size={15} />
                    <span>
                      {isSubmitting
                        ? "Publishing..."
                        : "Publish Property"}
                    </span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
