<template>
  <div>
    <div class="header-container">
      <p class="table-text title col-12">Restaurant</p>
      <span class="table-text subtitle">Restaurant Table</span>
      <div>
        <router-link :to="{ path: '/add-restaurant' }" class="btn btn-primary">Add</router-link>
        <p class="btn btn-warning" @click="handleRefresh()">Refresh</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered border-dark">
        <thead>
          <tr>
            <th class="table-cell" scope="col">No.</th>
            <th class="table-cell" scope="col">Restaurant Name</th>
            <th class="table-cell" scope="col">Address</th>
            <th class="table-cell" scope="col">Website</th>
            <th class="table-cell" scope="col">Phone</th>
            <th class="table-cell" scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="restaurant in restaurantList" class="align-middle">
            <td class="table-cell counterCell " scope="row"></td>
            <td class="table-cell restaurant-cell">
              <router-link :to="{ path: 'restaurant/' + restaurant.id }" class="restaurant-link">{{
                 restaurant.attributes.name  }}</router-link>
            </td>
            <td class="table-cell restaurant-cell">{{  restaurant.attributes.address  }}</td>
            <td v-if="restaurant.attributes.website == ''" class="table-cell restaurant-cell">N/A</td>
            <td v-else class="table-cell restaurant-cell info-cell">{{  restaurant.attributes.website  }}</td>
            <td v-if="restaurant.attributes.phone == ''" class="table-cell restaurant-cell">N/A</td>
            <td v-else class="table-cell restaurant-cell info-cell">{{  restaurant.attributes.phone  }}</td>

            <td class="table-cell action-cell">
              <router-link :to="{ path: 'edit-restaurant/' + restaurant.id }"><button
                  class="btn btn-primary action-button">Edit</button></router-link>
              <button class="btn btn-danger action-button" @click="handleChecking(restaurant)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav aria-label="Page navigation example" class="table-pagination">
      <ul class="pagination">
        <li class="page-item">
          <span class="page-link" aria-label="Previous" @click="handlePreviousPage()">
            <span aria-hidden="true">&laquo;</span>
          </span>
        </li>
        <li class="page-item" v-for="page in pageList.pageCount" :class="{ active: page == currentPage }"><span
            class="page-link" @click="handlePage(page)">{{  page  }}</span></li>
        <li class="page-item">
          <span class="page-link" aria-label="Next" @click="handleNextPage()">
            <span aria-hidden="true">&raquo;</span>
          </span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
const axios = require('axios').default;
const Swal = require('sweetalert2');

export default {
  name: 'restaurantTable',
  data() {
    return {
      restaurantList: [],
      deletedRestaurant: [],
      pageList: [],
      currentPage: 1,
      api_url: process.env.VUE_APP_API_URL,
    }
  },
  created() {
    this.getAllRestaurants();
  },
  methods: {
    getAllRestaurants() {
      axios({
        method: 'GET',
        url: this.api_url + "/api/restaurants?pagination[page]=" + this.currentPage + "&pagination[pageSize]=5",
        data: {
          page: this.currentPage
        }
      })
        .then(response => {
          this.restaurantList = response.data.data;
          this.pageList = response.data.meta.pagination;
          console.log("All Restaurants", response.data.data);
        })
    },
    handleChecking(restaurant) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
            timer: 1000,
          },
            this.actionTimer(),
            this.handleDeleteRestaurant(restaurant),
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            tetx: 'Your imaginary file is safe :)',
            icon: 'error',
            timer: 1000,
          },
            this.actionTimer()
          )
        }
      })
    },
    handleDeleteRestaurant(restaurant) {
      console.log("restaurant", restaurant)
      axios({
        method: 'DELETE',
        url: this.api_url + "/api/restaurants/" + restaurant.id,
      })
        .then(response => {
          this.deleteRestaurant = response;
          console.log("Deleted", response);
          this.getAllRestaurants();
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
    handlePage(page) {
      this.currentPage = page
      this.getAllRestaurants();
      console.log('Current Number', this.currentPage)
    },
    handleNextPage() {
      if (this.currentPage < this.pageList.pageCount) {
        this.currentPage += 1
        this.getAllRestaurants();
      }
      else if (this.currentPage >= this.pageList.pageCount) {
        this.currentPage = 1
        this.getAllRestaurants();
      }
      console.log('Next Number', this.currentPage)
    },
    handlePreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1
        this.getAllRestaurants();
      }
      else if (this.currentPage <= 1) {
        this.currentPage = this.pageList.pageCount
        this.getAllRestaurants();
      }
      console.log('Previous Number', this.currentPage)
    },
    handleRefresh() {
      window.location.reload();
    }
  }
}
</script>

<style>
.restaurant-cell {
  text-align: center;
}

.info-cell {
  width: 170px;
}

.action-cell {
  width: 200px;
}
</style>