<template>
  <div class="home">
    <hero></hero>
    <category></category>
    <card></card>
  </div>
</template>

<script>
// @ is an alias to /src
import hero from '@/components/Hero.vue'
import card from '@/components/RestaurantCard.vue'
import category from '@/components/CategoryNavBar.vue'

export default {
  name: 'HomeView',
  components: {
    hero,
    card,
    category
}
}
</script>

<style>
.home{
  width: 100vw;
  height: 100vh;
  padding: 0 100px;
}
</style>
