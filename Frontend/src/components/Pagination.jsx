const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // ===============================
  // Safe page change handler
  // ===============================
  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  // ===============================
  // Show current page ± 2 pages
  // ===============================
  const getPageNumbers = () => {
    const pages = [];

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      {/* Previous */}
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded border transition ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        ← Previous
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => changePage(page)}
          className={`px-4 py-2 rounded border transition ${
            currentPage === page
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded border transition ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
