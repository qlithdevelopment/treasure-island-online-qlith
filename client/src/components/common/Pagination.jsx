import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems = 0,
  pageSize = 10,
  itemLabel = "items",
  className = "",
}) {
  if (totalPages <= 1 && totalItems <= pageSize) {
    return (
      <div className={`flex items-center justify-between px-2 py-3 text-xs text-slate-500 ${className}`}>
        <span>
          Showing all <strong>{totalItems}</strong> {itemLabel}
        </span>
      </div>
    );
  }

  const startIdx = Math.min((currentPage - 1) * pageSize + 1, totalItems);
  const endIdx = Math.min(currentPage * pageSize, totalItems);

  const pages = [];
  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  for (let p = startPage; p <= endPage; p++) {
    pages.push(p);
  }

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 py-4 text-xs text-slate-500 ${className}`}
    >
      <div>
        Showing <strong className="text-slate-700">{totalItems > 0 ? startIdx : 0}</strong> to{" "}
        <strong className="text-slate-700">{endIdx}</strong> of{" "}
        <strong className="text-slate-700">{totalItems}</strong> {itemLabel}
      </div>

      <div className="flex items-center gap-1.5 self-center sm:self-auto">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
          title="Previous Page"
        >
          <ChevronLeft size={15} />
        </button>

        {startPage > 1 && (
          <>
            <button
              type="button"
              onClick={() => onPageChange(1)}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors text-xs font-semibold"
            >
              1
            </button>
            {startPage > 2 && <span className="px-1 text-slate-400">…</span>}
          </>
        )}

        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                isActive
                  ? "bg-[#F87907] text-white shadow-xs"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {p}
            </button>
          );
        })}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-1 text-slate-400">…</span>}
            <button
              type="button"
              onClick={() => onPageChange(totalPages)}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors text-xs font-semibold"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
          title="Next Page"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
