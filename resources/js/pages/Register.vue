<template>
    <div>
        <card-component title="Register">
           <form @submit.prevent="Registrar">
                 <input-component 
            type="text"
            placeholder="Input First Name"
            v-model="user.firstName"/>
            <input-component 
            type="text"
            placeholder="Input Last Name"
            v-model="user.lastName"/>
            <input-component 
            type="email"
            placeholder="Input Email"
            v-model="user.email"
            />
            <input-component 
            type="password"
            placeholder="Input Password"
            v-model="user.password"
            />
           <input-component 
           type="password"
           placeholder="Input Repeat Password"
           v-model="user.repeatPassword"
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
        methods:{
            Registrar(){
                const param={
                    firstName:this.user.firstName,
                    lastName:this.user.lastName,
                    email:this.user.email,
                    password:this.user.password
                }
                console.log("data" + this.user)
                this.$store.dispatch('Register',this.user).then(() => {
                    this.$store.commit("CLEAN_DATA")
                      this.$router.push("/Login")
                     this.flash("Successfull Register", 'success',{
                       timeout: 3000,
                   });
               })

           }
        }
    }
</script>
