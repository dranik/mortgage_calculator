<template>
  <div id="table">
    <v-data-table
      :headers="headers"
      :items="preparedTableEntries"
      class="elevation-1"
      hide-default-footer
      :items-per-page="-1"
    ></v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
  name: 'Table',
  data: () => ({
    headers: [
      { text: 'Years', value: 'years' },
      { text: 'Borrowing rate', value: 'borrowingRate' },
      { text: 'Monthly rate', value: 'monthlyRate' }
    ]
  }),
  computed: {
    ...mapGetters(['preparedTableEntries']),
  }
}
</script>
