import React, {useState, useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Category from '.././Category'
import Products from '.././Products'
import Slider from '.././Slider/Slider'
import { getProductsThunk, getNextProductsThunk, setPage} from '../../redux/product'
import { getCategoryThunk, getCollectionThunk, setActiveCategory, setActiveSort, setOrdering } from '../../redux/filter'


const Home = () => {
    const dispatch = useDispatch()
    const {ordering, activeSort, category, activeCategory, nameCategory, slugCategory, collection} = useSelector(({filterReducer}) => filterReducer)
    const {products, activePage, countPages, isLoaded} = useSelector(({productReducer})=> productReducer)
    const [fetching, setFetching] = useState(false)

    const scrollHandlear = (e) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 400){
            setFetching(true)
        }
    }
    
    useEffect(()=>{
        document.addEventListener('scroll', scrollHandlear)
        return function(){
            document.removeEventListener('scroll', scrollHandlear)
        }
    },[])

    useEffect(()=>{
        if (fetching){   
            if(countPages > activePage){
                dispatch(getNextProductsThunk({activeCategory, slugCategory}, `${ordering}${activeSort.slug}`, activePage+1)).then(()=>{
                    dispatch(setPage(activePage+1))
                    setFetching(false)
                })
            }
            else{
                setFetching(false)
            }
        }  
    },[fetching])


    useEffect(()=>{
        dispatch(getProductsThunk({activeCategory, slugCategory},  `${ordering}${activeSort.slug}` ))
    },[activeCategory, activeSort, ordering])

    const updateSort = (data) =>{
        dispatch(setActiveSort(data))
        dispatch(setPage(1))
    }

    const updateOrdering = (data) => {
        dispatch(setOrdering(data))
        dispatch(setPage(1))
    }

    useEffect(()=>{
        dispatch(getCategoryThunk())
        dispatch(getCollectionThunk())
    },[])

    const onSelectCategory = useCallback((index)=>{
        dispatch(setActiveCategory(index))
        dispatch(setPage(1))
    },[])



    return (
        <div className="wrapper-home">
            <div className="wrapper-slaider">
                <Slider collection={collection}/>
            </div>
            <div className="wrapperCatProduct">
                <Category updateOrdering={updateOrdering} activeSort={activeSort} updateSort={updateSort} category={category} nameCategory={nameCategory} activeCategory={activeCategory} onSelectCategory={onSelectCategory}/>
                <Products isLoaded={isLoaded} products={products}/>
            </div>
            
        </div>
    )
}

export default Home
