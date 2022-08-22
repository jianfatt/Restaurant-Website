<template>
<div class="crud-page">
<p class="back"><router-link class="back-link" :to="{ path: '/category' }">Back</router-link></p>
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