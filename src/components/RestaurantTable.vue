<template>
<div>
  <div class="header-container">
    <p class="table-text title col-12">Restaurant</p>
    <span class="table-text subtitle">Restaurant Table</span>
    <router-link :to="{ path: '/add-restaurant' }" class="btn btn-primary">Add</router-link>
  </div>

<div class="table-responsive">
<table class="table table-sm table-bordered border-dark">
  <thead>
    <tr>
      <th class="table-cell" scope="col">No.</th>
      <th class="table-cell" scope="col">Restaurant Name</th>
      <th class="table-cell" scope="col">Address</th>
      <th class="table-cell" scope="col">Website</th>
      <th class="table-cell" scope="col">Phone</th>
      <th class="table-cell" scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="restaurant in restaurantList" class="align-middle">
      <td class="table-cell counterCell " scope="row"></td>
      <td class="table-cell restaurant-cell"><router-link :to="{ path: 'restaurant/' + restaurant.id }" class="restaurant-link">{{ restaurant.attributes.name }}</router-link></td>
      <td class="table-cell restaurant-cell">{{ restaurant.attributes.address }}</td>
      <td v-if="restaurant.attributes.website==''" class="table-cell restaurant-cell">N/A</td>
      <td v-else class="table-cell restaurant-cell website-cell">{{ restaurant.attributes.website }}</td>
      <td v-if="restaurant.attributes.phone==''" class="table-cell restaurant-cell">N/A</td>
      <td v-else class="table-cell restaurant-cell">{{ restaurant.attributes.phone }}</td>

      <td class="table-cell action-cell">
        <router-link :to="{ path: 'edit-restaurant/' + restaurant.id }"><button class="btn btn-primary action-button">Edit</button></router-link>
        <button class="btn btn-danger action-button" @click="handleDeleteRestaurant(restaurant)">Delete</button>
      </td>
    </tr>
  </tbody>
</table>
</div>
</div>
</template>

<script>
const axios = require('axios').default;

export default {
    name: 'restaurantTable',
    data() {
        return {
                restaurantList: [],
                deletedRestaurant:[],
        }
    },
    created() {
        this.getAllCategories();
    },
    methods: {
        getAllCategories() {
            axios({
                method: 'GET',
                url: "http://localhost:1337/api/restaurants",
            })
                .then(response => {
                    this.restaurantList = response.data.data;
                    console.log("All Categories",response.data.data);
                })
        },
        handleDeleteRestaurant(restaurant){
          console.log("restaurant", restaurant)
          const headers = { 
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
            axios({
                method: 'DELETE',
                url: "http://localhost:1337/api/restaurants/" + restaurant.id,
                headers:headers,
            })
                .then(response => {
                    this.deleteRestaurant = response;
                    console.log("Deleted",response);
                    window.location.reload();
                })
        }
    }
}
</script>

<style>
.restaurant-cell{
  text-align: center;
  width: 250px;
}

</style>