<template>
<div>
  <div class="header-container">
    <p class="table-text title col-12">Category</p>
    <span class="table-text subtitle">Category Table</span>
    <router-link :to="{ path: '/add-category' }" class="btn btn-primary">Add</router-link>
  </div>

<table class="table">
  <thead>
    <tr>
      <th class="table-cell" scope="col">No.</th>
      <th class="table-cell" scope="col">Category Name</th>
      <th class="table-cell" scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="category in categoryList">
      <td class="table-cell counterCell " scope="row"></td>
      <td class="table-cell category-cell">{{ category.attributes.name }}</td>
      <td class="table-cell action-cell">
        <router-link :to="{ path: 'edit-category/' + category.id }"><button class="btn btn-primary action-button">Edit</button></router-link>
        <button class="btn btn-danger action-button" @click="handleDeleteCategory(category)">Delete</button>
      </td>
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
                deleteCategory:[],
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
        handleDeleteCategory(category){
          console.log("category", category)
          const headers = { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYwNTI1Nzk4LCJleHAiOjE2NjMxMTc3OTh9.mYq36UcH2P_rYq5u9sdWSxybLJokR1IL61K-C_9ch1g',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
            axios({
                method: 'DELETE',
                url: "http://localhost:1337/api/categories/" + category.id,
                headers:headers,
            })
                .then(response => {
                    this.deleteCategory = response;
                    console.log("Deleted",response);
                    window.location.reload();
                })
        }
    }
}
</script>

<style>
.header-container{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.table {
  margin: 20px 0;
  counter-reset: tableCount;
  text-align: center;    
}

.table-cell{
  border: 1px solid black;
  font-size: 20px;
}

.counterCell{
  width: 100px;
}

.counterCell:before {              
    content: counter(tableCount); 
    counter-increment: tableCount; 
}

.category-cell{
  width: 800px;
}

.table-text{
  font-weight: bold;
  text-align: center;
}

.title{
  font-size: 50px;
}

.subtitle{
  font-size: 30px;
}

.btn{
  width: 80px;
  font-weight: 600;
}

.action-button{
  margin: 0 10px;
}
</style>