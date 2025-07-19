
/**
 * @interface CategoryTabsProps
 * @property {string} activeCategory - The currently active category.
 * @property {function} onCategoryChange - Callback function to handle category changes.
 */
interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

/**
 * @component CategoryTabs
 * @description
 * A React component that renders a set of category like tabs for filtering products (eg.. electronics, clothing, etc.).
 * @param {CategoryTabsProps} props - The properties for the CategoryTabs component. 
 */
const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const CATEGORIES = [
    { id: "all", name: "All", icon: "🌟" },
    { id: "men's clothing", name: "Men's Clothing", icon: "👕" },
    { id: "jewelery", name: "Jewelry", icon: "💍" },
    { id: "electronics", name: "Electronics", icon: "💻" },
    { id: "women's clothing", name: "Women's Clothing", icon: "👗" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 py-4">
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category.id;

        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 border
              ${
                isActive
                  ? "bg-amber-500 text-white border-amber-500"
                  : "bg-white text-gray-800 border-gray-200 hover:bg-amber-50 hover:border-amber-300"
              }
              focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
            `}
          >
            <span className="text-base">{category.icon}</span>
            <span className="hidden sm:inline">{category.name}</span>

            {isActive && (
              <span
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-orange-600 rounded-full"
                aria-hidden
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;
