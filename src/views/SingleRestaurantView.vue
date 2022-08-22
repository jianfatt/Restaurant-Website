<template>
    <div class="single-restaurant">
        <div id="carouselExampleControls1" class="carousel slide restaurant-carousel" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item" :class="{ active: image.attributes.isFirstImage == true }" v-for="image in imageList">
                    <img class="restaurant-carousel-image img-fluid" :src="'http://localhost:1337' + image.attributes.url" :alt="restaurantList.name">
                </div>
                   <img v-show="errored" class="restaurant-carousel-image default-image img-fluid" src="@/assets/defaultImage.png" :alt="restaurantList.name">
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls1"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls1"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

        <div class="restaurant-info-container row">
            <h1 class="name col-lg-9">{{ restaurantList.name }}</h1>
            <p class="description col-lg-9">{{ restaurantList.description }}</p>
             <p class="label col-lg-6">Closing Days
                <br><span class="info" v-for="day in dayList">{{ day.attributes.day }}</span>
            </p>
            <p class="label col-lg-3">Address
                <br><span class="info">{{ restaurantList.address }}</span>
            </p>
            <p class="label col-lg-6">Website
                <br><span class="info">{{ restaurantList.website }}</span>
            </p>
            <p class="label col-lg-3">Contact Number
                <br><span class="info">{{ restaurantList.phone }}</span>
            </p>

            <p class="label col-lg-9">Menu</p>
                    <div class="menu col-lg-9">
                        <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <img v-for="menu in menuList" class="menu-image" :src="'http://localhost:1337' + menu.attributes.url" :alt="restaurantList.name">
                        </a>
                    </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div id="carouselExampleControls2" class="carousel slide menu-carousel" data-bs-ride="carousel">
                                    <div class="carousel-inner">
                                        <div class="carousel-item" :class="{ active: menu.attributes.isFirstMenu == true }" v-for="menu in menuList">
                                            <img class="menu-carousel-image img-fluid" :src="'http://localhost:1337' + menu.attributes.url" :alt="restaurantList.name">
                                        </div>
                                    </div>
                                    <button class="carousel-control-prev" type="button"
                                        data-bs-target="#carouselExampleControls2" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button"
                                        data-bs-target="#carouselExampleControls2" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
            imageList: [],
            dayList: [],
            menuList: [],
            id: this.$route.params.id,
            errored: false
        }
    },
    created() {
        this.getRestaurantInfo();
    },
    methods: {
        getRestaurantInfo() {
            axios({
                method: 'GET',
                url: "http://localhost:1337/api/restaurants/" + this.id + "?",
                headers: headers,
                params: {
                    populate: "image,closingDays,menu"
                }
            })
                .then(response => {
                    this.restaurantList = response.data.data.attributes;
                    this.dayList = response.data.data.attributes.closingDays.data;
                    this.imageList = response.data.data.attributes.image.data;
                    if(this.imageList==null){
                        this.errored = true
                    }if(this.imageList!=null){
                        this.errored = false
                        this.imageList[0].attributes.isFirstImage = true;
                    }
                    this.menuList = response.data.data.attributes.menu.data;
                    if(this.menuList==null){
                        this.errored =true
                    }if(this.menuList!=null){
                        this.errored = false
                        this.menuList[0].attributes.isFirstMenu = true;
                    }
                    console.log("Restaurant", response.data.data);
                    console.log("Image", response.data.data.attributes.image.data);
                    console.log("Menu", response.data.data.attributes.menu.data);
                    console.log("Days", response.data.data.attributes.closingDays.data);
                })
        },
    }
}
</script>

<style  scoped>
.single-restaurant {
    margin: 0;
    width: 100%;
    height: 100vh;
    text-align: justify;
    
}

.description {
    font-size: 20px;
}

.label {
    font-weight: bold;
}

.restaurant-carousel {
    background: black;
}

.menu-image{
    object-fit: cover;
    border-radius: 10px;
    margin: 0 10px 10px 0;
    width: 100px;
    height: 100px;
}

.menu-carousel-image{
    object-fit: scale-down;
    width: 800px;
    height: 100vh;
}

.restaurant-carousel-image {
    object-fit: scale-down;
    display: block;
    margin: auto;
    height: 500px;
}

.restaurant-info-container {
    padding: 20px 0;
    margin: 0;
    display: flex;
    justify-content: center;
}

.default-image{
    object-fit: cover;
}

.info {
    font-weight: 500;
}
</style>