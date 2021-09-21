import React, {useState, useRef, memo, useEffect} from 'react'
import { FiSearch } from "react-icons/fi";
import Checkbox from '@material-ui/core/Checkbox';



const sortProduct = [
    {   
        "id":0,
        "title": "по новезне",
        "slug": "created_at"
    },
    {     
        "id":1,
        "title": "по цене",
        "slug": "final_price"
    },
    {  
        "id":2,
        "title": "по популярности",
        "slug": ""
    },
]


const Category = memo(function Category({category, nameCategory, onSelectCategory, activeCategory, updateSort, updateOrdering, activeSort}){
    const allCategory = useRef()
    const allSort = useRef()
    const [showCategory, setShowCategory] = useState(false)
    const [showSort, setShowSort] = useState(false)
    const [sort, setSort] = useState("-")
    const [check, setSheck] = useState(true)  
    const handleChange = () => {
        setSheck(prev=>!prev);
        if (check){
            setSort('+')
        } else{
            setSort('-')
        }
      }; 

    useEffect(() => {
        updateOrdering(sort)
    }, [sort])

    const setActiveCategory = (obj,e) =>{
        onSelectCategory(obj)
        setShowCategory(false)
    }

    const setActiveSort = (obj) =>{
        updateSort(obj)
        setShowSort(false)
    }

    const onClickListCategory = () =>{
        setShowCategory(prev => !prev)
    }

    const onClickSortList = () =>{
        setShowSort(prev => !prev)
    }

    const handleOutsideClick = (e) => {
        const path = e.path
        if (!path.includes(allCategory.current)){
            setShowCategory(false)
        }
        if (!path.includes(allSort.current)){
            setShowSort(false)
        }
    }

    useEffect(()=>{
        document.body.addEventListener('click', handleOutsideClick)
        return function (){
            document.body.removeEventListener('click', handleOutsideClick)
        }
    },[])

    const listCategory = category.map((obj,i)=>{
        return <div onClick={(e) => setActiveCategory(obj, e)} className={activeCategory === obj.id? "category-item active" : "category-item"} key={obj.id}>{obj.title}</div>
    })

    const sortItems = sortProduct.map((obj, index)=>{
        return <div key={obj.id} onClick={()=>{setActiveSort(obj)}} className={activeSort.id == index? "filterItem active": "filterItem"}>{obj.title}</div>
    })

    return (
        <div className="wrapper-category">
            <div ref={allCategory} className={"containerWrapperCategory__defolte"}>
                <div onClick={onClickListCategory} className="activeCategory">{nameCategory}</div>
                {showCategory &&
                    <div  className="wrapper-category-items">
                    <div onClick={(e) => setActiveCategory({id:null, title:'Все'},e)} className={activeCategory === null? "category-item active" : "category-item"}>Все</div>
                    {listCategory}
                </div>
                }
            </div>
            <div ref={allSort} className="containerFilter">
                <div onClick={onClickSortList} className="activeFilter"> Сортировать: <span>{activeSort.title}</span> </div>
                {showSort &&
                    <div className="containerFilterItems">
                        {sortItems}
                        <div className='boxChecBoxs'>
                            <div onClick={handleChange}>
                                <Checkbox
                                        checked={check}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                    по убыванию
                            </div>
                            <div onClick={handleChange}>
                                <Checkbox
                                    checked={!check}
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                                по возрастанию
                            </div>
                        </div>
                       
                    </div>
                }
                
            </div> 
        </div>
    )
})

export default Category
