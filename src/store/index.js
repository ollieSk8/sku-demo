/**
 * Created by ollie on 2019/2/25.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
    strict: debug,
    state:{
        skuList:[],
        skuTable:[]
    },
    getters,
    actions,
    mutations
})