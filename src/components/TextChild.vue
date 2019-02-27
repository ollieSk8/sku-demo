<template>
    <div>
        <el-input  v-validate="'required|email'" name="email" type="text" v-model="email" placeholder="text-child"/>
        <div v-if="errors.has('email')">
            {{ errors.first('email') }}
        </div>
    </div>
</template>
<script>
    export default {
        name:'text-child',
        inject: ['$validator'],
        data(){
            return {
                email:''
            }
        }
    };
</script>
<style lang="scss">

</style>
