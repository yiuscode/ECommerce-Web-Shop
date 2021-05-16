import { SEARCH_PRODUCT_FAIL, SEARCH_PRODUCT_REQUEST, SEARCH_PRODUCT_SUCCESS } from "../constants/searchConstants";


function searchProductReducer(state = { products: [] }, action) {

    switch (action.type) {
        
        case SEARCH_PRODUCT_REQUEST:
            return { loading: true, products: []};
        case SEARCH_PRODUCT_SUCCESS:
            return {loading:false, products: action.payload};
        case SEARCH_PRODUCT_FAIL:
            return{loading:false, error: action.payload}
        default:
            return state;
    }
}
export {searchProductReducer}