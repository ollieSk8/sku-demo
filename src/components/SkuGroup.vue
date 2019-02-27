<template>
    <div  class="sku-item">
        <el-row>
            <el-col :span="22">
                <sku-auto-complete :index="index"></sku-auto-complete>
            </el-col>
            <el-col :span="2">
                <el-button type="danger"  @click="delOneItem(index)">删除</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <sku-tags :index="index"></sku-tags>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'
    import SkuAutoComplete from './SkuAutoComplete.vue'
    import SkuTags from './SkuTags.vue'
    export default {
        name: 'sku-group',
        props: {
            index: {
                type: Number,
                required: true,
                default: 0
            },
        },
        components:{
            'sku-auto-complete':SkuAutoComplete,
            'sku-tags':SkuTags
        },
        methods: {
            ...mapActions([
                'delOneItemAction'
            ]),
            delOneItem(index){
               this.delOneItemAction(index);
            }
        }
    };
</script>
<style scoped>
</style>
