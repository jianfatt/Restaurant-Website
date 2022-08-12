<template>
<div>
  <h1>Category</h1>
    <h2>Category Table</h2>
    <router-link :to="{ path: '/add-category' }" class="btn btn-light">Add Category</router-link>

<table class="table">
  <thead>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Category Name</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="categories in categoryList">
      <th scope="row">{{categories.id}}</th>
      <td>{{ categories.attributes.name }}</td>
      <td><router-link :to="{ path: 'edit-category/' + categories.id }"><button>Edit</button></router-link><button @click="handleDeleteCategory()">Delete</button></td>
    </tr>
  </tbody>
</table>
</div>
</template>

<script>
const axios = require('axios').default;

export default {
    name: 'categoryTable',
    data() {
        return {
                categoryList: [],
                deleted:[],
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
        },
        handleDeleteCategory(){
            axios({
                method: 'DELETE',
                url: "http://localhost:1337/api/categories",
                params:{
                  id:this.id
                }
            })
                .then(response => {
                    this.deleted = response;
                    console.log("Deleted",response);
                })
        }
    }
}
</script>