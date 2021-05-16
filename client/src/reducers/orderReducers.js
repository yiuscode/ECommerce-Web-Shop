import { ORDERS_FETCH_FAIL, ORDERS_FETCH_REQUEST, ORDERS_FETCH_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_FETCH_FAIL, ORDER_FETCH_REQUEST, ORDER_FETCH_SUCCESS } from "../constants/orderConstants";




function orderCreateReducer(state = { order:{}}, action) {

    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:

            return {loading:false, success: true, order: action.payload};
        case ORDER_CREATE_FAIL:
            return{loading:false, error: action.payload}
            
        case ORDER_CREATE_RESET:
            return{}
        default:
            return state;
    }
}

function orderFetchReducer(state = { order:{}}, action) {

    switch (action.type) {
        case ORDER_FETCH_REQUEST:
            return { loading: true };
        case ORDER_FETCH_SUCCESS:
            return {loading:false, success: true, order: action.payload};
        case ORDER_FETCH_FAIL:
            return{loading:false, error: action.payload}

        default:
            return state;
    }
}

function ordersFetchReducer(state = { orders:{}}, action) {

    switch (action.type) {
        case ORDERS_FETCH_REQUEST:
            return { loading: true };
        case ORDERS_FETCH_SUCCESS:
            return {loading:false, success: true, orders: action.payload};
        case ORDERS_FETCH_FAIL:
            return{loading:false, error: action.payload}

        default:
            return state;
    }
}

export {orderCreateReducer,orderFetchReducer,ordersFetchReducer}