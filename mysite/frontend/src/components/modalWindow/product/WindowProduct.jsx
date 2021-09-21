import React, {useRef, useEffect, useState} from 'react'
import './WindowProduct.scss'
import Button from '@material-ui/core/Button';
import { FiShoppingCart } from "react-icons/fi";
import {addProductForCart} from '../../../redux/authUser'
import {setShowAuthenticated} from '../../../redux/modalWindow'
import {setLikeProduct} from '../../../redux/product'

function WindowProduct({obj, id, title, size, floor, description, category, image, final_price, isIsAuthenticated, dispatch}) {
    const productRef = useRef()
    const [sizeID, setSizeID] = useState(size[0].id)
    const [open, setOpen] = useState(false);

    const addProductToCart = (product_id, size) =>{
        dispatch(addProductForCart(product_id, size))
    }

    const addProduct = () =>{
        addProductToCart(id, sizeID)
        setOpen(true)
    }

    const onClickLike = () =>{
       dispatch(setLikeProduct(obj)) 
    }

    const ClickAuth = ()=>{
        dispatch(setShowAuthenticated()) 
    }

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
    };

    return (
            <div ref={productRef} className="wrapperWindowProduct">

                <div className="windowProductTop">
                    <div className="windowProductImg">
                        <img src={image} alt="" />
                    </div>
                    <div className="windowProductInfa">
                        <div className="windowProductTitle">
                            {title}
                        </div>
                        <div className="windowProductCategory">
                            {category.title}
                        </div>
                        {description && <p>{description}</p>}

                        <div className='SizeBoxTitel'>Доступные размеры:</div>
                        <div className='SizeBox'>
                            {size.map((sizeIt,index)=>{ return <div onClick={()=>setSizeID(sizeIt.id)} className={sizeID==sizeIt.id? 'SizeItem active': 'SizeItem'} key={`${sizeIt.title}_${index}`}>{sizeIt.title}</div>})}
                        </div>
                    </div>
                </div>
                <div className="windowProductBot">
                    {isIsAuthenticated?
                        <Button onClick={addProduct} type="submit" variant="contained">
                                Добавить в корзину <FiShoppingCart size={25} />
                        </Button>
                    :
                        <Button onClick={ClickAuth} type="submit" variant="contained">
                                Добавить в корзину <FiShoppingCart size={25} />
                        </Button>
                    }
                    <div>{final_price} руб.</div>
                </div>
            </div>

    )
}

export default WindowProduct
