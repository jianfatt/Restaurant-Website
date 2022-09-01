<template>
<div class="restaurant">
  <div class="back-btn col-10"><span class="btn btn-sm btn-outline-dark" @click="$router.back()">Back</span></div>
<restaurantTable class=" restaurant-table col-10"></restaurantTable>
</div>
</template>

<script>
import restaurantTable from '@/components/RestaurantTable.vue'

export default {
  name: '',
  components: {
    restaurantTable,
}
}
</script>

<style>
.restaurant-table{
  margin: auto;
}
</style>
