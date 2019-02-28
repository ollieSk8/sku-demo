/**
 * Created by ollie on 2019/2/25.
 */
export default {
    addOneSkuAction ({ commit }) {
        commit('addOneSkuAction')
    },
    delOneItemAction({ commit },index) {
        commit('delOneItemAction',index)
    },
    updateMessageAction({ commit },payload) {
        commit('updateMessageAction',payload)
    },
    updateTableDataAction({ commit },payload) {
        commit('updateTableDataAction',payload)
    },
    addTagsAction({ commit },payload) {
        commit('addTagsAction',payload)
    },
    delTagsAction({ commit },payload) {
        commit('delTagsAction',payload)
    },
    updateTagsAction({ commit },payload) {
        commit('updateTagsAction',payload)
    },
    updateInputAction({ commit },payload) {
        commit('updateInputAction',payload)
    }
}