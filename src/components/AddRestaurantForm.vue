<template>
  <div class="form AddRestaurantForm">

    <form @submit.prevent="handleAddRestaurant()">
    <div class="input-box">
      <p class="form-label">
        Restaurant Name <span class="hint">*</span>
        <input
          type="text"
          v-model.trim="restaurantName"
          class="form-control"
          required
        />
        <!-- <span class="message error-message" v-show="errored">* Restaurant Name is required</span> -->
      </p>

      <p class="form-label">
        Description
        <input type="text" v-model.trim="description" class="form-control" />
      </p>

      <p class="form-label">
        Address <span class="hint">*</span>
        <input
          type="text"
          v-model.trim="address"
          class="form-control"
          required
        />
        <!-- <span class="message error-message" v-show="errored">* Address is required</span> -->
      </p>

      <p class="form-label">
        Phone
        <input type="text" v-model.trim="phone" class="form-control" />
      </p>

      <p class="form-label">
        Website
        <input type="text" v-model.trim="website" class="form-control" />
      </p>

      <p class="form-label">Category</p>
      <select
        class="form-select"
        v-model="categoryName"
        aria-label="Default select example"
      >
        <option :value="null" selected>Select Category</option>
        <option v-for="category in categoryList" v-bind:value="category">
          {{ category.attributes.name }}
        </option>
      </select>

      <p class="form-label">Closing Days</p>
      <select
        class="form-select"
        v-model="closingDays"
        aria-label="Default select example"
      >
        <option :value="null" selected>Select Closing Days</option>
        <option v-for="day in dayList" v-bind:value="day">
          {{ day.attributes.day }}
        </option>
      </select>

      <p class="form-label">
        Upload Image
        <input type="file" v-bind:value="image" @change="onFileSelected"/>
      </p>

      <input
        class="btn btn-primary"
        type="submit"
        value="Add"
      />
    </div>
    </form>
  </div>
</template>

<script>
const axios = require("axios").default;
const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYwNTI1Nzk4LCJleHAiOjE2NjMxMTc3OTh9.mYq36UcH2P_rYq5u9sdWSxybLJokR1IL61K-C_9ch1g",
    "Accept": "application/json",
};
const formData = new FormData();

export default {
  name: "addRestaurantForm",
  data() {
    return {
      newRestaurant: "",
      restaurantName: "",
      description: "",
      address: "",
      phone: "",
      website: "",
      categoryName: null,
      closingDays: null,
      categoryList: [],
      dayList: [],
      newUpload: [],
      files: null,
      image: null,
      errored: false,
    };
  },
  created() {
    this.getAllCategories();
    this.getAllDays();
  },
  methods: {
    onFileSelected(event) {
      this.files = event.target.files[0];
    },
    handleAddRestaurant() {
      if (this.files) {
        formData.append("image", this.files);
        axios({
          method: "POST",
          url: "http://localhost:1337/api/upload",
          formData,
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data"
          },
          data: {
            files: this.files,
          },
        }).then((response) => {
            this.newUpload = response.data[0];
            this.CreateNewRestaurant();
            console.log("New Upload", response.data[0]);
        });
      } else {
          this.CreateNewRestaurant();
      }
    },
    CreateNewRestaurant(){
      axios({
            method: "POST",
            url: "http://localhost:1337/api/restaurants",
            headers: headers,
            data: {
              data: {
                name: this.restaurantName,
                description: this.description,
                address: this.address,
                phone: this.phone,
                website: this.website,
                categories: this.categoryName,
                image: [this.newUpload.id]
              },
            },
          }).then((response) => {
            this.newRestaurant = response.data.data;
            this.$router.push("/all-restaurant")
            console.log("New Restaurant", response.data.data);
          })
    },
    getAllCategories() {
      axios({
        method: "GET",
        url: "http://localhost:1337/api/categories",
      }).then((response) => {
        this.categoryList = response.data.data;
        console.log("All Categories", response.data.data);
      });
    },
    getAllDays() {
      axios({
        method: "GET",
        url: "http://localhost:1337/api/days",
        headers: headers,
      }).then((response) => {
        this.dayList = response.data.data;
        console.log("All days", response.data.data);
      });
    },
  },
};
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

.form-select {
  margin: 20px 0;
}

.hint {
  display: inline-block;
  vertical-align: text-top;
  color: red;
}
</style>