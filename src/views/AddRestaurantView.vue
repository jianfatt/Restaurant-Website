<template>
<div class="crud-page">
<div class="back-btn col-4"><router-link class="btn btn-sm btn-outline-dark back-link" :to="{ path: '/all-restaurant' }">Back</router-link></div>
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