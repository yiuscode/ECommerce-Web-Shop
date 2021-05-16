import { PRODUCT_CAT_FAIL, PRODUCT_CAT_REQUEST, PRODUCT_CAT_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_REMOVE_FAIL, PRODUCT_REMOVE_REQUEST, PRODUCT_REMOVE_SUCCESS } from "../constants/productConstants";




function productRemoveReducer(state = {}, action) {

    switch (action.type) {
        
        case PRODUCT_REMOVE_REQUEST:
            return { loading: true };
        case PRODUCT_REMOVE_SUCCESS:
            return {loading:false, success: true, productInfo: action.payload};
        case PRODUCT_REMOVE_FAIL:
            return{loading:false, error: action.payload}
        default:
            return state;
    }
}

function productCreateReducer(state = {}, action) {

    switch (action.type) {
        
        case PRODUCT_CREATE_REQUEST:
            return { loading: true };
        case PRODUCT_CREATE_SUCCESS:
            return {loading:false, success: true, productInfo: action.payload};
        case PRODUCT_CREATE_FAIL:
            return{loading:false, error: action.payload}
        default:
            return state;
    }
}





function productListReducer(state = { products: [] }, action) {

    switch (action.type) {
        
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: []};
        case PRODUCT_LIST_SUCCESS:
            return {loading:false, products: action.payload};
        case PRODUCT_LIST_FAIL:
            return{loading:false, error: action.payload}
        default:
            return state;
    }
}

function productCatReducer(state = { products: [] }, action) {

    switch (action.type) {
        
        case PRODUCT_CAT_REQUEST:
            return { loading: true };
        case PRODUCT_CAT_SUCCESS:
            return {loading:false, products: action.payload};
        case PRODUCT_CAT_FAIL:
            return{loading:false, error: action.payload}
        default:
            return state;
    }
}


function productDetailsReducer(state = { product: {} }, action) {

    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false, product: action.payload};
        case PRODUCT_DETAILS_FAIL:
            return{loading:false, error: action.payload}
        default:
            return state;
    }
}

export {productListReducer, productDetailsReducer, productCatReducer, productCreateReducer, productRemoveReducer}