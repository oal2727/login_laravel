import Api from './Api'

export default{
    Register(form){
        return Api().post('/register',form);
    },
    Login(data){
        return Api().post('/login',data)
    },
    Me(){
        return Api().post('/user')
    },
    Logout(){
        return Api().post("/logout")
    },
    deleteAccount(){
        return Api().delete("/user")
    }

}