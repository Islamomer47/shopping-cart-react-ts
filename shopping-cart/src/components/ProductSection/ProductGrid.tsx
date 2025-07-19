import ProductCard from "./ProductCard";
import type { Product } from "@/types";

/**
 * @interface ProductGridProps
 * @property {Product[]} products - An array of products to display in the grid.
 */
interface ProductGridProps {
  products: Product[];
};

/**
 * @component ProductGrid
 * @description
 * A React component that renders a grid that contains the product cards.
 * @param {ProductGridProps} props - The properties for the ProductGrid component.
 * @returns {JSX.element} that could either represent the products or a message that indicates that their are no products (this may vary according to filters).
 */
export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="col-span-full text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-xl text-gray-600">No products match your filters</p>
        <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
