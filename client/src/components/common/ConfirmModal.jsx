import { useEffect } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "Do you really want to delete this property? This process cannot be undone.",
  confirmText = "Yes, Delete",
  cancelText = "Cancel",
  isLoading = false,
  danger = true,
  icon: CustomIcon,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={() => {
        if (!isLoading) onClose();
      }}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 rounded-full bg-slate-100 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer disabled:opacity-50"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
              danger
                ? "bg-red-100 text-red-600 ring-4 ring-red-50"
                : "bg-amber-100 text-amber-600 ring-4 ring-amber-50"
            }`}
          >
            {CustomIcon ? (
              <CustomIcon size={22} />
            ) : danger ? (
              <Trash2 size={22} />
            ) : (
              <AlertTriangle size={22} />
            )}
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              {title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed break-words">
              {message}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center gap-1.5 cursor-pointer disabled:opacity-60 ${
              danger
                ? "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-red-500/20"
                : "bg-gradient-to-r from-[#F87907] to-[#EA580C] hover:from-[#EA580C] hover:to-[#F87907]"
            }`}
          >
            {CustomIcon ? <CustomIcon size={13} /> : <Trash2 size={13} />}
            <span>{isLoading ? "Deleting..." : confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
