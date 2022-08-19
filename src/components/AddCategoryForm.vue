<template>
    <div class="form AddCategoryForm">

        <div class="input-box">
            <p class="form-label">New Category Name</p>
            <p><input type="text" v-model.trim="categoryName" class="form-control"  required></p>

            <button class="btn btn-primary" @click="handleAddCategory()">Add</button>
            <p class="message error-message" v-show="errored">{{ errorMsg }}</p>

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
            errored: false,
            errorMsg:'New Category name is required.',
        }
    },
    methods: {
        handleAddCategory() {
            const headers = { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYwNTI1Nzk4LCJleHAiOjE2NjMxMTc3OTh9.mYq36UcH2P_rYq5u9sdWSxybLJokR1IL61K-C_9ch1g',
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
                        name: this.categoryName
                        }
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
}
</script>

<style>
.form{
    text-align: center;
}
</style>