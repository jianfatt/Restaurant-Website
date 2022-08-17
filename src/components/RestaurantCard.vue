<template>
    <div class="restaurant-card">

        <div class="card">
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active" v-for="image in restaurant.attributes.image.data">
                        <img :src="'http://localhost:1337' + image.attributes.url" class="card-img-top"
                            :alt="restaurant.attributes.name">
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
            <router-link :to="{ path: 'restaurant/' + restaurant.id }" class="restaurant-link">
                <div class="card-body">

                    <p class="card-text restaurant-name">{{ restaurant.attributes.name }} </p>
                    <p class="card-text restaurant-desc">{{ restaurant.attributes.description }} </p>

                </div>
            </router-link>
        </div>

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
.restaurant-card {
    display: flex;
    align-items: stretch;
}

.card {
    margin: 10px;
    width: 350px;
}

.card-text {
    text-align: left;
}

.card-img-top {
    height: 250px;
    object-fit: cover;
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