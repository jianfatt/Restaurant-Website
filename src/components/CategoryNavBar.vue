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
              <a class="nav-link" aria-current="page" href="">All</a>
            </li>
            <li class="nav-item" v-for="category in categoryList">
              <span class="nav-link category-link" @click="handleSelectCategory(category)">{{ category.attributes.name
              }}</span>
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
          this.categoryList = response.data.data;
        })
    },
    handleSelectCategory(category) {
      this.$emit("filterCategory", category.id);
    }
  }
}


</script>

<style scoped>
.navbar {
  margin: 0 0 30px 0;
  font-size: 20px;
  background-color: #e3f2fd;
}

.category-link:hover {
  cursor: pointer;
}
</style>