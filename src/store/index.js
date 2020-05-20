import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    draft: {}
  },
  mutations: {
    loadDraft(state, draft) {
      console.log("store", draft);
      state.draft = draft;
    }
  },
  actions: {},
  modules: {}
});
