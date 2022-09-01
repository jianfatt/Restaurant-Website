<template>
  <div class="home">
    <hero></hero>
    <categoryNav @filterCategory="handleFilterCategory($event)"></categoryNav>
    <h1 v-if="restaurantList == ''" class="default-message">No restaurant available yet</h1>
    <div class="restaurant-card row">
      <card class="col-12 col-md-6 col-lg-4" :restaurant="restaurant" v-for="restaurant in restaurantList"></card>
    </div>
    <nav v-if="restaurantList != ''" aria-label="Page navigation example" class="home-pagination">
      <ul class="pagination">
        <li class="page-item">
          <span class="page-link" aria-label="Previous" @click="handlePreviousPage()">
            <span aria-hidden="true">&laquo;</span>
          </span>
        </li>
        <li class="page-item" v-for="page in pageList.pageCount" :class="{ active: page == currentPage }"><span
            class="page-link" @click="handlePage(page)">{{  page  }}</span></li>
        <li class="page-item">
          <span class="page-link" aria-label="Next" @click="handleNextPage()">
            <span aria-hidden="true">&raquo;</span>
          </span>
        </li>
      </ul>
    </nav>
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
      categoryList: [],
      pageList: [],
      currentPage: 1,
      currentPageSize: 6,
      api_url: process.env.VUE_APP_API_URL,
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
        pagination: {
          page: this.currentPage,
          pageSize: this.currentPageSize,
        },
        populate: "image,categories"
      }, {
        encodeValuesOnly: true,
      });

      axios({
        method: 'GET',
        url: `${this.api_url}/api/restaurants?${query}`
      })
        .then(response => {
          this.restaurantList = response.data.data;
          this.pageList = response.data.meta.pagination;
          console.log("All Restaurants", response.data.data);
          console.log("Page", response.data.meta.pagination);
        })
    },
    handleFilterCategory(categoryId) {
      console.log("categoryId", categoryId)
      this.getAllRestaurant(categoryId)
      // this.restaurantList = filteredRestaurant;
    },
    handlePage(page) {
      this.currentPage = page
      this.getAllRestaurant()
      console.log('Current Number', this.currentPage)
    },
    handleNextPage() {
      if (this.currentPage < this.pageList.pageCount) {
        this.currentPage += 1
        this.getAllRestaurant()
      }
      else if(this.currentPage >= this.pageList.pageCount){
        this.currentPage = 1
        this.getAllRestaurant() 
      }
      console.log('Next Number', this.currentPage)
    },
    handlePreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1
        this.getAllRestaurant()
      }
      else if(this.currentPage <= 1){
        this.currentPage = this.pageList.pageCount
        this.getAllRestaurant() 
      }
      console.log('Previous Number', this.currentPage)
    }
  }
}
</script>

<style>
.home {
  height: 100vh;
  background-image: linear-gradient(to right, #434343, #000000);
}

.restaurant-card{
  background-image: linear-gradient(to right, #434343, #000000);
}

.default-message {
  margin: 100px 0;
  color: white;
  text-align: center;
}

.home-pagination {
  background: gray;
  width: 100%;
}

.pagination{
  margin: 0;
}

.page-item{
  width: 70px;
  text-align: center;
}

.page-item:hover {
  cursor: pointer;
}
</style>
