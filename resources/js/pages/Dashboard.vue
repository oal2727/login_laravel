<template>
   <section class="hero">
  <div class="hero-body">
    <div class="container">
        <addtask-component/>
        <listtask-component :tasks="tasks" v-if="tasks.length > 0"/>
        <!-- <p v-else>no hay tareas</p> -->
        <span class="tag is-info is-medium" 
        style="margin:auto;
        display:flex;width:50%;" v-else>Don't have Tasks!!</span>
    </div>
  </div>
</section>
</template>

<script>
import {mapState} from "vuex"
    export default {
      computed:mapState({
            tasks:state=>state.tasks,
        }),
      created(){
        this.$store.dispatch("listTask");
      },
       methods:{

       }
    }
</script>
