import api from "./api";
import {
  getInquiries,
  saveInquiry,
  updateInquiryStatus,
  deleteInquiry,
} from "../utils/inquiriesStorage";

export const getContacts = async (params = {}) => {
  try {
    const page = Number(params.page) || 1;
    const perPage = Number(params.per_page || params.pageSize) || 10;
    const cleanParams = { ...params, page, per_page: perPage };
    delete cleanParams.pageSize;
    if (!cleanParams.search || !String(cleanParams.search).trim()) {
      delete cleanParams.search;
    } else {
      cleanParams.search = String(cleanParams.search).trim();
    }

    const res = await api.get("/contacts", { params: cleanParams });
    const payload = res.data?.data;
    const rawList = Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload)
      ? payload
      : [];

    const formatted = rawList.map((item) => ({
      id: item.id,
      name: item.name || "Anonymous",
      email: item.email || "",
      phone: item.phone || "",
      message: item.message || "",
      status: item.status || "New",
      createdAt: item.created_at || new Date().toISOString(),
      date: item.created_at
        ? new Date(item.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "Recent",
    }));

    formatted.total = typeof payload?.total === "number" ? payload.total : rawList.length;
    formatted.last_page = typeof payload?.last_page === "number" ? payload.last_page : Math.max(1, Math.ceil(formatted.total / perPage));
    formatted.current_page = typeof payload?.current_page === "number" ? payload.current_page : page;
    formatted.per_page = typeof payload?.per_page === "number" ? payload.per_page : perPage;

    if (formatted.length > 0 || (payload && typeof payload.total === "number")) {
      return formatted;
    }

    const fallback = getInquiries();
    let filtered = fallback;
    if (cleanParams.search) {
      const q = cleanParams.search.toLowerCase();
      filtered = filtered.filter(
        (i) =>
          (i.name && i.name.toLowerCase().includes(q)) ||
          (i.email && i.email.toLowerCase().includes(q)) ||
          (i.phone && i.phone.toLowerCase().includes(q)) ||
          (i.message && i.message.toLowerCase().includes(q))
      );
    }
    const start = (page - 1) * perPage;
    const paged = filtered.slice(start, start + perPage);
    paged.total = filtered.length;
    paged.last_page = Math.max(1, Math.ceil(filtered.length / perPage));
    paged.current_page = page;
    paged.per_page = perPage;
    return paged;
  } catch {
    const fallback = getInquiries();
    const page = Number(params.page) || 1;
    const perPage = Number(params.per_page || params.pageSize) || 10;
    let filtered = fallback;
    if (params.search && String(params.search).trim()) {
      const q = String(params.search).trim().toLowerCase();
      filtered = filtered.filter(
        (i) =>
          (i.name && i.name.toLowerCase().includes(q)) ||
          (i.email && i.email.toLowerCase().includes(q)) ||
          (i.phone && i.phone.toLowerCase().includes(q)) ||
          (i.message && i.message.toLowerCase().includes(q))
      );
    }
    const start = (page - 1) * perPage;
    const paged = filtered.slice(start, start + perPage);
    paged.total = filtered.length;
    paged.last_page = Math.max(1, Math.ceil(filtered.length / perPage));
    paged.current_page = page;
    paged.per_page = perPage;
    return paged;
  }
};

export const getContactById = async (id) => {
  try {
    const res = await api.get(`/contacts/${id}`);
    const item = res.data?.data;
    if (item) {
      return {
        id: item.id,
        name: item.name || "Anonymous",
        email: item.email || "",
        phone: item.phone || "",
        message: item.message || "",
        status: item.status || "New",
        createdAt: item.created_at || new Date().toISOString(),
        date: item.created_at
          ? new Date(item.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Recent",
      };
    }
  } catch {
    const fallback = getInquiries().find((inq) => String(inq.id) === String(id));
    if (fallback) return fallback;
  }
  return null;
};

export const createContact = async (contactData) => {
  const payload = {
    name: contactData.name,
    email: contactData.email,
    phone: contactData.phone,
    message: contactData.message,
  };

  try {
    const res = await api.post("/contacts", payload);
    saveInquiry(contactData);
    return res.data;
  } catch {
    return saveInquiry(contactData);
  }
};

export const updateContact = async ({ id, data }) => {
  const payload = {};
  if (data.name !== undefined) payload.name = data.name;
  if (data.email !== undefined) payload.email = data.email;
  if (data.phone !== undefined) payload.phone = data.phone;
  if (data.message !== undefined) payload.message = data.message;

  try {
    const res = await api.put(`/contacts/${id}`, payload);
    if (data.status) {
      updateInquiryStatus(id, data.status);
    }
    return res.data;
  } catch {
    if (data.status) {
      updateInquiryStatus(id, data.status);
    }
    return null;
  }
};

export const patchContact = async ({ id, data }) => {
  const payload = {};
  if (data.name !== undefined) payload.name = data.name;
  if (data.email !== undefined) payload.email = data.email;
  if (data.phone !== undefined) payload.phone = data.phone;
  if (data.message !== undefined) payload.message = data.message;

  try {
    const res = await api.patch(`/contacts/${id}`, payload);
    if (data.status) {
      updateInquiryStatus(id, data.status);
    }
    return res.data;
  } catch {
    if (data.status) {
      updateInquiryStatus(id, data.status);
    }
    return null;
  }
};

export const deleteContact = async (id) => {
  try {
    const res = await api.delete(`/contacts/${id}`);
    deleteInquiry(id);
    return res.data;
  } catch {
    deleteInquiry(id);
    return null;
  }
};
