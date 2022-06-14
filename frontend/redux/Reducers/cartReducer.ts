import {ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART,} from "../Actions/cartActions";
import {Reducer} from "react";
import {CartItemType, DataStore} from "../../types";

const initialState: DataStore = {
    cartItems: []
};


const cartReducer: Reducer<DataStore, { type: string, payload: CartItemType | string }> = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {...state, cartItems: [...state.cartItems, {...action.payload, cartId: Math.random()}]};
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((cartItem: any) => cartItem.cartId !== action.payload)
            };
        case CLEAR_CART:
            return (state = initialState);
        default:
            return state;
    }

};

export default cartReducer;