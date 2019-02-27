<template>
    <div id="app">
        <!--<form @submit.prevent="validateBeforeSubmit">-->
            <!--<el-input v-model="product_name" name="product_name" v-validate="'required|alpha'" placeholder="app里的表单域"/>-->
            <!--<div v-if="errors.has('product_name')">-->
                <!--{{ errors.first('product_name') }}-->
            <!--</div>-->
            <!--<el-input v-model="text" name="text" v-validate="'required|alpha'" placeholder="app里的表单域"/>-->
            <!--<div v-if="errors.has('text')">-->
                <!--{{ errors.first('text') }}-->
            <!--</div>-->
            <!--<text-com></text-com>-->
            <!--<el-button type="primary" native-type="submit">Submit</el-button>-->
        <!--</form>-->

        <sku></sku>
    </div>
</template>

<script>
import store from './store'
import Sku from './components/Sku.vue';
export default {
    name: 'app',
    store,
    data () {
        return {
            product_name: '',
            text: ''
        }
    },
    components: {
        'sku': Sku
    },
    provide() {
        return {
            $validator: this.$validator,
        };
    },
    methods: {
        validateBeforeSubmit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    // eslint-disable-next-line
                    alert('Form Submitted!');
                    return;
                }
            });
        }
    }
}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        padding: 20px;
    }

    .container {
        wdith: 800px;
        margin: 0 auto;
    }

    .pannel {
        padding: 10px;
        margin-bottom: 10px;
    }

    .sku-item {
        padding: 10px;
        background-color: #f8f8f8;
    }
</style>
