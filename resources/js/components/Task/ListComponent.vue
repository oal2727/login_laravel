<template>
    <table class="table" style="width:100%;margin:auto;">
        <thead>
            <tr>
                <th>N°</th>
                <th>Name</th>
                <th>Details</th>
                <th></th>
                  <th></th>
            </tr>
        </thead>
        <tbody v-for="(item,index) of tasks" :key="index">
            <tr>
                <td>{{index+1}}</td>
                <td>{{item.name}}</td>
                <td>{{item.details.substring(0,25)}}
                    <a v-if="item.details.length >= 25" @click="Detail(item)">  Ver Mas..</a>
                </td>
                <td> <button 
            type="submit"
            @click="editTask(item)"
            class="button is-warning">Edit</button></td>
        <td>
             <button 
            type="submit"
            @click="deleleTask(item.id)"
            class="button is-danger">Delete</button>
            </td>
            </tr>

        </tbody>
    </table>
</template>
<script>
export default {
    props:["tasks"],
    methods:{
        deleleTask(id){
            console.log("task id " + id)
            this.$store.dispatch("deleteTask",id).then(()=>{
                 this.flash("Successfull Task Delete", 'success',{
                       timeout: 3000,
                });
            })
        },
        editTask(item){
            this.$store.commit("EDIT_TASK",item)
        },
        Detail(item){
            console.log("details")
        // this.$store.dispatch('DetailTask',item.id)
        this.$router.push({name:'TaskDetail',params:{id:item.id}})
        }
    }
}
</script>