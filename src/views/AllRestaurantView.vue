<template>
<div class="restaurant">
<a class="btn btn-sm btn-outline-dark previous-page-link" @click="$router.back()">Back</a>
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
