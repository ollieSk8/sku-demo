/**
 * Created by ollie on 2019/2/25.
 */
export default {
    getSkuList:(state)=>{
        return state.skuList;
    },
    getSkuTable:(state)=>{
        return state.skuTable;
    },
    getSkuListOneType:(state)=> (index) => {
        return state.skuList[index].type;
    }
}