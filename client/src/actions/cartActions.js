import axios from "axios";
import Cookies from 'js-cookie';
import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPPING } from "../constants/cartConstants";

const addToCart = (productID, qty) => async (dispatch, getState) => {

    try {
        const { data } = await axios.get("/api/products/id/" + productID);
        dispatch({
            type: CART_ADD_ITEM, payload: {
                id: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                desc: data.description,
                countInStock: data.countInStock,
                qty,
                product: data._id
            }
        });
        const {cart: {cartItems}} = getState();
        Cookies.set("cartItems", JSON.stringify(cartItems));
    }
    catch (error) {
    }


}

const removeFromCart = (productID) => (dispatch) => {

    const cart = JSON.parse(Cookies.get('cartItems', { id: productID }));
    Cookies.set("cartItems", JSON.stringify(cart.filter(x => x.id !== productID)));
    
    dispatch({ type: CART_REMOVE_ITEM, payload: productID })
}
const CartEmpty = () => (dispatch) => {
    dispatch({ type: CART_EMPTY })
}

const saveShipping = (shippingInfo) => (dispatch, getState) => {
    dispatch({ type: CART_SAVE_SHIPPPING, payload: shippingInfo })
}

const savePayment = (paymentMethod) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT, payload: paymentMethod })
}

export { addToCart, removeFromCart,saveShipping,savePayment,CartEmpty }