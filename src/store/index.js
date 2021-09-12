import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    form: {
      propertyPurchasePrice: null,
      totalSavings: null,
      realEstateCommision: null,
      annualPaymentRate: null
    }
  },
  mutations: {
    setFormField(state, { field, value }) {
      state.form[field] = 'boolean' === typeof(value) ? value : Number(value);
    }
  },
  actions: {
    setField({ commit }, { field, value }) {
      commit('setFormField', { field, value });
    }
  }
})
