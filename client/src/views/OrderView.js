import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { pageTransitiion } from "../config/pageTransition";
import { pageVariants } from "../config/pageVariants";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { orderFetch } from "../actions/orderActions";
import CheckoutSteps from '../components/CheckoutSteps';


function OrderView(props) {

    const fetchedOrder = useSelector((state) => state.fetchedOrder);
    const { loading, order, error } = fetchedOrder;
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    const dispatch = useDispatch();
    const orderID = props.match.params.id;




    useEffect(() => {
        dispatch(orderFetch(orderID));

        return () => {

        }
    }, [dispatch, orderID])



    return loading ? <div className="loader"></div> :
        error ? <div>{error}</div> : (
            <motion.div className="order-result" initial="out"
                animate="in"
                exit="out" variants={pageVariants} transition={pageTransitiion}>

                {redirect !== "/" && (<div>                <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

                    <h2>Thank You!</h2>
                    <h4>Your order  has been placed. </h4>
                    <h4>Your item(s) will be with you shortly</h4></div>)}



                <div className="order-summary-container">

                    <ul >
                        <li id="title" key='1'>
                            Order summary:
                        </li>
                        <li key='2'>
                            Ship to:
                        </li>
                        <li>
                            {typeof (order) !== 'undefined' && order.shippingInfo.address + ', ' + order.shippingInfo.suburb + ', ' + order.shippingInfo.state + ', ' + order.shippingInfo.postcode}
                        </li>
                        <li key='3'>
                            {typeof (order) !== 'undefined' && order.shippingInfo.firstName + ' ' + order.shippingInfo.lastName}

                        </li>

                    </ul>

                    <table className="order-summary">




                        <thead>
                            <tr className="">
                                <th className="">
                                    <span>Item</span>
                                </th>
                                <th className="">
                                    <span>Price</span>
                                </th>
                                <th className="">
                                    <span>Qty</span>
                                </th>

                            </tr>
                        </thead>
                        <tbody >
                            {order && order.orderItems.map((item) => (
                                <tr className="" key={item.id}>
                                    <td id="desc" key={item.id}>
                                        <Link to={"/products/" + item.id}><img src={ '/images/'+item.image+'.png'} alt="productimg"></img><span id="productdesc">{item.name}</span></Link>
                                    </td>
                                    <td id="price" key={item.id}>
                                        <span >{'$' + item.price}</span>
                                    </td>
                                    <td id="qty" key={item.id}>

                                        {item.qty}

                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="order-price">
                        <ul>
                            <li key='1'>
                                GST: $          {typeof (order) !== 'undefined' && ~~(order.orderItems.reduce((a, c) => a + c.price * c.qty, 0) / 11)}
                            </li>
                            <li key='2' id="total">
                                Total Price: $          {typeof (order) !== 'undefined' && order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)}
                            </li>

                        </ul>
                    </div>

                </div>





            </motion.div>




        )
}

export default OrderView;
