import axios from 'axios';
import { SEARCH_PRODUCT_FAIL, SEARCH_PRODUCT_REQUEST, SEARCH_PRODUCT_SUCCESS } from '../constants/searchConstants';


const searchProducts = (keyword) => async (dispatch) => {
    try{
        dispatch({type: SEARCH_PRODUCT_REQUEST});
        const {data} = await axios.get("/api/search/"+keyword);
        dispatch({type: SEARCH_PRODUCT_SUCCESS, payload: data});
    }
    catch(e){
        dispatch({type: SEARCH_PRODUCT_FAIL, payload: e.message});
    }
}

export{ searchProducts}