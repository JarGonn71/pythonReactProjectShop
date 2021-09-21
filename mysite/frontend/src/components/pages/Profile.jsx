import React from 'react'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import {LogoutThunk} from '../../redux/authUser'

function Profile() {
    const dispatch = useDispatch()

    const logoutAc = () =>{
        dispatch(LogoutThunk())
    }

    return (
        <div className="wrapper-profile">
            <div onClick={logoutAc}>
                Выйти из акаунта
            </div>
        
        </div>
    )
}

export default Profile
