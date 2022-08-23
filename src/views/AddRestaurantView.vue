<template>
<div class="crud-page">
<p class="btn btn-sm btn-outline-dark back"><router-link class="back-link" :to="{ path: '/all-restaurant' }">Back</router-link></p>
<h1 class="header">Add New Restaurant</h1>
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