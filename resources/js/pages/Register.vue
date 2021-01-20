<template>
    <div>
        <card-component title="Register">
           <form @submit.prevent="Registrar">
                 <input-component 
            type="text"
            placeholder="Input First Name"
            v-model="user.firstName"
                field="input"
                />
            <input-component 
            type="text"
            placeholder="Input Last Name"
            v-model="user.lastName"
                field="input"
            />
            <input-component 
            type="email"
            placeholder="Input Email"
            v-model="user.email"
                field="input"
            />
            <input-component 
            type="password"
            placeholder="Input Password"
            v-model="user.password"
                field="input"
            />
           <input-component 
           type="password"
           placeholder="Input Repeat Password"
           v-model="user.repeatPassword"
               field="input"
           />
            <button-component title="Register"/>
               </form>
        </card-component>
    </div>
</template>

<script>
import {mapState,mapActions} from "vuex"
    export default {
        computed:mapState({
            user:state=>state.user,
        }),
         data: function () {
        return {
            mensaje: ""
        }
        },
        methods:{
            Registrar(){
                
                if(this.validation()){
                    console.log("problem")
                  this.flashMessage(this.mensaje,"warning")
                }else{
                    console.log("follow")
                    const param={
                    firstName:this.user.firstName,
                    lastName:this.user.lastName,
                    email:this.user.email,
                    password:this.user.password
                }
                    this.$store.dispatch('Register',this.user).then(() => {
                    this.$store.commit("CLEAN_DATA")
                      this.$router.push("/Login")
                    this.flashMessage("Sucessfull Register","success")
               })
                }
           

           },
            validation(){
            if(!this.user.firstName 
            && !this.user.lastName
            && !this.user.email
            && !this.user.password
            && !this.user.repeatPassword){
                this.mensaje="Registrar Campos Obligatorios"
                return true;                
            }
            if(this.user.firstName.length >= 30 || this.user.lastName.length >= 30){
                this.mensaje="Nombre y Apellido menor a 30 caracteres"
                return true;                
            }
            if(this.user.email.length >= 50){
                this.mensaje="Email menor a 50 caracteres"
                return true;                
            }
            if(this.user.password.length >= 30){
                 this.mensaje="Password menor a 30 caracteres"
                return true;     
            }
            if(this.user.password !== this.user.repeatPassword){
                this.mensaje="Contraseñas no coninciden"
                return true;     
            }
            return false;
        },
          flashMessage(message,type){
             this.flash(message,type,{
                       timeout: 3000,
                });
        },
        }
    }
</script>
