import React, { useState, useEffect } from 'react'
import { memo } from 'react'


const PagesNumber = memo(function PagesNumber({countPages, activePage, dispatch, setPage}) {
    const [pageList, setPageList] = useState()

    useEffect(()=>{
        let arr = new Array()
        for(let i=0; i<countPages; i++){
            arr[i] = i+1
        }
        setPageList(arr)
    },[countPages])



    return (
        <div className="wrapperPagesNumber">
            <div className="containerPagesNumber">
            {pageList && pageList.map((page, i)=>
                {return <div className={activePage === page? "itemPagesNumber active":"itemPagesNumber"} onClick={()=>dispatch(setPage(page))} key={i}>{page}</div>})
            }
            </div>
        </div>
    )
})

export default PagesNumber
