<template>
    <div class="sku-table">
        <el-table
                v-bind:data="skuTable"
        >
            <el-table-column
                    v-for="(col,index) in attrAttribute" :key="index"
                    :prop="col.value"
                    :label="col.label"
            >
            </el-table-column>
            <el-table-column prop="price_original" label="价格" width="150px">
                <template slot-scope="scope">
                   <div class="abc">
                       <el-input
                               size="small"
                               :value="scope.row.price"
                               class="sku-input"
                               maxlength="6"
                               type="number"
                               v-validate="'required'"
                               :name="'price'+scope.$index"
                               @input="updateInput($event, scope.$index,'price')"
                               data-vv-as="价格"
                       >
                       </el-input>
                       <div v-show="errors.has('price'+scope.$index)" class="errors1">
                           {{ errors.first('price'+scope.$index) }}
                       </div>
                   </div>
                </template>
            </el-table-column>
            <el-table-column prop="price_original" label="" width="10px">
                <template slot-scope="scope">
                    <div></div>
                </template>
            </el-table-column>
            <el-table-column prop="price_original" label="库存" width="150px">
                <template slot-scope="scope">
                    <div class="abc">
                        <el-input
                                size="small"
                                :value="scope.row.stock"
                                class="sku-input"
                                maxlength="6"
                                type="number"
                                @input="updateInput($event, scope.$index,'stock')"
                                v-validate="'required'"
                                :name="'stock'+scope.$index"
                                data-vv-as="库存"
                        >

                        </el-input>
                        <div v-show="errors.has('stock'+scope.$index)" class="errors2">
                            {{ errors.first('stock'+scope.$index) }}
                        </div>
                    </div>
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
                attrAttribute:[]
            }
        },
        watch: {
            skuList: {
                handler: function (val, oldVal) {
                    console.log('skuList change')
                   this.computedTableData(this.$store.state.skuList);
                },
                deep: true
            }
        },
        inject: ['$validator'],
        methods: {
            updateInput(val, index, key){
                if (key == 'price' || key == 'stock' || key == 'price_original') {
                    if (Number(val) < 0) {
                        let messgage='';

                        switch(key){
                            case 'price':
                                messgage='价格';
                            case 'stock':
                                messgage='库存';
                            case 'price_original':
                                messgage='成本价';
                        }
                        this.$message.error(`${messgage}必须大于0`);
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
            computedTableData(skuList){
                /*
                     1 skuList 数据结构
                     [{"type":"颜色","data":[{"text":"黄"},{"text":"绿"}]},{"type":"版本","data":[{"text":"公开版"},{"text":"非公开"}]}]

                     2 localData 数据结构
                     [["黄","绿"],["公开版","非公开版"]]

                     3 attrAttribute 数据结构

                     [{label:"颜色",value:"k0"},{label:"版本",value:"k1"},{label:"颜色",value:"绿"}]
                 */
                let localData = [];
                let attrAttribute = [];
                let tableData=[];
                this.skuList.forEach((item, index)=> {
                    if (item.type !== '') {
                        let tmp = [];
                        item.data.forEach((v, k)=> {
                            if (v.text !== '') {
                                tmp.push(v.text);
                            }
                        });
                        if (tmp.length !== 0) {
                            attrAttribute.push({
                                label: item.type,
                                value: `k${index}`
                            });
                            localData.push(tmp);
                        }
                    }
                });

                this.attrAttribute = attrAttribute;

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

                let oldData=this.$store.state.skuTable;//取出旧值

                this.updateTableDataAction({
                    newData:tableData,
                    oldData:oldData
                });
            },
            ...mapActions([
                'updateTableDataAction',
                'updateInputAction'
            ])
        },
        computed: mapState({
            skuList: state => state.skuList,
            skuTable: state => state.skuTable
        })
    }


</script>
<style scoped>
    .sku-table {
        margin-top: 20px;
        padding: 10px;
    }
    .errors1{
        color:#f56c6c;
    }
    .errors2{
        color:#f56c6c;
    }
</style>