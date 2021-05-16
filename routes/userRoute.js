import express from 'express';
import User from '../models/userModel.js';
import { getToken, isAuth } from '../util.js';

const router = express.Router();


router.post("/signin", async (req, res) => {
    try {
        const signinuser = await User.findOne({
            email: req.body.email,
            password: req.body.password
        });

        if (signinuser) {
            res.send({
                _id: signinuser.id,
                firstName: signinuser.firstName,
                lastName: signinuser.lastName,
                address: signinuser.address,
                suburb: signinuser.suburb,
                postcode: signinuser.postcode,
                state: signinuser.state,
                isAdmin: signinuser.isAdmin,
                token: getToken(signinuser)
            });

        } else {
            res.status(401).send({ msg: 'Invalid Email or Password.' });
        }

    } catch (error) {

        res.send({ msg: error.message });
    }
})


router.post("/register", async (req, res) => {
    try {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            suburb: req.body.suburb,
            postcode: req.body.postcode,
            state: req.body.state,
            email: req.body.email,
            password: req.body.password,
            isAdmin: false
        });

        const newUser = await user.save();
        res.send(
            {
                _id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                address: newUser.address,
                suburb: newUser.suburb,
                postcode: newUser.postcode,
                state: newUser.state,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser)
            }
        );

    } catch (error) {
        res.status(401).send({ msg: 'Invalid User Info.' });
    }
})

router.post("/getusers", isAuth, async (req, res) => {

    try {
        const users = await User.find( {} ).where('isAdmin').in(false).exec();
        res
        .status(201)
        .send({ message: 'Users found', users: users });

    } catch (error) {
        res.send({ msg: error.message });
    }
})


router.delete("/remove/:id",isAuth, async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        if(user){
            await user.remove();
            res.status(201).send({ msg: "User delete." });
        }

    } catch (error) {

        return res.status(500).send({ msg: 'Failed to delete user.' });
    }
})

export default router;