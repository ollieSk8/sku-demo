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
        let {newData,oldData}=payload;
        if(newData.length>oldData.length){
            for(let i=0;i<newData.length;i++){
                if(oldData[i]&&oldData[i].price!==''){
                    newData[i].price=oldData[i].price;
                }
                if(oldData[i]&&oldData[i].stock!==''){
                    newData[i].stock=oldData[i].stock;
                }
                if(oldData[i]&&oldData[i].code!==''){
                    newData[i].code=oldData[i].code;
                }
                if(oldData[i]&&oldData[i].price_original!==''){
                    newData[i].price_original=oldData[i].price_original;
                }
                if(oldData[i]&&oldData[i].sale!==''){
                    newData[i].sale=oldData[i].sale;
                }
            }
        }else {
            for(let i=0;i<oldData.length;i++){
                if(newData[i]&&oldData[i].price!==''){
                    newData[i].price=oldData[i].price;
                }
                if(newData[i]&&oldData[i].stock!==''){
                    newData[i].stock=oldData[i].stock;
                }
                if(newData[i]&&oldData[i].code!==''){
                    newData[i].code=oldData[i].code;
                }
                if(newData[i]&&oldData[i].price_original!==''){
                    newData[i].price_original=oldData[i].price_original;
                }
                if(newData[i]&&oldData[i].sale!==''){
                    newData[i].sale=oldData[i].sale;
                }
            }
        }
        state.skuTable=newData;
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
