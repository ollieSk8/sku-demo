<template>
    <div>
        <el-input  v-validate="'required|email'" name="email" type="text" v-model="email" placeholder="text-com"/>
        <div v-if="errors.has('email')">
            {{ errors.first('email') }}
        </div>
        <text-child></text-child>
    </div>
</template>
<script>
    import TextChild from './TextChild.vue'
    export default {
        name:'text-com',
        components:{
            'text-child':TextChild
        },
        data(){
            return {
                email:''
            }
        }
    };
</script>
<style lang="scss">

</style>
