<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
    </a>
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
    <router-link class="navbar-item" to="/Dashboard">Dashboard</router-link>
<!-- 
      <a class="navbar-item">
        Home
      </a> -->
    </div>
  <template>
    <div class="navbar-end" v-if="!authenticated">
      <div class="navbar-item">
        <div class="buttons">
              <router-link class="button is-primary" to="/Register">Sign Up</router-link>
           <router-link class="button is-light" to="/Login">Log In</router-link>
         
        </div>
      </div>
    </div>

  <div class="navbar-item has-dropdown is-hoverable" style="text-right:30px;" v-else>
        <a class="navbar-link">
          {{userauthenticated.firstName}} {{userauthenticated.lastName}}
        </a>

        <div class="navbar-dropdown">
         <router-link class="navbar-item" to="/Dashboard">Dashboard</router-link>
         
          <a class="navbar-item"
          @click="Logout">
          Logout
          </a>
        </div>
      </div>
  </template>

  </div>
</nav>
</template>
<script>
import {mapAction,mapState,mapGetters} from "vuex"
export default {
    computed:{
    ...mapState(['userauthenticated']),
    ...mapGetters(['authenticated']),
    ...mapGetters(['userauthenticated'])
    },
    created(){
       this.$store.dispatch('Initialize')
    },
    methods:{
      Logout(){
        this.$store.dispatch("Logout").then(e => {
           this.$router.push("/")
        })
      }
    }
}
</script>