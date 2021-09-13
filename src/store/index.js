import Vue from 'vue';
import Vuex from 'vuex';
import consts from '@/lib/consts.js';
import { sum } from 'ramda';
import { graphQlQuery } from '@/api/mock.js';

Vue.use(Vuex);

export const stateConfig = {
  form: {
    propertyPurchasePrice: null,
    totalSavings: null,
    realEstateCommision: null,
    annualPaymentRate: null
  },
  isFormValid: false,
  showTableCard: false,
  tableData: null
}

export const getters = {
  notaryCosts:
    ({ form: { propertyPurchasePrice } }) => propertyPurchasePrice
                                               ? 2144.0 + (0.013 * (propertyPurchasePrice-100000))
                                               : null,
  rawLoanAmount({ form: { propertyPurchasePrice, totalSavings } }, { totalCost }) {
    if (!(propertyPurchasePrice && totalSavings && totalCost)) return null;

    return totalCost - totalSavings + propertyPurchasePrice;
  },
  loanToValue({ form: { propertyPurchasePrice } }, { rawLoanAmount }) {
    if (!(rawLoanAmount && propertyPurchasePrice)) return null;

    return Math.round(rawLoanAmount / propertyPurchasePrice * 1000) / 1000;
  },
  brokerCosts({ form: { propertyPurchasePrice, realEstateCommision } }) {
    if (!propertyPurchasePrice) return null;
    if (realEstateCommision === null) return null;
    if (realEstateCommision === false) return 0;

    return Math.round(consts.BROKER_TAX * propertyPurchasePrice);
  },
  stampDutyCosts:
    ({ form: { propertyPurchasePrice } }) => propertyPurchasePrice
                                               ? Math.round(propertyPurchasePrice * consts.CITY_TAX)
                                               : null,
  totalCost(_state, { notaryCosts, brokerCosts, stampDutyCosts }) {
    if (brokerCosts === null) return null;
    if (!(notaryCosts && stampDutyCosts)) return null;

    return sum([notaryCosts, brokerCosts, stampDutyCosts]);
  }
}

export const mutations = {
  setFormField(state, { field, value }) {
    state.form[field] = 'boolean' === typeof(value) ? value : Number(value);
  },
  setFormValidity(state, value) {
    state.isFormValid = value;
  },
  revealTable(state) {
    state.showTableCard = true;
  },
  setTableData(state, value) {
    state.tableData = value;
  }
}

export const actions = {
  setField({ commit }, { field, value }) {
    commit('setFormField', { field, value });
  },
  setValidity({ commit }, value) {
    commit('setFormValidity', value);
  },
  async calculate({ commit }) {
    commit('setTableData', null);
    commit('revealTable');
    const response = await graphQlQuery();
    commit('setTableData', response.content);


  }
}

export default new Vuex.Store({
  state: stateConfig,
  getters,
  mutations,
  actions
})
