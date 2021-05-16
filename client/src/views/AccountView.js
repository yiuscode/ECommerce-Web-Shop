import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";



import { motion } from "framer-motion";
import { pageTransitiion } from "../config/pageTransition";
import { pageVariants } from "../config/pageVariants";
import { ordersFetch } from "../actions/orderActions";

function AccountView(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const fetchedOrders = useSelector((state) => state.fetchedOrders);
  const { loading, orders, error } = fetchedOrders;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      props.history.push("/");
    }
    else{
      dispatch(ordersFetch(userInfo._id));
    }
    
  }, [userInfo, dispatch, props.history]);

  return loading ? (
    <div className="loader"></div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <motion.div
      className="cart"
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitiion}
    >
      <div className="orders-table-wrapper">
        {!orders ? (
          <div id="warning">
            <span>Your order history is empty.</span>

            <span>You can click one of our most popular categories.</span>
          </div>
        ) : (
          <div>
            <span id="title">Your order:</span>
            <table className="orders-table">
                        <thead>
                            <tr className="">
                                <th className="">
                                    <span>ID</span>
                                </th>
                                <th className="">
                                    <span>Date</span>
                                </th>
                                <th className="">
                                    <span>Item(s)</span>
                                </th>
                                <th className="">
                                    <span>Address</span>
                                </th>
                                <th className="">
                                    <span>Total Price</span>
                                </th>
                                <th className="">
                                    <span>Status</span>
                                </th>
                                <th className="">
                                    <span>Tracking</span>
                                </th>

                            </tr>
                        </thead>
                        <tbody >
                           
                            {orders.map((order) => (
                                <tr className="" key={order._id}>
                                    <td id="id" key={order._id + '1'}>
                                        <Link to={'/order/'+order._id} >{order._id}</Link>
                                    </td>
                                    <td id="time" key={order._id + '2'}>
                                        {order.time.slice(0,10)}
                                    </td>
                                    <td id="items" key={order._id + '3'}>
                                        {
                                            
                                            order.orderItems.map((item) => (
                                                <div key={item.name}>
                                                <Link to={'/products/'+item.product}>{item.name}</Link></div>
                                            )
                                            )
                                        }
                                    </td>
                                    <td id="address" key={order._id + '4'}>
                                        {order.shippingInfo.address}, {order.shippingInfo.suburb}, {order.shippingInfo.state}, {order.shippingInfo.postcode}
                                    </td>
                                    <td id="price" key={order._id + '5'}>
                                        {order.totalPrice}
                                    </td>
                                    <td id="status" key={order._id + '6'}>
                                        {order.status}
                                    </td>
                                    <td id="tracking" key={order._id + '7'}>
                                        {order.trackingNum}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default AccountView;
