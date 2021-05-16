import React from 'react';

import { motion } from 'framer-motion';
import { pageTransitiion } from '../config/pageTransition';
import { pageVariants } from '../config/pageVariants';
import SideBar from '../components/SideBar';
import ProdustsList from '../components/ProdustsList';

function HomeView(props) {

  const category = props.location.search ? props.location.search.split("cat=")[1] : "";


  return (

    <motion.div 
    initial="out"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransitiion}
    className="home-container"
    >
      <SideBar></SideBar>
      <ProdustsList category={category}></ProdustsList>
    </motion.div>)

}

export default HomeView;