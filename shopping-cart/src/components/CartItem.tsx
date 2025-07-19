import type { CartItemModel } from "../types";
import { useCart } from "@/context/CartContext";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

/**
 * @interface CartItemProps
 * @property {CartItemModel} item - The cart item to be displayed.
 */
interface CartItemProps {
  item: CartItemModel;
}

/**
 * @component CartItem
 * @description
 * A React component that renders an Item that is then displayed in the cart side drawer.
 * @param {CartItemProps} props - The properties for the CartItem component.
 */
export default function CartItem({ item }: CartItemProps) {
  const { dispatch } = useCart();

  return (
    <div className="flex gap-4 items-center border border-amber-200 rounded-2xl p-4 shadow-sm bg-white/80 backdrop-blur-sm ">
      <img
        src={item.image}
        alt={item.title}
        className="w-16 h-16 object-contain rounded-xl border border-amber-100"
      />
      <div className="flex-1">
        <h4 className="text-sm font-semibold line-clamp-2 text-gray-800">
          {item.title}
        </h4>
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() =>
              dispatch({ type: "DECREASE_QUANTITY", payload: item.id })
            }
            className="p-1 rounded-full bg-amber-100 hover:bg-amber-200 transition"
            aria-label={`Decrease quantity of ${item.title}`}
          >
            <MinusIcon className="h-4 w-4 text-amber-600" />
          </button>
          <span className="text-sm font-medium text-amber-700">
            {item.quantity}
          </span>
          <button
            onClick={() =>
              dispatch({ type: "INCREASE_QUANTITY", payload: item.id })
            }
            className="p-1 rounded-full bg-amber-100 hover:bg-amber-200 transition"
            aria-label={`Increase quantity of ${item.title}`}
          >
            <PlusIcon className="h-4 w-4 text-amber-600" />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="text-sm font-bold text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        <button
          onClick={() =>
            dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
          }
          className="text-red-600 hover:text-red-800 transition"
          aria-label={`Remove ${item.title} from cart`}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
