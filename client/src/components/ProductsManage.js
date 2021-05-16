import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, listProducts, removeProduct } from '../actions/productActions';



function ProductsManage(props) {

    const productCreate = useSelector((state) => state.productCreate);
    const { loading, error, success: successCreate } = productCreate;

    const fetchedCategories = useSelector((state) => state.fetchedCategories);
    const { categories } = fetchedCategories;

    const productRemove = useSelector((state) => state.productRemove);
    const { success: successRemove } = productRemove;

    const productList = useSelector(state => state.productList);
    const { products } = productList;

    const dispatch = useDispatch();
    const removeProductHandler = (id) => {

        dispatch(removeProduct(id));
    }

    const [formVisible, setFormVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [countInStock, setcountInStock] = useState('');


    useEffect(() => {
        if (successCreate) {
            setFormVisible(false);

        }
        dispatch(listProducts());
        return () => {

        }
    }, [successCreate, successRemove, dispatch])


    const formShow = (product) => {
        setFormVisible(true);
        setId(product._id);
        setName(product.name);
        setCategory(product.category);
        setImage(product.image);
        setDescription(product.description);
        setPrice(product.price);
        setBrand(product.brand);
        setcountInStock(product.countInStock);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(createProduct({ id, name, category, image, description, price, brand, countInStock }));
    }




    return (

        <div>

            {!formVisible ? (
                <div className="manage-table-wrapper">
                    <span id="title">Products:</span>
                    <table className="manage-table">
                        <thead>
                            <tr className="">
                                <th className="">
                                    <span>ID</span>
                                </th>
                                <th className="">
                                    <span>Product</span>
                                </th>
                                <th className="">
                                    <span>Price</span>
                                </th>
                                <th className="">
                                    <span>Operation</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {(
                                products.map((product) => (
                                    <tr className="" key={product._id}>
                                        <td>
                                            {product._id}
                                        </td>
                                        <td >
                                            <Link to={"/products/" + product._id}>
                                                <img src={'/images/' + product.image + '.png'} alt="productimg"></img>
                                                <span id="productdesc">
                                                    {product.brand} {product.name} {product.desc}
                                                </span>
                                            </Link>
                                        </td>
                                        <td >
                                            <span>{"$" + product.price}</span>
                                        </td>
                                        <td >


                                            <button className="remove" onClick={() => removeProductHandler(product._id)} > Remove </button>
                                            <button className="remove" onClick={() => { formShow(product); }} > Edit </button>

                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table> <button className="button-switch" onClick={() => { formShow({}); }}>Create Product</button></div>) : (<form className="inputform" onSubmit={submitHandler}>
                        <div className="container">
                            <label htmlFor="tip">Product Name : </label>
                            <input type="text" value={name} placeholder="Name" name="name" onChange={(e) => setName(e.target.value)} required></input>
                            <label htmlFor="tip">Product Brand : </label>
                            <input type="text" value={brand} placeholder="Brand" name="brand" onChange={(e) => setBrand(e.target.value)} required></input>
                            <label htmlFor="tip">Product Category : </label>
                            <select
                                style={{ display: "block" }}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option selected disabled>Select here</option>
                                {categories.map((category) => (
                                    <option value={category._id} >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="tip">Product Image name : </label>
                            <input type="text" value={image} placeholder="Image file name" name="image" onChange={(e) => setImage(e.target.value)} required></input>
                            <label htmlFor="tip">Product Description : </label>
                            <input type="text" value={description} placeholder="Description" name="description" onChange={(e) => setDescription(e.target.value)} required></input>
                            <label htmlFor="tip">Product Price : </label>
                            <input type="text" value={price} placeholder="Price" name="price" onChange={(e) => setPrice(e.target.value)} required></input>
                            <label htmlFor="tip">Product Stock : </label>
                            <input type="text" value={countInStock} placeholder="Stock" disabled={!id} name="stock" onChange={(e) => setcountInStock(e.target.value)} required></input>
                            <button type="submit" className="button-create">{id ? ('Edit') : ('Create')}</button> <button onClick={() => setFormVisible(false)} className="button-register">Back</button>

                            {loading && <label htmlFor="">Loading... : </label>}
                            {error && console.log(error)}
                        </div>
                    </form>)}








        </div>



    )
}

export default ProductsManage;