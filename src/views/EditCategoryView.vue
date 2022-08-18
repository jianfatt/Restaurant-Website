<template>
<div>
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