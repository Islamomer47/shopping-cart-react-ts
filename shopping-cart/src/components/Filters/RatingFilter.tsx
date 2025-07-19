import { useState, useRef, useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";


/**
 * @interface RatingFilterProps
 * @property {number} selectedRating - The currently selected rating value.
 * @property {function} onRatingChange - Callback function to handle changes in the rating.
 */
interface RatingFilterProps {
  selectedRating: number;
  onRatingChange: (rating: number) => void;
}

const MAX_STARS = 5;


/**
 * @component RatingFilter
 * @description
 * A React component that displays a dropdown for selecting a minimum rating.
 * @param {RatingFilterProps} props - The properties for the RatingFilter component.
 */
export default function RatingFilter({
  selectedRating,
  onRatingChange,
}: RatingFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    { value: 0, label: "All Ratings" },
    ...Array.from({ length: MAX_STARS }, (_, i) => ({
      value: i + 1,
      label: `${i + 1}+ Stars`,
    })),
  ];

  return (
    <div
      ref={dropdownRef}
      className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-sm mx-auto relative select-none"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Minimum Rating
      </h3>

      {/* Dropdown toggle */}
      <button
        onClick={() => setIsOpen((open) => !open)}
        type="button"
        className="w-full flex items-center justify-between border border-gray-300 rounded-md px-4 py-3
                   text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400
                   transition duration-200 ease-in-out"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-1">
          {selectedRating === 0 ? (
            "All Ratings"
          ) : (
            <>
              {[...Array(selectedRating)].map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-amber-400" />
              ))}
              <span className="ml-1 text-gray-700">
                {selectedRating}+ Stars
              </span>
            </>
          )}
        </span>
        <svg
          className={`h-5 w-5 text-gray-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown list */}
      {isOpen && (
        <ul
          role="listbox"
          tabIndex={-1}
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white
                     py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          {options.map(({ value, label }) => (
            <li
              key={value}
              role="option"
              aria-selected={selectedRating === value}
              onClick={() => {
                onRatingChange(value);
                setIsOpen(false);
              }}
              className={`cursor-pointer select-none relative py-2 pl-4 pr-4 flex items-center gap-2
                          ${
                            selectedRating === value
                              ? "bg-amber-100 text-amber-700 font-semibold"
                              : "text-gray-900 hover:bg-amber-50"
                          }`}
            >
              {value === 0 ? (
                label
              ) : (
                <>
                  {[...Array(value)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-amber-400" />
                  ))}
                  <span>{label.split(" ")[1]}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
