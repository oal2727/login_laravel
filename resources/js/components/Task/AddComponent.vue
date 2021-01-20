<template>
    <card-component :title="title">
         <form @submit.prevent="addTask">
                <input-component 
            type="text"
            placeholder="Input Task Here"
            v-model="task.name"
             field="input"
            />
            <input-component 
            type="textarea"
            placeholder="Input Details Here"
            v-model="task.details"
            field="textarea"
            />
            <div style="margin-top:10px;">
                 <button 
             v-if="task.id === ''"
            type="submit"
            class="button is-primary" >Agregar</button>
           
            <div style="display:flex;justify-content:space-between;" v-else>
                  <button 
            type="submit"
            class="button is-warning">Update</button>
              <button 
            type="button"
            @click="cancelar()"
            class="button is-danger">Cancelar</button>
            </div>
                </div>
             </form>
    </card-component>
</template>
<script>
import {mapState} from "vuex"
export default {
     computed:mapState({
            task:state=>state.task,
            title:state=>state.title
    }),
     data: function () {
        return {
            mensaje: ""
        }
    },
    methods:{
        addTask(){

            if(this.validation()){
               this.flashMessage(this.mensaje,"warning")
            }else{
            this.task.id === "" ? 
            this.$store.dispatch("addTask",this.task).then(()=>{
                this.flashMessage("Task register Sucessfull","success")
            })
            :
            this.$store.dispatch("updateTask",this.task).then(()=>{
                this.flashMessage("Update task sucessfull","success")
            })
            this.$store.commit("CLEAN_TASK")
            }


        },
        cancelar(){
            this.$store.commit("CLEAN_TASK")
        },
        flashMessage(message,type){
             this.flash(message,type,{
                       timeout: 3000,
                });
        },
        validation(){
            if(!this.task.name && !this.task.detail){
                this.mensaje="registrar campos"
                return true;                
            }
            if(this.task.name.length >= 20){
                this.mensaje="Nombre menor a 20 caracteres"
                return true;                
            }
              if(this.task.name.length >= 250){
                this.mensaje="Detalle menor a 250 caracteres"
                return true;                
            }
            return false;
        }
    }
}
</script>