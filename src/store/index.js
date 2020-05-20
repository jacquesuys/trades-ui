import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    draft: "",
    facility: "",
    facilityList: ["Facility 1", "Facility 2", "Facility 3"]
  },
  mutations: {
    loadDraft(state, draft) {
      state.draft = draft;
    },
    updateForm(state, key, value) {
      state[key] = value;
    }
  },
  actions: {},
  modules: {}
});
