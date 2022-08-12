<template>
<nav class="navbar navbar-dark navbar-expand-lg bg-dark">
  <div class="container-fluid">
    <span class="navbar-brand">Categories</span>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="#">All</a>
        <a v-for="categories in categoryList" class="nav-link" href="#">{{ categories.attributes.name }}</a>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
const axios = require('axios').default;

export default {
  name: 'category',
  data() {
        return {
                categoryList: [],
        }
    },
    created() {
        this.getAllCategories();
    },
    methods: {
        getAllCategories() {
            axios({
                method: 'GET',
                url: "http://localhost:1337/api/categories",
            })
                .then(response => {
                    this.categoryList = response.data.data;
                    console.log("All Categories",response.data.data);
                })
        }
    }
}


</script>

<style>
.navbar{
    margin: 10px 50px;
    border-radius: 5px;
    font-size: 20px;
}

</style>