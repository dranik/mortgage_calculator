<template>
  <v-form>
    <v-container>
      <v-row dense>
        <v-col cols="12" md="6">
          <v-label><span class="calculator-form__label">Property Purchase Price</span></v-label>
          <v-text-field
            placeholder="e.g 200000"
            name="propertyPurchasePrice"
            :value="propertyPurchasePrice"
            @input="setField('propertyPurchasePrice', $event)"
            type="number"
            :error-messages="propertyPurchasePriceError"
            prepend-inner-icon="mdi-currency-eur"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-label><span class="calculator-form__label">Total savings</span></v-label>
          <v-text-field
            placeholder="e.g 50000"
            name="totalSavings"
            :value="totalSavings"
            @input="setField('totalSavings', $event)"
            type="number"
            :error-messages="totalSavingsError"
            prepend-inner-icon="mdi-currency-eur"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" md="6">
          <v-label><span class="calculator-form__label">Real estate commission</span></v-label>
          <v-select
            :items="items"
            name="realEstateCommision"
            :value="realEstateCommision"
            @input="setField('realEstateCommision', $event)"
            placeholder="Please select"
            :error-messages="realEstateCommisionError"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-label><span class="calculator-form__label">Annual payment rate(%)</span></v-label>
          <v-text-field
            placeholder="e.g 2.0"
            name="annualPaymentRate"
            :value="annualPaymentRate"
            @input="setField('annualPaymentRate', $event)"
            type="number"
            :error-messages="annualPaymentRateError"
            outlined
          >
            <v-icon
              slot="append"
              color="primary"
              @click="increaseAnnualPayment"
            > mdi-plus </v-icon>
            <v-icon
              slot="prepend-inner"
              color="primary"
              @click="decreaseAnnualPayment"
            > mdi-minus </v-icon>
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from 'vuex';
import { required, numeric, minValue } from 'vuelidate/lib/validators';


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
  validations: {
    propertyPurchasePrice: { required, numeric, minValue: minValue(1) },
    totalSavings: { required, numeric, minValue: minValue(1) },
    realEstateCommision: { required },
    annualPaymentRate: { required, minValue: minValue(0.1) }
  },
  computed: {
    ...mapState({
      propertyPurchasePrice: ({form: { propertyPurchasePrice } }) => propertyPurchasePrice,
      totalSavings: ({form: { totalSavings } }) => totalSavings,
      realEstateCommision: ({form: { realEstateCommision } }) => realEstateCommision,
      annualPaymentRate: ({form: { annualPaymentRate } }) => annualPaymentRate
    }),
    propertyPurchasePriceError() {
      return this.validationMessageFor(this.$v.propertyPurchasePrice);
    },
    totalSavingsError() {
      return this.validationMessageFor(this.$v.totalSavings);
    },
    realEstateCommisionError() {
      return this.validationMessageFor(this.$v.realEstateCommision);
    },
    annualPaymentRateError() {
      return this.validationMessageFor(this.$v.annualPaymentRate);
    },
  },
  provide() {
    return {
      $v: this.validation
    }
  },
  watch:  {
    '$v.$invalid'(value) {
      this.$store.dispatch('setValidity', !value);
    }
  },
  methods: {
    validationMessageFor(field) {
      if (field.$model === null) return null;
      if (field.$invalid) return 'Enter the correct value';

      return null;
    },
    increaseAnnualPayment() {
      this.setField(
        'annualPaymentRate',
        this.annualPaymentRate
          ? Math.round((Number(this.annualPaymentRate) + 0.1) * 10) / 10
          : 2.0
      )
    },
    decreaseAnnualPayment() {
      this.setField(
        'annualPaymentRate',
        this.annualPaymentRate
          ? Math.round((Number(this.annualPaymentRate) - 0.1) * 10) / 10
          : 2.0
      )
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
