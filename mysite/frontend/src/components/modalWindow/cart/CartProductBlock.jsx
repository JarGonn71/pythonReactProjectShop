import React,{ useState } from 'react'
import { FiSlash, FiPlusCircle, FiMinusCircle } from "react-icons/fi";


function CartProductBlock({content_object,id, qty, size, final_price, deleteItem, setQty, setSizeProduct}) {

    const baseUrl = 'http://127.0.0.1:8000'
    // const [state, setstate] = useState(size)

    const subtractionQty = () =>{
        if (qty > 1){
            setQty(id, size, qty-1)
        }
    }

    const additionQty = () =>{
        if (content_object.quantity > qty){
            setQty(id, size, qty+1)
        }
    }

    const deleteProduct = () =>{
        deleteItem(id, size)
    }

    const setSize = (newSize) =>{
        setSizeProduct(id, size, newSize)
    }

    return (
        <div className='wrapperCartProductBlock'>
            <div className='containerCartProductBlock'>
                <div className='mainContentCartProduct'>
                    <div className='CartProductImage'>
                        <img src={`${baseUrl}${content_object.image}`} alt="" />
                    </div>
                    <div className='CartProductInfo'>
                        <div className="titleProduct">{content_object.title}</div>
                        <div className="titleCategory">{content_object.category.title}</div>
                    </div>

                    <div className="CartSizeProduct">
                        <span>Размер:</span>
                        <div className='SizeBox'>
                            {content_object.size.map((sizeIt,index)=>{ return <div onClick={()=>setSize(sizeIt.id)} className={size==sizeIt.id? 'SizeItem active': 'SizeItem'} key={`${sizeIt.title}_${index}`}>{sizeIt.title}</div>})}
                        </div>
                    </div>
                </div>
                
                <div className='CartProductCount'>
                    <p>Кол-во:</p>
                    <div className='blockBtnCount'>
                        <FiMinusCircle onClick={subtractionQty} color="red" size={30}/>
                        <span>{qty}</span>
                        <FiPlusCircle onClick ={additionQty} color="green" size={30}/>
                    </div>
                    
                    <div className="cartProductBlockPrice">{final_price} руб.</div>
                </div>
            
            </div>
            <div onClick={deleteProduct} className='CartProductDelete'>
                <FiSlash size={30}/>
            </div>
        </div>
    )
}

export default CartProductBlock
