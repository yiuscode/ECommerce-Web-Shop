import React, { useEffect } from "react";

import {useSelector } from "react-redux";


import { motion } from "framer-motion";
import { pageTransitiion } from "../config/pageTransition";
import { pageVariants } from "../config/pageVariants";
import MembersManage from "../components/MembersManage";
import ProductsManage from "../components/ProductsManage";
import CategorieManage from "../components/CategorieManage";


function ManageView(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  

  useEffect(() => {
    if (!userInfo) {
      props.history.push("/");
    }
    else if(!userInfo.isAdmin){
      props.history.push("/");
    }

  }, [userInfo, props.history]);

  return (
    <motion.div
      className="cart"
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitiion}
    >

      <MembersManage></MembersManage>
      <ProductsManage></ProductsManage>
      <CategorieManage></CategorieManage>
      
    </motion.div>
  );
}

export default ManageView;
