import { useProducts } from "@/api/products";
import CategoryTabs from "@/components/CategoryTabs";
import ActiveFilters from "@/components/Filters/ActiveFilters";
import Filters from "@/components/Filters/Filters";
import Footer from "@/components/Footer";
import FloatingCircles from "@/components/HeroSection/FloatingCircles";
import HeroBanner from "@/components/HeroSection/HeroBanner";
import Pagination from "@/components/ProductSection/Pagination";
import ProductGrid from "@/components/ProductSection/ProductGrid";
import SortingHeader from "@/components/SortingHeader/SortingHeader";
import Spinner from "@/components/Spinner";
import type { AvailabilityOption, PromotionOption, SortOption } from "@/constants/filterOptions";
import { useProductFilters } from "@/hooks/useProductFilters";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

/**
 * @component Home
 * @description
 * A React component that serves as the main page for the shopping cart application, displaying products, filters, and pagination.
 * It includes a hero section, category tabs, and a product grid with filtering and sorting capabilities.
 */
export default function Home() {
  const { data, isLoading, isError } = useProducts();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const {
    currentPage,
    setCurrentPage,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
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
    filteredProductsCount,
    totalPages,
    prices,
    getActiveFilters,
    clearAllFilters,
    removeFilter,
  } = useProductFilters({
    products: data,
    initialParams: {
      page: 1,
      search: "",
      category: "all",
      sort: "default",
    },
  });

  const activeFilters = getActiveFilters();

  // Close drawer if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isFilterOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Prevent scrolling when drawer is open
    document.body.style.overflow = isFilterOpen ? "hidden" : "auto";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isFilterOpen]);

  if (isLoading) return <Spinner />;
  if (isError || !data)
    return <p className="text-center text-red-500">Failed to load products.</p>;

  return (
    <>
      {/* Hero Section */}
    <div className="relative  mt-6 sm:mr-[-11.5%] sm:ml-[-11.5%]">
      <HeroBanner searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FloatingCircles />
    </div>

      <div className="pt-24 max-w-7xl mx-auto px-4 py-6 sm:py-10 space-y-6 sm:space-y-8">
        {/* Category Tabs */}
        <CategoryTabs
          activeCategory={selectedCategory}
          onCategoryChange={(cat) => {
            setSelectedCategory(cat);
            setCurrentPage(1);
          }}
        />

        {/* Mobile Filter Button */}
        <div className="lg:hidden flex justify-end">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="mb-4 px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg shadow hover:bg-amber-600 transition"
          >
            Show Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Sidebar Filters for Desktop */}
          <div className="hidden lg:block space-y-6">
            <Filters
              minPrice={prices[0]}
              maxPrice={prices[1]}
              selectedPriceRange={selectedPriceRange}
              onPriceChange={(range) => {
                setSelectedPriceRange(range);
                setCurrentPage(1);
              }}
              selectedRating={selectedRating}
              onRatingChange={(r) => {
                setSelectedRating(r);
                setCurrentPage(1);
              }}
              availability={availability}
              onAvailabilityChange={(val: AvailabilityOption) => {
                setAvailability(val);
                setCurrentPage(1);
              }}
              promotion={promotion}
              onPromotionChange={(val: PromotionOption) => {
                setPromotion(val);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {filteredProductsCount} Products Found
              </h2>
              <div className="mt-2 sm:mt-0">
                <SortingHeader
                  sortBy={sortBy}
                  onSortChange={(val: SortOption) => {
                    setSortBy(val);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" />

            {activeFilters.length > 0 && (
              <ActiveFilters
                activeFilters={activeFilters}
                onClearAll={clearAllFilters}
                onRemove={removeFilter}
              />
            )}

            <ProductGrid products={paginatedProducts} />

            {totalPages > 1 && (
              <div className="mt-10">
                <Pagination
                  currentPage={currentPage}
                  totalItems={filteredProductsCount}
                  itemsPerPage={9}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <aside
          aria-label="Filter drawer"
          role="dialog"
          className={`
            fixed top-0 right-0 h-full w-full sm:max-w-sm
            bg-white/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)]
            border-l border-amber-100
            transform transition-transform duration-300 z-50 flex flex-col
            ${isFilterOpen ? "translate-x-0" : "translate-x-full"}
          `}
          ref={drawerRef}
        >
          {/* Header */}
          <header className="flex justify-between items-center px-6 py-5 border-b border-amber-200">
            <h2 className="text-3xl font-extrabold text-amber-600 tracking-tight font-playfair">
              Filters
            </h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              aria-label="Close filters drawer"
              className="p-2 rounded-full hover:bg-amber-100 active:scale-95 transition"
            >
              <XMarkIcon className="h-7 w-7 text-amber-600" />
            </button>
          </header>

          {/* Filters Content */}
          <section
            className="flex-1 overflow-y-auto px-6 py-6 space-y-6
            max-h-[calc(100vh-150px)] scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent"
          >
            <Filters
              minPrice={prices[0]}
              maxPrice={prices[1]}
              selectedPriceRange={selectedPriceRange}
              onPriceChange={(range) => {
                setSelectedPriceRange(range);
                setCurrentPage(1);
              }}
              selectedRating={selectedRating}
              onRatingChange={(r) => {
                setSelectedRating(r);
                setCurrentPage(1);
              }}
              availability={availability}
              onAvailabilityChange={(val: AvailabilityOption) => {
                setAvailability(val);
                setCurrentPage(1);
              }}
              promotion={promotion}
              onPromotionChange={(val: PromotionOption) => {
                setPromotion(val);
                setCurrentPage(1);
              }}
            />
          </section>

          <div className="px-6 py-5 border-t border-amber-200 bg-white/90 backdrop-blur-md rounded-b-[2rem] shadow-inner">
            {activeFilters.length > 0 && (
              <button
                onClick={() => {
                  clearAllFilters();
                  setIsFilterOpen(false);
                }}
                className="w-full py-3 rounded-xl text-amber-600 font-semibold hover:bg-amber-100 transition"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </aside>
      )}
      <Footer />
    </>
  );
}
