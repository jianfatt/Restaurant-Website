<template>
<p>{{ restaurantList }}</p>
</template>

<script>
const axios = require('axios').default;

export default {
    name: '',
    data() {
        return {
                restaurantList: [],
                id:this.$route.params.id
        }
    },
    created() {
        this.getAllRestaurant();
    },
    methods: {
        getAllRestaurant() {
            axios({
                method: 'GET',
                url: "http://localhost:1337/api/restaurants",
                params:{
                    id: this.id
                }
            })
                .then(response => {
                    this.restaurantList = response.data.data;
                    console.log("All Restaurants",response.data.data);
                })
        }
    }
}
</script>