export const SORT_OPTIONS = [
  { value: "default", label: "Default Sorting" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating-high", label: "Rating: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

export const AVAILABILITY_OPTIONS = [
  { value: "all", label: "All Products" },
  { value: "in-stock", label: "In Stock" },
  { value: "out-of-stock", label: "Out of Stock" },
] as const;

export type AvailabilityOption = (typeof AVAILABILITY_OPTIONS)[number]["value"];

export const PROMOTION_OPTIONS = [
  { value: "all", label: "All Products" },
  { value: "on-sale", label: "On Sale" },
  { value: "new-arrivals", label: "New Arrivals" },
  { value: "best-sellers", label: "Best Sellers" },
] as const;

export type PromotionOption = (typeof PROMOTION_OPTIONS)[number]["value"];
