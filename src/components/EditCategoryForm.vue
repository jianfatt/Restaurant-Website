<template>
    <div class="form EditCategoryForm">

        <div class="input-box">
            <p class="form-label">Current Category Name</p>
            <p class="current-category">{{ categoryList.name }}</p>

            <p class="form-label">New Category Name</p>
            <p><input type="text" v-model="newCategoryName" class="form-control" required></p>

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
            id:this.$route.params.id
        }
    },
    created() {
        this.getCategory();
    },
    methods: {
        handleEditCategory() {
            const headers = { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYwNTI1Nzk4LCJleHAiOjE2NjMxMTc3OTh9.mYq36UcH2P_rYq5u9sdWSxybLJokR1IL61K-C_9ch1g',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
            axios({
                method: 'PUT',
                url: 'http://localhost:1337/api/categories/' + this.id,
                headers: headers,
                data: {
                    data: {
                        name: this.newCategoryName
                        }
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
                url: "http://localhost:1337/api/categories/" + this.id,
            })
                .then(response => {
                    this.categoryList = response.data.data.attributes;
                    console.log("Categories",response.data.data);
                })
        }
    }
}
</script>

<style scoped>
.current-category{
    font-size: 30px;
}
</style>