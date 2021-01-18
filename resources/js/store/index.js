import Vue from "vue"
import Vuex from "vuex"
import User from "../Api/User"
import Cookie from "js-cookie"
Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        message:'worknig with vuex',
        user:{firstName:"",lastName:"",
        email:"",password:"",repeatPassword:""}
    },
    mutations:{
        CLEAN_DATA(state,payload){
            state.user.firstName="";
            state.user.lastName="";
            state.user.email="";
            state.user.password="";
            state.user.repeatPassword=""
        },
        SET_TOKEN(state,payload){
            Cookie.set({"token":payload})
        }  
    },
    actions:{
        Register({commit},data){
            return User.Register(data)
        },
        Login({commit},data){
            return User.Login(data).then(e => {
                console.log(e.data.token)
                // commit({"SET_TOKEN",e.data.token})
            })
        }
    }
})