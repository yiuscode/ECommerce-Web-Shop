import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import { motion } from "framer-motion";
import { pageTransitiion } from "../config/pageTransition";
import { pageVariants } from "../config/pageVariants";


function ProductView(props) {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => { };
  }, [dispatch, props.match.params.id]);

  const handleAddCart = () => {
    props.history.push("../cart/" + props.match.params.id + "?qty=" + qty);

  }

  return loading ? (
    <div className="loader"></div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitiion}

    >
      <div className="details">
        <div className="details-image">
          <img src={'/images/' + product.image + '.png'} alt="product"></img>
        </div>
        <div className="details-info">
          <ul>

            <li key="1">
              <h3 style={{ display: "inline" }}>
                {product.brand + " - " + product.name}
              </h3>
            </li>
            <li key={product._id}>{product.description}</li>



            <li key="2" id="stock" style={product.countInStock === 0 ? { color: 'red' } : product.countInStock < 15 ? { color: 'orange' } : { color: 'green' }}>{product.countInStock === 0 ? "Out of Stock" : product.countInStock < 15 ? "Low in Stock" : "In Stock"}</li>


            <li key="4">
              <div className="details-order">
                <span id="price">${product.price}</span>
                <span id="detail">
                  Qty:
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                    style={{ display: "inline" }}
                  >
                    {[...Array(product.countInStock).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <button disabled={!product.countInStock} onClick={handleAddCart}>Add to cart</button>
                </span>
              </div>
            </li>
            <li key="5">
              <div id="zipPay">
                Buy now pay later
                <a href="https://zip.co/">
                  <img id="zip" src="../images/zip.png" alt="zippay"></img>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductView;
