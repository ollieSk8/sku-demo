<template>
    <div class="sku-auto">
        <el-row>
            <el-col :span="2" style="width:80px;">
                <div style="line-height:40px;height:40px;">规格名:</div>
            </el-col>
            <el-col :span="21">
                <el-autocomplete
                        :value="state"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="请输入内容"
                        @input="updateInput($event)"
                ></el-autocomplete>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'
    export default {
        name:'sku-auto-complete',
        data() {
            return {
                restaurants: [],
                timeout:  null
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
            state(){
                return this.$store.state.skuList[this.index].type
            }
        },
        methods: {
            loadAll() {
                return [
                    { "value": "颜色" },
                    { "value": "版本" },
                    { "value": "容量" }
                ];
            },
            ItemInArrary(val){
                let skuList=this.$store.state.skuList;
                for(let i=0;i<skuList.length;i++){
                    if(val!==''&&skuList[i].type==val){
                        this.$message.error('已添加了相同的规格名');
                        return true;
                    }
                }
                return false;
            },
            updateInput(val){
                if(!this.ItemInArrary(val)){
                    this.updateMessageAction({
                        index:this.index,
                        value:val
                    });
                }
            },
            querySearchAsync(queryString, cb) {
                var restaurants = this.restaurants;
                var results =  restaurants;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 500);
            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            ...mapActions([
                'updateMessageAction'
            ])
        },
        mounted() {
            this.restaurants = this.loadAll();
        }
    };
</script>
<style scoped>
    .sku-auto{
        margin-bottom:10px;
    }
</style>
