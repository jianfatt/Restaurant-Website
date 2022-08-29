<template>
  <div>
    <div class="header-container">
      <p class="table-text title col-12">Category</p>
      <span class="table-text subtitle">Category Table</span>
      <router-link :to="{ path: '/add-category' }" class="btn btn-primary">Add</router-link>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered border-dark">
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
              <router-link :to="{ path: 'edit-category/' + category.id }"><button
                  class="btn btn-primary action-button">Edit</button></router-link>
              <button class="btn btn-danger action-button" @click="handleChecking(category)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
const axios = require('axios').default;
const Swal = require('sweetalert2')

export default {
  name: 'categoryTable',
  data() {
    return {
      categoryList: [],
      deleteCategory: [],
      api_url: process.env.VUE_APP_API_URL,
    }
  },
  created() {
    this.getAllCategories();
  },
  methods: {
    getAllCategories() {
      axios({
        method: 'GET',
        url: this.api_url + "/api/categories",
      })
        .then(response => {
          this.categoryList = response.data.data;
          console.log("All Categories", response.data.data);
        })
    },
    handleDeleteCategory(category) {
      console.log("category", category)
      axios({
        method: 'DELETE',
        url: this.api_url + "/api/categories/" + category.id,
      })
        .then(response => {
          this.deleteCategory = response;
          console.log("Deleted", response);
        })
    },
    handleChecking(category) {
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
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success',
          )
            window.location.reload()
          this.handleDeleteCategory(category)

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
    }
  }
}
</script>

<style>
.header-container {
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

.table-cell {
  font-size: 20px;
}

.counterCell {
  width: 100px;
}

.counterCell:before {
  content: counter(tableCount);
  counter-increment: tableCount;
}

.category-cell {
  width: 800px;
}

.table-text {
  font-weight: bold;
  text-align: center;
}

.title {
  font-size: 50px;
}

.subtitle {
  font-size: 30px;
}

.btn {
  margin: 5px;
  width: 80px;
  font-weight: 600;
}
</style>