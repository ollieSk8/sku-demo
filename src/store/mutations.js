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
        state.skuList[index].data=[];
        state.skuList[index].data.push({text:''});
    },
    updateTableDataAction(state,payload) {
        //console.log(JSON.stringify(payload))
        let oldData=state.skuTable;
        let newData=payload;
        let resData=[]
        for(let i=0;i<newData.length;i++){
            resData.push(Object.assign({},newData[i],oldData[i]));
        }
        state.skuTable=resData;
    },
    addTagsAction(state,payload){
        let {index}=payload;
        state.skuList[index].data.push({text:''});
    },
    delTagsAction(state,payload){
        let {index,tagIndex}=payload;
        state.skuList[index].data.splice(tagIndex,1);
    },
    updateTagsAction(state,payload){
        let {index,tagIndex,val}=payload;
        state.skuList[index].data[tagIndex].text=val;
    },
    updateInputAction(state,payload){
        let {val,index,key}=payload;
       state.skuTable[index][key]=val;
    }
}
