import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCategorie, CategoriesFetch, createCategorie } from '../actions/categorieAction';


function CategorieManage(props) {

    const fetchedCategories = useSelector((state) => state.fetchedCategories);
    const {categories} = fetchedCategories;
    const [categoriesName, setcategoriesName] = useState('')
    const dispatch = useDispatch();

    const removeCategorieHandler = (cid) => {
        dispatch(removeCategorie(cid));
        setTimeout(
            function () {
                dispatch(CategoriesFetch());
            }
                ,
            1000
        );
    }
    const createCategorieHandler = (name) => {
        dispatch(createCategorie(name));
        setTimeout(
            function () {
                dispatch(CategoriesFetch());
            }
                ,
            1000
        );
    }


    useEffect(() => {
        dispatch(CategoriesFetch());
        return () => {

        }
    }, [dispatch])





    return (
        <div className="manage-table-wrapper">
            {!categories ? (
                <div>
                    no
                </div>
            ) : (
                <div>
                    <span id="title">Categories:</span>
                    <table className="manage-table">
                        <thead>
                            <tr className="">
                                <th className="">
                                    <span>ID</span>
                                </th>
                                <th className="">
                                    <span>Type</span>
                                </th>
                                <th className="">
                                    <span>Action</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody >

                            {categories.map((categorie) => (
                                <tr className="" key={categorie._id}>
                                    <td >
                                        {categorie._id}
                                    </td>
                                    <td >
                                        {categorie.name}
                                    </td>
                                    <td >
                                    <button onClick={()=> removeCategorieHandler(categorie._id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                            <tr className="" key='edit'>
                                <td >
                                    
                                </td>
                                <td >
                                    <input type="text" onChange={(e) => setcategoriesName(e.target.value)}></input>
                                </td>
                                <td >
                                    <button onClick={()=> createCategorieHandler(categoriesName)}>Insert</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>




    )
}

export default CategorieManage;