import {CartItemType} from "../../types";


export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";

export const addToCart = (payload: CartItemType) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

export const removeFromCart = (payload: string | undefined) => {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};