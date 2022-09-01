import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"

import axios from 'axios';
const Swal = require('sweetalert2')

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.common.Authorization = 'Bearer ' + token;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


// Add response interceptor
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (400 === error.response.status) {
    Swal.fire({
      title: 'Error!',
      html: '<p>This Name Has Been Taken.</p>' + 'Please Try Again',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  if (401 === error.response.status) {
    Swal({
      title: "Session Expired",
      text: "Your session has expired. Would you like to be redirected to the login page?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      closeOnConfirm: false
    }, function () {
      window.location = '/login';
    });
  }

  if (401 === error.response.status) {
    Swal({
      title: "Session Expired",
      text: "Your session has expired. Would you like to be redirected to the login page?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      closeOnConfirm: false
    }, function () {
      window.location = '/login';
    });
  }

  if (403 === error.response.status) {
    Swal({
      title: "Forbidden",
      text: "This account is forbidden to do this action.",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "OK",
      closeOnConfirm: false
    });
  }

  if (404 === error.response.status) {
    Swal({
      title: "Error",
      text: "Error not found.",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "OK",
      closeOnConfirm: false
    });
  }

  if (500 === error.response.status) {
    Swal({
      title: "Internal Server Error",
      text: "Please try again.",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "OK",
      closeOnConfirm: false
    });
  } else {
    return Promise.reject(error);
  }
});