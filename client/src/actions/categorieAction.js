import { CATEGORIE_LIST_FAIL, CATEGORIE_LIST_REQUEST, CATEGORIE_LIST_SUCCESS, CATEGORIE_CREATE_REQUEST, CATEGORIE_CREATE_SUCCESS, CATEGORIE_CREATE_FAIL, CATEGORIE_REMOVE_REQUEST, CATEGORIE_REMOVE_SUCCESS, CATEGORIE_REMOVE_FAIL } from "../constants/categorieConstants"
import axios from 'axios';


const createCategorie = (categorie) => async (dispatch, getState) => {
    try{

        dispatch({type: CATEGORIE_CREATE_REQUEST, payload: categorie});
        const {userSignin: {userInfo}} = getState();

        const {data} = await axios.post("/api/categories/", {
            categorie
        }, {
            headers: {
                'Authorization': userInfo.token
            }});
            dispatch({type: CATEGORIE_CREATE_SUCCESS, payload: data});

    }
    catch(e){
        
        dispatch({type: CATEGORIE_CREATE_FAIL, payload: e.message});

    }
}

const removeCategorie = (categorieID) => async (dispatch, getState) => {
    try{

        dispatch({type: CATEGORIE_REMOVE_REQUEST, payload: categorieID});
        const {userSignin: {userInfo}} = getState();

        const {data} = await axios.delete("/api/categories/" + categorieID, {
            headers: {
                'Authorization': userInfo.token
            }});
            dispatch({type: CATEGORIE_REMOVE_SUCCESS, payload: data});
    }
    catch(e){

        dispatch({type: CATEGORIE_REMOVE_FAIL, payload: e.message});

    }
}




const CategoriesFetch = () => async (dispatch) => {
    try{
        dispatch({type: CATEGORIE_LIST_REQUEST});
        const {data} = await axios.get("/api/categories/");
        dispatch({type: CATEGORIE_LIST_SUCCESS, payload: data});
    }
    catch(e){
        dispatch({type: CATEGORIE_LIST_FAIL, payload: e.message});
    }
}





export{ CategoriesFetch, createCategorie, removeCategorie}