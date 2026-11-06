export default function Table({
  columns = [],
  data = [],
  keyExtractor = (row, idx) => row?.id ?? idx,
  emptyMessage = "No records found.",
  isLoading = false,
  className = "",
}) {
  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-xs font-bold uppercase tracking-wider text-slate-500">
            <tr>
              {columns.map((col, idx) => {
                const alignClass =
                  col.align === "center"
                    ? "text-center"
                    : col.align === "right"
                    ? "text-right"
                    : "text-left";
                return (
                  <th
                    key={idx}
                    scope="col"
                    className={`px-5 py-4 ${alignClass} ${col.className || ""}`}
                  >
                    {col.header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, rIdx) => (
                <tr key={rIdx} className="animate-pulse">
                  {columns.map((col, colIdx) => {
                    const alignClass =
                      col.align === "center"
                        ? "text-center"
                        : col.align === "right"
                        ? "text-right"
                        : "text-left";
                    return (
                      <td
                        key={colIdx}
                        className={`px-5 py-4 align-middle ${alignClass} ${col.className || ""}`}
                      >
                        {colIdx === 0 ? (
                          <div className="flex items-center gap-3.5">
                            <div className="h-14 w-18 shrink-0 rounded-xl bg-slate-200" />
                            <div className="space-y-2 flex-1">
                              <div className="h-4 w-40 rounded-md bg-slate-200" />
                              <div className="h-3 w-24 rounded-md bg-slate-100" />
                            </div>
                          </div>
                        ) : colIdx === 1 ? (
                          <div className="h-6 w-20 rounded-full bg-slate-200" />
                        ) : colIdx === 2 ? (
                          <div className="h-4 w-28 rounded-md bg-slate-200" />
                        ) : colIdx === 3 ? (
                          <div className="space-y-1.5">
                            <div className="h-4 w-24 rounded-md bg-slate-200" />
                            <div className="h-3 w-16 rounded-md bg-slate-100" />
                          </div>
                        ) : colIdx === 4 ? (
                          <div className="h-4 w-36 rounded-md bg-slate-200" />
                        ) : colIdx === 5 ? (
                          <div className="h-6 w-16 rounded-full bg-slate-200 mx-auto" />
                        ) : (
                          <div className="flex justify-end gap-1.5">
                            <div className="h-7 w-7 rounded-lg bg-slate-200" />
                            <div className="h-7 w-7 rounded-lg bg-slate-200" />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-sm text-slate-400"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="font-medium text-slate-500">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr
                  key={keyExtractor(row, rowIdx)}
                  className="transition-colors hover:bg-slate-50/70"
                >
                  {columns.map((col, colIdx) => {
                    const alignClass =
                      col.align === "center"
                        ? "text-center"
                        : col.align === "right"
                        ? "text-right"
                        : "text-left";

                    const cellContent =
                      typeof col.accessor === "function"
                        ? col.accessor(row, rowIdx)
                        : row[col.accessor];

                    return (
                      <td
                        key={colIdx}
                        className={`px-5 py-4 align-middle ${alignClass} ${col.className || ""}`}
                      >
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
