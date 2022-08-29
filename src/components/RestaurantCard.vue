<template>
    <div class="single-restaurant-card">
        <router-link :to="{ path: 'restaurant/' + restaurant.id }" class="restaurant-link">
            <div class="card">
                <div v-for="(image,index) in restaurant.attributes.image.data" v-show="index==0">
                    <img :src="api_url + image.attributes.url" class="card-img-top" :alt="restaurant.attributes.name">
                </div>
                 <div v-if="restaurant.attributes.image.data == null">
                    <img class="card-img-top" src="@/assets/defaultImage.png" alt="restaurantList.name">
                </div>
                <div class="card-body">
                    <p v-if="restaurant.attributes.name.length<25" class="card-text restaurant-name">{{ restaurant.attributes.name }} </p>
                    <p v-else class="card-text restaurant-name">{{ restaurant.attributes.name.substring(0,15)+"..." }} </p>
                    <span v-if="restaurant.attributes.description==''" class="card-text restaurant-desc">No description</span>
                    <p v-if="restaurant.attributes.description.length<25" class="card-text restaurant-desc">{{ restaurant.attributes.description }} </p>
                    <p v-else class="card-text restaurant-desc">{{ restaurant.attributes.description.substring(0,25)+"..." }} </p>
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
        restaurant: Object,
    },
    data() {
        return {
            api_url: process.env.VUE_APP_API_URL
        }
    },
}
</script>

<style>
.card-body {
    display: flex;
    flex-direction: column;
    text-align: left;
}

.card {
    margin: 20px;
}

.card-img-top {
    object-fit:cover;
    height: 200px;
}

.restaurant-name {
    font-size: 20px;
    font-weight: 700;
}

.restaurant-desc {
    font-size: 15px;
    color: gray;
}

.restaurant-link {
    text-decoration: none;
    color: black;
}
</style>