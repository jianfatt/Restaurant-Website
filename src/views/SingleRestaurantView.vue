<template>
<div class="single-restaurant">
    <img class="cover-image" src="" alt="cover image"/>
    <h1 class="name">{{ restaurantList.name }}</h1>
    <p class="description">{{ restaurantList.description }}</p>
    <p class="label">Operation Days</p>
    <p class="label">Address</p>
    <p>{{ restaurantList.address }}</p>
    <p class="label">Website</p>
    <p>{{ restaurantList.website }}</p>
    <p class="label">Contact Number</p>
    <p>{{ restaurantList.phone }}</p>
</div>
</template>

<script>
const axios = require('axios').default;

export default {
  name: 'editCategoryForm',
    data() {
        return {
            restaurantList: [],
            id:this.$route.params.id
        }
    },
    created() {
        this.getRestaurant();
    },
    methods: {
         getRestaurant() {
            axios({
                method: 'GET',
                url: "http://localhost:1337/api/restaurants/" + this.id,
            })
                .then(response => {
                    this.restaurantList = response.data.data.attributes;
                    console.log("Restaurant",response.data.data);
                })
        }
    }
}
</script>

<style>
.single-restaurant{
    width:100vw;
    padding: 0 100px;
    text-align: left;
}

.cover-image{
    margin: 20px 0;
}

.description{
    font-size: 20px;
}

.label{
    font-weight: bold;
}
</style>