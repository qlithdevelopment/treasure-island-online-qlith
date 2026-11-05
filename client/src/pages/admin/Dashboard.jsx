import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  CheckCircle2,
  MessageSquare,
  Plus,
  ExternalLink,
  Eye,
  Trash2,
  ArrowRight,
  TrendingUp,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProperties,
  deleteProperty,
} from "../../services/propertyService";
import {
  getContacts,
  deleteContact,
} from "../../services/contactService";
import ConfirmModal from "../../components/common/ConfirmModal";
import { apartment1 } from "../../assets/properties";

export default function Dashboard() {
  const queryClient = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const {
    data: properties = [],
    isLoading: loadingProperties,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: () => getProperties(),
    refetchOnMount: true,
  });

  const {
    data: contacts = [],
    isLoading: loadingContacts,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => getContacts(),
    refetchOnMount: true,
  });

  const deletePropertyMutation = useMutation({
    mutationFn: (id) => deleteProperty(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(["properties"], (old) => {
        const list = Array.isArray(old) ? old : [];
        const next = list.filter((p) => p.id !== deletedId);
        if (old && typeof old.total === "number") {
          next.total = Math.max(0, old.total - 1);
        }
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      queryClient.invalidateQueries({ queryKey: ["admin_properties"] });
      setDeleteTarget(null);
      setToastMessage("Property removed from inventory.");
      setTimeout(() => setToastMessage(""), 4000);
    },
    onError: () => {
      setDeleteTarget(null);
      setToastMessage("Failed to delete property.");
      setTimeout(() => setToastMessage(""), 4000);
    },
  });

  const deleteContactMutation = useMutation({
    mutationFn: (id) => deleteContact(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(["contacts"], (old) => {
        const list = Array.isArray(old) ? old : [];
        return list.filter((c) => c.id !== deletedId);
      });
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setDeleteTarget(null);
      setToastMessage("Inquiry deleted successfully.");
      setTimeout(() => setToastMessage(""), 4000);
    },
    onError: () => {
      setDeleteTarget(null);
      setToastMessage("Failed to delete inquiry.");
      setTimeout(() => setToastMessage(""), 4000);
    },
  });

  const totalProperties =
    typeof properties?.total === "number"
      ? properties.total
      : properties.length;
  const publishedProperties = useMemo(() => {
    const list = Array.isArray(properties) ? properties : [];
    if (list.length === 0) return 0;
    const pubCount = list.filter(
      (p) => p.listing_status === "Published" || !p.listing_status
    ).length;
    if (totalProperties > list.length) {
      if (pubCount === list.length) return totalProperties;
      return Math.round((pubCount / list.length) * totalProperties);
    }
    return pubCount;
  }, [properties, totalProperties]);

  const totalInquiries = contacts.length;

  const recentContacts = useMemo(() => {
    return [...contacts].slice(0, 5);
  }, [contacts]);

  const recentProperties = useMemo(() => {
    return [...properties].slice(0, 4);
  }, [properties]);

  const categoryCounts = useMemo(() => {
    const res = { Residential: 0, Commercial: 0, Land: 0 };
    const list = Array.isArray(properties) ? properties : [];
    if (list.length === 0) return res;
    list.forEach((p) => {
      const cat =
        p.category ||
        (p.property_type === "Commercial"
          ? "Commercial"
          : p.property_type === "Land"
          ? "Land"
          : "Residential");
      if (res[cat] !== undefined) res[cat] += 1;
      else res.Residential += 1;
    });
    if (totalProperties > list.length) {
      const sampleCount = list.length;
      return {
        Residential: Math.round((res.Residential / sampleCount) * totalProperties),
        Commercial: Math.round((res.Commercial / sampleCount) * totalProperties),
        Land: Math.max(
          0,
          totalProperties -
            Math.round((res.Residential / sampleCount) * totalProperties) -
            Math.round((res.Commercial / sampleCount) * totalProperties)
        ),
      };
    }
    return res;
  }, [properties, totalProperties]);

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "property") {
      deletePropertyMutation.mutate(deleteTarget.id);
    } else if (deleteTarget.type === "contact") {
      deleteContactMutation.mutate(deleteTarget.id);
    }
  };

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-slate-900/95 text-white px-4 py-3 text-xs sm:text-sm font-medium shadow-2xl backdrop-blur-md border border-white/10 animate-fade-in">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-4 sm:p-5 text-white shadow-lg border border-white/5">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-gradient-to-br from-[#F87907]/20 to-transparent blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold text-orange-400 border border-white/10 mb-2">
              <Sparkles size={11} />
              <span>Treasure Island Real Estate • Admin Dashboard</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Portfolio Overview & Insights
            </h1>
            <p className="mt-1 text-xs text-slate-300 max-w-xl">
              Monitor active property inventory, incoming customer inquiries, and conversion leads in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/admin/properties?add=true"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#F87907] px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:bg-[#E06D06] transition-all cursor-pointer"
            >
              <Plus size={14} />
              <span>Add Property</span>
            </Link>
            <Link
              to="/admin/contacts"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md border border-white/10 transition-all cursor-pointer"
            >
              <MessageSquare size={13} />
              <span>Inquiries</span>
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-200 border border-slate-700/60 transition-all"
            >
              <ExternalLink size={13} />
              <span>Live Website</span>
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Properties
            </span>
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <Building2 size={16} />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-bold text-slate-900">
              {loadingProperties ? "..." : totalProperties}
            </span>
            <span className="text-xs font-semibold text-slate-500">units</span>
          </div>
          <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
            <span className="text-slate-500 font-medium">Full inventory catalog</span>
            <Link
              to="/admin/properties"
              className="font-bold text-[#F87907] hover:underline inline-flex items-center gap-0.5"
            >
              <span>Manage</span>
              <ArrowRight size={10} />
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Active Listings
            </span>
            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-bold text-slate-900">
              {loadingProperties ? "..." : publishedProperties}
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
              Published
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Customer Leads
            </span>
            <div className="rounded-lg bg-orange-50 p-2 text-[#F87907]">
              <MessageSquare size={16} />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-bold text-slate-900">
              {loadingContacts ? "..." : totalInquiries}
            </span>
            <span className="text-xs font-semibold text-slate-500">inquiries</span>
          </div>
          <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
            <span className="text-slate-500 font-medium">Captured across portal</span>
            <Link
              to="/admin/contacts"
              className="font-bold text-[#F87907] hover:underline inline-flex items-center gap-0.5"
            >
              <span>View all</span>
              <ArrowRight size={10} />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Recent Inquiries
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Latest customer inquiries submitted through contact forms.
                </p>
              </div>
              <Link
                to="/admin/contacts"
                className="text-xs font-bold text-[#F87907] hover:underline inline-flex items-center gap-1"
              >
                <span>View All ({contacts.length})</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            {loadingContacts ? (
              <div className="py-8 text-center text-xs font-medium text-slate-400">
                Loading customer inquiries...
              </div>
            ) : recentContacts.length === 0 ? (
              <div className="py-10 text-center">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-orange-50 text-[#F87907] flex items-center justify-center mb-2">
                  <MessageSquare size={22} />
                </div>
                <h4 className="text-xs font-bold text-slate-800">
                  No inquiries received yet
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 max-w-xs mx-auto">
                  When visitors submit inquiries on property pages, they will appear here in real time.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="pb-3 font-bold">Client</th>
                      <th className="pb-3 font-bold hidden sm:table-cell">Message</th>
                      <th className="pb-3 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentContacts.map((inquiry) => {
                      const cleanPhone = (inquiry.phone || "").replace(/[^0-9]/g, "");
                      return (
                        <tr key={inquiry.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 pr-3">
                            <div className="min-w-0 max-w-[150px] sm:max-w-[200px]">
                              <p
                                className="font-bold text-slate-900 truncate"
                                title={inquiry.name || "Anonymous"}
                              >
                                {inquiry.name || "Anonymous"}
                              </p>
                              <p className="text-[11px] text-slate-400 truncate">
                                {inquiry.phone || inquiry.email || inquiry.date}
                              </p>
                            </div>
                          </td>

                          <td className="py-3 pr-3 hidden sm:table-cell max-w-[240px]">
                            <p className="truncate text-slate-600 font-medium">
                              {inquiry.message || "Interested in learning more."}
                            </p>
                            <span className="text-[10px] text-slate-400">
                              {inquiry.date || "Recent"}
                            </span>
                          </td>

                          <td className="py-3 text-right whitespace-nowrap">
                            <div className="inline-flex items-center justify-end gap-1.5">
                              {cleanPhone && (
                                <a
                                  href={`https://wa.me/${cleanPhone}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-1.5 text-emerald-600 hover:bg-emerald-100 transition-colors shadow-2xs"
                                  title="WhatsApp Chat"
                                >
                                  <Send size={13} />
                                </a>
                              )}
                              <Link
                                to="/admin/contacts"
                                className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs"
                                title="View Details"
                              >
                                <Eye size={13} />
                              </Link>
                              <button
                                type="button"
                                onClick={() =>
                                  setDeleteTarget({
                                    type: "contact",
                                    id: inquiry.id,
                                    title: inquiry.name,
                                  })
                                }
                                className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors shadow-2xs cursor-pointer"
                                title="Delete Inquiry"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Featured & Recent Listings
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Top properties currently highlighted in inventory.
                </p>
              </div>
              <Link
                to="/admin/properties"
                className="text-xs font-bold text-[#F87907] hover:underline inline-flex items-center gap-1"
              >
                <span>All Properties ({totalProperties})</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            {loadingProperties ? (
              <div className="py-8 text-center text-xs font-medium text-slate-400">
                Loading properties...
              </div>
            ) : recentProperties.length === 0 ? (
              <div className="py-10 text-center">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-orange-50 text-[#F87907] flex items-center justify-center mb-2">
                  <Building2 size={22} />
                </div>
                <h4 className="text-xs font-bold text-slate-800">
                  No properties added yet
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 max-w-xs mx-auto">
                  Click the button below to add your first luxury property listing.
                </p>
                <Link
                  to="/admin/properties?add=true"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#F87907] px-4 py-2 rounded-xl shadow-xs hover:bg-[#E06D06]"
                >
                  <Plus size={13} />
                  <span>Add First Property</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {recentProperties.map((property) => (
                  <div
                    key={property.id}
                    className="flex items-center gap-3 p-2.5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all group"
                  >
                    <div className="relative h-14 w-18 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      <img
                        src={property.image || property.cover_image}
                        alt={property.title}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = apartment1;
                        }}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />
                      {property.isFeatured && (
                        <span className="absolute top-1 left-1 rounded bg-[#F87907] px-1 py-0.5 text-[8px] font-bold text-white shadow-xs">
                          ★
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-xs font-bold text-slate-900 group-hover:text-[#F87907] transition-colors">
                        {property.title}
                      </h4>
                      <p className="text-[11px] font-extrabold text-[#F87907] mt-0.5">
                        {property.price || "₹75.00 Lacs"}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                        <MapPin size={9} />
                        <span>{property.locality || property.location || "Patia, Bhubaneswar"}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <a
                        href={`/property/${property.slug || property.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs"
                        title="View Property"
                      >
                        <Eye size={13} />
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteTarget({
                            type: "property",
                            id: property.id,
                            title: property.title,
                          })
                        }
                        className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors shadow-2xs cursor-pointer"
                        title="Delete Property"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-2xs">
            <h3 className="text-base font-extrabold text-slate-900 mb-1">
              Inventory by Category
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Distribution of current listings.
            </p>

            <div className="space-y-3.5">
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700">Residential</span>
                  <span className="text-slate-900">
                    {categoryCounts.Residential}{" "}
                    <span className="text-[10px] text-slate-400 font-normal">
                      (
                      {totalProperties > 0
                        ? Math.round(
                            (categoryCounts.Residential / totalProperties) * 100
                          )
                        : 0}
                      %)
                    </span>
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        totalProperties > 0
                          ? (categoryCounts.Residential / totalProperties) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700">Commercial</span>
                  <span className="text-slate-900">
                    {categoryCounts.Commercial}{" "}
                    <span className="text-[10px] text-slate-400 font-normal">
                      (
                      {totalProperties > 0
                        ? Math.round(
                            (categoryCounts.Commercial / totalProperties) * 100
                          )
                        : 0}
                      %)
                    </span>
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        totalProperties > 0
                          ? (categoryCounts.Commercial / totalProperties) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700">Land & Plots</span>
                  <span className="text-slate-900">
                    {categoryCounts.Land}{" "}
                    <span className="text-[10px] text-slate-400 font-normal">
                      (
                      {totalProperties > 0
                        ? Math.round(
                            (categoryCounts.Land / totalProperties) * 100
                          )
                        : 0}
                      %)
                    </span>
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        totalProperties > 0
                          ? (categoryCounts.Land / totalProperties) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Total Portfolio</span>
              <span className="font-extrabold text-slate-900">
                {totalProperties} Properties
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-orange-50/60 via-white to-amber-50/40 p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F87907] mb-2">
              <TrendingUp size={14} />
              <span>Quick Navigation</span>
            </div>
            <h4 className="text-sm font-extrabold text-slate-900">
              Manage Your Portfolio
            </h4>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Direct shortcuts to manage property inventory and customer inquiries.
            </p>

            <div className="space-y-2">
              <Link
                to="/admin/properties"
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:border-[#F87907] hover:text-[#F87907] transition-all shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <Building2 size={15} className="text-[#F87907]" />
                  <span>Manage All Properties</span>
                </div>
                <ArrowRight size={13} />
              </Link>

              <Link
                to="/admin/contacts"
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:border-[#F87907] hover:text-[#F87907] transition-all shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare size={15} className="text-[#F87907]" />
                  <span>Customer Inquiries</span>
                </div>
                <ArrowRight size={13} />
              </Link>

              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:border-[#F87907] hover:text-[#F87907] transition-all shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <ExternalLink size={15} className="text-blue-500" />
                  <span>View Public Website</span>
                </div>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title={
          deleteTarget?.type === "property"
            ? "Delete Property Listing"
            : "Delete Customer Inquiry"
        }
        message={
          deleteTarget?.type === "property"
            ? `Are you sure you want to permanently delete "${deleteTarget?.title}"? This cannot be undone.`
            : `Are you sure you want to delete inquiry from "${deleteTarget?.title}"?`
        }
        confirmText="Delete Permanently"
        confirmVariant="danger"
        isLoading={
          deletePropertyMutation.isPending || deleteContactMutation.isPending
        }
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
