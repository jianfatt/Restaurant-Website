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
            <td class="table-cell category-cell">{{  category.attributes.name  }}</td>
            <td class="table-cell action-cell">
              <router-link :to="{ path: 'edit-category/' + category.id }"><button
                  class="btn btn-primary action-button">Edit</button></router-link>
              <button class="btn btn-danger action-button" @click="handleChecking(category)">Delete</button>
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
const Swal = require('sweetalert2')

export default {
  name: 'categoryTable',
  data() {
    return {
      categoryList: [],
      deleteCategory: [],
      pageList: [],
      currentPage: 1,
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
        url: this.api_url + "/api/categories?pagination[page]=" + this.currentPage + "&pagination[pageSize]=5",
        data: {
          page: this.currentPage
        }
      })
        .then(response => {
          this.categoryList = response.data.data;
          this.pageList = response.data.meta.pagination;
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
          this.getAllCategories()
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
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
            timer: 1000,
          },
            this.actionTimer(),
            this.handleDeleteCategory(category),
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
      this.getAllCategories();
      console.log('Current Number', this.currentPage)
    },
    handleNextPage() {
      if (this.currentPage < this.pageList.pageCount) {
        this.currentPage += 1
        this.getAllCategories();
      }
      else if (this.currentPage >= this.pageList.pageCount) {
        this.currentPage = 1
        this.getAllCategories();
      }
      console.log('Next Number', this.currentPage)
    },
    handlePreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1
        this.getAllCategories();
      }
      else if (this.currentPage <= 1) {
        this.currentPage = this.pageList.pageCount
        this.getAllCategories();
      }
      console.log('Previous Number', this.currentPage)
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