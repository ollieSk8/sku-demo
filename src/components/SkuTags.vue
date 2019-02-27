<template>
    <div>
        <el-row>
            <el-col :span="2">
                <div style="line-height:40px;height:40px;">规格值:</div>
            </el-col>
            <el-col :span="22">
                <el-tag
                        :key="tag"
                        v-for="(tag,tagIndex) in dynamicTags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag,tagIndex)">
                    {{tag}}
                </el-tag>
                <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">添加规格值</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'
    export default {
        name:'sku-tags',
        data() {
            return {
                inputVisible: false,
                inputValue: ''
            };
        },
        props: {
            index: {
                type: Number,
                required: true,
                default: 0
            },
        },
        computed: {
            dynamicTags(){
                return this.$store.state.skuList[this.index].data
            }
        },
        methods: {
            handleClose(tag,tagIndex) {
                this.delTagsAction({
                    index:this.index,
                    tagIndex:tagIndex
                });
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(()=> {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            ...mapActions([
                'addTagsAction',
                'delTagsAction'
            ]),
            ItemInArrary(val){
                for(let i=0;i<this.dynamicTags.length;i++){
                    if(this.dynamicTags[i]==val){
                        this.$message.error('已添加了相同的规格值');
                        return true;
                    }
                }
                return false;
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue&&!this.ItemInArrary(inputValue)) {
                    this.addTagsAction({
                        index:this.index,
                        tag:inputValue
                    })
                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        }
    }
</script>
<style scoped>
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>

