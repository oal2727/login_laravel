/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from "./router"
import VueFlashMessage from 'vue-flash-message';
import cookie from "js-cookie"
Vue.use(VueRouter)
Vue.use(VueFlashMessage);

window.Vue = require('vue').default;
import '../../node_modules/bulma/css/bulma.css';
require('vue-flash-message/dist/vue-flash-message.min.css');

Vue.use(VueFlashMessage, { messageOptions: {
    timeout: 3000,
    important: true,
    autoEmit: false,
    pauseOnInteract: true
  }});

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
import App from "./App.vue"
import {store} from "./store/index"

const router = new VueRouter({
    mode:'history',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!cookie.get('token')) {
        next({
          path: '/Login',
        })
      } else {
        next()
      }
    } else {
      next()
    }
  })

Vue.component('navbar-component', require('./components/NavbarComponent.vue').default);
Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('card-component', require("./components/CardComponent.vue").default);
Vue.component('input-component',require("./components/InputComponent.vue").default);
Vue.component('button-component',require("./components/ButtonComponent").default);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
// cookie.get("token")
store.dispatch("Initialize",cookie.get("token")).then(()=>{
    console.log(cookie.get("token"))  
 const app = new Vue({
    el: '#app',
    components:{App},
    store,
    router
}).$mount('#app');
})