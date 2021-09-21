import React from 'react'
import { FiXSquare } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import {deleteLikeProduct, setActiveProduct} from '../../../redux/product'

function LikeProductBlock({image, title,final_price, obj, category}) {
    const dispatch = useDispatch()
    const deleteProduct = () => {
        dispatch(deleteLikeProduct(obj.id))
    }

    const openActiveProduct = () => {
        dispatch(setActiveProduct(obj))
    }

    return (
        <div onClick={openActiveProduct} className="container_LP_Block">
            <div onClick={deleteProduct} className="LP_btn">
                <FiXSquare size={30}/>
            </div>
            <div className="LP_boxImage">
                <img src={image} alt="" />
            </div>
            <div className="LP_info">
                <div>
                    <p>{category.title}</p>
                    <p>{title}</p>
                </div>
                <div className="LP_price">{final_price} руб.</div>
            </div>
        </div>
    )
}

export default LikeProductBlock
