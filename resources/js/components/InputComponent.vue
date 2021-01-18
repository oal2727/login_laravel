<template>
    <div class="control" style="margin-top:10px;">
    <input 
    class="input" 
    :type="type" 
    :placeholder="placeholder"
    :value="value"
    v-on:input="$emit('input',$event.target.value)"
    >
    </div>
</template>
<script>
export default {
    props:["placeholder","type","value"],
    methods:{
        // updateValue:function(value){
        //     this.$emit("input",value)
        // }
    }
}
</script>