import Vue from "vue"
import Vuex from "vuex"
import User from "../Api/User"
import cookie from "js-cookie"
Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        message:'worknig with vuex',
        user:{firstName:"",lastName:"",
        email:"",password:"",repeatPassword:""},
        userauthenticated:null,
        token:null
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
            if(payload === null){
                cookie.remove("token")
            }else{
                cookie.set("token",payload)
                state.token=payload;
            }
        },
        SET_USER(state,payload){
            state.userauthenticated=payload;
        }
    },
    actions:{
        Register({commit},data){
            return User.Register(data)
        },
        Login({dispatch},data){
            return User.Login(data).then(e => {
                dispatch("Initialize",e.data.token)
            })
        },
         async Initialize({commit,state},token){
            if(token){
                commit("SET_TOKEN",token)
            }if(!state.token){
                return
            }
            try{
               await User.Me().then(e => {
                    commit("SET_USER",e.data.user)
                })
            }catch(err){
                commit("SET_USER",null)
                commit("SET_TOKEN",null)
            }
        },
        Logout({commit}){
            return User.Logout().then(e =>{
                commit('SET_TOKEN',null)
                commit('SET_USER',null)
            })
        }
    },
    getters:{
        authenticated(state){
            return state.token && state.userauthenticated
        },
        userauthenticated(state){
            return state.userauthenticated
        }
    }
})