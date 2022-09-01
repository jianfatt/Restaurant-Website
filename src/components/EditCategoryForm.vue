<template>
    <div class="form EditCategoryForm col-lg-4">

        <form @submit.prevent="handleChecking()">
            <div class="input-box">

                <p class="form-label">New Category Name</p>
                <p><input type="text" v-model.trim="categoryList.name" class="form-control" required></p>

                <p class="form-label">Restaurant
                    <select class="form-select" v-model="restaurantName" aria-label="Default select example">
                        <option :value="null" selected>Select Restaurant</option>
                        <option v-for="restaurant in restaurantList" v-bind:value="restaurant">{{
                             restaurant.attributes.name  }}</option>
                    </select>
                </p>

                <input class="btn btn-primary" type="submit" value="Save">
            </div>
        </form>
    </div>
</template>

<script>
const axios = require('axios').default;
const Swal = require('sweetalert2')

export default {
    name: 'editCategoryForm',
    data() {
        return {
            editCategory: [],
            categoryList: [],
            restaurantList: [],
            newCategoryName: '',
            restaurantName: null,
            id: this.$route.params.id,
            api_url: process.env.VUE_APP_API_URL,
            errored: false
        }
    },
    created() {
        this.getCategory();
        this.getAllRestaurants();
    },
    methods: {
        handleChecking() {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Saved!', 
                        text: '', 
                        icon: 'success',
                        timer:1000,
                    },
                    this.actionTimer(),
                    this.handleEditCategory()
                    )
                    this.$router.push('/category')
                } else if (result.isDenied) {
                    Swal.fire({
                        title: 'Changes are not saved',
                        text: '',
                        icon: 'info',
                        timer:1000,
                    },
                    this.actionTimer(),
                    )
                }
            })
        },
        handleEditCategory() {
            if (this.categoryList.name == '') {
                this.errored = true
            }
            else {
                axios({
                    method: 'PUT',
                    url: this.api_url + '/api/categories/' + this.id,
                    data: {
                        data: {
                            name: this.categoryList.name,
                            restaurants: this.restaurantName
                        }
                    },
                })
                    .then(response => {
                        console.log("edited", response.data);
                    })
            }

        },
        getCategory() {
            axios({
                method: 'GET',
                url: this.api_url + "/api/categories/" + this.id,
            })
                .then(response => {
                    this.categoryList = response.data.data.attributes;
                    console.log("Categories", response.data.data);
                })
        },
        getAllRestaurants() {
            axios({
                method: 'GET',
                url: this.api_url + '/api/restaurants',
            })
                .then(response => {
                    this.restaurantList = response.data.data;
                    console.log("All Restaurants", response.data.data);
                })
        },
        actionTimer() {
            Swal.fire({
                didOpen: () => {
                    Swal.showLoading()
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        }
    }
}
</script>