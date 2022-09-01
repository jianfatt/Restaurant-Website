<template>
<div class="crud-page">
<div class="back-btn col-4"><router-link class="btn btn-sm btn-outline-dark back-link" :to="{ path: '/category' }">Back</router-link></div>
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