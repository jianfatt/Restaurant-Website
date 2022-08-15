<template>
<div>
<h1>Edit Restaurant</h1>
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