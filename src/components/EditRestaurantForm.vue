<template>
  <div class="form EditRestaurantForm col-lg-4">
    <form @submit.prevent="handleChecking()">
      <div class="input-box">
        <p class="form-label">
          New Restaurant Name <span class="hint">*</span>
          <input type="text" v-model.trim="restaurantList.name" class="form-control" required />
        </p>

        <p class="form-label">
          Description
          <input type="text" v-model.trim="restaurantList.description" class="form-control" />
        </p>

        <p class="form-label">
          Address
          <input type="text" v-model.trim="restaurantList.address" class="form-control" />
        </p>

        <p class="form-label">
          Phone
          <input type="text" v-model.trim="restaurantList.phone" class="form-control" />
        </p>

        <p class="form-label">
          Website
          <input type="text" v-model.trim="restaurantList.website" class="form-control" />
        </p>

        <p class="form-label">Category</p>
        <select class="form-select" v-model="categoryName" aria-label="Default select example">
          <option :value="null" selected>Select Category</option>
          <option v-for="category in categoryList" v-bind:value="category">
            {{  category.attributes.name  }}
          </option>
        </select>

        <p class="form-label">Closing Days</p>
        <select class="form-select" v-model="closingDays" aria-label="Default select example">
          <option :value="null" selected>Select Closing Days</option>
          <option v-for="day in dayList" v-bind:value="day">
            {{  day.attributes.day  }}
          </option>
        </select>

        <p class="form-label">
          Upload Image
          <input type="file" v-bind:value="image" @change="onFileSelected" />
        </p>

        <input class="btn btn-primary" type="submit" value="Save" />
      </div>
    </form>
  </div>
</template>

<script>
const axios = require("axios").default;
const Swal = require('sweetalert2');
const formData = new FormData();

export default {
  name: "editRestaurantForm",
  data() {
    return {
      editRestaurant: [],
      restaurantList: [],
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
      id: this.$route.params.id,
      api_url: process.env.VUE_APP_API_URL,
    };
  },
  created() {
    this.getAllRestaurants();
    this.getAllCategories();
    this.getAllDays();
  },
  methods: {
    onFileSelected(event) {
      this.files = event.target.files[0];
    },
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
            timer: 1000,
          },
            this.actionTimer(),
            this.handleEditRestaurant()
          )
          this.$router.push('/all-restaurant')
        } else if (result.isDenied) {
          Swal.fire({
            title: 'Changes are not saved',
            text: '',
            icon: 'info',
            timer: 1000,
          },
            this.actionTimer(),
          )
        }
      })
    },
    handleEditRestaurant() {
      if (this.files) {
        formData.append("image", this.files);
        axios({
          method: "POST",
          url: this.api_url + "/api/upload",
          formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: {
            files: this.files,
          },
        })
          .then((response) => {
            this.newUpload = response.data[0];
            this.updateRestaurant();
          })
      }
      else {
        this.updateRestaurant();
      }
    },
    updateRestaurant() {
      axios({
        method: "PUT",
        url: this.api_url + "/api/restaurants/" + this.id,
        data: {
          data: {
            name: this.restaurantList.name,
            description: this.restaurantList.description,
            address: this.restaurantList.address,
            phone: this.restaurantList.phone,
            website: this.restaurantList.website,
            categories: this.restaurantList.categoryName,
            closingDays: this.restaurantList.closingDays,
            image: [this.newUpload.id]
          },
        },
      }).then((response) => {
        this.$router.push("/all-restaurant");
        console.log("edited", response.data);
      });
    },
    getAllRestaurants() {
      axios({
        method: "GET",
        url: this.api_url + "/api/restaurants/" + this.id,
      }).then((response) => {
        this.restaurantList = response.data.data.attributes;
        console.log("Restaurants", response.data.data);
      });
    },
    getAllCategories() {
      axios({
        method: "GET",
        url: this.api_url + "/api/categories",
      }).then((response) => {
        this.categoryList = response.data.data;
        console.log("All Categories", response.data.data);
      });
    },
    getAllDays() {
      axios({
        method: "GET",
        url: this.api_url + "/api/days",
      }).then((response) => {
        this.dayList = response.data.data;
        console.log("All days", response.data.data);
      });
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
};
</script>
