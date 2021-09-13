<template>
  <v-container class="calculator__container">
    <v-row>
      <v-col cols="12">
        <v-card
          elevation="6"
        >
          <v-card-title class="calculator__title">Mortgage Calculator</v-card-title>
          <v-card-text><CalculatorForm></CalculatorForm></v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              large
              color="primary"
              width="150"
              :disabled="!isFormValid"
              @click="calculate"
            >
              Calculate
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="7" cols="12">
        <v-card
          elevation="6"
        >
          <v-card-title class="calculator__result-label">Implied loan</v-card-title>
          <v-card-text v-if="rawLoanAmount" class="calculator__result-value">{{rawLoanAmount}}€</v-card-text>
          <v-card-text v-else class="calculator__result-value">N/A</v-card-text>
        </v-card>
      </v-col>
      <v-col md="5" cols="12" >
        <v-card
          elevation="6"
        >
          <v-card-title class="calculator__result-label">Loan to value</v-card-title>
          <v-card-text v-if="loanToValue" class="calculator__result-value">{{loanToValue}}%</v-card-text>
          <v-card-text v-else class="calculator__result-value">N/A</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="showTableCard">
      <v-col cols="12">
        <v-card elevation="6">
          <v-card-title v-if="tableData" class="calculator__title">Available rates</v-card-title>
          <v-card-title v-else class="calculator__title">We are processing your request</v-card-title>
          <v-card-text v-if="tableData">
            <Table></Table>
          </v-card-text>
          <v-card-text v-else>
            <v-progress-linear
              indeterminate
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import CalculatorForm from '@/components/CalculatorForm.vue';
import Table from '@/components/Table.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Calculator',
  data: () => ({
  }),
  components: {
    CalculatorForm,
    Table
  },
  computed: {
    ...mapGetters([
      'rawLoanAmount',
      'loanToValue',
    ]),
    ...mapState({
      isFormValid: ({ isFormValid }) => isFormValid,
      showTableCard: ({ showTableCard }) => showTableCard,
      tableData: ({ tableData }) => tableData
    }),
  },
  methods: {
    async calculate(){
      await this.$store.dispatch('calculate');
      const tableSelector = document.getElementById("table");
      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: tableSelector.offsetTop + tableSelector.offsetHeight 
      });
    }
  }
}
</script>

<style lang="scss">
@import '@/mixins/colors.scss';

.calculator__container {
  max-width: 700px;
}

.v-card__title.calculator__title {
  font-size: 24px;
  color: $c-dark;
}

.v-card__title.calculator__result-label {
  font-size: 20px;
  color: $c-dark;
}

.theme--light.v-card > .v-card__text.calculator__result-value {
  font-size: 48px;
  font-weight: bold;
  padding-bottom: 36px;
  color: $c-dark;
}

.calculator__container .v-card__actions {
  padding: 16px 24px;
}
</style>
