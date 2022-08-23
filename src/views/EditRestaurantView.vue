<template>
<div class="crud-page">
<router-link class="btn btn-sm btn-outline-dark back back-link" :to="{ path: '/all-restaurant' }">Back</router-link>
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
  display: block;
  color: black;
  text-decoration: none;
}

.back-link:hover{
  color: white;
}
</style>