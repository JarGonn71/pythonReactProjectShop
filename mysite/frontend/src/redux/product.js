import { productAPI } from "../api/api"

const DELETE_LIKE_PRODUCT= 'DELETE_LIKE_PRODUCT'
const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE'
const SET_LIKE_PRODUCTS = 'SET_LIKE_PRODUCTS'
const GET_NEXT_PRODUCT = 'GET_NEXT_PRODUCT'
const SET_ACTIVE_PRODUCT = 'SET_ACTIVE_PRODUCT'
const CLOSE_ACTIVE_PRODUCT = 'CLOSE_ACTIVE_PRODUCT'

const initialState = {
    products:[],
    likeProducts:{},
    countProduct: 0,
    activePage: 1,
    countPages: 1,
    activeProduct: {
    },
}

const productReducer = (state=initialState, action)=>{
    switch (action.type) {
        case SET_PRODUCTS:
            return{
                ...state,
                products: action.payload.dataProduct,
                countProduct: action.payload.countProduct,
                countPages: action.payload.countPages
            }
        case GET_NEXT_PRODUCT:
            return{
                ...state,
                products: [...state.products, ...action.payload]
            }   
        case SET_ACTIVE_PAGE:
            return{
                ...state,
                activePage: action.payload
            }  
        case SET_LIKE_PRODUCTS:{
            const newItems = {
                ...state.likeProducts,
                    [action.payload.id]: !state.likeProducts[action.payload.id]
                        ? action.payload
                        : undefined
            }
            Object.keys(newItems).forEach(key => newItems[key] === undefined && delete newItems[key]) 
            return{
                ...state,
                likeProducts: newItems
            }
        }

        case SET_ACTIVE_PRODUCT:
            return{
                ...state,
                activeProduct: action.payload,
            }
        case DELETE_LIKE_PRODUCT:{
            const newItems = {
                ...state.likeProducts
            }
            delete newItems[action.payload]

            Object.keys(newItems).forEach(key => newItems[key] === undefined && delete newItems[key]) 

            return{
                ...state,
                likeProducts: newItems
            }
        }
        default:
            return state
    }
}


export const setActiveProduct = (payload) =>{
    return{ type:SET_ACTIVE_PRODUCT , payload}
}

export const setProduct = (dataProduct, countProduct, countPages) => {
    return{ type:SET_PRODUCTS, payload: {dataProduct, countProduct, countPages}}
}

export const setPage = (payload) => {
    return{ type:SET_ACTIVE_PAGE, payload}
}

export const setLikeProduct = (payload) => {
    return{type: SET_LIKE_PRODUCTS, payload}
}

export const deleteLikeProduct = (payload) => {
    return {type: DELETE_LIKE_PRODUCT, payload}
}

export const getNextProducts = (payload) => {
    return{ type: GET_NEXT_PRODUCT, payload}
}

export const getProductsThunk = (category, ordering) => (dispatch) => {
    return productAPI.getProducts(category, ordering).then(r => {
        dispatch(setProduct(r.data.results, r.data.count, Math.ceil( r.data.count/9) ))
    })
}

export const getNextProductsThunk = (category, ordering, activePage) => (dispatch) => {
    return productAPI.getProducts(category, ordering, activePage).then(r => {
        dispatch(getNextProducts(r.data.results))
    })
}


export default productReducer