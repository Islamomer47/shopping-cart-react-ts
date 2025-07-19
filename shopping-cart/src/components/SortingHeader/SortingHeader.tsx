import { SORT_OPTIONS, type SortOption } from "@/types/filters";

/**
 * @interface SortingHeaderProps
 * @property {SortOption} sortBy - The currently selected sorting option.
 * @property {function} onSortChange - Callback function to handle changes in sorting selection.
 */
interface SortingHeaderProps {
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

/**
 * @component SortingHeader
 * @description
 * A React component that displays a filter header for sorting products.
 * @param {SortingHeaderProps} props - The properties for the SortingHeader component.
 */
export default function SortingHeader({
  sortBy,
  onSortChange,
}: SortingHeaderProps) {
  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-200 max-w-xs">
      <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
        Sort by:
      </span>
      <select
        value={sortBy}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onSortChange(e.target.value as SortOption)
        }
        className="flex-1 appearance-none bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-sm
                   text-gray-800 hover:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400
                   focus:border-amber-400 transition-colors duration-200 ease-in-out cursor-pointer"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <svg
        className="w-5 h-5 text-amber-400 pointer-events-none"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
