<template>
<div class="crud-page">
<p class="back"><router-link class="back-link" :to="{ path: '/all-restaurant' }">Back</router-link></p>
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
  height: 100vh;
  margin: 10px 20px;
}

.back{
  text-align: left;
}

.back-link{
  text-decoration: none;
}
</style>