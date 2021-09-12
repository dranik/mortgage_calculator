import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    form: {
      propertyPurchasePrice: null,
      totalSavings: null,
      realEstateCommision: null,
      annualPaymentRate: 2
    }
  },
  mutations: {
  },
  actions: {
    setField(_context, { field, value }) {
      console.log(field, value);
    }
  }
})
