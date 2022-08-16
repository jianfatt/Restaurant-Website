<template>
    <div class="restaurant-card">
        <router-link :to="{ path: 'restaurant/' + restaurant.id }"  class="restaurant-link">
        <div class="card">
            <div v-for="image in restaurant.attributes.image.data">
                <img :src="'http://localhost:1337' + image.attributes.url" class="card-img-top" :alt="restaurant.attributes.name">
            </div>
            <div class="card-body">
                
                <p class="card-text restaurant-name">{{ restaurant.attributes.name }} </p>
                <p class="card-text restaurant-desc">{{ restaurant.attributes.description }} </p>
               
            </div>
        </div>
         </router-link>
    </div>
</template>

<script>
const axios = require('axios').default;

export default {
    name: 'card',
    props: {
        restaurant: Object
    },
    data() {
        return {
            
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

.restaurant-name{
    font-size: 20px;
    font-weight: 700;
}

.restaurant-desc{
    font-size: 15px;
    color: gray;
}

.restaurant-link{
    text-decoration: none;
    color: black;
}
</style>