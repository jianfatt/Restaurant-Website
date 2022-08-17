<template>
    <div class="single-restaurant">
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active" v-for="image in imageList">
                    <img class="image" :src="'http://localhost:1337' + image.attributes.url" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <div class="restaurant-info-container row">
            <h1 class="name">{{ restaurantList.name }}</h1>
            <p class="description">{{ restaurantList.description }}</p>
            <p class="label col-6">Operation Days
                <br><span class="info" v-for="day in dayList">{{ day.attributes.day }}</span>
            </p>
            <p class="label col-6" style="display:block">Address
                <br><span class="info">{{ restaurantList.address }}</span>
            </p>
            <p class="label col-6">Website
                <br><span class="info">{{ restaurantList.website }}</span>
            </p>
            <p class="label col-6">Contact Number
                <br><span class="info">{{ restaurantList.phone }}</span>
            </p>
        </div>
    </div>
</template>

<script>
const axios = require('axios').default;
const headers = {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYwNTI1Nzk4LCJleHAiOjE2NjMxMTc3OTh9.mYq36UcH2P_rYq5u9sdWSxybLJokR1IL61K-C_9ch1g',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            };

export default {
    name: 'SingleRestaurantView',
    data() {
        return {
            restaurantList: [],
            imageList: null,
            dayList: null,
            id: this.$route.params.id
        }
    },
    created() {
        this.getRestaurant();
        this.getRestaurantInfo();
    },
    methods: {
        getRestaurant() {
            axios({
                method: 'GET',
                url: "http://localhost:1337/api/restaurants/" + this.id,
            })
                .then(response => {
                    this.restaurantList = response.data.data.attributes;
                    console.log("Restaurant", response.data.data);
                })
        },
        getRestaurantInfo() {
            axios({
                method: 'GET',
                url: "http://localhost:1337/api/restaurants/" + this.id + "?",
                headers: headers,
                params: {
                    populate: "image,closingDays"
                }
            })
                .then(response => {
                    this.imageList = response.data.data.attributes.image.data;
                    this.dayList = response.data.data.attributes.closingDays.data;
                    console.log("Image", response.data.data.attributes.image.data);
                    console.log("Days", response.data.data.attributes.closingDays.data);
                })
        }
    }
}
</script>

<style  scoped>
.single-restaurant {
    width: 100vw;
    height: 100vh;
    text-align: left;
}

.description {
    font-size: 20px;
}

.label {
    font-weight: bold;
}

.carousel {
    background: black;
}

.image {
    display: block;
    margin: auto;
    height: 500px;
}

.restaurant-info-container {
    padding: 50px 300px;
}

.info {
    font-weight: 500;
}
</style>