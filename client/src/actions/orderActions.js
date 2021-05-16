import axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import { ORDERS_FETCH_FAIL, ORDERS_FETCH_REQUEST, ORDERS_FETCH_SUCCESS, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_FETCH_FAIL, ORDER_FETCH_REQUEST, ORDER_FETCH_SUCCESS } from "../constants/orderConstants";

const orderCreate = (order) => async (dispatch, getState) => {

    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    
    try {
        const { userSignin: { userInfo }, } = getState();
        const { data } = await axios.post("/api/orders/", order, {
            headers: {
                'Authorization': userInfo.token
            }});

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        dispatch({ type: CART_EMPTY });
        localStorage.removeItem('cartItems');
    }
    catch (error) {
    }

}

const orderFetch = (orderID) => async (dispatch, getState) => {
    dispatch({ type: ORDER_FETCH_REQUEST, payload: orderID });
    const id = orderID;
    
    try {
        const { userSignin: { userInfo }, } = getState();
        const { data } = await axios.post("/api/orders/getorder/", {
            id
        }, {
            headers: {
                'Authorization': userInfo.token
            }});
        dispatch({ type: ORDER_FETCH_SUCCESS, payload: data.order });

    }
    catch (e) {
        console.log(e.message);
        dispatch({type: ORDER_FETCH_FAIL, payload: e.message});
    }

}


const ordersFetch = (userID) => async (dispatch, getState) => {
    dispatch({ type: ORDERS_FETCH_REQUEST, payload: userID });
    const id = userID;
    
    try {
        const { userSignin: { userInfo }, } = getState();
        const { data } = await axios.post("/api/orders/getorders/", {
            id
        }, {
            headers: {
                'Authorization': userInfo.token
            }});
        dispatch({ type: ORDERS_FETCH_SUCCESS, payload: data.orders });

    }
    catch (e) {
        console.log(e.message);
        dispatch({type: ORDERS_FETCH_FAIL, payload: e.message});
    }

}



export { orderCreate, orderFetch, ordersFetch}