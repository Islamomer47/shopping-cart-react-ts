import type { CartItemModel, Product } from "@/types";

/**
 * @type CartState
 * @property {CartItemModel[]} items - An array of items in the cart.
 */
export type CartState = {
  items: CartItemModel[];
};

/**
 * @type CartAction
 * @property {string} type - The type of action to perform in the cart reducer.
 * @property {Product | number | CartItemModel[]} payload - The payload to be sent along the action type in the reducer.
 */
export type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "INCREASE_QUANTITY"; payload: number }
  | { type: "DECREASE_QUANTITY"; payload: number }
  | { type: "LOAD_FROM_STORAGE"; payload: CartItemModel[] };

  /**
   * @reducer cartReducer
   * @description
   * A reducer function that manages the state of the shopping cart.
   * It handles actions such as adding items, removing items, increasing or decreasing quantities, and loading the cart from storage.
   * @param {CartState} state - The current state of the cart.
   * @param {CartAction} action - The action to be performed on the cart state
   * @returns {CartState} - The new state of the cart after applying the action.
   */
export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "LOAD_FROM_STORAGE":
      return { items: action.payload };

    case "ADD_TO_CART": {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) {
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case "REMOVE_FROM_CART":
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "INCREASE_QUANTITY":
      return {
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    default:
      return state;
  }
};
