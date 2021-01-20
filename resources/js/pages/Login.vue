<template>
    <div>
        <card-component title="Login">
         <form @submit.prevent="LoginUser">
                <input-component 
            type="email"
            placeholder="Input Email Here"
            v-model="user.email"
            field="input"
            />
            <input-component 
            type="password"
            placeholder="Input Password Here"
            v-model="user.password"
            field="input"
            />
            <button-component title="Login"/>
             </form>
        </card-component>
    </div>
</template>

<script>
import {mapState} from "vuex"
    export default {
        computed:mapState({
            user:state=>state.user,
            message:state => state.message
        }),
         data: function () {
        return {
            mensaje: ""
        }
        },
        methods:{
            LoginUser(){
              
                if(this.validation()){
                    this.flashMessage(this.mensaje,"warning")
                }else{
                      const param={
                    email:this.user.email,
                    password:this.user.password
                    }
                       this.$store.dispatch("Login",param).then(()=>{
                    this.$router.push("/Dashboard")
                   this.flashMessage("Sucessfull Login",'success')
                    }).catch(err => {
                        this.flashMessage(err.response.data.error,'error')
                })
                }
             
            },
              flashMessage(message,type){
             this.flash(message,type,{
                       timeout: 3000,
                });
            },
            validation(){
                if(!this.user.email && !this.user.password){
                   this.mensaje="Registrar Campos Obligatorios"
                 return true; 
                }
                return false
            }
        }

    }
</script>
