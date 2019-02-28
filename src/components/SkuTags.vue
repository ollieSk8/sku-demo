<template>
    <div>
        <el-row>
            <el-col :span="2" style="width:80px;">
                <div style="line-height:40px;height:40px;">规格值:</div>
            </el-col>
            <el-col :span="21">
               <div class="sku-val-wrap">
                   <div v-if="count>0"   style="display: inline-block;float: left;">
                       <div v-for="(skuValue,tagIndex) in skuValueList" :key="tagIndex" class="sku-val-item">
                           <el-input
                                   placeholder="请输入内容"
                                   :value="skuValue.text"
                                   @input="updateInput($event,tagIndex)"
                                   autofoucs
                                   v-validate="'required'"
                                   :name="'val'+tagIndex"
                                   data-vv-as="规格值"
                           >

                           </el-input>
                           <div class="delete-btn" @click="delOneTag(tagIndex)">X</div>
                           <div v-if="errors.has('val'+tagIndex)" class="errors">
                               {{ errors.first('val'+tagIndex) }}
                           </div>
                       </div>
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
    import zhCN from 'vee-validate/dist/locale/zh_CN'
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
            delOneTag(tagIndex){
                this.delTagsAction({
                    index:this.index,
                    tagIndex:tagIndex
                })
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
                'updateTagsAction',
                'delTagsAction'
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
        },
        created(){
            this.$validator.localize('cn', {
                messages: zhCN.messages
            });

            // start with english locale.
            this.$validator.localize('cn');
        }
    }
</script>
<style scoped>
    .sku-val-wrap{

    }
    .sku-val-item{
        width:180px;
        margin-right:20px;
        margin-bottom:10px;
        position: relative;
        float: left;
    }
    .delete-btn{
        width:20px;
        height:20px;
        text-align: center;
        color:#fff;
        line-height:20px;
        background-color:#f56c6c;
        display: inline-block;
        position: absolute;
        right:-10px;
        top: -10px;
        font-size:12px;
        border-radius:50%;
        cursor: pointer;
    }
    .errors{
        color:#f56c6c;
    }
</style>

