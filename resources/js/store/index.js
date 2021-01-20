import Vue from "vue"
import Vuex from "vuex"
import User from "../Api/User"
import Task from "../Api/Task"
import cookie from "js-cookie"
Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        message:'worknig with vuex',
        user:{firstName:"",lastName:"",
        email:"",password:"",repeatPassword:""},
        userauthenticated:null,
        token:null,
        tasks:[],
        task:{id:"",name:"",details:""},
        title:"Add Task",
        datatask:{},
        spinnerdetails:true
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
        },
        // -------------- TASKS
        ADD_TASK(state,payload){
            state.tasks.push(payload)
        },
        LIST_TASK(state,payload){
            state.tasks = payload
        },
        CLEAN_TASK(state){
            state.task.name="",
            state.task.details=""
            state.task.id=""
            state.title="Add Task"
        },
        DELETE_TASK(state,payload){
            const arrayData = state.tasks.filter(data => {
                return payload !== data.id
            }) 
            state.tasks = arrayData;
        },
        EDIT_TASK(state,payload){
            state.task.id=payload.id
            state.task.name=payload.name
            state.task.details=payload.details
            state.title="Update Task"
        },
        UPDATE_TASK(state,payload){
            let newData = state.tasks.map(e =>{
                return e.id === payload.id ? payload : e
            })
            state.tasks=newData
        },
        SHOW_TASK(state,payload){
            state.datatask=payload
            state.spinnerdetails=false
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
        },
        deleteUser({commit}){
            return User.deleteAccount().then(()=>{
               console.log("delete user ...")
                commit('SET_TOKEN',null)
                commit('SET_USER',null)
            })
        },
        //----------------------------- task next
        addTask({commit},data){
            return Task.add(data).then(e => {
                commit("ADD_TASK",e.data)
            })
        },
        listTask({commit}){
            Task.listAll().then(e => {
                commit("LIST_TASK",e.data)
            })
        },
        deleteTask({commit},id){
            Task.delete(id).then(() => {
                commit("DELETE_TASK",id)
            })
        },
        updateTask({commit},data){
            Task.update(data).then(e => {
                commit("UPDATE_TASK",e.data)
            })
        },
        //get details 
       getDetails({commit},id){
           return Task.edit(id).then(e => {
                commit("SHOW_TASK",e.data)
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