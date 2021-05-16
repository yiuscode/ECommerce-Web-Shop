import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../actions/searchActions';
import { motion } from 'framer-motion';
import { pageVariants } from '../config/pageVariants';
import { pageTransitiion } from '../config/pageTransition';


function SearchView(props) {

    const searchedProducts = useSelector((state) => state.searchedProducts);
    const { products, loading, error } = searchedProducts;


    const keyword = props.location.search
        ? props.location.search.split("=")[1]
        : "";

    const dispatch = useDispatch();

    useEffect(() => {
        if(keyword!==""){
            dispatch(searchProducts(keyword))
        }
        
        return () => {

        }
    }, [dispatch,keyword])

    return loading ? <div className="loader"></div> :
        error ? (
            <div>{error}</div>
        ) :
        <motion.div
        initial="out"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransitiion}
  
      >
            <div id="result-tip">Search Result(s) For: '{keyword}' </div>
            <ul className="products">
                {products&&
                    products.map(product =>

                        <li key={product._id}>
                            <div className="product">
                                <Link to={'/products/' + product._id}><img className="product-image" src={'/images/' + product.image + '.png'} alt="product" /></Link>
                                <div className="product-name"><Link to={'/products/' + product._id}>{product.brand + ' ' + product.name}</Link></div>
                                <div className="product-price">${product.price}.00</div>
                                <div className="product-rating">{product.rating} Stars</div>
                            </div>
                        </li>
                    )
                }
            </ul>
        </motion.div>
            


}

export default SearchView;