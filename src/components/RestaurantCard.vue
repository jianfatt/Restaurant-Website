<template>
    <div class="restaurant-card row" v-if="restaurantList">
        <div v-for="restaurants in restaurantList" class="card col">
            <img src="#" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text restaurants-name">{{ restaurants.attributes.name }} </p>
                <p class="card-text restaurants-desc">{{ restaurants.attributes.description }} </p>
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
    },
    methods: {
        getAllRestaurant() {
            axios({
                method: 'GET',
                url: "http://localhost:1337/api/restaurants",
            })
                .then(response => {
                    this.restaurantList = response.data.data;
                    console.log("All Restaurants",response.data.data);
                })
        }
    }
}
</script>

<style>
.restaurant-card{
    padding: 0 50px;
}

.card{
    margin: 10px;
    position: relative;
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
    position: absolute;
    bottom: 10px;
}
</style>