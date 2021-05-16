import express from 'express';
import Product from '../models/productModel.js';
import { getToken, isAdmin, isAuth } from '../util.js';

const router = express.Router();


router.get("/", async (req, res) => {

    const products = await Product.find({});
    res.send(products);

})


router.post("/", async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            category: req.body.category,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price,
            brand: req.body.brand
        });
        const newProduct = await product.save();

        if (newProduct) {
            return res.status(201).send({ message: 'New product created.' });
        }


    } catch (error) {

        return res.status(500).send({ msg: 'Failed to create new product.' });
    }
})

router.put("/:id", isAuth, isAdmin, async (req, res) => {
    try {
        const product = await Product.findById(
            req.params.id
        );


        if (product){
            product.name = req.body.name;
            product.category= req.body.category;
            product.image= req.body.image;
            product.description= req.body.description;
            product.price= req.body.price;
            product.brand= req.body.brand;
            product.countInStock= req.body.countInStock;

            await product.save();
            res.status(201).send({ msg: "Product edited." });
        }
        else
            res.status(404).send({ msg: "Product not found..." });

    } catch (error) {

        return res.status(500).send({ msg: 'Failed to create new product.' });
    }
})

router.delete("/:id", async (req, res) => {
    try {



        const product = await Product.findById(req.params.id);

        if(product){
            await product.remove();
            res.status(201).send({ msg: "Product delete." });
        }

        

    } catch (error) {

        return res.status(500).send({ msg: 'Failed to delete product.' });
    }
})



router.get("/id/:id", async (req, res) => {
    const productID = req.params.id;

    try {
        const product = await Product.findById(
            productID,
        );
        if (product)
            res.send(product);
        else
            res.status(404).send({ msg: "Product not found..." });

    } catch (error) {

        res.send({ msg: error.message });
    }
})


router.get("/cat/:id", async (req, res) => {
    const catID = req.params.id;

    const products = await Product.find( {} ).where('category').in(catID).exec();

    if(products)
        res.send(products);
    else
        res.status(404).send({msg: "Product not found."});
    
})





export default router;