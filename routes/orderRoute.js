import express from 'express';
import Product from '../models/productModel.js';
import { getToken, isAdmin, isAuth } from '../util.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';


const router = express.Router();


router.post( '/', isAuth, expressAsyncHandler(async (req, res) => {

    const order = new Order({
        userid: req.user._id,
        orderItems: req.body.orderItems,
        shippingInfo: req.body.shippingInfo,
        paymentMethod: req.body.paymentMethod,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice
        });
    const createdOrder = await order.save();
    res
    .status(201)
    .send({ message: 'New Order Created', order: createdOrder });

}));

router.post( '/getorder/', isAuth,  async(req, res) => {
    const orderID = req.body.id;
    try {
        const order = await Order.findById(
            orderID,
        );
        res
        .status(201)
        .send({ message: 'Order found', order: order });

    } catch (error) {
        res.send({ msg: error.message });
    }
});

router.post( '/getorders/', isAuth,  async(req, res) => {
    const userID = req.body.id;
    try {
        const orders = await Order.find( {} ).where('userid').in(userID).exec();
        res
        .status(201)
        .send({ message: 'Orders found', orders: orders });

    } catch (error) {
        res.send({ msg: error.message });
    }
});







export default router;