import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { productCatReducer, productCreateReducer, productDetailsReducer, productListReducer, productRemoveReducer } from './reducers/produceReducers';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { cartReducer } from './reducers/cartReducers';
import { userRegisterReducers, usersFetchReducer, userSignReducers, usersRemoveReducer } from './reducers/userReducers';
import { orderCreateReducer, orderFetchReducer, ordersFetchReducer } from './reducers/orderReducers';
import { categorieCreateReducer, categorieListReducer, categorieRemoveReducer } from './reducers/categorieReducers';
import { searchProductReducer } from './reducers/searchReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;


const initialState = {cart: {cartItems}, userSignin: {userInfo}, userRegister: {userInfo}, fetchedOrder: {}, fetchedOrders: {}, fetchedUsers: {}, searchedProducts:{} };
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCat: productCatReducer,
    cart: cartReducer,
    userSignin: userSignReducers,
    userRegister: userRegisterReducers,
    productCreate: productCreateReducer,
    productRemove: productRemoveReducer,
    createdOrder: orderCreateReducer,
    fetchedOrder: orderFetchReducer,
    fetchedOrders: ordersFetchReducer,
    fetchedUsers: usersFetchReducer,
    userRemove: usersRemoveReducer,
    fetchedCategories: categorieListReducer,
    createdCategories: categorieCreateReducer,
    categoriesRemove: categorieRemoveReducer,
    searchedProducts: searchProductReducer

})
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOST__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;