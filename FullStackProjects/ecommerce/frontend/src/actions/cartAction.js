import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";
import axios from "axios";

// add to cart
export const addItemsToCart =
  (productId, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${productId}`);
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        image: data.product.images[0].imageUrl,
        quantity: quantity,
        stock: data.product.stock,
        price: data.product.price,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

// remove from the cart
export const removeItemsFromCart = (productId) => async (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: productId });
};

// save Shipping Info
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_INFO, payload: data });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
