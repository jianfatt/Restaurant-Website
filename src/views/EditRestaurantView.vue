<template>
<div class="crud-page">
<div class="back-btn col-4"><router-link class="btn btn-sm btn-outline-dark back-link" :to="{ path: '/all-restaurant' }">Back</router-link></div>
<h1 class="header">Edit Restaurant</h1>
<editRestaurantForm></editRestaurantForm>
</div>
</template>

<script>
import editRestaurantForm from '@/components/EditRestaurantForm.vue'

export default {
  name: 'EditRestaurantView',
  components: {
    editRestaurantForm,
},
}
</script>

<style>
.crud-page{
  margin: auto;
}
</style>