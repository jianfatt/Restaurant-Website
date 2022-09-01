<template>
<div class="category">
<div class="back-btn col-10"><span class="btn btn-sm btn-outline-dark" @click="$router.back()">Back</span></div>
<categoryTable class="category-table col-10"></categoryTable>
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
  .back-btn{
    margin: auto;
    padding: 20px 0;
  }

  .previous-page-link:hover {
  cursor: pointer;
  }

  .category-table{
    margin: auto;
  }
</style>