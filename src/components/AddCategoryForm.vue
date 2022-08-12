<template>
    <div class="form AddCategoryForm">

        <div class="input-box">
            <p class="form-label">New Category Name</p>
            <p><input type="text" v-model="categoryName" class="form-control" required></p>

            <p class="form-label">Restaurant Name</p>
            <p><input type="text" v-model="restaurantsName" class="form-control" required></p>

            <button class="btn btn-primary" @click="handleAddCategory()">Add</button>

        </div>

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
            restaurantsName: '',
        }
    },
    methods: {
        handleAddCategory() {
            axios({
                method: 'POST',
                url: 'http://localhost:1337/api/categories',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYwMjkxNDkxLCJleHAiOjE2NjI4ODM0OTF9.fwUbfp6Ip8s4J_VfJZuotm_SdeRlCibBQE992GF7cYU',
                },
                data: {
                    name: this.categoryName,
                    restaurants: this.restaurantsName,
                }
            })
                .then(response => {
                    this.category = response.data;
                    console.log(response.data);
                    this.$router.push('/category')
                })
        }
    }
}
</script>