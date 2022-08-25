<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <span class="navbar-brand">Categories</span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <ul class="nav">
            <li class="nav-item">
              <a class="nav-link" :class="{ active: isActive }" href="/" @click="navAllCategory()">All</a>
            </li>
            <li class="nav-item" v-for="(category, index) in categoryList">
              <span :class="{ active: category.isActive }" class="nav-link category-link" @click="handleSelectCategory(category, index)">{{ category.attributes.name}}</span>
            </li>
          </ul>
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
      isActive:true
    }
  },
  created() {
    this.getAllCategories();
  },
  methods: {
    getAllCategories() {
      axios({
        method: 'GET',
        url: "http://localhost:1337/api/categories"
      })
        .then(response => {
          let categories = response.data.data;
          categories.forEach(item => {
            item.isActive = false;
          })
          this.categoryList = response.data.data;
        })
    },
    handleSelectCategory(category, index) {
      this.resetActiveCategory();
      this.categoryList[index].isActive = true;
      this.$emit("filterCategory", category.id);
    },
    resetActiveCategory() {
      this.categoryList.forEach(item => {
        item.isActive = false;
      })
      this.navAllCategory()
    },
    navAllCategory(){
       this.isActive = false
    }
  }
}


</script>

<style scoped>
.navbar {
  font-size: 20px;
  background-color: gray;
}

.nav-link{
  color:white
}

.nav-link:hover{
  color: black;
}

.category-link:hover {
  cursor: pointer;
}
</style>