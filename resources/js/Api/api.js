import axios from 'axios'
// https://tranquil-earth-65169.herokuapp.com
const api = axios.create({
    baseURL:"https://tranquil-earth-65169.herokuapp.com/api"
})

let APi = function(){
    return api
}

export default APi;