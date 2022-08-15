<template>
<div class="restaurant">
<restaurantTable></restaurantTable>
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
  .restaurant{
    width: 100%;
    padding: 0 100px;
  }
</style>