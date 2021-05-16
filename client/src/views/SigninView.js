import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { motion } from "framer-motion";
import { pageTransitiion } from "../config/pageTransition";
import { pageVariants } from "../config/pageVariants";

function SigninView(props) {

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    useEffect(() => {

        if (userInfo) {
            
            props.history.push(redirect);
        }

        return () => {

        }
    }, [userInfo, props.history, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }




    return (
        <motion.div     
        initial="out"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransitiion}
        
        >
            {redirect !== '/' && <CheckoutSteps step1></CheckoutSteps>}

            <form className="inputform" onSubmit={submitHandler}>


                <div className="container">
                    <label id="title" htmlFor="tip">Sign in to your account below:</label>
                    <input type="text" placeholder="Email Address" name="email" onChange={(e) => setEmail(e.target.value)} required></input>
                    <input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)} required></input>
                    <button type="submit" className="button-signin">Sign in</button>
                    <label htmlFor=""><Link id="signuptip" to={redirect === '/' ? '/register' : '/register?redirect=' + redirect}>Create Account</Link></label>

                    {loading && <label htmlFor="">Loading...</label>}
                    {error && <label htmlFor="">{error}</label>}
                </div>


            </form>
        </motion.div>
    )
}

export default SigninView;