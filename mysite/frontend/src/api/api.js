import * as axios from 'axios'
import Cookies from 'js-cookie'


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/api/',

})

export const productAPI = {
    getProducts({activeCategory, slugCategory}, ordering='-created_at', activePage=1 ){
        return instance.get(`product/?${activeCategory !== null? `&category=${slugCategory}`:''}&ordering=${ordering}&page=${activePage}`)
    }
}

export const mainAPI = {
    getCategory(){
        return instance.get('category/')
    },
    getCollections(){
        return instance.get('collection/')
    }
}

export const authAPI = {
    registration(username, email, password){
        return instance.post('auth/users/',{
            "username" : username,
            "email": email,
            "password": password
        })
    },

    login(username, password){
        return instance.post('token/',{
            "username": username,
            "password": password
        })
    },
    me(){
        return instance.get('cart/current_customer_cart/', 
        { headers: 
            {"Authorization" : `JWT ${Cookies.get('token')}`}
        }
    )}
}

export const cartAPI = {
    addToCart(product_id, size){
        return instance.post('cart/product_add_to_cart/',{
            "product_id": product_id,
            "sizeProduct": size
        },
        { headers: 
            {"Authorization" : `JWT ${Cookies.get('token')}`},
            
        },
    )},
    deleteProduct(product_id, size){
        return instance.post('cart/product_remove_from_cart/',{
            "product_id": product_id,
            "sizeProduct": size
        },
        { headers: 
            {"Authorization" : `JWT ${Cookies.get('token')}`},
            
        },
    )},
    changeQty(product_id, size, qty){
        return instance.patch('cart/product_change_qty/',{
            "product_id": product_id,
            "sizeProduct": size,
            "qty": qty,
        },
        { headers: 
            {"Authorization" : `JWT ${Cookies.get('token')}`},
            
        },
    )},
    changeSize(product_id, size, newSize){
        return instance.patch('cart/product_change_size/',{
            "product_id": product_id,
            "sizeProduct": size,
            "new_size": newSize
        },
        { headers: 
            {"Authorization" : `JWT ${Cookies.get('token')}`},
            
        },
    )},

}