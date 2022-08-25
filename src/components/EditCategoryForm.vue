<template>
    <div class="form EditCategoryForm col-lg-4">

        <form @submit.prevent="handleEditCategory()">
        <div class="input-box">

            <p class="form-label">New Category Name</p>
            <p><input type="text" v-model.trim="categoryList.name" class="form-control" required></p>

             <p class="form-label">Restaurant
                <select class="form-select" v-model="restaurantName" aria-label="Default select example">
                    <option :value="null" selected>Select Restaurant</option>
                    <option v-for="restaurant in restaurantList" v-bind:value="restaurant">{{ restaurant.attributes.name }}</option>
                </select>
                </p>

            <input class="btn btn-primary" type="submit" value="Save">
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
            restaurantList:[],
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
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            };
            if(this.categoryList.name==''){
                this.errored = true
            }
            else{
                axios({
                method: 'PUT',
                url: 'http://localhost:1337/api/categories/' + this.id,
                headers: headers,
                data: {
                    data: {
                        name: this.categoryList.name,
                        restaurants: this.restaurantName
                        }
                },
            })
                .then(response => {
                    this.$router.push('/category')
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