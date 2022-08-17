<template>
  <div class="home">
    <hero></hero>
    <categoryNav @filterCategory="handleFilterCategory($event)" ></categoryNav>
    <div class="row">
      <card class="col-4" :restaurant="restaurant" v-for="restaurant in restaurantList"></card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
const axios = require('axios').default;
import hero from '@/components/Hero.vue'
import card from '@/components/RestaurantCard.vue'
import categoryNav from '@/components/CategoryNavBar.vue'
const qs = require('qs');

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
      categoryList:[]
    }
  },
  created() {
    this.getAllRestaurant();
  },
  methods: {
    getAllRestaurant(categoryId) {
      const query = qs.stringify({
        filters: {
          categories: {
            id: {
              $eq: categoryId,
            },
          },
        },
      }, {
        encodeValuesOnly: true,
      });
      
      axios({
        method: 'GET',
        url: `http://localhost:1337/api/restaurants?${query}`,
        params: {
          populate: "image,categories",
        }
      })
        .then(response => {
          this.restaurantList = response.data.data;
          console.log("All Restaurants", response.data.data);
        })
    },
    handleFilterCategory(categoryId){
      console.log("categoryId", categoryId)
      this.getAllRestaurant(categoryId)
      // this.restaurantList = filteredRestaurant;
    }
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
