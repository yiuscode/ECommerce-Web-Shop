import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { orderCreate } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { motion } from "framer-motion";
import { pageTransitiion } from "../config/pageTransition";
import { pageVariants } from "../config/pageVariants";


function PaymentView(props) {




    const createdOrder = useSelector((state) => state.createdOrder);
    const { success, order } = createdOrder;



    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch();
    const [payment, setPayment] = useState(false);
    cart.totalPrice =
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
        ;



    useEffect(() => {
        if (success) {
            dispatch({ type: ORDER_CREATE_RESET });
            props.history.push('/order/' + order._id + "?redirect=payment");
        }
        return () => {

        }
    }, [success, dispatch, props.history])

    const paymentHandler = (method) => {
        dispatch(savePayment(method));
    }
    const placeOrderHandler = () => {

        dispatch(orderCreate({ ...cart, orderItems: cart.cartItems }));

    }




    return (

        <motion.div className="order-container" initial="out"
            animate="in"
            exit="out" variants={pageVariants} transition={pageTransitiion}>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>

            <div className="order-wrapper">

                <div className="order-info">
                    <table className="order-content">
                        <caption><span id="title">Your Order:</span></caption>
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
                            {(
                                cartItems.map((item) => (
                                    <tr className="" key={item.id}>
                                        <td id="desc">
                                            <Link to={"/products/" + item.id}><img src={ '/images/'+item.image+'.png'} alt="productimg"></img><span id="productdesc">{item.name}</span></Link>
                                        </td>
                                        <td id="price">
                                            <span >{'$' + item.price}</span>
                                        </td>
                                        <td id="qty">

                                            {item.qty}

                                        </td>

                                    </tr>
                                ))
                            )}



                        </tbody>
                    </table>
                </div>


                <div className="order-payment">
                    <span>Select Payment Method:</span>
                    <form>
                        <input type="radio" onClick={(e) => { paymentHandler(e.target.value); setPayment(true) }} value="paypal" name="payment" required></input><label>Paypal</label>
                    </form>



                </div>

                <div className="order-bottom">
                    <div className="order-deliver">

                        <ul>
                            <li key='1'>
                                Ship to:
    </li>
                            <li key='2'>
                                {cart.shippingInfo.address}, {cart.shippingInfo.suburb}, {cart.shippingInfo.state}, {cart.shippingInfo.postcode}
                            </li>
                            <li key='3'>
                                {cart.shippingInfo.firstName} {cart.shippingInfo.lastName}
                            </li>
                        </ul>

                    </div>
                    <div className="order-action">
                        <ul>
                            <li key='1'>
                                GST:          ${~~(cartItems.reduce((a, c) => a + c.price * c.qty, 0) / 11)}
                            </li>
                            <li key='2' id="total">
                                Total Price:          ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                            </li>
                            <li key='3'>
                                <button className="button primary" onClick={() => placeOrderHandler()} disabled={!payment}>Checkout</button>
                            </li>
                        </ul>
                    </div>


                </div>






            </div>

        </motion.div>
    )
}

export default PaymentView;