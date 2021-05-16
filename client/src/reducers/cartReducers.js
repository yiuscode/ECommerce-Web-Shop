import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPPING } from "../constants/cartConstants";

function cartReducer(state = { cartItems: [], shipping:{}, payment:{} }, action) {

    

    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x => x.id === item.id);

            if (product) {
                return { cartItems: state.cartItems.map(x => x.id === product.id ? item : x) }
            }
            return { ...state, cartItems: [...state.cartItems, item] }

        case CART_REMOVE_ITEM:
            return {cartItems: state.cartItems.filter(x => x.id !== action.payload)}
       
        case CART_EMPTY:
            return { ...state, error: '', cartItems: [] };

        case CART_SAVE_SHIPPPING:
            return {...state, shippingInfo: action.payload}
            
        case CART_SAVE_PAYMENT:
            return {...state, paymentMethod: action.payload}

        default:
            return state
    }
}

export { cartReducer }