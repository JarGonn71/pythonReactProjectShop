import React, { useState } from 'react'
import './Navbar.scss'
import {FiShoppingCart , FiUser, FiHeart, FiMenu, FiX} from "react-icons/fi"
import { NavLink } from 'react-router-dom'
import {setShowCart, setShowLike, setShowAuthenticated, setShowMenu, closeWindow} from '../../redux/modalWindow';
import { useDispatch, useSelector} from 'react-redux';

const Navbar = () => {
    const dispatch = useDispatch()
    const {user, isIsAuthenticated, finalPriceCart} = useSelector(({authUserReducer}) => authUserReducer)
    const {showCart, showLike, showAuthenticated, showMenu } = useSelector(({modalReducer}) => modalReducer)
    
    const clickCart = () => {
        dispatch(setShowCart())
    }
    const openMenu = () =>{
        dispatch(setShowMenu())
    }
    const clickLike = () =>{
        dispatch(setShowLike())
    }
    const ClickAuth = () =>{
        dispatch(setShowAuthenticated())
    }

    const closeAllWindow = () => {
        dispatch(closeWindow())
    }

    return (
        <>  
            <NavLink className="wrapper-logo" to="/">
                        <div className="wrapper-logo-img"><img src="" alt="" /></div> 
                        <div className="logo-text">
                            <span>Logo</span>
                            <p>Магазин лучшей одежды</p>
                        </div>
            </NavLink>

            <div className="wrapper-nav">
                <div className="buttonMenu">
                {showMenu || showCart || showLike?<FiX size={30} onClick={closeAllWindow}/> :<FiMenu size={30} onClick={openMenu}/>}
                </div>

                <div className={showMenu? "navbarMenuItems active": "navbarMenuItems"}>
                    <div onClick={clickCart} className="navbarMenuItem">
                        <FiShoppingCart size="25px"/>
                        <div className="titlenavbarMenuItem">КОРЗИНА</div>
                        <span>{finalPriceCart} руб.</span>
                    </div>

                    {/* <div onClick={clickLike} className="navbarMenuItem">
                        <FiHeart size="25px"/>
                        <div className="titlenavbarMenuItem">ЗАКЛАДКИ</div>
                    </div> */}

                    <div className="navbarMenuItem">
                        {isIsAuthenticated?
                           <>
                            <NavLink onClick={closeAllWindow} to='/profile'><FiUser size="25px"/> <div className="titlenavbarMenuItem">ПРОФИЛЬ</div> </NavLink>
                            
                           </> 
                         : <div className="btnLogin" onClick={ClickAuth}>Войти</div> 
                         }
                    </div>
                </div>
            </div>

            

        </>
    )
}

export default Navbar
