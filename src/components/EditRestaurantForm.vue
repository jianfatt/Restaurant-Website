<template>
    <div class="form EditRestaurantForm">

        <form action="/all-restaurant">
        <div class="input-box">
            <p class="form-label">Current Restaurant Name</p>
            <p class="current-restaurant">{{ restaurantList.name }}</p>

            <p class="form-label">New Restaurant Name <span class="hint">*</span>
            <input type="text" v-model.trim="newRestaurantName" class="form-control" required>
            </p>

            <p class="form-label">Description
                <input type="text" v-model.trim="description" class="form-control">
                </p>

                <p class="form-label">Address <span class="hint">*</span>
                <input type="text" v-model.trim="address" class="form-control">
                </p>

                <p class="form-label">Phone
                <input type="text" v-model.trim="phone" class="form-control">
                </p>

                <p class="form-label">Website
                <input type="text" v-model.trim="website" class="form-control">
                </p>

                <p class="form-label">Category</p>
                <select class="form-select" v-model="categoryName" aria-label="Default select example">
                    <option :value="null" selected>Select Category</option>
                    <option v-for="category in categoryList" v-bind:value="category">{{ category.attributes.name }}</option>
                </select>

                <p class="form-label">Closing Days</p>
                <select class="form-select" v-model="closingDays" aria-label="Default select example">
                    <option :value="null" selected>Select Closing Days</option>
                    <option v-for="day in dayList" v-bind:value="day">{{ day.attributes.day }}</option>
                </select>

            <input class="btn btn-primary" type="submit" @click="handleEditRestaurant()" value="Save">

        </div>
        </form>

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
  name: 'editRestaurantForm',
    data() {
        return {
            editRestaurant: [],
            restaurantList: [],
            newRestaurantName: '',
            description:'',
            address:'',
            phone:'',
            website:'',
            categoryName: null,
            closingDays: null,
            categoryList: [],
            dayList:[],
            errored:false,
            id:this.$route.params.id
        }
    },
    created() {
        this.getAllRestaurants();
        this.getAllCategories();
        this.getAllDays();
    },
    methods: {
        handleEditRestaurant() {
            if(this.newRestaurantName=='' || this.address==''){
                this.errored = true
            }
            else{
                axios({
                method: 'PUT',
                url: 'http://localhost:1337/api/restaurants/' + this.id,
                headers: headers,
                data: {
                    data: {
                        name: this.newRestaurantName,
                        description: this.description,
                        address: this.address,
                        phone: this.phone,
                        website: this.website,
                        categories: this.categoryName,
                        closingDays: this.closingDays
                        }
                },
            })
                .then(response => {
                    console.log("edited",response.data);
                    //this.$router.push('/all-restaurant')
                })
            }
        },
         getAllRestaurants() {
            axios({
                method: 'GET',
                url: "http://localhost:1337/api/restaurants/" + this.id,
            })
                .then(response => {
                    this.restaurantList = response.data.data.attributes;
                    console.log("Restaurants",response.data.data);
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

<style scoped>
.current-restaurant{
    font-size: 30px;
}
</style>