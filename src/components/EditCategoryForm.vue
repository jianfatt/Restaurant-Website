<template>
    <div class="form EditCategoryForm">

        <div class="input-box">
            <p class="form-label">Current Category Name</p>
            <p>{{ categoryList }}</p>

            <p class="form-label">New Category Name</p>
            <p><input type="text" v-model="newCategoryName" class="form-control" required></p>

            <p class="form-label">Restaurant Name</p>
            <p><input type="text" v-model="restaurantName" class="form-control" required></p>

            <button class="btn btn-primary" @click="handleEditCategory()">Save</button>

        </div>

    </div>
</template>

<script>
const axios = require('axios').default;

export default {
  name: 'editCategoryForm',
    data() {
        return {
            category: [],
            categoryList: [],
            newCategoryName: '',
            restaurantName: '',
            id:this.$route.params.id
        }
    },
    created() {
        this.getCategory();
    },
    methods: {
        handleEditCategory() {
            axios({
                method: 'PUT',
                url: 'http://localhost:1337/api/categories/',
                params:{
                    id: this.id
                },
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYwMjkxNDkxLCJleHAiOjE2NjI4ODM0OTF9.fwUbfp6Ip8s4J_VfJZuotm_SdeRlCibBQE992GF7cYU',
                },
                data: {
                    name: this.newCategoryName,
                    restaurants: this.restaurantName
                }
            })
                .then(response => {
                    this.category = response.data;
                    console.log(response.data);
                    this.$router.push('/category')
                })
        },
         getCategory() {
            axios({
                method: 'GET',
                url: "http://localhost:1337/api/categories",
            })
                .then(response => {
                    this.categoryList = response.data.data;
                    console.log("Categories",response.data.data);
                })
        }
    }
}
</script>