<template>
    <div>
    <div class="control" style="margin-top:10px;" v-if="field==='input'">
    <input 
    class="input" 
    :type="type" 
    :placeholder="placeholder"
    :value="value"
    v-on:input="$emit('input',$event.target.value)"
    >
    </div>
    <div class="control" style="margin-top:10px;" v-else >
    <textarea class="textarea"  
    :type="type" 
    :placeholder="placeholder"
    v-on:input="$emit('input',$event.target.value)"
    :value="value"
    ></textarea>
    </div>
    </div>
</template>
<script>
export default {
    props:["placeholder","type","value","field"],
    methods:{
        // updateValue:function(value){
        //     this.$emit("input",value)
        // }
    }
}
</script>