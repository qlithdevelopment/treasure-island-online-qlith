const STORAGE_KEY = "treasure_island_contact_inquiries";

export const initialInquiries = [];

export function getInquiries() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        item.id !== 101 &&
        item.id !== 102 &&
        item.id !== 103 &&
        item.id !== 104 &&
        item.id !== 105
    );
  } catch {
    return [];
  }
}

export function saveInquiry(inquiryData) {
  if (typeof window === "undefined") return null;
  const current = getInquiries();
  const newRecord = {
    id: Date.now(),
    name: inquiryData.name?.trim() || "Anonymous",
    email: inquiryData.email?.trim() || "",
    phone: inquiryData.phone?.trim() || "",
    message:
      inquiryData.message?.trim() ||
      "Interested in learning more about available properties.",
    date: "Just now",
    createdAt: new Date().toISOString(),
    status: "New",
  };
  const updated = [newRecord, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
  return newRecord;
}

export function updateInquiryStatus(id, newStatus) {
  if (typeof window === "undefined") return;
  const current = getInquiries();
  const updated = current.map((item) =>
    item.id === id ? { ...item, status: newStatus } : item
  );
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
  return updated;
}

export function deleteInquiry(id) {
  if (typeof window === "undefined") return;
  const current = getInquiries();
  const updated = current.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
  return updated;
}
