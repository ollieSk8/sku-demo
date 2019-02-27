/**
 * Created by ollie on 2019/2/25.
 */
export default {
    addOneSkuAction (state) {
        state.skuList.push({
            type:'',
            data:[]
        });
    },
    delOneItemAction(state,index) {
        state.skuList.splice(index,1);
    },
    updateMessageAction(state,payload) {
        let {index,value}=payload;
        state.skuList[index].type=value;
    },
    updateTableDataAction(state,payload) {
        state.skuTable=payload;
    },
    updateSkucolsAction(state,payload){
        state.skucols=payload;
    },
    addTagsAction(state,payload){
        let {index,tag}=payload;
        state.skuList[index].data.push(tag);
    },
    delTagsAction(state,payload){
        let {index,tagIndex}=payload;
        state.skuList[index].data.splice(tagIndex,1);
    },
    updateInputAction(state,payload){
        let {val,index,key}=payload;
       state.skuTable[index][key]=val;
    }
}
