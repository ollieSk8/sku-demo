<template>
    <div>
        <el-input  v-validate="'required|email'" name="email1" type="text" v-model="email1" placeholder="text-com"/>
        <div v-if="errors.has('email1')">
            {{ errors.first('email1') }}
        </div>
        <text-child></text-child>
    </div>
</template>
<script>
    import TextChild from './TextChild.vue'


    export default {
        name:'text-com',
        provide() {
            return {
                $validator: this.$validator,
            };
        },
        inject: ['$validator'],
        components:{
            'text-child':TextChild
        },
        data(){
            return {
                email1:''
            }
        }
    };
</script>
<style lang="scss">

</style>
