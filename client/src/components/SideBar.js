
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { CategoriesFetch } from "../actions/categorieAction";
import { pageTransitiion } from "../config/pageTransition";
import { pageVariants } from "../config/pageVariants";

function SideBar(props) {


  const fetchedCategories = useSelector((state) => state.fetchedCategories);
  const { loading, categories, error } = fetchedCategories;
  const dispatch = useDispatch();
  const [pathName, setPathName] = useState(useLocation().pathname);

  useEffect(() => {
    dispatch(CategoriesFetch());
    return () => {

    }
  }, [dispatch])

  return loading ? <div></div> :
    error ? (
      <div>{error}</div>
    ) : (
      <motion.div 
    initial="out"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransitiion}
    className="sidebar"
    >
        <ul>
            <li key="top">
              <span id="title">CATEGORIES</span>
            </li>
          {categories.map((categorie) => (
            <li key={categorie._id}>
              <span><Link className={pathName === '?cat=' + categorie._id ? 'currentPage' : ''} onClick={() => {setPathName('?cat=' + categorie._id)}} to={'?cat=' + categorie._id}>{categorie.name}</Link></span>
            </li>
          ))}
        </ul>
      </motion.div>)
}

export default SideBar;