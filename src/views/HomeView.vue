<template>
  <div class="home">
    <hero></hero>
    <categoryNav></categoryNav>
    <div class="row">
      <card class="col" :restaurant="restaurant" v-for="restaurant in restaurantList"></card>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
const axios = require('axios').default;
import hero from '@/components/Hero.vue'
import card from '@/components/RestaurantCard.vue'
import categoryNav from '@/components/CategoryNavBar.vue'

export default {
  name: 'HomeView',
  components: {
    hero,
    card,
    categoryNav
  },
  data() {
    return {
      restaurantList: [],
    }
  },
  created() {
    this.getAllRestaurant();
  },
  methods: {
    getAllRestaurant() {
      axios({
        method: 'GET',
        url: "http://localhost:1337/api/restaurants",
        params: {
          populate: "image,categories",

        }
      })
        .then(response => {
          this.restaurantList = response.data.data;
          console.log("All Restaurants", response.data.data);
        })
    },
    getRestaurants() {
      axios({
        method: 'GET',
        url: "http://localhost:1337/api/categories/" + this.id + "?",
        params: {
          populate: "categories",

        }
      })
        .then(response => {
          this.item = response.data.data;
          console.log("Restaurants in the Category", response.data.data);
        })
    },
  }
}
</script>

<style>
.home {
  width: 100vw;
  height: 100vh;
  padding: 0 100px;
}
</style>
