
/**
 * An Interface that specifies the structure of an active filter object.
 * @interface Filter
 * @property {string} type - The type of the filter.
 * @property {string} label - The display label for the filter.
 * @property {string | number} value - The value of the filter, which can be a string or a number.
 */
interface Filter {
  type: string;
  label: string;
  value: string | number;
}

/**
 * Props for the ActiveFilters component.
 * 
 * @interface ActiveFiltersProps
 * @property {Filter[]} activeFilters - An array of active filters to display.
 * @property {(filterType: string) => void} onRemove - Callback function to remove a specific filter by type.
 * @property {() => void} onClearAll - Callback function to clear all active filters.
 */
interface ActiveFiltersProps {
  activeFilters: Filter[];
  onRemove: (filterType: string) => void;
  onClearAll: () => void;
}
/**
 * @component ActiveFilters
 * @description
 * A React component that displays active filters with options to remove individual filters or clear all filters.
 * @param {ActiveFiltersProps} props - The properties for the ActiveFilters component.
 * @returns {JSX.Element | null} - Returns a JSX element displaying active filters or null if there are no active filters.
 */
const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  activeFilters,
  onRemove,
  onClearAll,
}) => {
  if (activeFilters.length === 0) return null;

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700">
          Active Filters:
        </span>

        {activeFilters.map((filter, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
          >
            <span>{filter.label}</span>
            <button
              onClick={() => onRemove(filter.type)}
              className="text-amber-600 hover:text-amber-800 font-bold text-lg leading-none"
              aria-label={`Remove ${filter.label} filter`}
            >
              ×
            </button>
          </div>
        ))}

        <button
          onClick={onClearAll}
          className="text-sm text-amber-600 hover:text-amber-800 font-medium underline ml-2"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default ActiveFilters;
