<template>
    <div class="form AddRestaurantForm">

        <div class="input-box">
            <p class="form-label">Restaurant Name</p>
            <p><input type="text" v-model="restaurantName" class="form-control" required></p>

            <p class="form-label">Description</p>
            <p><input type="text" v-model="description" class="form-control" required></p>

            <p class="form-label">Address</p>
            <p><input type="text" v-model="address" class="form-control" required></p>

            <p class="form-label">Phone</p>
            <p><input type="text" v-model="phone" class="form-control" required></p>

            <p class="form-label">Website</p>
            <p><input type="text" v-model="website" class="form-control" required></p>

            <select class="form-select" v-model="categoryName" aria-label="Default select example">
                <option selected>Select Category</option>
                <option selected v-for="category in categoryList" value="1">{{ category.attributes.name }}</option>
            </select>

            <select class="form-select" v-model="closingDays" aria-label="Default select example">
                <option selected>Select Closing Days</option>
                <option selected v-for="day in dayList" value="1">{{ day.attributes.day }}</option>
            </select>

            <button class="btn btn-primary" @click="handleAddRestaurant()">Add</button>

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
    name: 'addRestaurantForm',
    data() {
        return {
            restaurant: null,
            restaurantName: '',
            description:'',
            address:'',
            phone:'',
            website:'',
            categoryName:'Select Category',
            closingDays:'Select Closing Days',
            categoryList: [],
            dayList:[]
        }
    },
    created() {
        this.getAllCategories();
        this.getAllDays();
    },
    methods: {
        handleAddRestaurant() {
            axios({
                method: 'POST',
                url: 'http://localhost:1337/api/restaurants',
                headers: headers,
                data: {
                    data: {
                        name: this.restaurantName,
                        description: this.description,
                        address: this.address,
                        phone: this.phone,
                        website: this.website,
                        categories: this.categoryName,
                        closingDays: this.closingDays
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
                url: 'http://localhost:1337/api/categories',
            })
                .then(response => {
                    this.categoryList = response.data.data;
                    console.log("All Categories", response.data.data);
                })
        },
        getAllDays() {
            axios({
                method: 'GET',
                url: 'http://localhost:1337/api/days',
                headers: headers,
            })
                .then(response => {
                    this.dayList = response.data.data;
                    console.log("All days", response.data.data);
                })
        },
    }
}
</script>

<style>
.dropdown-btn {
    width: 100%;
    margin: 10px 0;
    background: #e3f2fd;
    border: 1px solid #ced4da;
}

.dropdown-menu {
    width: 100%;
}

.form-select{
    margin: 20px 0;
}
</style>