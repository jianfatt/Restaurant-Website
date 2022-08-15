<template>
    <div class="restaurant-card row" v-if="restaurantList">
        <div v-for="restaurants in restaurantList" class="card col">
            <img src="" class="card-img-top" alt="...">
            <div class="card-body">
                <router-link :to="{ path: 'restaurant/' + restaurants.id }"  class="restaurant-link">
                <p class="card-text restaurants-name">{{ restaurants.attributes.name }} </p>
                <p class="card-text restaurants-desc">{{ restaurants.attributes.description }} </p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios').default;

export default {
    name: 'card',
    data() {
        return {
                restaurantList: [],
        }
    },
    created() {
        this.getAllRestaurant();
        this.getRelation();
    },
    methods: {
        getAllRestaurant() {
            axios({
                method: 'GET',
                url: "http://localhost:1337/api/restaurants/",
                
            })
                .then(response => {
                    this.restaurantList = response.data.data;
                    console.log("All Restaurants",response.data.data);
                })
        },
        getRelation(){
            axios({
                method: 'GET',
                url: "http://localhost:1337/api/restaurants?populate=image",
            })
                .then(response => {
                    this.restaurantList = response.data.data;
                    console.log("All",response.data.data);
                })
        }
    }
}
</script>

<style>
.card{
    margin: 10px;
}

.card-text{
    text-align: left;
}

.restaurants-name{
    font-size: 20px;
    font-weight: 700;
}

.restaurants-desc{
    font-size: 15px;
    color: gray;
}

.restaurant-link{
    text-decoration: none;
    color: black;
}
</style>