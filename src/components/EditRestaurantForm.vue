<template>
    <div class="form EditRestaurantForm">

        <div class="input-box">
            <p class="form-label">Current Restaurant Name</p>
            <p class="current-restaurant">{{ restaurantList.name }}</p>

            <p class="form-label">New Restaurant Name</p>
            <p><input type="text" v-model="newRestaurantName" class="form-control" required></p>

            <button class="btn btn-primary" @click="handleEditRestaurant()">Save</button>

        </div>

    </div>
</template>

<script>
const axios = require('axios').default;

export default {
  name: 'editRestaurantForm',
    data() {
        return {
            editRestaurant: [],
            restaurantList: [],
            newRestaurantName: '',
            id:this.$route.params.id
        }
    },
    created() {
        this.getAllRestaurants();
    },
    methods: {
        handleEditRestaurant() {
            const headers = { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYwNTI1Nzk4LCJleHAiOjE2NjMxMTc3OTh9.mYq36UcH2P_rYq5u9sdWSxybLJokR1IL61K-C_9ch1g',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
            axios({
                method: 'PUT',
                url: 'http://localhost:1337/api/restaurants/' + this.id,
                headers: headers,
                data: {
                    data: {
                        name: this.newRestaurantName
                        }
                }
            })
                .then(response => {
                    this.editRestaurant = response.data;
                    console.log(response.data);
                    this.$router.push('/all-restaurant')
                })
        },
         getAllRestaurants() {
            axios({
                method: 'GET',
                url: "http://localhost:1337/api/restaurants/" + this.id,
            })
                .then(response => {
                    this.restaurantList = response.data.data.attributes;
                    console.log("Restaurants",response.data.data);
                })
        }
    }
}
</script>

<style scoped>
.current-restaurant{
    font-size: 30px;
}
</style>