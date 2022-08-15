<template>
    <div class="form AddRestaurantForm">

        <div class="input-box">
            <p class="form-label">New Restaurant Name</p>
            <p><input type="text" v-model="restaurantName" class="form-control" required></p>

            <div class="dropdown">
                <button class="btn dropdown-btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Select Category
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" v-for="categories in categoryList">{{ categories.attributes.name }}</a></li>
                </ul>
            </div>

            <button class="btn btn-primary" @click="handleAddRestaurant()">Add</button>

        </div>

    </div>
</template>

<script>
const axios = require('axios').default;

export default {
    name: 'addRestaurantForm',
    data() {
        return {
            restaurant: null,
            restaurantName: '',
            categoryList: [],
        }
    },
     created() {
        this.getAllCategories();
    },
    methods: {
        handleAddRestaurant() {
            const headers = {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYwNTI1Nzk4LCJleHAiOjE2NjMxMTc3OTh9.mYq36UcH2P_rYq5u9sdWSxybLJokR1IL61K-C_9ch1g',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            };
            axios({
                method: 'POST',
                url: 'http://localhost:1337/api/restaurants',
                headers: headers,
                data: {
                    data: {
                        name: this.restaurantName
                    }
                }
            })
                .then(response => {
                    this.restaurant = response.data;
                    console.log(response.data);
                    this.$router.push('/all-restaurant')
                })
        },

         getAllCategories() {
            axios({
                method: 'GET',
                url: "http://localhost:1337/api/categories",
            })
                .then(response => {
                    this.categoryList = response.data.data;
                    console.log("All Categories",response.data.data);
                })
        },
    }
}
</script>

<style>
.dropdown-btn{
    width: 100%;
    margin: 10px 0;
    background: #e3f2fd;
    border: 1px solid #ced4da;
}

.dropdown-menu{
    width: 100%;
}
</style>