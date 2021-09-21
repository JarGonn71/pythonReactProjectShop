

const SHOW_CART = 'SHOW_CART'
const SHOW_LIKE = 'SHOW_LIKE'
const SHOW_AUTHENTICATED = 'SHOW_AUTHENTICATED'
const SHOW_MENU = 'SHOW_MENU'
const SHOW_ACTIVE_PRODUCT = 'SHOW_ACTIVE_PRODUCT'
const CLOSE_ALL_WINDOW= 'CLOSE_ALL_WINDOW'
const CLOSE_AUTH = 'CLOSE_AUTH'

const initialState = {
    modalaWindow: false,
    showCart: false,
    showLike: false,
    showAuthenticated: false,
    showMenu: false,
    showActiveProduct: false
}

const modalReducer = (state=initialState, action) =>{
   switch (action.type) {
        case CLOSE_ALL_WINDOW:
            return{
                ...state,
                modalaWindow: false,
                showCart: false,
                showLike: false,
                showAuthenticated: false,
                showMenu: false,
                showActiveProduct: false
            }
        case SHOW_ACTIVE_PRODUCT:
            return{
                ...state,
                modalaWindow: action.payload,
                showActiveProduct: action.payload
            }
        case SHOW_CART:
            return{
                ...state,
                modalaWindow: !state.showCart,
                showCart: !state.showCart,
                showLike: false,
                showAuthenticated: false,
                showMenu: false,
                showActiveProduct: false
            }
        case SHOW_LIKE:
            return{
                ...state,
                modalaWindow: !state.showLike,
                showCart: false,
                showLike: !state.showLike,
                showAuthenticated: false,
                showMenu: false,
                 showActiveProduct: false
            }
        case SHOW_AUTHENTICATED:
            return{
                ...state,
                modalaWindow: !state.showAuthenticated,
                showCart: false,
                showLike: false,
                showAuthenticated: !state.showAuthenticated,
                showMenu: false,
                showActiveProduct: false
            }
        case SHOW_MENU:
            return{
                ...state,
                showCart: false,
                showLike: false,
                showAuthenticated: false,
                showMenu: !state.showMenu,
                showActiveProduct: false
            }
        case CLOSE_AUTH:
            return{
                ...state,
                modalaWindow: false,
                showAuthenticated: false,
            }
        default:
            return state
    }
}

export const closeAuthenticated = () =>{
    return{type: CLOSE_AUTH}
}

export const setShowActiveProduct = (payload) =>{
    return{type: SHOW_ACTIVE_PRODUCT, payload}
}
export const setShowCart = () =>{
    return{type: SHOW_CART}
}
export const setShowLike = () =>{
    return{type: SHOW_LIKE}
}
export const setShowAuthenticated = () =>{
    return{type: SHOW_AUTHENTICATED}
}
export const setShowMenu = () =>{
    return{type: SHOW_MENU}
}

export const closeWindow = () =>{
    return{type: CLOSE_ALL_WINDOW}
}


export default modalReducer