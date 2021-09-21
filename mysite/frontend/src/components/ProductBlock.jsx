import React from 'react'
import {FiHeart, FiCheckSquare} from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux'
import { setLikeProduct, setActiveProduct } from '../redux/product'
import {setShowActiveProduct} from '../redux/modalWindow'
import discountIcon from '../iconDiscount.svg'

function ProductBlock({id,image, title, final_price, obj, floor, category, discount}) {
    const dispatch = useDispatch()
    const {likeProducts} = useSelector(({productReducer}) => productReducer)
    const productCart = useSelector(({authUserReducer}) => authUserReducer.productCart)
    const openActiveProduct= ()=>{
        dispatch(setActiveProduct(obj))
        dispatch(setShowActiveProduct(true))
    }

    const listCartId = productCart.map(({content_object},index)=> {return content_object.id})


    return (
        <div onClick={openActiveProduct} className={listCartId.includes(id)?'wrapperBlockProduct active':'wrapperBlockProduct'}>
            {discount>0? <div className='discountProduct'><img src={discountIcon} alt="" />-{discount}%</div>: null}
            {listCartId.includes(id) && 
                <div className="thisCart">
                    <FiCheckSquare size={30} color="rgb(0, 255, 0)"/>
                </div>
            }
            <div className={Object.values(likeProducts).includes(obj)?"lakeThisProduct active":"lakeThisProduct"}>
                <FiHeart fill={Object.values(likeProducts).includes(obj)? "rgb(0, 255, 0)": "none"} size="30px"/>
            </div>
            <div className=""></div>
            <div className="wrapperProductImage">
                <img src={image} alt="" />
            </div>
            <div className="wrapperProductInfo">
                <div className="wrapperProductCategory">{category.title}</div>
                <div className="wrapperProductName">{title}</div>
                <div className="blockFloor">
                    {floor.id === 1? 'M': 'Ж'}
                
                </div>
            </div>
            
            <div className="wrapperProductPrice">
               Цeна: <span>{final_price} руб.</span>
            </div>
        </div>
    )
}

export default ProductBlock
