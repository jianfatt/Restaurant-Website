<template>
    <div class="form EditCategoryForm">

        <form action="/category">
        <div class="input-box">
            <p class="form-label">Current Category Name</p>
            <p class="current-category">{{ categoryList.name }}</p>

            <p class="form-label">New Category Name</p>
            <p><input type="text" v-model.trim="newCategoryName" class="form-control" required></p>

             <p class="form-label">Restaurant
                <select class="form-select" v-model="restaurantName" aria-label="Default select example">
                    <option :value="null" selected>Select Restaurant</option>
                    <option v-for="restaurant in restaurantList" v-bind:value="restaurant">{{ restaurant.attributes.name }}</option>
                </select>
                </p>

            <input class="btn btn-primary" type="submit" @click="handleEditCategory()" value="Save">
        </div>
        </form>
    </div>
</template>

<script>
const axios = require('axios').default;

export default {
  name: 'editCategoryForm',
    data() {
        return {
            editCategory: [],
            categoryList: [],
            newCategoryName: '',
            restaurantName:null,
            id:this.$route.params.id,
            errored:false
        }
    },
    created() {
        this.getCategory();
        this.getAllRestaurants();
    },
    methods: {
        handleEditCategory() {
            const headers = { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYwNTI1Nzk4LCJleHAiOjE2NjMxMTc3OTh9.mYq36UcH2P_rYq5u9sdWSxybLJokR1IL61K-C_9ch1g',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            };
            if(this.newCategoryName==''){
                this.errored = true
            }
            else{
                axios({
                method: 'PUT',
                url: 'http://localhost:1337/api/categories/' + this.id,
                headers: headers,
                data: {
                    data: {
                        name: this.newCategoryName,
                        restaurants: this.restaurantName
                        }
                },
            })
                .then(response => {
                    console.log("edited",response.data);
                })
            }
            
        },
         getCategory() {
            axios({
                method: 'GET',
                url: "http://localhost:1337/api/categories/" + this.id,
            })
                .then(response => {
                    this.categoryList = response.data.data.attributes;
                    console.log("Categories",response.data.data);
                })
        },
         getAllRestaurants() {
            axios({
                method: 'GET',
                url: 'http://localhost:1337/api/restaurants',
            })
                .then(response => {
                    this.restaurantList = response.data.data;
                    console.log("All Restaurants", response.data.data);
                })
        },
    }
}
</script>

<style scoped>
.current-category{
    font-size: 30px;
}
</style>