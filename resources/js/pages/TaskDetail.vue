<template>
     <div>
         <progress class="progress is-small is-primary" max="100" v-if="spinnerdetails">15%</progress>
        <card-component title="Task Details" v-else>
          <h4 style="text-align:center;">Task : Title : <strong>{{datatask.name}}</strong></h4>
          <h3 style="text-align:center;">Details:</h3>
          <p>
            
              {{datatask.details}}
          </p>
        </card-component>
    </div>
</template>
<script>
import {mapState} from "vuex"
export default {
      computed:mapState({
            datatask:state=>state.datatask,
            spinnerdetails:state => state.spinnerdetails
        }),
    created(){
        // console.log("1" + $route.params.id)
        var id =this.$route.params.id
        this.$store.dispatch("getDetails",id).then(()=>{

        }).catch(()=>{
            this.$router.push("/Dashboard")
        })
    }
}
</script>