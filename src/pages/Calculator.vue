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
            >
              Calculate
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card
          elevation="6"
        >
          <v-card-title class="calculator__result-label">Implied loan</v-card-title>
          <v-card-text class="calculator__result-value">9001,44€</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          elevation="6"
        >
          <v-card-title class="calculator__result-label">Loan to value</v-card-title>
          <v-card-text class="calculator__result-value">9001,44%</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import CalculatorForm from '@/components/CalculatorForm.vue';

  export default {
    name: 'Calculator',
    data: () => ({
    }),
    components:{
      CalculatorForm
    }
  }
</script>

<style lang="scss">
  @import '@/mixins/colors.scss';

  .calculator__container {
    max-width: 600px;
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
