<template>
    <div class="form AddCategoryForm col-lg-4">

        <form @submit.prevent="handleChecking()">
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
const Swal = require('sweetalert2')

export default {
    name: 'addCategoryForm',
    data() {
        return {
            category: null,
            categoryName: '',
            restaurantName:null,
            restaurantList:[],
            api_url:process.env.VUE_APP_API_URL,
        }
    },
    created(){
        this.getAllRestaurants();
    },
    methods: {
        handleChecking() {
            Swal.fire({
                title: 'Do you want to add new category?',
                showDenyButton: true,
                confirmButtonText: 'Add',
                denyButtonText: `Don't add`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire({
                        title:'Created!', 
                        text: '', 
                        icon: 'success',
                        timer:1000,
                    },
                    this.actionTimer(),
                    this.handleAddCategory()
                    )
                } else if (result.isDenied) {
                    Swal.fire({
                        title: 'Category is not created', 
                        text: '', 
                        icon: 'info',
                        timer: 1000,
                    },
                    this.actionTimer(),
                    )
                }
                this.$router.push('/category')
            })
        },
        handleAddCategory() {
            axios({
                method: 'POST',
                url: this.api_url + '/api/categories',
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
        },
    }
}
</script>