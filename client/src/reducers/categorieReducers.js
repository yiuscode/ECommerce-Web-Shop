import { CATEGORIE_CREATE_FAIL, CATEGORIE_CREATE_REQUEST, CATEGORIE_CREATE_SUCCESS, CATEGORIE_LIST_FAIL, CATEGORIE_LIST_REQUEST, CATEGORIE_LIST_SUCCESS, CATEGORIE_REMOVE_FAIL, CATEGORIE_REMOVE_REQUEST, CATEGORIE_REMOVE_SUCCESS } from "../constants/categorieConstants";

function categorieRemoveReducer(state = {}, action) {

    switch (action.type) {
        
        case CATEGORIE_REMOVE_REQUEST:
            return { loading: true };
        case CATEGORIE_REMOVE_SUCCESS:
            return {loading:false, success: true, categorieInfo: action.payload};
        case CATEGORIE_REMOVE_FAIL:
            return{loading:false, error: action.payload}
        default:
            return state;
    }
}

function categorieCreateReducer(state = {}, action) {

    switch (action.type) {
        
        case CATEGORIE_CREATE_REQUEST:
            return { loading: true };
        case CATEGORIE_CREATE_SUCCESS:
            return {loading:false, success: true, categorieInfo: action.payload};
        case CATEGORIE_CREATE_FAIL:
            return{loading:false, error: action.payload}
        default:
            return state;
    }
}

function categorieListReducer(state = { categories: [] }, action) {

    switch (action.type) {
        
        case CATEGORIE_LIST_REQUEST:
            return { loading: true, categories: []};
        case CATEGORIE_LIST_SUCCESS:
            return {loading:false, categories: action.payload};
        case CATEGORIE_LIST_FAIL:
            return{loading:false, error: action.payload}
        default:
            return state;
    }
}

export {categorieListReducer, categorieCreateReducer, categorieRemoveReducer}