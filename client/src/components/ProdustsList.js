import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listCats, listProducts } from '../actions/productActions';


function ProdustsList(props) {



    const productList = useSelector(state => props.category ? state.productCat : state.productList);
    const { products, loading, error } = productList;

    const dispatch = useDispatch();

    useEffect(() => {
        if (props.category) {
            dispatch(listCats(props.category))
        } else {
            dispatch(listProducts());
        }


        return () => {

        }
    }, [props.category, dispatch])

    return loading ? <div className="loader"></div> :
        error ? (
            <div>{error}</div>
        ) :
            <div className="products-container">            <ul className="products">
                {
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
            </ul></div>



}

export default ProdustsList;