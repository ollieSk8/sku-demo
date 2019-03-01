<template>
    <div id="app">
        <div class="el-form">
            <form  @submit.prevent="validateBeforeSubmit">
                <div class="el-form-item">
                    <div class="el-form-item__label" style="width:80px;">商品名称</div>
                    <div class="el-form-item__content" style="margin-left: 80px;">
                        <el-input type="text" v-model="product_name" autocomplete="off" v-validate="'required'" name="product_name" data-vv-as="商品名称"></el-input>
                        <div v-if="errors.has('product_name')" class="errors">
                            {{ errors.first('product_name') }}
                        </div>
                    </div>
                </div>
                <div class="el-form-item">
                    <div class="el-form-item__label" style="width:80px;">商品规格</div>
                    <div class="el-form-item__content" style="margin-left: 80px;">
                        <sku></sku>
                    </div>
                </div>
                <div class="el-form-item">
                    <div class="el-form-item__label" style="width:80px;"></div>
                    <div class="el-form-item__content" style="margin-left: 80px;">
                        <button type="submit" class="el-button el-button--primary"><span>提交</span></button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import store from './store'
import Sku from './components/Sku.vue';
import zhCN from 'vee-validate/dist/locale/zh_CN'
import bus from './components/bus';
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
            $validator: this.$validator
        };
    },
    created(){
        this.$validator.localize('cn', {
            messages: zhCN.messages
        });
        this.$validator.localize('cn');
    },
    methods: {
        validateBeforeSubmit() {
            bus.$emit('veeValidate');
            this.$validator.validateAll().then((result) => {
                if (result) {
                    if (this.errors.items.length<=0) {
                        // eslint-disable-next-line
                        alert('Form Submitted!');
                    }

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
    .errors {
        color:#f56c6c;
    }
</style>
