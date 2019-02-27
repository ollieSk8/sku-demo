<template>
    <div class="sku-table">
        <el-table
                v-bind:data="localSkuTable"
        >
            <el-table-column
                    v-for="(col,index) in skucols" :key="index"
                    :prop="col.value"
                    :label="col.label"
            >
            </el-table-column>
            <el-table-column prop="price_original" label="价格" width="150px">
                <template slot-scope="scope">
                    <el-input size="small" :value="scope.row.price" class="sku-input" maxlength="6" type="number"
                              @input="updateInput($event, scope.$index,'price')"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="price_original" label="库存" width="150px">
                <template slot-scope="scope">
                    <el-input size="small" :value="scope.row.stock" class="sku-input" maxlength="6" type="number"
                              @input="updateInput($event, scope.$index,'stock')"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="price_original" label="规格编码" width="150px">
                <template slot-scope="scope">
                    <el-input size="small" :value="scope.row.code" class="sku-input" maxlength="20"
                              @input="updateInput($event, scope.$index,'code')"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="price_original" label="成本价" width="150px">
                <template slot-scope="scope">
                    <el-input size="small" :value="scope.row.price_original" class="sku-input" maxlength="6"
                              type="number" @input="updateInput($event, scope.$index,'price_original')"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="price_original" label="销量" width="150px">
                <template slot-scope="scope">
                    {{scope.row.sale}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
        name: 'sku-table-cols',
        data(){
            return {
                localSkuTable: []
            }
        },
        watch: {
            skuList: {
                handler: function (val, oldVal) {
                    this.computedClo(val);
                },
                deep: true
            },
            skucols: {
                handler: function (val, oldVal) {
                    this.computedTableData(this.skuList);
                },
                deep: true
            }
        },
        methods: {
            updateInput(val, index, key){
                if (key == 'price' || key == 'stock' || key == 'price_original') {
                    if (Number(val) < 0) {
                        alert('该数值不能小于零');
                        return;
                    }
                }
                this.updateInputAction({val, index, key});
            },
            //笛卡尔积算法
            descartes(list) {
                //parent上一级索引;count指针计数
                var point = {};
                var result = [];
                var pIndex = null;
                var tempCount = 0;
                var temp = [];
                //根据参数列生成指针对象
                for (var index in list) {
                    if (typeof list[index] == 'object') {
                        point[index] = {
                            'parent': pIndex,
                            'count': 0
                        }
                        pIndex = index;
                    }
                }
                //单维度数据结构直接返回
                if (pIndex == null) {
                    return list;
                }
                //动态生成笛卡尔积
                while (true) {
                    for (var index in list) {
                        tempCount = point[index]['count'];
                        temp.push(list[index][tempCount]);
                    }
                    //压入结果数组
                    result.push(temp);
                    temp = [];
                    //检查指针最大值问题
                    while (true) {
                        if (point[index]['count'] + 1 >= list[index].length) {
                            point[index]['count'] = 0;
                            pIndex = point[index]['parent'];
                            if (pIndex == null) {
                                return result;
                            }
                            //赋值parent进行再次检查
                            index = pIndex;
                        } else {
                            point[index]['count']++;
                            break;
                        }
                    }
                }
            },
            computedClo(data){
                let localData = [];
                data.forEach((item, index)=> {
                    let keyname = 'k' + index
                    localData.push({
                        label: item.type,
                        value: keyname
                    })
                });
                this.updateSkucolsAction(localData);
            },
            computedTableData(data){
                let localData = [];
                let tableData = [];
                let passData = data;
                let attr = [];
                data.forEach((item, index)=> {
                    attr = [];
                    item.data.forEach((v)=> {
                        if (v.text !== '') {
                            attr.push(v.text)
                        }
                    });
                    localData.push(attr);
                });
                let descartesData = this.descartes(localData);
                for (let i = 0; i < descartesData.length; i++) {
                    var sku = {
                        price: '',
                        stock: '',
                        code: '',
                        price_original: '',
                        sale: 0
                    }
                    for (let j = 0; j < descartesData[i].length; j++) {
                        if (descartesData[i][j]) {
                            sku[`k${j}`] = descartesData[i][j];
                        } else {
                            sku[`k${j}`] = '';
                        }

                    }
                    tableData.push(sku)
                }
                this.localSkuTable = tableData;
                this.updateTableDataAction(tableData);
            },
            ...mapActions([
                'updateTableDataAction',
                'updateSkucolsAction',
                'updateInputAction'
            ])
        },
        computed: mapState({
            skuList: state => state.skuList,
            skuTable: state => state.skuTable,
            skucols: state => state.skucols,
        }),
        mounted(){
            this.computedClo(this.skuList);
            this.computedTableData(this.skuList);
            this.localSkuTable = this.skuTable;
        }
    }


</script>
<style scoped>
    .sku-table {
        margin-top: 20px;
        padding: 10px;
    }
</style>