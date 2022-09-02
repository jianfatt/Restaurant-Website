<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul v-show="!isLogin" class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Register</router-link>
            </li>
          </ul>

          <ul v-show="isLogin" class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/category">Category</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/all-restaurant">Restaurant</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link logout-link" @click="handleLogout()">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
const Swal = require('sweetalert2')

export default {
  name: 'App',
  data() {
    return {
      isLogin: localStorage.getItem('token'),
    }
  },
  methods: {
    handleLogout() {    
      let timerInterval
      Swal.fire({
        title: 'Logout Successfully!',
        icon: 'success',
        timer: 1000,
        didOpen: () => {
          Swal.showLoading()
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          window.location.replace('/');
          console.log('I was closed by the timer')
        }
      })
      localStorage.removeItem('token');
    }
  }
}
</script>


<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.navbar-expand-lg {
  background: gray;
}

.nav-link {
  font-weight: bold;
  color: white;
}

.logout-link:hover{
  cursor: pointer;
}
</style>
