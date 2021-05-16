import axios from "axios";
import Cookies from 'js-cookie';
import { CART_EMPTY } from "../constants/cartConstants";
import { USER_LOGOUT, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_SUCCESS, USERS_FETCH_REQUEST, USERS_FETCH_FAIL, USERS_FETCH_SUCCESS, USER_REMOVE_REQUEST, USER_REMOVE_SUCCESS, USER_REMOVE_FAIL, USER_LOGOUT2 } from "../constants/userConstants";

const signin = (email, password) => async (dispatch) => {

    try {
        const { data } = await axios.post("/api/users/signin", { email, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        Cookies.set("userInfo", JSON.stringify(data));
    }
    catch (error) {
        dispatch({type: USER_SIGNIN_FAIL, payload: error.message});
    }
}

const logout = () =>  (dispatch) => {
    dispatch({ type: CART_EMPTY });
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_LOGOUT2 });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');


}





const register = (firstName, lastName,address, suburb, postcode, state, email, password) => async (dispatch) => {

    try {
        const { data } = await axios.post("/api/users/register", { firstName, lastName,address, suburb, postcode, state, email, password });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        Cookies.set("userInfo", JSON.stringify(data));

    }
    catch (error) {
        dispatch({type: USER_REGISTER_SUCCESS, payload: error.message});
    }
}


const usersFetch = () => async (dispatch, getState) => {
    dispatch({ type: USERS_FETCH_REQUEST, payload: {} });

    try {
        const { userSignin: { userInfo }, } = getState();
        const { data } = await axios.post("/api/users/getusers/", null, {
            headers: {
                'Authorization': userInfo.token
            }});
        dispatch({ type: USERS_FETCH_SUCCESS, payload: data.users });

    }
    catch (e) {
        console.log(e.message);
        dispatch({type: USERS_FETCH_FAIL, payload: e.message});
    }

}

const removeUser = (uid) => async (dispatch, getState) => {
    dispatch({ type: USER_REMOVE_REQUEST, payload: uid });

    try {
        const { userSignin: { userInfo }, } = getState();
        const { data } = await axios.delete("/api/users/remove/"+uid,  {
            headers: {
                'Authorization': userInfo.token
            }});
        dispatch({ type: USER_REMOVE_SUCCESS, payload: data });

    }
    catch (e) {
        console.log(e.message);
        dispatch({type: USER_REMOVE_FAIL, payload: e.message});
    }

}



export { signin, register, logout, usersFetch, removeUser}