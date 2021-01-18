<template>
    <div style="margin-top:10px;">
        <button 
        type="submit"
        class="button is-success">{{title}}</button>
    </div>
</template>
<script>
export default {
    props:["title"],
}
</script>