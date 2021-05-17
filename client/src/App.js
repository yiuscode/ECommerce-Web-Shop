import "./App.css";

import HomeView from "./views/HomeView.js";
import ProductView from "./views/ProductView.js";
import CartView from "./views/CartView.js";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useHistory 
} from "react-router-dom";
import SigninView from "./views/SigninView";
import { useDispatch, useSelector } from "react-redux";
import RegisterView from "./views/RegisterView";
import { useEffect, useState } from "react";
import ShippingView from "./views/ShippingView";
import PaymentView from "./views/PaymentView";
import OrderView from "./views/OrderView";


import { AnimatePresence, } from "framer-motion";
import { logout } from "./actions/userActions";
import AccountView from "./views/AccountView";
import ManageView from "./views/ManageView";
import SearchView from "./views/SearchView";

//The main part of the website

function App(props) {
  const location = useLocation();
  const history = useHistory()
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [searchKeyword, setSearchKeyword] = useState('');
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    return () => { };
  }, [userInfo]);

  //components
  return (
    <div id="grid-container" className="grid-container">

      <header className="header">
        <div className="header-top">
          <Link to={"/cart/"}>Cart ({cartItems.length})</Link>
          {userInfo && <Link to="/account">Account</Link>}
          {userInfo && userInfo.isAdmin && <Link to="/manage">Manage</Link>}
          <Link
            {...(userInfo
              ? { onClick: () => logoutHandler(), to: "/" }
              : { to: "/signin" })}
          >
            {userInfo ? "Logout" : "Sign In"}
          </Link>
        </div>
        <div className="header-bottom">
          <Link to="/">PC-Expert</Link>
          <div className="search"><input type="text" onChange={(e) => setSearchKeyword(e.target.value)}></input>
            <button onClick={()=>history.push('/search?keyword='+searchKeyword)}>Search</button></div>

        </div>
      </header>

      <main id="main" className="main">
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route path="/account" component={AccountView} />
            <Route path="/manage" component={ManageView} />
            <Route path="/search" component={SearchView} />
            <Route path="/products/:id" component={ProductView} />
            <Route path="/cart/:id?" component={CartView} />
            <Route path="/signin" component={SigninView} />
            <Route path="/register" component={RegisterView} />
            <Route path="/shipping" component={ShippingView} />
            <Route path="/payment" component={PaymentView} />
            <Route path="/order/:id" component={OrderView} />
            <Route path="/" exact={true} component={HomeView} />
          </Switch>
        </AnimatePresence>
      </main>
      <footer className="footer"><div>Copyright © 2021. All Rights Reserved. Terms and Conditions | Privacy Statement</div><div>Email: yiuswong@outlook.com  |  Github: https://github.com/yiuscode/</div></footer>
    </div>
  );
}

export default App;
