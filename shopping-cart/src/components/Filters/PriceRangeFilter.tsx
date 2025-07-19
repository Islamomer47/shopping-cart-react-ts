/**
 * @interface PriceRangeFilterProps
 * @property {number} minPrice - The minimum price for the price range filter.
 * @property {number} maxPrice - The maximum price for the price range filter.
 * @property {[number, number]} selectedPriceRange - The currently selected price range which holds and array one for the max price and the other for the minimum price.
 * @property {function} onPriceChange - Callback function to handle changes in the price range.
 */
interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  selectedPriceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

/**
 * @component PriceRangeFilter
 * @description
 * A React component that displays a slider filter for selecting a price range.
 * @param {PriceRangeFilterProps} props - The properties for the PriceRangeFilter component.
 */
export default function PriceRangeFilter({
  minPrice,
  maxPrice,
  selectedPriceRange,
  onPriceChange,
}: PriceRangeFilterProps) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val <= selectedPriceRange[1] && val >= minPrice) {
      onPriceChange([val, selectedPriceRange[1]]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= selectedPriceRange[0] && val <= maxPrice) {
      onPriceChange([selectedPriceRange[0], val]);
    }
  };

  return (
    <>
      {/* black thumbs */}
      <style>
        {`
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: 16px;
            width: 16px;
            background-color: black;
            border-radius: 9999px;
            cursor: pointer;
            border: none;
            margin-top: -6px;
          }

          input[type=range]::-moz-range-thumb {
            height: 16px;
            width: 16px;
            background-color: black;
            border-radius: 9999px;
            cursor: pointer;
            border: none;
          }
        `}
      </style>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-sm mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Price Range
        </h3>

        {/* Numeric Inputs */}
        <div className="flex items-center gap-4 mb-4">
          <input
            type="number"
            min={minPrice}
            max={selectedPriceRange[1]}
            value={selectedPriceRange[0]}
            onChange={handleMinChange}
            className="w-20 border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            aria-label="Minimum price"
          />
          <span className="text-gray-500 font-medium">to</span>
          <input
            type="number"
            min={selectedPriceRange[0]}
            max={maxPrice}
            value={selectedPriceRange[1]}
            onChange={handleMaxChange}
            className="w-20 border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            aria-label="Maximum price"
          />
        </div>

        {/* Range Sliders */}
        <div className="relative h-6">
          {/* Min slider */}
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={selectedPriceRange[0]}
            onChange={(e) =>
              onPriceChange([
                Math.min(Number(e.target.value), selectedPriceRange[1]),
                selectedPriceRange[1],
              ])
            }
            className="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto"
            style={{
              zIndex:
                selectedPriceRange[0] >= selectedPriceRange[1] - 1 ? 5 : 2,
            }}
          />

          {/* Max slider */}
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={selectedPriceRange[1]}
            onChange={(e) =>
              onPriceChange([
                selectedPriceRange[0],
                Math.max(Number(e.target.value), selectedPriceRange[0]),
              ])
            }
            className="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto"
            style={{
              zIndex:
                selectedPriceRange[0] >= selectedPriceRange[1] - 1 ? 2 : 5,
            }}
          />

          {/* Slider track */}
          <div className="absolute top-2.5 left-0 right-0 h-1 bg-gray-300 rounded" />
          {/* range */}
          <div
            className="absolute top-2.5 h-1 bg-amber-400 rounded"
            style={{
              left: `${
                ((selectedPriceRange[0] - minPrice) / (maxPrice - minPrice)) *
                100
              }%`,
              right: `${
                100 -
                ((selectedPriceRange[1] - minPrice) / (maxPrice - minPrice)) *
                  100
              }%`,
            }}
          />
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Price between{" "}
          <span className="font-semibold">${selectedPriceRange[0]}</span> and{" "}
          <span className="font-semibold">${selectedPriceRange[1]}</span>{" "}
          (range: ${minPrice} - ${maxPrice})
        </p>
      </div>
    </>
  );
}
