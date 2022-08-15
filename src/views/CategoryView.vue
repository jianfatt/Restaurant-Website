<template>
<div class="category">
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
</style>