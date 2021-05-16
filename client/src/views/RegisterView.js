import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import { motion } from "framer-motion";
import { pageTransitiion } from "../config/pageTransition";
import { pageVariants } from "../config/pageVariants";


function RegisterView(props) {

    const userRegister = useSelector((state) => state.userRegister);
    const {userInfo, loading, error} = userRegister;
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [suburb, setSuburb] = useState('');
    const [postcode, setPostcode] = useState('');
    const [state, setState] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const redirect = props.location.search? props.location.search.split("=")[1] : '/';

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
        return () => {

        }
    }, [userInfo, props.history, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(firstName, lastName, address, suburb, postcode, state, email, password));
    }




    return (
        <motion.div     
        initial="out"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransitiion}
        
        >
        <form className="inputform" onSubmit={submitHandler}>


            <div className="container">
                <label id="title" htmlFor="tip">Fill your information below:</label>
                <input type="text" placeholder="First Name" name="firstName" onChange={(e) => setFirstName(e.target.value)} required></input>
                <input type="text" placeholder="Last Name" name="lastName" onChange={(e) => setLastName(e.target.value)} required></input>
                <input type="text" placeholder="Address" name="address" onChange={(e) => setAddress(e.target.value)} required></input>
                <input type="text" placeholder="Suburb" name="suburb" onChange={(e) => setSuburb(e.target.value)} required></input>
                <input type="number" placeholder="Postcode" name="postcode" onChange={(e) => setPostcode(e.target.value)} required></input>
                <input type="text" placeholder="State" name="state" onChange={(e) => setState(e.target.value)} required></input>
                <input type="text" placeholder="Email Address" name="email" onChange={(e) => setEmail(e.target.value)} required></input>
                <input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)} required></input>
                <button type="submit" className="button-register">Sign Up</button>
                <label htmlFor=""><Link id="signintip" to={redirect==='/'?'/signin':'/signin?redirect='+redirect}>Have an account? Sign in</Link></label>
                {loading && <label htmlFor="">Loading...</label>}
                {error && <label htmlFor="">{error}</label>}
            </div>


        </form>
        </motion.div>
    )
}

export default RegisterView;