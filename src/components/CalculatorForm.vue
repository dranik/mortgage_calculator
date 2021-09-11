<template>
  <v-form>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <v-label><span class="calculator-form__label">Property Purchase Price</span></v-label>
          <v-text-field
            placeholder="e.g 200000"
            prepend-inner-icon="mdi-currency-eur"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-label><span class="calculator-form__label">Total savings</span></v-label>
          <v-text-field
            placeholder="e.g 50000"
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
            placeholder="Please select"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-label><span class="calculator-form__label">Annual payment rate(%)</span></v-label>
          <v-text-field
            placeholder="e.g 2.0"
            outlined
          >
            <v-icon
              slot="append"
              color="secondary"
              @click="increaseAnnualPayment"
            >
              mdi-plus
            </v-icon>
            <v-icon
              slot="prepend-inner"
              color="secondary"
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
    methods: {
      increaseAnnualPayment() {

      },
      decreaseAnnualPayment() {

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
