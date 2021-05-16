import express from 'express';
import Category from '../models/categorieModel.js';
import { getToken, isAdmin, isAuth } from '../util.js';

const router = express.Router();


router.get("/", async (req, res) => {
    const categories = await Category.find({});
    res.send(categories);
})





router.post("/", async (req, res) => {
    try {
        const categorie = new Category({
            name: req.body.categorie
        });
        const newCategorie = await categorie.save();

        if (newCategorie) {
            return res.status(201).send({ message: 'New categorie created.' });
        }
    } catch (error) {

        return res.status(500).send({ msg: 'Failed to create new categorie.' });
    }
})


router.delete("/:id", async (req, res) => {
    try {
        const categorie = await Category.findById(req.params.id);

        if(categorie){
            await categorie.remove();
            res.status(201).send({ msg: "Categorie delete." });
        }
    } catch (error) {

        return res.status(500).send({ msg: 'Failed to delete product.' });
    }
})





export default router;