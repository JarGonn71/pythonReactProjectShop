import React, {useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BoxLikeProducts from './likeProduct/BoxLikeProducts';
import BoxCart from './cart/BoxCart';
import WindowProduct from './product/WindowProduct'
import Auth from './Auth/Auth';
import {closeWindow} from '../../redux/modalWindow'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


function ModalWindows() {
    const dispatch = useDispatch()
    const background = useRef()
    const {infoMessage, isIsAuthenticated, productCart, finalPriceCart, totalProductCart} = useSelector(({authUserReducer}) => authUserReducer)
    const { modalaWindow, showCart, showLike, showAuthenticated, showActiveProduct } = useSelector(({modalReducer}) => modalReducer)
    const { activeProduct} = useSelector(({productReducer}) => productReducer)
    const [open, setOpen] = useState(false);

    
    useEffect(() => {
        if (infoMessage){
            setOpen(true);
        }
    }, [infoMessage])

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
    };

    useEffect(()=>{
        modalaWindow ? document.body.style.overflow='hidden': document.body.style.overflow='unset'
     }, [modalaWindow])
    
     
    const closeModalWindow = (e) => {
        const path = e.path
        if (path[0] === background.current){
            dispatch(closeWindow())
        }
    }
    useEffect(()=>{
        document.body.addEventListener('click', closeModalWindow)
        return function (){
            document.body.removeEventListener('click', closeModalWindow)
        }
    },[])

    return (
        <>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            {infoMessage &&  
            <Alert onClose={handleClose} severity={infoMessage.added?"success":"info"} sx={{ width: '100%' }}>
                {infoMessage.detail}
            </Alert>}
           
        </Snackbar>
        
        {modalaWindow ?  
            <div ref={background} className="wrapperModalBlock">
                {/* {showLike && <BoxLikeProducts/>}  */}
                {showAuthenticated && <Auth isIsAuthenticated={isIsAuthenticated} />}
                {showCart && <BoxCart finalPriceCart={finalPriceCart} totalProductCart={totalProductCart} productCart={productCart}/>}
                {showActiveProduct && <WindowProduct dispatch={dispatch} isIsAuthenticated={isIsAuthenticated} {...activeProduct} obj={activeProduct} />}
            </div>
        : null}
        </>
       
    )
}

export default ModalWindows
