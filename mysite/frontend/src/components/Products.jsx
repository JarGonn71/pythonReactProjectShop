import React from 'react'
import ProductBlock from './ProductBlock'
import FakeBlock from './FakeBlock'
import { memo } from 'react'


const Products = memo(function Products({products}){
    

    const listProduct = products.map((obj,i)=>{
        return <ProductBlock key={`${obj.title}__${i}`} {...obj} obj={obj}/>
    })

    const fakeItems =  Array(6).fill(0).map((_,i)=> {return <FakeBlock key={i}/>})
    
    return (
        <div className="wrapperContainerProduct">
        
             {listProduct }
        
        </div>
    )
})

export default Products
