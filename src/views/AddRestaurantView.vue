<template>
<div>
<h1>Add New Restaurant</h1>
<addRestaurantForm></addRestaurantForm>
</div>
</template>

<script>
import addRestaurantForm from '@/components/AddRestaurantForm.vue'

export default {
  name: 'AddRestaurantView',
  components: {
    addRestaurantForm,
}
}
</script>