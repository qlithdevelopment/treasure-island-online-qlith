import { useState, useMemo, useEffect } from "react";
import {
  Mail,
  Phone,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  Eye,
  X,
  Send,
  User,
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
import {
  getContacts,
  getContactById,
  deleteContact,
} from "../../services/contactService";

export default function AdminContacts() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const pageSize = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
      setCurrentPage(1);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data: contactsData = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["contacts", currentPage, debouncedSearch],
    queryFn: () =>
      getContacts({
        page: currentPage,
        per_page: pageSize,
        search: debouncedSearch,
      }),
    placeholderData: keepPreviousData,
  });

  const selectedInquiryId = selectedInquiry?.id;

  const { data: singleContactDetail } = useQuery({
    queryKey: ["contact", selectedInquiryId],
    queryFn: () => getContactById(selectedInquiryId),
    enabled: Boolean(selectedInquiryId),
  });

  const activeInquiry = useMemo(() => {
    if (!selectedInquiry) return null;
    if (singleContactDetail && String(singleContactDetail.id) === String(selectedInquiry.id)) {
      return { ...selectedInquiry, ...singleContactDetail };
    }
    return selectedInquiry;
  }, [selectedInquiry, singleContactDetail]);

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setSelectedInquiry(null);
      setContactToDelete(null);
      setToastMessage("Contact deleted successfully.");
      setTimeout(() => setToastMessage(""), 3000);
    },
    onError: () => {
      setContactToDelete(null);
      setToastMessage("Failed to delete contact.");
      setTimeout(() => setToastMessage(""), 3000);
    },
  });

  const handleDelete = (id) => {
    setContactToDelete(id);
  };

  const handleConfirmDelete = () => {
    if (contactToDelete) {
      deleteMutation.mutate(contactToDelete);
    }
  };

  const handleOpenDetail = (row) => {
    setSelectedInquiry(row);
  };

  const rawInquiries = useMemo(() => {
    return Array.isArray(contactsData) ? contactsData : [];
  }, [contactsData]);

  const filteredInquiries = useMemo(() => {
    if (!debouncedSearch) return rawInquiries;
    const q = debouncedSearch.toLowerCase();
    return rawInquiries.filter((inq) => {
      return (
        (inq.name && inq.name.toLowerCase().includes(q)) ||
        (inq.email && inq.email.toLowerCase().includes(q)) ||
        (inq.phone && inq.phone.toLowerCase().includes(q)) ||
        (inq.message && inq.message.toLowerCase().includes(q))
      );
    });
  }, [rawInquiries, debouncedSearch]);

  const totalItems =
    typeof contactsData?.total === "number"
      ? contactsData.total
      : filteredInquiries.length;
  const totalPages =
    typeof contactsData?.last_page === "number"
      ? contactsData.last_page
      : Math.max(1, Math.ceil(totalItems / pageSize));

  useEffect(() => {
    if (
      !isLoading &&
      !isFetching &&
      typeof contactsData?.last_page === "number" &&
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages, isLoading, isFetching, contactsData?.last_page]);

  const paginatedInquiries = filteredInquiries;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const columns = [
    {
      header: "Client",
      className: "min-w-[160px] max-w-[220px]",
      accessor: (row) => (
        <div className="min-w-0 max-w-[180px] sm:max-w-[220px]">
          <div
            onClick={() => handleOpenDetail(row)}
            className="text-xs font-bold text-slate-900 truncate hover:text-[#F87907] transition-colors cursor-pointer"
            title={row.name}
          >
            {row.name}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1 min-w-0">
            <Clock size={11} className="shrink-0" />
            <span className="truncate">{row.date || "Recent"}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Contact Info",
      className: "min-w-[200px]",
      accessor: (row) => (
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <Phone size={12} className="text-[#F87907] shrink-0" />
            <a
              href={`tel:${row.phone}`}
              className="hover:text-[#F87907] transition-colors"
            >
              {row.phone}
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Mail size={12} className="text-slate-400 shrink-0" />
            <a
              href={`mailto:${row.email}`}
              className="hover:text-[#F87907] transition-colors truncate max-w-[180px]"
            >
              {row.email}
            </a>
          </div>
        </div>
      ),
    },
    {
      header: "Inquiry Message",
      className: "max-w-[280px] min-w-[200px]",
      accessor: (row) => (
        <div
          onClick={() => handleOpenDetail(row)}
          className="cursor-pointer group min-w-0 max-w-[240px] sm:max-w-[280px]"
          title="Click to view full message"
        >
          <p className="text-xs text-slate-600 group-hover:text-slate-900 transition-colors truncate block">
            {row.message}
          </p>
          <span className="text-[11px] font-semibold text-[#F87907] group-hover:underline">
            Read full message
          </span>
        </div>
      ),
    },
    {
      header: "Actions",
      align: "right",
      accessor: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <a
            href={`https://wa.me/${row.phone?.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
              `Hello ${row.name}, thank you for contacting Treasure Island Real Estate. Regarding your inquiry: "${row.message?.slice(0, 50)}..."`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200"
            title="Chat on WhatsApp"
          >
            <Send size={12} />
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => handleOpenDetail(row)}
            className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs"
            title="View Details"
          >
            <Eye size={14} />
          </button>

          <button
            type="button"
            onClick={() => handleDelete(row.id)}
            className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors shadow-2xs cursor-pointer"
            title="Delete Inquiry"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-slate-900/95 text-white px-4 py-3 text-xs sm:text-sm font-medium shadow-2xl backdrop-blur-md border border-white/10 animate-fade-in">
          <CheckCircle2 size={16} className="text-[#F87907] shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage("")}
            className="ml-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      )}

      

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-lg">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by client name, email, phone, or message text..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#F87907] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#F87907]/20 transition-all font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setCurrentPage(1);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <Table
        columns={columns}
        data={paginatedInquiries}
        keyExtractor={(row) => row.id}
        isLoading={isLoading || isFetching}
        emptyMessage={isLoading || isFetching ? "Loading inquiries..." : "No contact inquiries found matching your filters."}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        itemLabel="inquiries"
        onPageChange={(page) => setCurrentPage(page)}
      />

      {activeInquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
          onClick={() => setSelectedInquiry(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-4 right-4 rounded-full bg-slate-100 p-1.5 text-slate-500 hover:bg-slate-200 transition-colors z-10 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-start justify-between gap-3 mb-4 pr-10 min-w-0">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-[#F87907] font-bold text-lg shrink-0">
                  <User size={24} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 break-words [overflow-wrap:anywhere] leading-snug">
                    {activeInquiry.name}
                  </h3>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    Submitted {activeInquiry.date || "Recently"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl bg-slate-50 p-4 border border-slate-100 text-xs sm:text-sm min-w-0">
              <div className="flex items-center justify-between gap-2 min-w-0">
                <span className="text-slate-500 font-medium shrink-0">Phone:</span>
                <a
                  href={`tel:${activeInquiry.phone}`}
                  className="font-bold text-[#F87907] hover:underline truncate"
                >
                  {activeInquiry.phone}
                </a>
              </div>
              <div className="flex items-center justify-between gap-2 min-w-0">
                <span className="text-slate-500 font-medium shrink-0">Email:</span>
                <a
                  href={`mailto:${activeInquiry.email}`}
                  className="font-semibold text-slate-800 hover:underline truncate max-w-[220px] sm:max-w-xs"
                  title={activeInquiry.email}
                >
                  {activeInquiry.email}
                </a>
              </div>
            </div>

            <div className="my-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Client Inquiry Message
              </label>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs sm:text-sm leading-relaxed text-slate-700 max-h-48 overflow-y-auto whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                {activeInquiry.message}
              </div>
            </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleDelete(activeInquiry.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${activeInquiry.phone}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
                    >
                      <Phone size={13} className="text-[#F87907]" />
                      <span>Call</span>
                    </a>

                    <a
                      href={`https://wa.me/${activeInquiry.phone?.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        `Hello ${activeInquiry.name}, thank you for contacting Treasure Island Real Estate.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-xs font-bold text-white shadow-xs hover:shadow-md transition-all"
                    >
                      <Send size={13} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
      <ConfirmModal
        isOpen={Boolean(contactToDelete)}
        onClose={() => setContactToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Contact Inquiry?"
        message="Are you sure you want to remove this contact inquiry? This action cannot be undone."
        confirmText="Yes, Delete Inquiry"
        cancelText="Cancel"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
