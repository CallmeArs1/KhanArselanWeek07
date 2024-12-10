import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  cartItems: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { product } = action;

         const existingItem = state.cartItems.find(item => item.id === product.id);

      if (existingItem) {
             return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 } // Increment quantity
              : item
          ),
        };
      } else {
              return {
          ...state,
          cartItems: [...state.cartItems, { ...product, quantity: 1 }],
        };
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.id),
      };

    case 'UPDATE_ITEM_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.id
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };

    default:
      return state;
  }
};


const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);


  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', id });
  };

  const updateItemQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_ITEM_QUANTITY', id, quantity });
  };

  const getCartCount = () => {
        return state.cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
       return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        getCartCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

