import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { motion } from "framer-motion";
import { pageTransitiion } from "../config/pageTransition";
import { pageVariants } from "../config/pageVariants";


function ShippingView(props) {

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [suburb, setSuburb] = useState('');
    const [postcode, setPostcode] = useState('');
    const [state, setState] = useState('');




    useEffect(() => {
        if(!userInfo){
            props.history.push('/signin?redirect=shipping');
        }else{
            setFirstName(userInfo.firstName);
            setLastName(userInfo.lastName);
            setAddress(userInfo.address);
            setSuburb(userInfo.suburb);
            setPostcode(userInfo.postcode);
            setState(userInfo.state);
        }


        return () => {

        }
    }, [userInfo, props.history])

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(saveShipping({ firstName, lastName, address, suburb, postcode, state }));
        props.history.push('/payment');
    }




    return (
        <motion.div     
        initial="out"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransitiion}
        
        >
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="inputform" onSubmit={submitHandler}>


                <div className="container">
                    <label id="title" htmlFor="tip">Shipping information:</label>
                    <input type="text" defaultValue={firstName} placeholder="First Name" name="firstName" onChange={e => setFirstName({ text: e.target.value })} required></input>
                    <input type="text" defaultValue={lastName} placeholder="Last Name" name="lastName" onChange={(e) => setLastName(e.target.value)} required></input>
                    <input type="text" defaultValue={address} placeholder="Address" name="address" onChange={(e) => setAddress(e.target.value)} required></input>
                    <input type="text" defaultValue={suburb} placeholder="Suburb" name="suburb" onChange={(e) => setSuburb(e.target.value)} required></input>
                    <input type="number" defaultValue={postcode} placeholder="Postcode" name="postcode" onChange={(e) => setPostcode(e.target.value)} required></input>
                    <input type="text" defaultValue={state} placeholder="State" name="state" onChange={(e) => setState(e.target.value)} required></input>
                    <button type="submit" onSubmit={() => submitHandler()} className="button-register">Next</button>

                </div>


            </form>
        </motion.div>
    )
}

export default ShippingView;