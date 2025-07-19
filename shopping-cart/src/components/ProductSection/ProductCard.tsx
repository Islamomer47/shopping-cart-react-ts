import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { useState } from "react";


/**
 * @interface ProductCardProps
 * @property {Product} product - The product object to display in the card.
 */
interface ProductCardProps  {
  product: Product;
};

/**
 * @component ProductCard
 * @description
 * A React component that dispays a product card with an image, title, price, rating, and an "Add to Cart" button with a hovering animation.
 * @param {ProductCardProps} props - The properties for the ProductCard component. 
 */
export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-amber-100 overflow-hidden ${
        isHovered ? "ring-2 ring-amber-400" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-500 bg-white p-4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
          ⭐ {product.rating?.rate ?? "N/A"}
        </div>

        {/* Discount*/}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-green-400 to-emerald-400 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
          20% OFF
        </div>
      </div>

      {/* content below image */}
      <div className="p-5 flex flex-col gap-4 h-full">
        {/* title */}
        <h3 className="font-medium text-gray-800 line-clamp-2 group-hover:text-amber-700 transition-colors text-sm min-h-[3.5rem]">
          {product.title}
        </h3>

        {/* price + add to cart Button  */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-800">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ${(product.price * 1.25).toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => {
              dispatch({ type: "ADD_TO_CART", payload: product });
              toast.success("Added to cart");
            }}
            className="group relative bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-2 rounded-xl hover:from-amber-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm "
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8"
                />
              </svg>
              Add to Cart
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
