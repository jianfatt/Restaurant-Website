<template>
    <div class="form AddCategoryForm col-lg-4">

        <form @submit.prevent="handleAddCategory()">
        <div class="input-box">
            <p class="form-label">New Category Name</p>
            <p><input type="text" v-model.trim="categoryName" class="form-control" required></p>

            <p class="form-label">Restaurant</p>
                <select class="form-select" v-model="restaurantName" aria-label="Default select example">
                    <option :value="null" selected>Select Restaurant</option>
                    <option v-for="restaurant in restaurantList" v-bind:value="restaurant">{{ restaurant.attributes.name }}</option>
                </select>

            <input class="btn btn-primary" type="submit" value="Add">

        </div>
        </form>
    </div>
</template>

<script>
const axios = require('axios').default;

export default {
    name: 'addCategoryForm',
    data() {
        return {
            category: null,
            categoryName: '',
            restaurantName:null,
            restaurantList:[],
            errored: false,
        }
    },
    created(){
        this.getAllRestaurants();
    },
    methods: {
        handleAddCategory() {
            const headers = { 
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
         if(this.categoryName== ''){
                this.errored=true;
            }
            else{
            axios({
                method: 'POST',
                url: 'http://localhost:1337/api/categories',
                headers: headers,
                data: {
                    data: {
                        name: this.categoryName,
                        restaurants: this.restaurantName
                        }
                }
            })
                .then(response => {
                    this.category = response.data.data;
                    console.log(response.data.data);
                    this.$router.push('/category')
                })
            }
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