import axios from 'axios'
import cookie from "js-cookie"

const api = axios.create({
    baseURL:"https://tranquil-earth-65169.herokuapp.com/api"
})

let APi = function(){
    let token=cookie.get('token')
    if(token){
         api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return api
}

export default APi;