<template>
  <div class="home">
    <hero></hero>
    <categoryNav @filterCategory="handleFilterCategory($event)" ></categoryNav>
    <h1 v-if="restaurantList==''" class="default-message">No restaurant available yet</h1>
    <div class="restaurant-card row">
      <card class="col-12 col-md-6 col-lg-4" :restaurant="restaurant" v-for="restaurant in restaurantList"></card>
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
      restaurantList: '',
      categoryList:[],
      api_url:process.env.VUE_APP_API_URL,
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
        url: this.api_url + `/api/restaurants?${query}`,
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
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(to right, #434343, #000000);
}

.restaurant-card{
  width: 100vw;
  background-image: linear-gradient(to right, #434343, #000000);
}

.default-message{
  margin: 100px 0;
  color: white;
  text-align: center;
}
</style>
