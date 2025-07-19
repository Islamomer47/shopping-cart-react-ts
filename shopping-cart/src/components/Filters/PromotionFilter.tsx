import {PROMOTION_OPTIONS,type PromotionOption,} from "@/constants/filterOptions";


/**
 * @interface PromotionFilterProps
 * @property {PromotionOption} promotion - The currently selected promotion option.
 * @property {function} onPromotionChange - Callback function to handle changes in promotion selection.
 */
interface PromotionFilterProps {
  promotion: PromotionOption;
  onPromotionChange: (value: PromotionOption) => void;
}

/**
 * @component PromotionFilter
 * @description
 * A React component that displays a list of promotion options for filtering products.
 * @param {PromotionFilterProps} props - The properties for the PromotionFilter component.
 */
export default function PromotionFilter({
  promotion,
  onPromotionChange,
}: PromotionFilterProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-sm mx-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Promotions</h3>
      <ul className="flex flex-col gap-2">
        {PROMOTION_OPTIONS.map((option) => {
          const isSelected = promotion === option.value;
          return (
            <li
              key={option.value}
              className={`cursor-pointer rounded-md px-4 py-2 border
                ${
                  isSelected
                    ? "bg-amber-400 text-white border-amber-400"
                    : "border-gray-300 hover:bg-amber-50"
                }`}
              onClick={() => onPromotionChange(option.value)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onPromotionChange(option.value);
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
