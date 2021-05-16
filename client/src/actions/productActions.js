import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_CAT_REQUEST, PRODUCT_CAT_SUCCESS, PRODUCT_CAT_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_REMOVE_REQUEST, PRODUCT_REMOVE_SUCCESS, PRODUCT_REMOVE_FAIL } from "../constants/productConstants"
import axios from 'axios';


const createProduct = (product) => async (dispatch, getState) => {
    try{

        dispatch({type: PRODUCT_CREATE_REQUEST, payload: product});
        const {userSignin: {userInfo}} = getState();

        if(!product.id){
            const {data} = await axios.post("/api/products/", product, {
                headers: {
                    'Authorization': userInfo.token
                }});
                dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data});
        }
        else{
            const {data} = await axios.put("/api/products/" + product.id, product, {
                headers: {
                    'Authorization': userInfo.token
                }});
                dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data});
        }

    }
    catch(e){
        
        dispatch({type: PRODUCT_CREATE_FAIL, payload: e.message});

    }
}

const removeProduct = (productID) => async (dispatch, getState) => {
    try{

        dispatch({type: PRODUCT_REMOVE_REQUEST, payload: productID});
        const {userSignin: {userInfo}} = getState();

        const {data} = await axios.delete("/api/products/" + productID, {
            headers: {
                'Authorization': userInfo.token
            }});
            dispatch({type: PRODUCT_REMOVE_SUCCESS, payload: data});
    }
    catch(e){

        dispatch({type: PRODUCT_REMOVE_FAIL, payload: e.message});

    }
}




const listProducts = () => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_LIST_REQUEST});
        const {data} = await axios.get("/api/products/");
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    }
    catch(e){
        dispatch({type: PRODUCT_LIST_FAIL, payload: e.message});
    }
}

const listCats = (cat) => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_CAT_REQUEST});
        const {data} = await axios.get("/api/products/cat/"+cat);

        dispatch({type: PRODUCT_CAT_SUCCESS, payload: data});
    }
    catch(e){
        dispatch({type: PRODUCT_CAT_FAIL, payload: e.message});

    }
}


const detailsProduct = (productID) => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get("/api/products/id/"+productID);

        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    }
    catch(e){
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: e.message});

    }
}


export{ listProducts, detailsProduct, listCats, createProduct, removeProduct}