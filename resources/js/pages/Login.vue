<template>
    <div>
        <card-component title="Login">
         <form @submit.prevent="LoginUser">
                <input-component 
            type="email"
            placeholder="Input Email Here"
            v-model="user.email"
            />
            <input-component 
            type="password"
            placeholder="Input Password Here"
            v-model="user.password"
            />
            <p>{{message}}</p>
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
        methods:{
            LoginUser(){
                const param={
                    email:this.user.email,
                    password:this.user.password
                }
                this.$store.dispatch("Login",param).then(()=>{
                    this.$router.push("/Dashboard")
                    this.flash("Successfull Log In", 'success',{
                       timeout: 3000,
                   });
                }).catch(err => {
                   this.flash(err.response.data.error, 'error',{
                       timeout: 5000,
                   });
               })
            }
        }

    }
</script>
