<template>
<div class="crud-page">
<div class="back-btn col-4"><router-link class="btn btn-sm btn-outline-dark back-link" :to="{ path: '/category' }">Back</router-link></div>
<h1 class="header">Add New Category</h1>
<addCategoryForm></addCategoryForm>
</div>
</template>

<script>
import addCategoryForm from '@/components/AddCategoryForm.vue'

export default {
  name: 'AddCategoryView',
  components: {
    addCategoryForm,
}
}
</script>

<style>
  .header{
    text-align: center;
  }
</style>