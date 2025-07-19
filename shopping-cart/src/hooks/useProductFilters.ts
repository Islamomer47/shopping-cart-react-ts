import { useState, useEffect, useMemo } from "react";
import type { Product } from "@/types";
import type {
  SortOption,
  AvailabilityOption,
  PromotionOption,
} from "@/types/filters";


/**
 * @type FilterInitialParams
 * @property {number} page - The selected starting page number for pagination.
 * @property {string} search - The initial search query for filtering products.
 * @property {string} category - The initial product category for filtering.
 * @property {SortOption} sort - The initially selected sorting option for products.
 */
type FilterInitialParams = {
    page: number;
    search: string;
    category: string;
    sort: SortOption;
}

/**
 * @interface UseProductFiltersParams
 * @property {Product[] | undefined} products - The list of products to filter.
 * @property {Object} initialParams - Initial filter parameters including page, search query, category, and sort option.
 */
export interface UseProductFiltersParams {
  products: Product[] | undefined;
  initialParams:FilterInitialParams;
}

/**
 * @type ActiveFilter
 * @property {string} type - The type of filter (e.g., category, price)
 * @property {string} label - The display label for the filter.
 * @property {string | number} value - The value of the filter, which can be a string or number.
 */
type ActiveFilter = {
  type: string;
  label: string;
  value: string | number;
};

/**
 * @hook useProductFilters
 * @description
 * A custom React hook that provides filtering, sorting, and pagination functionality for the product browser.
 * @param {Product[] | undefined} products - The list of products to filter which may not contain anything.
 * @param {FilterInitialParams} initialParams - Initial filter parameters including page, search query, category, and sort option.
 */
export function useProductFilters({
  products,
  initialParams,
}: UseProductFiltersParams) {
  const ITEMS_PER_PAGE = 9;

  const [currentPage, setCurrentPage] = useState(initialParams.page);
  const [searchQuery, setSearchQuery] = useState(initialParams.search);
  const [selectedCategory, setSelectedCategory] = useState(
    initialParams.category
  );
  const [sortBy, setSortBy] = useState<SortOption>(initialParams.sort);

  const [selectedPriceRange, setSelectedPriceRange] = useState<
    [number, number]
  >([0, 1000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [availability, setAvailability] = useState<AvailabilityOption>("all");
  const [promotion, setPromotion] = useState<PromotionOption>("all");

  const prices = useMemo(() => {
    if (!products || products.length === 0) return [0, 1000];
    const priceArr = products.map((p) => p.price);
    return [
      Math.floor(Math.min(...priceArr)),
      Math.ceil(Math.max(...priceArr)),
    ];
  }, [products]);

  useEffect(() => {
    setSelectedPriceRange(prices as [number, number]);
  }, [prices]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesPrice =
        product.price >= selectedPriceRange[0] &&
        product.price <= selectedPriceRange[1];
      const matchesRating = product.rating.rate >= selectedRating;
      const matchesAvailability =
        availability === "all" ||
        (availability === "in-stock" && (product.stock ?? true)) ||
        (availability === "out-of-stock" && !(product.stock ?? true));
      const matchesPromotion =
        promotion === "all" ||
        (promotion === "on-sale" && product.onSale) ||
        (promotion === "new-arrivals" && product.isNew) ||
        (promotion === "best-sellers" && product.isBestSeller);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesRating &&
        matchesAvailability &&
        matchesPromotion
      );
    });

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating-high":
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return filtered;
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedPriceRange,
    selectedRating,
    availability,
    promotion,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [filteredProducts, currentPage]);

  const getActiveFilters = (): ActiveFilter[] => {
    const filters: ActiveFilter[] = [];

    if (selectedCategory !== "all") {
      filters.push({
        type: "category",
        label:
          selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1),
        value: selectedCategory,
      });
    }

    if (
      selectedPriceRange[0] !== prices[0] ||
      selectedPriceRange[1] !== prices[1]
    ) {
      filters.push({
        type: "price",
        label: `$${selectedPriceRange[0]} - $${selectedPriceRange[1]}`,
        value: "price-range",
      });
    }

    if (selectedRating > 0) {
      filters.push({
        type: "rating",
        label: `${selectedRating}+ Stars`,
        value: selectedRating,
      });
    }

    if (availability !== "all") {
      filters.push({
        type: "availability",
        label: availability,
        value: availability,
      });
    }

    if (promotion !== "all") {
      filters.push({
        type: "promotion",
        label: promotion,
        value: promotion,
      });
    }

    return filters;
  };

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedPriceRange(prices as [number, number]);
    setSelectedRating(0);
    setAvailability("all");
    setPromotion("all");
    setSortBy("default");
    setCurrentPage(1);
  };

  const removeFilter = (type: string) => {
    switch (type) {
      case "category":
        setSelectedCategory("all");
        break;
      case "price":
        setSelectedPriceRange(prices as [number, number]);
        break;
      case "rating":
        setSelectedRating(0);
        break;
      case "availability":
        setAvailability("all");
        break;
      case "promotion":
        setPromotion("all");
        break;
    }
    setCurrentPage(1);
  };

  return {
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedPriceRange,
    setSelectedPriceRange,
    selectedRating,
    setSelectedRating,
    availability,
    setAvailability,
    promotion,
    setPromotion,
    sortBy,
    setSortBy,
    paginatedProducts,
    filteredProductsCount: filteredProducts.length,
    totalPages,
    prices,
    getActiveFilters,
    clearAllFilters,
    removeFilter,
  };
}
