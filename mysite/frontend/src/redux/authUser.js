import { authAPI, cartAPI } from "../api/api"
import Cookies from 'js-cookie'

const SET_AUTHENTICATED = "SET_AUTHENTICATED"
const SET_USER = "SET_USER"
const SET_REGISTRATION_STATUS = "SET_REGISTRATION_STATUS"
const SET_ERROR_R = "SET_ERROR_R"
const SET_ERROR_L = "SET_ERROR_L"
const SET_INFO_MESSAGE = "SET_INFO_MESSAGE"

const initialState = {
    user:{
        
    },
    productCart:[

    ],
    finalPriceCart:0,
    totalProductCart:0,
    isIsAuthenticated: false,
    errorMessageR: '',
    errorMessageL: '',
    statusRegistation: false,
    infoMessage: null
}

const authUserReducer = (state=initialState, action)=>{
    switch (action.type) {
        case SET_ERROR_R:
            return{
                ...state,
                errorMessageR: action.payload
            }
        case SET_ERROR_L:
            return{
                ...state,
                errorMessageL: action.payload
            }
        case SET_REGISTRATION_STATUS:
            return{
                ...state,
                statusRegistation: action.payload
            }
        case SET_USER:
            return{
                ...state,
                user: action.payload.owner,
                productCart: action.payload.product,
                finalPriceCart: action.payload.final_price,
                totalProductCart: action.payload.total_products,
            }
        case SET_AUTHENTICATED:
            return{
                ...state,
                isIsAuthenticated: action.payload
            }
        case SET_INFO_MESSAGE:
            return{
                ...state,
                infoMessage: action.payload
            }    
        default:
            return state
    }

}

export const setErrorR = (payload) => {
    return{
        type: SET_ERROR_R, payload
    }
}

export const setErrorL = (payload) => {
    return{
        type: SET_ERROR_L, payload
    }
}

export const setRegistrationStatus = (payload) => {
    return{
        type: SET_REGISTRATION_STATUS, payload
    }
}

export const setInfoMessage = (payload) =>{
    return { type: SET_INFO_MESSAGE, payload}
}

export const addProductForCart = (product_id, size) => (dispatch) =>{
    return cartAPI.addToCart(product_id, size).then((r)=>{
        if (r.status === 200){
            dispatch(setInfoMessage(r.data))
            dispatch(getDataCustomerAndCartThunk())
        }
    })
}

export const deleteProductForCart = (product_id, size) => (dispatch) =>{
    return cartAPI.deleteProduct(product_id, size).then((r)=>{
        console.log(r)
        if (r.status === 204){
            dispatch(getDataCustomerAndCartThunk())
        }
    })
}

export const productChangeQty = (product_id, size, qty) => (dispatch) =>{
    return cartAPI.changeQty(product_id, size, qty).then((r)=>{
        if (r.status === 200){
            dispatch(getDataCustomerAndCartThunk())
        }
    })
}

export const productChangeSize = (product_id, size, newSize) => (dispatch) =>{
    return cartAPI.changeSize(product_id, size, newSize).then((r)=>{
        if (r.status === 200){
            dispatch(getDataCustomerAndCartThunk())
        }
    })
}


export const setUser = (payload) =>{
    return{
        type: SET_USER, payload
    }
}


export const setAuthenticated = (payload) => {
    return{
        type: SET_AUTHENTICATED, payload
    }
} 

export const getDataCustomerAndCartThunk = () => (dispatch) => {
    return authAPI.me().then(r => {
        if (r.status === 200){
            dispatch(setUser(r.data))
            dispatch(setAuthenticated(true))
        } 
    }).catch((err) => {
        console.clear()
        if (err.response.data.code==="token_not_valid"){
            dispatch(setAuthenticated(false))
        }
    })
}

export const registrationThunk = (username, email, password) => (dispatch) =>{
    return authAPI.registration(username, email, password).then(r =>{
        console.log(r)
        if (r.status === 201){
            dispatch(setRegistrationStatus(true))
        } 
    }).catch((err) => {
        console.clear()
        if (err.response.data.username){
            dispatch(setErrorR(err.response.data.username[0]))
        } else if(err.response.data.email){
            dispatch(setErrorR(err.response.data.email[0]))
        } else if(err.response.data.password){
            dispatch(setErrorR(err.response.data.password[0]))
        }
    })
}

export const LoginThunk = (username, password) => (dispatch) =>{
    return authAPI.login(username, password).then(r =>{
        console.log(r)
        if (r.status === 200){
            Cookies.set('token', `${r.data.access}`)
            // console.log(r.data.access)
            dispatch(getDataCustomerAndCartThunk())
        } 
    }).catch((err) => {
        console.log(err.response.data.detail)
        dispatch(setErrorL('Неправильно введен логин или пороль'))
    })
}


export const LogoutThunk = () => (dispatch) =>{
    Cookies.remove('token')
    dispatch(setAuthenticated(false))
    dispatch(setUser({
        owner:{},
        product:[],
        final_price:0, 
        total_products:0}))
    dispatch(setRegistrationStatus(false))
    dispatch(setErrorR(''))
    dispatch(setErrorL(''))
}

export default authUserReducer