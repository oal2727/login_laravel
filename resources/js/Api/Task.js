import Api from './Api'

export default{
    listAll(){
        return Api().get("/task")
    },
    add(data){
        return Api().post('/task',data);
    },
    delete(id){
        return Api().delete(`/task/${id}`)
    },
    edit(id){
        return Api().get(`/task/${id}`)
    },
    update(data){
        return Api().put(`/task/${data.id}`,data)
    }

}