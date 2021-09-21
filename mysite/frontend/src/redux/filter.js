import { mainAPI } from "../api/api"

const SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY'
const SET_ACTIVE_SORT = 'SET_ACTIVE_SORT'
const GET_CATEGORY = 'GET_CATEGORY'
const GET_COLLECTION ='GET_COLLECTION'
const SET_ORDERING = 'SET_ORDERING'


const initialState = {
    category: [],
    activeCategory: null,
    activeSort: {   
        "id": 0,
        "title": "по новезне",
        "slug": "created_at"
    },
    ordering:'-',
    nameCategory: 'Все',
    slugCategory: '',
    collection:[]
}

const filterReducer = (state=initialState, action) =>{
    switch (action.type) {
        case GET_CATEGORY:
            return{
                ...state,
                category: action.payload
            }
        case GET_COLLECTION:
            return{
                ...state,
                collection: action.payload

            }
        case SET_ACTIVE_CATEGORY:
            return{
                ...state,
                activeCategory: action.payload.id,
                nameCategory: action.payload.title,
                slugCategory: action.payload.slug
            }
        case SET_ACTIVE_SORT:
            return{
                ...state,
                activeSort: action.payload
            }  
        case SET_ORDERING:
            return{
                ...state,
                ordering: action.payload
            }
        default:
            return state
    }
}

export const setOrdering = (payload) =>{
    return{type: SET_ORDERING, payload}
}

export const setActiveSort = (payload)=>{
    return{type:SET_ACTIVE_SORT, payload}
}

export const setActiveCategory = (payload)=>{
    return{type:SET_ACTIVE_CATEGORY, payload}
}

export const setCategory = (dataCategory)=>{
    return{type:GET_CATEGORY, payload: dataCategory}
}

export const setCollection = (payload) =>{
    return{type: GET_COLLECTION, payload}
}

export const getCategoryThunk = () => (dispatch) => {
    return mainAPI.getCategory().then(r => {
        dispatch(setCategory(r.data.results))
    })
}

export const getCollectionThunk = () => (dispatch) => {
    return mainAPI.getCollections().then(r => {
        dispatch(setCollection(r.data.results))
    })
}

export default filterReducer