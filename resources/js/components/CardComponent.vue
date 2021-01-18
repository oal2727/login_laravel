<template>
    <div class="column is-half" style="margin:auto;">
    <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            {{title}}
            </p>
        </header>
        <div class="card-content">
           <slot></slot>
        </div> 
    </div>
    </div>
</template>

<script>
    
    export default {
        name:"card-component",
        props:{
           title:{
               type:String,
               required:true
           }
        }
    
    }
</script>
<style >
   
</style>