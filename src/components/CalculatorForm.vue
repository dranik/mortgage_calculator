<template>
  <v-form>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <v-label><span class="calculator-form__label">Property Purchase Price</span></v-label>
          <v-text-field
            placeholder="e.g 200000"
            name="propertyPurchasePrice"
            :value="propertyPurchasePrice"
            @change="setField('propertyPurchasePrice', $event)"
            prepend-inner-icon="mdi-currency-eur"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-label><span class="calculator-form__label">Total savings</span></v-label>
          <v-text-field
            placeholder="e.g 50000"
            name="totalSavings"
            :value="totalSavings"
            @change="setField('totalSavings', $event)"
            prepend-inner-icon="mdi-currency-eur"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="6">
          <v-label><span class="calculator-form__label">Real estate commission</span></v-label>
          <v-select
            :items="items"
            name="realEstateCommision"
            :value="realEstateCommision"
            @change="setField('realEstateCommision', $event)"
            placeholder="Please select"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-label><span class="calculator-form__label">Annual payment rate(%)</span></v-label>
          <v-text-field
            placeholder="e.g 2.0"
            name="annualPaymentRate"
            :value="annualPaymentRate"
            @change="setField('annualPaymentRate', $event)"
            outlined
          >
            <v-icon
              slot="append"
              color="primary"
              @click="increaseAnnualPayment"
            >
              mdi-plus
            </v-icon>
            <v-icon
              slot="prepend-inner"
              color="primary"
              @click="decreaseAnnualPayment"
            >
              mdi-minus
            </v-icon>
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CalculatorForm',
  data: () => ({
    items: [
      {
        value: true,
        text: 'Yes'
      },
      {
        value: false,
        text: 'No'
      }
    ]
  }),
  computed: {
    ...mapState({
      propertyPurchasePrice: ({form: { propertyPurchasePrice } }) => propertyPurchasePrice,
      totalSavings: ({form: { totalSavings } }) => totalSavings,
      realEstateCommision: ({form: { realEstateCommision } }) => realEstateCommision,
      annualPaymentRate: ({form: { annualPaymentRate } }) => annualPaymentRate
    })
  },
  provide() {
    return {
      onChange: (input) => {
        this.setField(input);
      },
      $v: this.validation
    }
  },
  methods: {
    increaseAnnualPayment() {

    },
    decreaseAnnualPayment() {

    },
    setField(field, value) {
      this.$store.dispatch('setField', { field, value })
    }
  }
}
</script>
<style lang="scss">
@import '@/mixins/colors.scss';

.calculator-form__label {
  font-weight: bold;
  padding-bottom: 16px;
  color: $c-dark;
}
</style>
