<template>
<div class="category">
<a class="btn btn-sm btn-outline-dark previous-page-link" @click="$router.back()">Back</a>
<categoryTable></categoryTable>
</div>
</template>

<script>
import categoryTable from '@/components/CategoryTable.vue'

export default {
  name: 'CategoryView',
  components: {
    categoryTable,
}
}
</script>

<style>
  .category{
    width: 100%;
    padding: 0 100px;
  }

  .previous-page-link{
    display: block;
    margin: 20px 0;
    text-align: left;
    text-decoration: none;
  }

  .previous-page-link:hover {
  cursor: pointer;
  }
</style>