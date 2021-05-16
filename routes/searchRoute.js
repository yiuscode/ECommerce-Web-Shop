import express from 'express';
import Product from '../models/productModel.js';


const router = express.Router();


router.get("/:keyword", async (req, res) => {
    const products = await Product.find({name: {$regex: new RegExp(req.params.keyword, "ig")}});
    res.send(products);
})










export default router;