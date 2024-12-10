import React from 'react';
import { useCart } from '../state/CartProvider';

export default function AddToCart({ product }) {
  const { addToCart } = useCart();

  const handleClick = () => {
    console.log('Adding to cart:', product); // Debugging log
    addToCart(product);
  };

  return (
    <button
      className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black"
      onClick={handleClick}
    >
      Add to Cart
    </button>
  );
}


const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
  const existingItemIndex = state.findIndex((item) => item.id === action.payload.id);

  if (existingItemIndex !== -1) {
    
    const updatedState = state.map((item) =>
      item.id === action.payload.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    return updatedState;
  }

  return [...state, { ...action.payload, quantity: 1 }];

    case 'UPDATE_ITEM_QUANTITY':
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.id !== action.payload.id);

    default:
      return state;
  }
};