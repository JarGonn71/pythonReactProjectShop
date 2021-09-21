import React, {useState, useEffect, useRef} from 'react'
import './Auth.scss'
import LoginInAc from './Login'
import Registration from './Registration'
import { FiX } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux';
import {setErrorR, setErrorL} from '../../../redux/authUser'
import {setShowAuthenticated, closeAuthenticated} from '../../../redux/modalWindow'

function Auth({isIsAuthenticated}) {
    const {errorMessageR, errorMessageL, statusRegistation} = useSelector(({authUserReducer}) => authUserReducer)
    const dispatch = useDispatch()
    const [state, setstate] = useState(true)
    const lineRef = useRef()
   
    useEffect(() => {
        if(isIsAuthenticated){
            closeAuth()
        }
    }, [isIsAuthenticated])
    
    useEffect(() => {
        dispatch(setErrorR(''))
        dispatch(setErrorL(''))
    }, [state])

    useEffect(() => {
        if (statusRegistation){
            setstate(true)
        }
    }, [statusRegistation])

    const closeAuth = () =>{
       dispatch(setShowAuthenticated()) 
    }

    useEffect(()=>{
        let btn = document.getElementsByClassName('btnTop active')[0]
        lineRef.current.style.width = btn.offsetWidth + 'px'
        lineRef.current.style.left = btn.offsetLeft + 'px'
    },[state])
    
    const stateTrue = () =>{
        setstate(true)
    }
    const stateFalse = () =>{
        setstate(false)
    }

    return (
            <div className="blockAuth">
                <div className="btnCloseAuth" onClick={closeAuth}>
                    <FiX size="35px"/>
                </div>
                <div className="boxTopBtn">
                    <div>
                        <div ref={lineRef} className="lineSlider"></div>
                        <div onClick={stateTrue} className={state? "btnTop active":"btnTop"}>Вход</div>
                        <div onClick={stateFalse} className={state? "btnTop":"btnTop active"}>Регистрация</div>
                    </div>
                </div>
                     <div className="wrapperForm">
                     {state? <LoginInAc errorMessageL={errorMessageL}/>: <Registration errorMessageR={errorMessageR}/>}
                 </div>     
            </div>
    )
}

export default Auth
