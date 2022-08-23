<template>
<div class="crud-page">
<p class="btn btn-sm btn-outline-dark back"><router-link class="back-link" :to="{ path: '/category' }">Back</router-link></p>
<h1 class="header">Edit Category</h1>
<editCategoryForm></editCategoryForm>
</div>
</template>

<script>
import editCategoryForm from '@/components/EditCategoryForm.vue'

export default {
  name: 'EditCategoryView',
  components: {
    editCategoryForm,
},
}
</script>