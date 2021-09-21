import React, { useEffect, useState} from 'react'
import './Slider.scss'

const Slider = ({collection}) => {
    const [activeCollection, setActivCollection] = useState(0)
    // const lengthCollections = collection.length

    const itemsSlider = collection.map((obj, index)=> {return  <div key={obj.title + index} className={activeCollection == index? "containerSlider active": "containerSlider"}> 
        <img  src={obj.image} alt="" /> 
        <div></div>
    </div> })

    // useEffect(()=>{
    //     setTimeout(()=>{
    //         console.log(activeCollection, lengthCollections)
    //         if(activeCollection < lengthCollections-1){
    //             setActivCollection(prev=>prev+1)
    //         }else{
    //             setActivCollection(0)
    //         }
    //     }, 10000)
    // },[activeCollection, lengthCollections])

    return (
        <>
         {itemsSlider}
         <div className='btnBox'>
            {
                collection.map((_,index) => <div onClick={()=>setActivCollection(index)} key={index} className={activeCollection == index? 'btnSlider active': 'btnSlider'}></div>)
            } 
         </div>
        </>
       
    )
}

export default Slider
