import { USERS_FETCH_FAIL, USERS_FETCH_REQUEST, USERS_FETCH_SUCCESS, USER_LOGOUT, USER_LOGOUT2, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REMOVE_FAIL, USER_REMOVE_REQUEST, USER_REMOVE_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../constants/userConstants";

function userSignReducers(state = {}, action) {

    
    switch (action.type) {
        
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            
            return {loading:false, userInfo: action.payload};
        case USER_SIGNIN_FAIL:
            return{loading:false, error: action.payload}
        case USER_LOGOUT:
            
            return{ }
        default:
            return state;
    }
}

function userRegisterReducers(state = {}, action) {

    switch (action.type) {
        
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return {loading:false, userInfo: action.payload};
        case USER_REGISTER_FAIL:
            return{loading:false, error: action.payload}
        case USER_LOGOUT2:

            return{ }
        default:
            return state;
    }
}


function usersFetchReducer(state = { users:{}}, action) {

    switch (action.type) {
        case USERS_FETCH_REQUEST:
            return { loading: true };
        case USERS_FETCH_SUCCESS:
            return {loading:false, success: true, users: action.payload};
        case USERS_FETCH_FAIL:
            return{loading:false, error: action.payload}

        default:
            return state;
    }
}

function usersRemoveReducer(state = {}, action) {

    switch (action.type) {
        case USER_REMOVE_REQUEST:
            return { loading: true };
        case USER_REMOVE_SUCCESS:
            return {loading:false, success: true, userInfo: action.payload};
        case USER_REMOVE_FAIL:
            return{loading:false, error: action.payload}

        default:
            return state;
    }
}

export {userSignReducers, userRegisterReducers, usersFetchReducer, usersRemoveReducer}