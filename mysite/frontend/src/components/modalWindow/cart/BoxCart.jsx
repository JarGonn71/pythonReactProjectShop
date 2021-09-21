import React from 'react'
import './cart.scss'
import Button from '@material-ui/core/Button';
import CartProductBlock from './CartProductBlock'
import {deleteProductForCart, productChangeQty, productChangeSize} from '../../../redux/authUser'
import { useDispatch } from 'react-redux';
import box from '../../../image 8.svg';
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import {setShowCart} from '../../../redux/modalWindow';

function BoxCart({productCart, finalPriceCart, totalProductCart}) {
    const dispatch = useDispatch()
    const deleteItem = (id, size) =>{
        dispatch(deleteProductForCart(id,size))
    }

    const setQty = (id, size, qty) =>{
        dispatch(productChangeQty(id, size, qty))
    }

    const setSizeProduct = (id, size, newSize) =>{
        dispatch(productChangeSize(id, size, newSize))
    }

    const closeCart = () => {
        dispatch(setShowCart())
    }

    const itemsCart = productCart.map((item, index)=>
    {return <CartProductBlock 
        key={`${item.content_object.title}_${item.id}_${index}`} 
        deleteItem={deleteItem} 
        setQty= {setQty}
        setSizeProduct={setSizeProduct}
        {...item}/>
    })
    

    return (
            <div className="containerCartBlock">
                <div className="modalBlockTitle">Корзина</div>
                <div className="modalBlockCartItems">
                        {itemsCart.length > 0? 
                            itemsCart
                            :<div className="productNull">
                                <img src={box} alt="" />
                                <h2>Корзина пуста</h2>
                                <p>Добавьте хотя бы один товар, чтобы оформить заказ</p>
                            </div>
                        }
                        
                        
                </div>
                <div className="modalBlockCartButton">
                {itemsCart.length > 0? 
                    <>
                        <div className="cartPrice">Итого: {finalPriceCart} руб.</div>
                        <Button type="submit" variant="contained" color="primary">
                            <div>Оформить заказ </div><FiArrowRight size={25} color="white"/>
                        </Button>
                    </>
                    : <Button onClick={closeCart} type="submit" variant="contained" color="primary">
                        <FiArrowLeft size={25} color="white"/> 
                        <div>Вернуться назад</div>
                      </Button>
                }
                </div>
            </div>
    )
}

export default BoxCart
