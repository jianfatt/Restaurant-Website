<template>
    <div class="form AddRestaurantForm">
        <form action="/all-restaurant">
            <div class="input-box">
                <p class="form-label">Restaurant Name <span class="hint">*</span>
                <input type="text" v-model.trim="restaurantName" class="form-control" required>
                <!-- <span class="message error-message" v-show="errored">* Restaurant Name is required</span> -->
                </p>

                <p class="form-label">Description
                <input type="text" v-model.trim="description" class="form-control">
                </p>

                <p class="form-label">Address <span class="hint">*</span>
                <input type="text" v-model.trim="address" class="form-control" required>
                <!-- <span class="message error-message" v-show="errored">* Address is required</span> -->
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

                <input class="btn btn-primary" type="submit" @click="handleAddRestaurant()" value="Add">
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
    name: 'addRestaurantForm',
    data() {
        return {
            newRestaurant: '',
            restaurantName: '',
            description:'',
            address:'',
            phone:'',
            website:'',
            categoryName: null,
            closingDays: null,
            categoryList: [],
            dayList:[],
            errored:false,
        }
    },
    created() {
        this.getAllCategories();
        this.getAllDays();
    },
    methods: {
        handleAddRestaurant() {
            if(this.restaurantName=='' || this.address ==''){
                this.errored = true
            }
            else{
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
                    this.newRestaurant = response.data.data;
                    console.log(response.data.data);
                })
            }
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

.hint{
    display: inline-block;
    vertical-align: text-top;
    color: red;
}
</style>