<template>
    <div>
        <el-row>
            <el-col :span="2" style="width:80px;">
                <div style="line-height:40px;height:40px;">规格值:</div>
            </el-col>
            <el-col :span="21" v-if="count>0">
               <div class="sku-val-wrap">
                   <div class="sku-val-item" v-for="(skuValue,tagIndex) in skuValueList" :key="tagIndex">
                       <el-input  placeholder="请输入内容" :value="skuValue.text" @input="updateInput($event,tagIndex)"></el-input>
                   </div>
                   <div class="sku-val-item">
                       <el-button type="primary" @click="addTags">添加规格值</el-button>
                   </div>
               </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'
    export default {
        name:'sku-tags',
        computed: {
            skuValueList(){
                return this.$store.state.skuList[this.index].data
            },
            count(){
                return this.$store.state.skuList[this.index].data.length;
            }
        },
        methods:{
            addTags(){
                this.addTagsAction({index:this.index});
            },
            ItemInArrary(val){
                let tagsList=this.skuValueList;
                for(let i=0;i<tagsList.length;i++){
                    if(val!==''&&tagsList[i].text==val){
                        this.$message.error('已添加了相同的规格值');
                        return true;
                    }
                }
                return false;
            },
            updateInput(val,tagIndex){
                if(!this.ItemInArrary(val)){
                    this.updateTagsAction({
                        index:this.index,
                        tagIndex:tagIndex,
                        val:val
                    });
                }
            },
            ...mapActions([
                'addTagsAction',
                'updateTagsAction'
            ])
        },
        props: {
            index: {
                type: Number,
                required: true,
                default: 0
            }
        },
        mounted(){
            this.skuValueLocalList=this.skuValueList;
        }
    }
</script>
<style scoped>
    .sku-val-wrap{

    }
    .sku-val-item{
        display: inline-block;
        margin-right:10px;
        margin-bottom:10px;
    }
</style>

