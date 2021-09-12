import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const stateConfig = {
  form: {
    propertyPurchasePrice: null,
    totalSavings: null,
    realEstateCommision: null,
    annualPaymentRate: null
  }
}

export const getters = {
  notaryCosts: () => null,
  rawLoanAmount: () => null,
  loanToValue: () => null,
  brokerCosts: () => null,
  stampDutyCosts: () => null,
  totalCost: () => null
}

export const mutations = {
  setFormField(state, { field, value }) {
    state.form[field] = 'boolean' === typeof(value) ? value : Number(value);
  }
}

export const actions = {
  setField({ commit }, { field, value }) {
    commit('setFormField', { field, value });
  }
}

export default new Vuex.Store({
  state: stateConfig,
  getters,
  mutations,
  actions
})
