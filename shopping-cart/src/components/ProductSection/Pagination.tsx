import { useEffect, useRef, useCallback } from "react";

/**
 * @interface PaginationProps
 * @property {number} currentPage - The current active page number.
 * @property {number} totalItems - The total number of items across all pages.
 * @property {number} itemsPerPage - The number of items displayed per page.
 */
interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

/**
 * @component Pagination
 * @description
 * A React component that renders a pagination control with buttons for navigating between availabel products.
 * @param {PaginationProps} props - The properties for the Pagination component.
 */
export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const setButtonRef = useCallback(
    (index: number) => (el: HTMLButtonElement | null) => {
      buttonsRef.current[index] = el;
    },
    []
  );

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement &&
        containerRef.current?.contains(document.activeElement)
      ) {
        if (e.key === "ArrowLeft" && currentPage > 1) {
          e.preventDefault();
          onPageChange(currentPage - 1);
          buttonsRef.current[currentPage - 2]?.focus();
        }
        if (e.key === "ArrowRight" && currentPage < totalPages) {
          e.preventDefault();
          onPageChange(currentPage + 1);
          buttonsRef.current[currentPage]?.focus();
        }
      }
    };
    containerRef.current?.addEventListener("keydown", handleKeyDown);
    return () => {
      containerRef.current?.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, onPageChange, totalPages]);

  if (totalPages === 0) return null;

  return (
    <nav
      aria-label="Pagination"
      ref={containerRef}
      tabIndex={0}
      className="flex flex-col items-center space-y-4 select-none"
    >
      <p className="text-sm text-gray-600 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
        Showing <span className="font-medium text-amber-600">{startItem}</span>–{" "}
        <span className="font-medium text-amber-600">{endItem}</span> of{" "}
        <span className="font-medium text-amber-600">{totalItems}</span>{" "}
        products
      </p>

      <div className="flex gap-2" role="list">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-amber-100 rounded-xl hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-md"
          aria-label="Previous page"
          ref={setButtonRef(0)}
          role="listitem"
        >
          Previous
        </button>

        {/* Page numbers */}
        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          const isActive = currentPage === pageNum;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-lg"
                  : "bg-white/80 backdrop-blur-sm border border-amber-100 hover:bg-amber-50 hover:shadow-md"
              }`}
              aria-current={isActive ? "page" : undefined}
              tabIndex={0}
              ref={setButtonRef(index + 1)}
              role="listitem"
            >
              {pageNum}
            </button>
          );
        })}

        {/* next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-amber-100 rounded-xl hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-md"
          aria-label="Next page"
          ref={setButtonRef(totalPages + 1)}
          role="listitem"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
