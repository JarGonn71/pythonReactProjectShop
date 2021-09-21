import React, {useRef, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { setShowLike } from '../../../redux/modalWindow'
import LikeProductBlock from './LikeProductBlock'
import './likeProduct.scss'

function BoxLikeProducts() {
    const modalContainer = useRef()
    const dispatch = useDispatch()
    const {likeProducts} = useSelector(({productReducer}) => productReducer)
       
    
    // const closeModalWindow = (e) => {
    //     const path = e.path
    //     if (!path.includes(modalContainer.current)){
    //         console.log(path)
    //         dispatch(setShowLike())
    //     }
    //   }

    // useEffect(()=>{
    //     document.body.addEventListener('click', closeModalWindow)
    //     return function (){
    //         document.body.removeEventListener('click', closeModalWindow)
    //     }
    // },[])

    const likeItems = Object.values(likeProducts).map((obj,i)=>{
        return <LikeProductBlock key={obj.id} {...obj} obj={obj} />
    })
   

    return (

        <div ref={modalContainer} className="containerModalBlock">
            <div className="modalBlockTitle">Мои закладки</div>
            <div className="modalBlockItems">
                {likeItems}
            </div>

        </div>

    )
}

export default BoxLikeProducts
