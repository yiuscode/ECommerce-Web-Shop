import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart, removeFromCart } from "../actions/cartActions";

import { motion } from "framer-motion";
import { pageTransitiion } from "../config/pageTransition";
import { pageVariants } from "../config/pageVariants";

function CartView(props) {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const productID = props.match.params.id;
    const qty = props.location.search
        ? Number(props.location.search.split("=")[1])
        : 1;
    const dispatch = useDispatch();

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkOutHandler = () => {
        props.history.push('/shipping');
    }

    useEffect(() => {
        if (productID) {
            dispatch(addToCart(productID, qty));

            props.history.push('/cart/')
        }
    }, [productID, dispatch, qty, props.history]);

    return (
        <motion.div
            className="cart"
            initial="out"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransitiion}>
            <div className="cart-table-wrapper">
                {cartItems.length === 0 ? (
                    <div id="warning"><span>Your shopping cart is empty.</span>

                        <span>You can click one of our most popular categories.</span></div>
                ) : (
                    <div><span id="title">Shopping Cart:</span>
                        <table className="cart-content">
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
                                    <th className="">

                                    </th>
                                </tr>
                            </thead>
                            <tbody >
                                {cartItems.map((item) => (
                                    <tr className="" key={item.id} >
                                        <td id="desc">
                                            <Link to={"/products/" + item.id}><img src={'/images/' + item.image + '.png'} alt="productimg"></img><span id="productdesc">{item.name}</span></Link>
                                        </td>
                                        <td id="price">
                                            <span >{'$' + item.price}</span>
                                        </td>
                                        <td id="qty">
                                            <select
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToCart(item.id, e.target.value))}
                                                style={{ display: "inline" }}
                                            >
                                                {[...Array(item.countInStock).keys()].map((i) => (
                                                    <option key={i + 1} value={i + 1} >
                                                        {i + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td >
                                            <img className="remove" src="/images/remove.png" onClick={() => removeFromCartHandler(item.id)} alt="remove"></img>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                        <div className="cart-action">
                            <span>Total Price:          ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</span>
                            <button className="button primary" onClick={() => checkOutHandler()} disabled={!cartItems.length}>Checkout</button>
                        </div></div>

                )}



            </div>


        </motion.div>
    );
}

export default CartView;
