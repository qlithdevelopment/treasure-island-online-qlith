import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useSearchParams } from "react-router-dom";
import {
  Building2,
  Search,
  ExternalLink,
  MapPin,
  Sparkles,
  Plus,
  Video,
  CheckCircle2,
  AlertCircle,
  Eye,
  Pencil,
  IndianRupee,
  Trash2,
} from "lucide-react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import Table from "../../components/common/Table";
import Pagination from "../../components/common/Pagination";
import ConfirmModal from "../../components/common/ConfirmModal";
import PropertyModal from "../../components/admin/PropertyModal";
import {
  getProperties,
  createProperty,
  patchProperty,
  deleteProperty,
} from "../../services/propertyService";
import { apartment1 } from "../../assets/properties";

function isValidVideoUrl(val) {
  if (!val || typeof val !== "string" || !val.trim()) return true;
  const trimmed = val.trim();
  let urlStr = trimmed;
  if (trimmed.includes("<iframe") && trimmed.includes("src=")) {
    const m = trimmed.match(/src=["']([^"']+)["']/);
    if (m && m[1]) urlStr = m[1].trim();
  }
  if (!/^https?:\/\//i.test(urlStr)) {
    urlStr = "https://" + urlStr;
  }
  try {
    const parsed = new URL(urlStr);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:")
      return false;
    if (!parsed.hostname || !parsed.hostname.includes(".")) return false;
    return true;
  } catch {
    return false;
  }
}

function isValidWebUrl(val) {
  if (!val || typeof val !== "string" || !val.trim()) return true;
  const trimmed = val.trim();
  let urlStr = trimmed;
  if (trimmed.includes("<iframe") && trimmed.includes("src=")) {
    const m = trimmed.match(/src=["']([^"']+)["']/);
    if (m && m[1]) urlStr = m[1].trim();
  }
  if (!/^https?:\/\//i.test(urlStr)) {
    urlStr = "https://" + urlStr;
  }
  try {
    const parsed = new URL(urlStr);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:")
      return false;
    if (!parsed.hostname || !parsed.hostname.includes(".")) return false;
    return true;
  } catch {
    return false;
  }
}

function normalizeUrl(val) {
  if (!val || typeof val !== "string" || !val.trim()) return "";
  const trimmed = val.trim();
  let urlStr = trimmed;
  if (trimmed.includes("<iframe") && trimmed.includes("src=")) {
    const m = trimmed.match(/src=["']([^"']+)["']/);
    if (m && m[1]) urlStr = m[1].trim();
  }
  if (!/^https?:\/\//i.test(urlStr)) {
    urlStr = "https://" + urlStr;
  }
  return urlStr;
}

const initialFormState = {
  title: "",
  property_type: "",
  listing_type: "",
  category: "",
  listing_status: "Published",
  is_featured: false,
  short_description: "",
  description: "",

  listing_price: "",
  price: "",
  price_type: "",
  is_negotiable: false,
  maintenance_charges: "",

  property_area: "",
  area_unit: "Sq. Ft.",
  bedrooms: "",
  bathrooms: "",
  balconies: "",
  floor_number: "",
  total_floors: "",
  furnishing_status: "",
  property_age: "",
  facing_direction: "",
  possession_status: "",

  country: "",
  state: "",
  city: "",
  locality: "",
  location: "",
  full_address: "",
  pin_code: "",
  landmark: "",
  google_maps_url: "",
  latitude: "",
  longitude: "",

  cover_image: "",
  image: "",
  gallery_images: [],
  images: [],
  floor_plan_images: [],
  amenities_images: [],
  video_url: "",
  videoUrl: "",
  virtual_tour_url: "",
  brochure: "",
  brochure_name: "",

  project_name: "",
  builder_name: "",
  construction_status: "",
  year_of_completion: "",
  total_units: "",
  available_units: "",
  parking_availability: "",
  rera_number: "",

  amenities: "",
  nearby_places: [],
};

export default function AdminProperties() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [modalTab, setModalTab] = useState("basic");
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const pageSize = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data: propertiesData = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["admin_properties", currentPage, selectedType, debouncedSearch],
    queryFn: () =>
      getProperties({
        page: currentPage,
        per_page: pageSize,
        property_type: selectedType,
        search: debouncedSearch,
      }),
    placeholderData: keepPreviousData,
  });

  const rawProperties = useMemo(() => {
    return Array.isArray(propertiesData) ? propertiesData : [];
  }, [propertiesData]);

  const filteredProperties = useMemo(() => {
    let list = rawProperties;
    if (selectedType && selectedType !== "All") {
      const targetType = selectedType.toLowerCase();
      list = list.filter((p) => {
        const pType = String(p.type || p.property_type || "").toLowerCase();
        const pCat = String(p.category || "").toLowerCase();
        return pType === targetType || pCat === targetType;
      });
    }
    return list;
  }, [rawProperties, selectedType]);

  const totalItems =
    typeof propertiesData?.total === "number"
      ? propertiesData.total
      : filteredProperties.length;
  const totalPages =
    typeof propertiesData?.last_page === "number"
      ? propertiesData.last_page
      : Math.max(1, Math.ceil(totalItems / pageSize));

  useEffect(() => {
    if (
      !isLoading &&
      !isFetching &&
      typeof propertiesData?.last_page === "number" &&
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [
    currentPage,
    totalPages,
    isLoading,
    isFetching,
    propertiesData?.last_page,
  ]);

  const paginatedProperties = filteredProperties;

  const handleOpenAddModal = () => {
    setModalMode("add");
    setEditingPropertyId(null);
    setFormData(initialFormState);
    setFormErrors({});
    setModalTab("basic");
    setShowPropertyModal(true);
  };

  const handleOpenEditModal = (prop) => {
    setModalMode("edit");
    setEditingPropertyId(prop.id);
    setFormErrors({});
    setModalTab("basic");

    const currentCover = prop.cover_image || prop.image || "";
    const rawGallery = (
      Array.isArray(prop.gallery_images) && prop.gallery_images.length > 0
        ? prop.gallery_images
        : Array.isArray(prop.images) && prop.images.length > 0
          ? prop.images
          : []
    ).filter(
      (img) => img && img !== currentCover && !img.includes("cover_synced"),
    );

    const rawPrice = prop.listing_price ?? prop.priceValue ?? "";
    let cleanPrice = rawPrice;
    if (typeof rawPrice === "number") {
      cleanPrice = String(rawPrice);
    }

    setFormData({
      id: prop.id,
      slug: prop.slug,
      title: prop.title || "",
      property_type: prop.property_type || prop.type || "Apartment",
      listing_type: prop.listing_type || "For Sale",
      category: prop.category || "Residential",
      listing_status: prop.listing_status || "Published",
      is_featured: Boolean(prop.is_featured || prop.isFeatured),
      short_description: prop.short_description || "",
      description: prop.description || "",

      listing_price: cleanPrice,
      price: prop.price || "",
      price_type: prop.price_type || prop.pricePrefix || "Total Price",
      is_negotiable: Boolean(prop.is_negotiable),
      maintenance_charges: prop.maintenance_charges ?? "",

      property_area: prop.property_area || prop.sqft || "",
      area_unit: prop.area_unit || "Sq. Ft.",
      bedrooms: prop.bedrooms || (prop.beds ? `${prop.beds} BHK` : ""),
      bathrooms: prop.bathrooms || (prop.baths ? String(prop.baths) : ""),
      balconies: prop.balconies || "",
      floor_number: prop.floor_number ?? "",
      total_floors: prop.total_floors ?? "",
      furnishing_status: prop.furnishing_status || "",
      property_age: prop.property_age || "",
      facing_direction: prop.facing_direction || "",
      possession_status: prop.possession_status || "",

      country: prop.country || "",
      state: prop.state || "",
      city: prop.city || "",
      locality: prop.locality || "",
      location: prop.location || "",
      full_address: prop.full_address || "",
      pin_code: prop.pin_code || "",
      landmark: prop.landmark || "",
      google_maps_url: prop.google_maps_url || "",
      latitude: prop.latitude ?? "",
      longitude: prop.longitude ?? "",

      cover_image: prop.cover_image || prop.image || "",
      image: prop.cover_image || prop.image || "",
      gallery_images: rawGallery,
      images: rawGallery,
      floor_plan_images: Array.isArray(prop.floor_plan_images)
        ? prop.floor_plan_images
        : [],
      amenities_images: Array.isArray(prop.amenities_images)
        ? prop.amenities_images
        : [],
      video_url: prop.video_url || prop.videoUrl || "",
      videoUrl: prop.video_url || prop.videoUrl || "",
      virtual_tour_url: prop.virtual_tour_url || "",
      brochure: prop.brochure || (Array.isArray(prop.brochures) ? prop.brochures[0]?.url || prop.brochures[0] : "") || "",
      brochure_name: prop.brochure_name || (Array.isArray(prop.brochures) ? prop.brochures[0]?.name : "") || "",

      project_name: prop.project_name || "",
      builder_name: prop.builder_name || "",
      construction_status: prop.construction_status || "",
      year_of_completion: prop.year_of_completion || "",
      total_units: prop.total_units || "",
      available_units: prop.available_units || "",
      parking_availability: prop.parking_availability || "",
      rera_number: prop.rera_number || "",

      amenities: Array.isArray(prop.amenities)
        ? prop.amenities.join(", ")
        : prop.amenities || "",
      nearby_places: Array.isArray(prop.nearby_places)
        ? prop.nearby_places
        : [],
    });

    setShowPropertyModal(true);
  };

  const handleCloseModal = () => {
    setShowPropertyModal(false);
    setEditingPropertyId(null);
    setFormErrors({});
    setModalTab("basic");
  };

  useEffect(() => {
    if (searchParams.get("add") === "true") {
      handleOpenAddModal();
    }
  }, [searchParams]);

  const createMutation = useMutation({
    mutationFn: (data) => createProperty(data),
    onSuccess: (saved) => {
      queryClient.setQueriesData({ queryKey: ["admin_properties"] }, (old) => {
        if (!old) return [saved];
        const list = Array.isArray(old) ? old : [];
        const filtered = list.filter(
          (p) => p.id !== saved.id && p.slug !== saved.slug,
        );
        const updated = [saved, ...filtered];
        updated.total = (old.total ?? list.length) + 1;
        updated.last_page = old.last_page ?? 1;
        updated.current_page = old.current_page ?? 1;
        updated.per_page = old.per_page ?? pageSize;
        return updated;
      });
      queryClient.setQueryData(["properties"], (old) => {
        const list = Array.isArray(old) ? old : [];
        const filtered = list.filter(
          (p) => p.id !== saved.id && p.slug !== saved.slug,
        );
        const next = [saved, ...filtered];
        if (old && typeof old.total === "number") {
          next.total = old.total + 1;
        }
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ["admin_properties"] });
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      setCurrentPage(1);
      setSearchTerm("");
      setSelectedType("All");
      handleCloseModal();
      setToastMessage(
        `"${saved?.title || "Property"}" published and now live on the website!`,
      );
      setTimeout(() => setToastMessage(""), 5000);
    },
    onError: (err) => {
      const backendErrors = err?.response?.data?.errors;
      if (backendErrors && typeof backendErrors === "object") {
        const formatted = {};
        Object.keys(backendErrors).forEach((key) => {
          const val = backendErrors[key];
          let msg = Array.isArray(val) ? val[0] : String(val);
          if (
            typeof msg === "string" &&
            msg.toLowerCase().includes("failed to upload")
          ) {
            msg =
              "The cover image failed to upload: Image file exceeds server size limit or has an unsupported format.";
          }
          formatted[key] = msg;
        });
        setFormErrors((prev) => ({ ...prev, ...formatted }));
        if (
          formatted.video_url ||
          formatted.virtual_tour_url ||
          formatted.cover_image
        ) {
          setModalTab("media");
        }
      }
      let firstErrorMessage =
        backendErrors && typeof backendErrors === "object"
          ? Object.values(backendErrors).flat()[0]
          : err?.response?.data?.message || "Failed to publish property.";
      if (
        typeof firstErrorMessage === "string" &&
        firstErrorMessage.toLowerCase().includes("failed to upload")
      ) {
        firstErrorMessage =
          "The cover image failed to upload: Image file exceeds server size limit or has an unsupported format.";
      }
      setToastMessage(firstErrorMessage);
      setTimeout(() => setToastMessage(""), 5000);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => patchProperty({ id, data }),
    onSuccess: (updated) => {
      queryClient.setQueriesData({ queryKey: ["admin_properties"] }, (old) => {
        if (!old) return old;
        const list = Array.isArray(old) ? old : [];
        const updatedList = list.map((p) =>
          p.id === updated.id || p.slug === updated.slug
            ? { ...p, ...updated }
            : p,
        );
        updatedList.total = old.total;
        updatedList.last_page = old.last_page;
        updatedList.current_page = old.current_page;
        updatedList.per_page = old.per_page;
        return updatedList;
      });
      queryClient.setQueryData(["properties"], (old) => {
        const list = Array.isArray(old) ? old : [];
        const next = list.map((p) =>
          p.id === updated.id || p.slug === updated.slug
            ? { ...p, ...updated }
            : p,
        );
        if (old && typeof old.total === "number") {
          next.total = old.total;
        }
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ["admin_properties"] });
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      if (updated.id) {
        queryClient.invalidateQueries({
          queryKey: ["property", String(updated.id)],
        });
      }
      if (updated.slug) {
        queryClient.invalidateQueries({ queryKey: ["property", updated.slug] });
      }
      handleCloseModal();
      setToastMessage(
        `"${updated?.title || "Property"}" updated successfully!`,
      );
      setTimeout(() => setToastMessage(""), 5000);
    },
    onError: (err) => {
      const backendErrors = err?.response?.data?.errors;
      if (backendErrors && typeof backendErrors === "object") {
        const formatted = {};
        Object.keys(backendErrors).forEach((key) => {
          const val = backendErrors[key];
          let msg = Array.isArray(val) ? val[0] : String(val);
          if (
            typeof msg === "string" &&
            msg.toLowerCase().includes("failed to upload")
          ) {
            msg =
              "The cover image failed to upload: Image file exceeds server size limit or has an unsupported format.";
          }
          formatted[key] = msg;
        });
        setFormErrors((prev) => ({ ...prev, ...formatted }));
        if (
          formatted.video_url ||
          formatted.virtual_tour_url ||
          formatted.cover_image
        ) {
          setModalTab("media");
        }
      }
      let firstErrorMessage =
        backendErrors && typeof backendErrors === "object"
          ? Object.values(backendErrors).flat()[0]
          : err?.response?.data?.message || "Failed to update property.";
      if (
        typeof firstErrorMessage === "string" &&
        firstErrorMessage.toLowerCase().includes("failed to upload")
      ) {
        firstErrorMessage =
          "The cover image failed to upload: Image file exceeds server size limit or has an unsupported format.";
      }
      setToastMessage(firstErrorMessage);
      setTimeout(() => setToastMessage(""), 5000);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteProperty(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueriesData({ queryKey: ["admin_properties"] }, (old) => {
        if (!old) return old;
        const list = Array.isArray(old) ? old : [];
        const updatedList = list.filter((p) => p.id !== deletedId);
        updatedList.total = Math.max(0, (old.total ?? list.length) - 1);
        updatedList.last_page = old.last_page;
        updatedList.current_page = old.current_page;
        updatedList.per_page = old.per_page;
        return updatedList;
      });
      queryClient.setQueryData(["properties"], (old) => {
        const list = Array.isArray(old) ? old : [];
        const next = list.filter((p) => p.id !== deletedId);
        if (old && typeof old.total === "number") {
          next.total = Math.max(0, old.total - 1);
        }
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ["admin_properties"] });
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      setPropertyToDelete(null);
      setToastMessage("Property removed from catalog.");
      setTimeout(() => setToastMessage(""), 4000);
    },
    onError: () => {
      setPropertyToDelete(null);
      setToastMessage("Failed to delete property.");
      setTimeout(() => setToastMessage(""), 4000);
    },
  });

  const propertyTypes = [
    "All",
    "Apartment",
    "Villa",
    "Commercial",
    "Land",
    "House",
    "Penthouse",
    "Duplex",
  ];

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalVal = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: finalVal }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleCoverFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isAllowedImage =
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp" ||
        /\.(jpe?g|png|webp)$/i.test(file.name)) &&
      file.type !== "image/gif" &&
      !/\.gif$/i.test(file.name);

    if (!isAllowedImage) {
      setFormErrors((prev) => ({
        ...prev,
        cover_image:
          "Image not valid: Only JPG, JPEG, PNG, and WEBP formats are supported.",
      }));
      setToastMessage(
        "Image not valid: Only JPG, JPEG, PNG, and WEBP formats are supported.",
      );
      setTimeout(() => setToastMessage(""), 5000);
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      const mbSize = (file.size / (1024 * 1024)).toFixed(1);
      setFormErrors((prev) => ({
        ...prev,
        cover_image: `Image not valid: File size (${mbSize}MB) exceeds the 2MB server limit.`,
      }));
      setToastMessage(
        `Image not valid: File size (${mbSize}MB) exceeds 2MB limit.`,
      );
      setTimeout(() => setToastMessage(""), 5000);
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (result) {
        setFormData((prev) => ({
          ...prev,
          cover_image: result,
          image: result,
        }));
        if (formErrors.cover_image) {
          setFormErrors((prev) => {
            const copy = { ...prev };
            delete copy.cover_image;
            return copy;
          });
        }
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleGalleryFilesUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = [];
    for (const file of files) {
      const isAllowedImage =
        file &&
        (file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/webp" ||
          /\.(jpe?g|png|webp)$/i.test(file.name)) &&
        file.type !== "image/gif" &&
        !/\.gif$/i.test(file.name);

      if (!isAllowedImage) {
        setFormErrors((prev) => ({
          ...prev,
          gallery_images: `Image "${file.name}" not valid: Only JPG, JPEG, PNG, and WEBP formats are supported.`,
        }));
        setToastMessage(
          `Image "${file.name}" not valid: Only JPG, JPEG, PNG, and WEBP formats are supported.`,
        );
        setTimeout(() => setToastMessage(""), 5000);
        continue;
      }
      if (file.size > 2 * 1024 * 1024) {
        const mbSize = (file.size / (1024 * 1024)).toFixed(1);
        setFormErrors((prev) => ({
          ...prev,
          gallery_images: `Image "${file.name}" not valid: Size (${mbSize}MB) exceeds 2MB limit.`,
        }));
        setToastMessage(
          `Image "${file.name}" not valid: Size (${mbSize}MB) exceeds 2MB limit.`,
        );
        setTimeout(() => setToastMessage(""), 5000);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) {
      e.target.value = "";
      return;
    }

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result;
        if (!result) return;
        setFormData((prev) => {
          const current = Array.isArray(prev.gallery_images)
            ? prev.gallery_images
            : [];
          return {
            ...prev,
            gallery_images: [...current, result],
            images: [...current, result],
          };
        });
        if (formErrors.gallery_images) {
          setFormErrors((prev) => {
            const copy = { ...prev };
            delete copy.gallery_images;
            return copy;
          });
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const handleRemoveGalleryImage = (indexToRemove) => {
    setFormData((prev) => {
      const current = Array.isArray(prev.gallery_images)
        ? prev.gallery_images
        : [];
      const updated = current.filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        gallery_images: updated,
        images: updated,
      };
    });
  };

  const handleFloorPlanFilesUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    files.forEach((file) => {
      const isAllowedImage =
        file &&
        (file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/webp" ||
          /\.(jpe?g|png|webp)$/i.test(file.name)) &&
        file.type !== "image/gif" &&
        !/\.gif$/i.test(file.name);

      if (!isAllowedImage) {
        setToastMessage(
          `Floor plan "${file.name}" not valid: Only JPG, JPEG, PNG, and WEBP formats are supported.`,
        );
        setTimeout(() => setToastMessage(""), 5000);
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        const mbSize = (file.size / (1024 * 1024)).toFixed(1);
        setToastMessage(
          `Floor plan "${file.name}" not valid: Size (${mbSize}MB) exceeds 2MB limit.`,
        );
        setTimeout(() => setToastMessage(""), 5000);
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result;
        if (!result) return;
        setFormData((prev) => ({
          ...prev,
          floor_plan_images: [
            ...(Array.isArray(prev.floor_plan_images)
              ? prev.floor_plan_images
              : []),
            result,
          ],
        }));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const handleRemoveFloorPlanImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      floor_plan_images: (Array.isArray(prev.floor_plan_images)
        ? prev.floor_plan_images
        : []
      ).filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleAmenitiesFilesUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    files.forEach((file) => {
      const isAllowedImage =
        file &&
        (file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/webp" ||
          /\.(jpe?g|png|webp)$/i.test(file.name)) &&
        file.type !== "image/gif" &&
        !/\.gif$/i.test(file.name);

      if (!isAllowedImage) {
        setToastMessage(
          `Amenity photo "${file.name}" not valid: Only JPG, JPEG, PNG, and WEBP formats are supported.`,
        );
        setTimeout(() => setToastMessage(""), 5000);
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        const mbSize = (file.size / (1024 * 1024)).toFixed(1);
        setToastMessage(
          `Amenity photo "${file.name}" not valid: Size (${mbSize}MB) exceeds 2MB limit.`,
        );
        setTimeout(() => setToastMessage(""), 5000);
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result;
        if (!result) return;
        setFormData((prev) => ({
          ...prev,
          amenities_images: [
            ...(Array.isArray(prev.amenities_images)
              ? prev.amenities_images
              : []),
            result,
          ],
        }));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const handleRemoveAmenitiesImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      amenities_images: (Array.isArray(prev.amenities_images)
        ? prev.amenities_images
        : []
      ).filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleBrochureUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !/\.pdf$/i.test(file.name)) {
      setToastMessage("Brochure must be a valid PDF document.");
      setTimeout(() => setToastMessage(""), 5000);
      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setToastMessage("Brochure file size must not exceed 10MB.");
      setTimeout(() => setToastMessage(""), 5000);
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (!result) return;
      setFormData((prev) => ({
        ...prev,
        brochure: result,
        brochure_name: file.name,
      }));
      setToastMessage(`"${file.name}" uploaded successfully.`);
      setTimeout(() => setToastMessage(""), 4000);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleRemoveBrochure = () => {
    setFormData((prev) => ({
      ...prev,
      brochure: "",
      brochure_name: "",
    }));
  };

  const handleAddNearbyPlace = () => {
    setFormData((prev) => ({
      ...prev,
      nearby_places: [
        ...(Array.isArray(prev.nearby_places) ? prev.nearby_places : []),
        {
          place_name: "",
          place_category: "School",
          distance: "",
          distance_unit: "km",
        },
      ],
    }));
  };

  const handleRemoveNearbyPlace = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      nearby_places: (Array.isArray(prev.nearby_places)
        ? prev.nearby_places
        : []
      ).filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleNearbyPlaceChange = (index, field, value) => {
    setFormData((prev) => {
      const list = [
        ...(Array.isArray(prev.nearby_places) ? prev.nearby_places : []),
      ];
      if (list[index]) {
        list[index] = { ...list[index], [field]: value };
      }
      return { ...prev, nearby_places: list };
    });
  };

  const modalTabs = [
    { id: "basic", label: "Basic & Pricing", icon: IndianRupee },
    { id: "specs", label: "Specs & Location", icon: MapPin },
    { id: "media", label: "Media & Building", icon: Building2 },
    { id: "amenities", label: "Amenities", icon: Sparkles },
  ];

  const stepKeys = ["basic", "specs", "media", "amenities"];
  const currentStepIndex = Math.max(0, stepKeys.indexOf(modalTab));
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === stepKeys.length - 1;

  const handleNextStep = () => {
    const errors = {};
    if (currentStepIndex === 0) {
      if (!formData.title || !formData.title.trim()) {
        errors.title = "Please fill this field";
      }
      if (!formData.property_type) {
        errors.property_type = "Please select property type";
      }
      if (!formData.listing_type) {
        errors.listing_type = "Please select listing type";
      }
      if (!formData.category) {
        errors.category = "Please select category";
      }
      if (!formData.listing_price || Number(formData.listing_price) <= 0) {
        errors.listing_price = "Please fill this field";
      }
      if (!formData.price_type) {
        errors.price_type = "Please select price type";
      }
    } else if (currentStepIndex === 1) {
      if (!formData.property_area || Number(formData.property_area) <= 0) {
        errors.property_area = "Please fill this field";
      }
      if (!formData.possession_status) {
        errors.possession_status = "Please select possession status";
      }
      if (!formData.city || !formData.city.trim()) {
        errors.city = "Please fill this field";
      }
      if (!formData.locality || !formData.locality.trim()) {
        errors.locality = "Please fill this field";
      }
      if (!formData.pin_code || !formData.pin_code.trim()) {
        errors.pin_code = "Please fill this field";
      }
      if (!formData.full_address || !formData.full_address.trim()) {
        errors.full_address = "Please fill this field";
      }
    } else if (currentStepIndex === 2) {
      if (!formData.cover_image || !formData.cover_image.trim()) {
        errors.cover_image = "Please fill this field";
      }
      const hasGallery =
        (Array.isArray(formData.gallery_images) &&
          formData.gallery_images.filter(Boolean).length > 0) ||
        (Array.isArray(formData.images) &&
          formData.images.filter(Boolean).length > 0) ||
        (typeof formData.gallery_images === "string" &&
          formData.gallery_images.trim().length > 0);
      if (!hasGallery) {
        errors.gallery_images = "Please fill this field";
      }
      if (formData.video_url && !isValidVideoUrl(formData.video_url)) {
        errors.video_url = "Please enter a valid video URL";
      }
      if (
        formData.virtual_tour_url &&
        !isValidWebUrl(formData.virtual_tour_url)
      ) {
        errors.virtual_tour_url = "Please enter a valid virtual tour URL";
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors((prev) => ({ ...prev, ...errors }));
      return;
    }

    if (currentStepIndex < stepKeys.length - 1) {
      setModalTab(stepKeys[currentStepIndex + 1]);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setModalTab(stepKeys[currentStepIndex - 1]);
    }
  };

  const handleSubmitProperty = (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }

    const errors = {};
    if (!formData.title || !formData.title.trim()) {
      errors.title = "Please fill this field";
    }
    if (!formData.property_type) {
      errors.property_type = "Please select property type";
    }
    if (!formData.listing_type) {
      errors.listing_type = "Please select listing type";
    }
    if (!formData.category) {
      errors.category = "Please select category";
    }
    if (!formData.listing_price || Number(formData.listing_price) <= 0) {
      errors.listing_price = "Please fill this field";
    }
    if (!formData.price_type) {
      errors.price_type = "Please select price type";
    }
    if (!formData.property_area || Number(formData.property_area) <= 0) {
      errors.property_area = "Please fill this field";
    }
    if (!formData.possession_status) {
      errors.possession_status = "Please select possession status";
    }
    if (!formData.city || !formData.city.trim()) {
      errors.city = "Please fill this field";
    }
    if (!formData.locality || !formData.locality.trim()) {
      errors.locality = "Please fill this field";
    }
    if (!formData.pin_code || !formData.pin_code.trim()) {
      errors.pin_code = "Please fill this field";
    }
    if (!formData.full_address || !formData.full_address.trim()) {
      errors.full_address = "Please fill this field";
    }
    if (!formData.cover_image || !formData.cover_image.trim()) {
      errors.cover_image = "Please fill this field";
    }
    const hasGallery =
      (Array.isArray(formData.gallery_images) &&
        formData.gallery_images.filter(Boolean).length > 0) ||
      (Array.isArray(formData.images) &&
        formData.images.filter(Boolean).length > 0) ||
      (typeof formData.gallery_images === "string" &&
        formData.gallery_images.trim().length > 0);
    if (!hasGallery) {
      errors.gallery_images = "Please fill this field";
    }
    if (formData.video_url && !isValidVideoUrl(formData.video_url)) {
      errors.video_url = "Please enter a valid video URL";
    }
    if (
      formData.virtual_tour_url &&
      !isValidWebUrl(formData.virtual_tour_url)
    ) {
      errors.virtual_tour_url = "Please enter a valid virtual tour URL";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      if (
        errors.title ||
        errors.property_type ||
        errors.listing_type ||
        errors.category ||
        errors.listing_price ||
        errors.price_type
      ) {
        setModalTab("basic");
      } else if (
        errors.property_area ||
        errors.possession_status ||
        errors.city ||
        errors.locality ||
        errors.pin_code ||
        errors.full_address
      ) {
        setModalTab("specs");
      } else if (
        errors.cover_image ||
        errors.gallery_images ||
        errors.video_url ||
        errors.virtual_tour_url
      ) {
        setModalTab("media");
      }
      return;
    }

    const galleryList = Array.isArray(formData.gallery_images)
      ? formData.gallery_images
      : typeof formData.gallery_images === "string" &&
          formData.gallery_images.trim()
        ? formData.gallery_images
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

    let numPrice = Number(formData.listing_price) || 0;
    if (numPrice > 0 && numPrice < 1000) {
      numPrice = numPrice * 100000;
    }

    let formattedPrice = "₹75.00 Lacs";
    if (numPrice >= 10000000) {
      formattedPrice = `₹${(numPrice / 10000000).toFixed(2)} Cr`;
    } else if (numPrice >= 100000) {
      formattedPrice = `₹${(numPrice / 100000).toFixed(2)} Lacs`;
    } else {
      formattedPrice = `₹${numPrice.toLocaleString("en-IN")}`;
    }

    const bedsNum = formData.bedrooms
      ? parseInt(String(formData.bedrooms).replace(/[^0-9]/g, ""), 10) || 0
      : 0;
    const bathsNum = formData.bathrooms
      ? parseInt(String(formData.bathrooms).replace(/[^0-9]/g, ""), 10) || 0
      : 0;
    const sqftNum = Number(formData.property_area) || 0;
    const bedroomsStr =
      formData.bedrooms &&
      formData.bedrooms !== "Custom Units" &&
      String(formData.bedrooms).trim()
        ? String(formData.bedrooms).trim()
        : bedsNum > 0
          ? `${bedsNum} BHK`
          : "";
    const bathroomsStr =
      formData.bathrooms && String(formData.bathrooms).trim()
        ? String(formData.bathrooms).trim()
        : bathsNum > 0
          ? `${bathsNum} Baths`
          : "";

    const payload = {
      ...formData,
      is_featured: Boolean(formData.is_featured),
      isFeatured: Boolean(formData.is_featured),
      is_negotiable: Boolean(formData.is_negotiable),
      listing_price: numPrice,
      price: formattedPrice,
      priceValue: numPrice,
      pricePrefix: formData.price_type || "Starting Price",
      property_area: sqftNum,
      sqft: sqftNum,
      area_unit: formData.area_unit || "Sq. Ft.",
      beds: bedsNum,
      baths: bathsNum,
      bedrooms: bedroomsStr,
      bathrooms: bathroomsStr,
      image: formData.cover_image || formData.image,
      cover_image: formData.cover_image || formData.image,
      video_url: formData.video_url ? normalizeUrl(formData.video_url) : "",
      videoUrl: formData.video_url ? normalizeUrl(formData.video_url) : "",
      virtual_tour_url: formData.virtual_tour_url
        ? normalizeUrl(formData.virtual_tour_url)
        : "",
      images: galleryList,
      gallery_images: galleryList,
      floor_plan_images: Array.isArray(formData.floor_plan_images)
        ? formData.floor_plan_images
        : [],
      amenities_images: Array.isArray(formData.amenities_images)
        ? formData.amenities_images
        : [],
      brochure: formData.brochure || "",
      brochure_name: formData.brochure_name || "",
      nearby_places: Array.isArray(formData.nearby_places)
        ? formData.nearby_places
        : [],
      google_maps_url: formData.google_maps_url
        ? normalizeUrl(formData.google_maps_url)
        : "",
      property_age: formData.property_age || "",
      facing_direction: formData.facing_direction || "",
      total_units:
        formData.total_units !== "" && !isNaN(Number(formData.total_units))
          ? Number(formData.total_units)
          : "",
      available_units:
        formData.available_units !== "" &&
        !isNaN(Number(formData.available_units))
          ? Number(formData.available_units)
          : "",
      amenities:
        typeof formData.amenities === "string"
          ? formData.amenities
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : formData.amenities,
    };

    if (modalMode === "edit" && editingPropertyId) {
      updateMutation.mutate({ id: editingPropertyId, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleDeleteProperty = (id, title) => {
    setPropertyToDelete({ id, title });
  };

  const handleConfirmDelete = () => {
    if (propertyToDelete?.id) {
      deleteMutation.mutate(propertyToDelete.id);
    }
  };

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case "Apartment":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Commercial":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Villa":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Land":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "House":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const columns = [
    {
      header: "Property",
      className: "min-w-[320px]",
      accessor: (row) => (
        <div className="flex items-center gap-3.5 group">
          <div className="relative h-14 w-18 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 group-hover:border-[#F87907] transition-all">
            <img
              src={row.image || row.cover_image}
              alt={row.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = apartment1;
              }}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform"
              loading="lazy"
            />
            {row.isFeatured && (
              <span className="absolute top-1 left-1 rounded bg-[#F87907] px-1 py-0.5 text-[9px] font-bold text-white shadow-xs">
                ★
              </span>
            )}
            {row.videoUrl && (
              <span
                className="absolute bottom-1 right-1 rounded-full bg-black/60 p-0.5 text-white backdrop-blur-xs"
                title="Video tour included"
              >
                <Video size={10} />
              </span>
            )}
          </div>
          <div className="min-w-0 max-w-[220px] sm:max-w-[280px] lg:max-w-[340px]">
            <div className="flex items-center gap-1.5 min-w-0">
              <button
                type="button"
                onClick={() => handleOpenEditModal(row)}
                className="text-xs font-bold text-slate-900 hover:text-[#F87907] transition-colors flex items-center gap-1.5 text-left cursor-pointer min-w-0 max-w-full"
                title={row.title}
              >
                <span className="truncate block max-w-full">{row.title}</span>
                <Pencil
                  size={11}
                  className="text-[#F87907] opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                />
              </button>
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-400 min-w-0">
              <span className="truncate max-w-[160px] sm:max-w-[200px] block">{row.slug}</span>
              <button
                type="button"
                onClick={() => handleOpenEditModal(row)}
                className="text-[10px] text-[#F87907] font-semibold opacity-0 group-hover:opacity-100 transition-opacity ml-1 cursor-pointer shrink-0"
              >
                • Click to Edit
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Type",
      accessor: (row) => {
        const type = row.type || row.property_type || "Apartment";
        return (
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${getTypeBadgeClass(
              type,
            )}`}
          >
            {type}
          </span>
        );
      },
    },
    {
      header: "Price & Area",
      accessor: (row) => (
        <div>
          <div className="font-extrabold text-xs text-[#F87907]">
            {row.price || "₹75.00 Lacs"}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
            <span>
              {row.bedrooms || (row.beds ? `${row.beds} BHK` : "3 BHK")}
            </span>
            <span>•</span>
            <span>{row.sqft || row.property_area || "1850"} Sq. Ft.</span>
          </div>
        </div>
      ),
    },
    {
      header: "Location",
      accessor: (row) => (
        <div className="flex items-center gap-1 text-xs text-slate-600">
          <MapPin size={12} className="text-slate-400 shrink-0" />
          <span className="truncate max-w-[160px]">
            {row.locality || row.location || "Patia, Bhubaneswar"}
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (row) => {
        const status = row.listing_status || "Published";
        const isLive = status === "Published";
        return (
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${
              isLive
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-slate-100 text-slate-600 border-slate-200"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isLive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
              }`}
            />
            <span>{status}</span>
          </span>
        );
      },
    },
    {
      header: "Featured",
      align: "center",
      accessor: (row) =>
        row.isFeatured ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            <Sparkles size={11} />
            <span>Featured</span>
          </span>
        ) : (
          <span className="text-xs text-slate-400">Standard</span>
        ),
    },
    {
      header: "Actions",
      align: "right",
      accessor: (row) => (
        <div
          className="flex items-center justify-end gap-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          <a
            href={`/property/${row.slug || row.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
            title="View Details"
          >
            <Eye size={14} />
          </a>
          <button
            type="button"
            onClick={() => handleOpenEditModal(row)}
            className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
            title="Edit Property"
          >
            <Pencil size={14} />
          </button>
          <button
            type="button"
            onClick={() => handleDeleteProperty(row.id, row.title)}
            className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors shadow-2xs cursor-pointer"
            title="Delete Property"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#F87907] via-[#F9770B] to-[#EA580C] hover:from-[#EA580C] hover:to-[#F87907] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer"
        >
          <Plus size={15} />
          <span>Add New Property</span>
        </button>

        <Link
          to="/properties"
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-2xs"
        >
          <ExternalLink size={13} className="text-[#F87907]" />
          <span>User Site View</span>
        </Link>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search by title, locality, price, or slug..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-8 text-xs sm:text-sm font-medium focus:border-[#F87907] focus:bg-white focus:outline-hidden"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setCurrentPage(1);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {propertyTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleTypeChange(type)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                selectedType === type
                  ? "bg-[#F87907] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <Table
        columns={columns}
        data={paginatedProperties}
        keyExtractor={(row) => row.id}
        isLoading={isLoading}
        emptyMessage={
          isLoading
            ? "Loading properties..."
            : "No properties match your current search or category filter."
        }
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        itemLabel="properties"
        onPageChange={(page) => setCurrentPage(page)}
      />
      <PropertyModal
        isOpen={showPropertyModal}
        modalMode={modalMode}
        modalTab={modalTab}
        setModalTab={setModalTab}
        modalTabs={modalTabs}
        stepKeys={stepKeys}
        currentStepIndex={currentStepIndex}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
        handleInputChange={handleInputChange}
        handleCoverFileUpload={handleCoverFileUpload}
        handleGalleryFilesUpload={handleGalleryFilesUpload}
        handleRemoveGalleryImage={handleRemoveGalleryImage}
        handleFloorPlanFilesUpload={handleFloorPlanFilesUpload}
        handleRemoveFloorPlanImage={handleRemoveFloorPlanImage}
        handleAmenitiesFilesUpload={handleAmenitiesFilesUpload}
        handleRemoveAmenitiesImage={handleRemoveAmenitiesImage}
        handleBrochureUpload={handleBrochureUpload}
        handleRemoveBrochure={handleRemoveBrochure}
        handleAddNearbyPlace={handleAddNearbyPlace}
        handleRemoveNearbyPlace={handleRemoveNearbyPlace}
        handleNearbyPlaceChange={handleNearbyPlaceChange}
        handleCloseModal={handleCloseModal}
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
        handleSubmitProperty={handleSubmitProperty}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      <ConfirmModal
        isOpen={Boolean(propertyToDelete)}
        title="Delete Property Listing"
        message={`Are you sure you want to delete "${propertyToDelete?.title}"? This will remove the listing from inventory and website.`}
        confirmText="Delete Property"
        confirmVariant="danger"
        isLoading={deleteMutation.isPending}
        onConfirm={handleConfirmDelete}
        onClose={() => setPropertyToDelete(null)}
      />

      {toastMessage &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed bottom-6 right-6 z-[99999] flex items-center gap-3 rounded-2xl bg-slate-900/95 text-white px-4 py-3 text-xs sm:text-sm font-medium shadow-2xl backdrop-blur-md border border-white/10 animate-fade-in pointer-events-auto">
            {toastMessage.toLowerCase().includes("fail") ||
            toastMessage.toLowerCase().includes("error") ||
            toastMessage.toLowerCase().includes("not valid") ||
            toastMessage.toLowerCase().includes("invalid") ? (
              <AlertCircle size={16} className="text-rose-400 shrink-0" />
            ) : (
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            )}
            <span>{toastMessage}</span>
          </div>,
          document.body,
        )}
    </div>
  );
}
