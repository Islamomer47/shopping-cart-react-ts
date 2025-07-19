import PriceRangeFilter from "./PriceRangeFilter";
import RatingFilter from "./RatingFilter";
import AvailabilityFilter from "./AvailabilityFilter";
import PromotionFilter from "./PromotionFilter";
import type {AvailabilityOption,PromotionOption,} from "@/constants/filterOptions";

/**
 * @interface FiltersProps
 * @property {AvailabilityOption} availability - The currently selected availability option.
 * @property {PromotionOption} promotion - The currently selected promotion option.
 * @property {[number, number]} selectedPriceRange - The currently selected price range.
 * @property {number} minPrice - The minimum price for the price range filter.
 * @property {number} maxPrice - The maximum price for the price range filter.
 * @property {number} selectedRating - The currently selected rating.
 * @property {function} onPriceChange - Callback function to handle changes in the price range.
 * @property {function} onAvailabilityChange - Callback function to handle changes in availability selection.
 * @property {function} onRatingChange - Callback function to handle changes in the rating.
 * @property {function} onPromotionChange - Callback function to handle changes in promotion selection.
 */
interface FiltersProps {
  availability: AvailabilityOption;
  promotion: PromotionOption;
  selectedPriceRange: [number, number];
  selectedRating: number;
  minPrice: number;
  maxPrice: number;
  onPriceChange: (range: [number, number]) => void;
  onRatingChange: (rating: number) => void;
  onPromotionChange: (value: PromotionOption) => void;
  onAvailabilityChange: (value: AvailabilityOption) => void;
}


/**
 * @component Filters
 * @description
 * A React component that renders the product filters including price range, rating, availability, and promotion options.
 * @param {FiltersProps} props - The properties for the Filters component. 
 */
export default function Filters(props: FiltersProps) {
  return (
    <div className="space-y-6">
      <PriceRangeFilter
        minPrice={props.minPrice}
        maxPrice={props.maxPrice}
        selectedPriceRange={props.selectedPriceRange}
        onPriceChange={props.onPriceChange}
      />
      <RatingFilter
        selectedRating={props.selectedRating}
        onRatingChange={props.onRatingChange}
      />
      <AvailabilityFilter
        availability={props.availability}
        onAvailabilityChange={props.onAvailabilityChange}
      />
      <PromotionFilter
        promotion={props.promotion}
        onPromotionChange={props.onPromotionChange}
      />
    </div>
  );
}
