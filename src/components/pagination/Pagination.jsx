export default function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onPageChange,
}) {
    function getVisiblePages() {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
  onClick={onPrevious}
  disabled={currentPage === 1}
  className={`rounded-lg px-4 py-2 transition-colors ${
    currentPage === 1
      ? "cursor-not-allowed bg-slate-800 text-slate-500"
      : "bg-slate-800 hover:bg-slate-700"
  }`}
>
  ◀ Previous
</button>

      <div className="flex items-center gap-2">
  {getVisiblePages().map((page, index) => {
  if (page === "...") {
    return (
      <span
        key={`ellipsis-${index}`}
        className="flex h-10 w-10 items-center justify-center text-slate-400"
      >
        ...
      </span>
    );
  }

  return (
    <button
      key={page}
      onClick={() => onPageChange(page)}
      className={`h-10 w-10 rounded-lg transition-colors ${
        currentPage === page
          ? "bg-blue-600 text-white"
          : "bg-slate-800 hover:bg-slate-700"
      }`}
    >
      {page}
    </button>
  );
})}
</div>

      <button
  onClick={onNext}
  disabled={currentPage === totalPages}
  className={`rounded-lg px-4 py-2 transition-colors ${
    currentPage === totalPages
      ? "cursor-not-allowed bg-slate-800 text-slate-500"
      : "bg-slate-800 hover:bg-slate-700"
  }`}
>
  Next ▶
</button>
    </div>
  );
}