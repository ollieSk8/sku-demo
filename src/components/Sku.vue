<template>
    <div>
        <div class="container">
            <div v-if="datas.length>0">
                <div class="pannel" v-for="(data,index) in datas" :key="index">
                    <sku-group :index="index"></sku-group>
                </div>
            </div>
            <div class="pannel">
                <el-row class="sku-item">
                    <el-col :span="24"><el-button @click="addOneSku">添加规格</el-button></el-col>
                </el-row>
            </div>
            <sku-table-cols v-if="canTableShow"></sku-table-cols>
        </div>
    </div>
</template>
<script>
    import {mapState,mapActions} from 'vuex'
    import SkuGroup from './SkuGroup.vue';
    import SkutableCols from './SkutableCols.vue'
    export default {
        name: 'sku',
        components:{
            'sku-group':SkuGroup,
            'sku-table-cols':SkutableCols
        },
        data(){
            return {
                datas:[],
                disabled:false,
                canTableShow:false
            }
        },
        computed:mapState({
            skuList: state => state.skuList,
            skuTable: state => state.skuTable
        }),
        watch:{
            skuList:{
                handler: function(){
                    for(let i=0;i<this.skuList.length;i++){
                        if(this.skuList[i].type!==''&&this.skuList[i].data.length!==0){
                           this.canTableShow=true;
                            return;
                        }
                    }
                    this.canTableShow=false;
                },
                deep: true
            }
        },
        methods:{
            ...mapActions([
                'addOneSkuAction'
            ]),
            addOneSku(){
                if(this.skuList.length>2){
                    return;
                }
                this.addOneSkuAction();
            }
        },
        mounted(){
            this.datas=this.skuList;
        }
    };
</script>
<style>
    .container{
        border:1px solid #dcdfe6;
    }
</style>
