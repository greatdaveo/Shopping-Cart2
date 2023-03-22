import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "../reducer/cartReducer";

const initialState = {
  cartList: [],
  total: 0,
};

const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
  // useReducer
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // TO ADD TO CART
  const addToCart = (product) => {
    const updatedCardList = state.cartList.concat(product);
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        products: updatedCardList,
      },
    });
  };

  // TO REMOVE FROM CART
  const removeFromCart = (product) => {
    const updatedCartList = state.cartList.filter(
      (currentProduct) => currentProduct.id === product.id
    );
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        products: updatedCartList,
      },
    });
  };

  const value = {
    total: state.total,
    cartList: state.cartList,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  return context;
};
