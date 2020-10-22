import Vue from "vue";
import Vuex from "vuex";
import * as form from "@/store/modules/form";
import * as notification from "@/store/modules/notifications";

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
  modules: {
    form,
    notification
  }
});
