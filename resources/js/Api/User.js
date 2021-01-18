import Api from './Api'

export default{
    Register(form){
        return Api().post('/register',form);
    },
    Login(data){
        return Api().post('/login',data)
    },
    Me(token){
        return Api().post('/user',{
            headers:{
                'Authorization':`Bearer ${token}`,
            }
        })
    }

}