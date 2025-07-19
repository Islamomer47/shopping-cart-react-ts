import {
  AVAILABILITY_OPTIONS,
  type AvailabilityOption,
} from "@/constants/filterOptions";

/**
 * @interface AvailabilityFilterProps
 * @property {AvailabilityOption} availability - The currently selected availability option.
 * @property {function} onAvailabilityChange - Callback function to handle changes in availability selection.
 */
interface AvailabilityFilterProps {
  availability: AvailabilityOption;
  onAvailabilityChange: (value: AvailabilityOption) => void;
}

/**
 * @component AvailabilityFilter
 * @description
 * A React component that displays a filter for product availability options.
 * @param {AvailabilityFilterProps} props - The properties for the AvailabilityFilter component. 
 */
export default function AvailabilityFilter({
  availability,
  onAvailabilityChange,
}: AvailabilityFilterProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-sm mx-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
      <ul className="flex flex-col gap-2">
        {AVAILABILITY_OPTIONS.map((option) => {
          const isSelected = availability === option.value;
          return (
            <li
              key={option.value}
              className={`cursor-pointer rounded-md px-4 py-2 border
                ${
                  isSelected
                    ? "bg-amber-400 text-white border-amber-400"
                    : "border-gray-300 hover:bg-amber-50"
                }`}
              onClick={() => onAvailabilityChange(option.value)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onAvailabilityChange(option.value);
                }
              }}
              aria-pressed={isSelected}
            >
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
