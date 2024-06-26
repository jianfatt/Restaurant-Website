import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AddRestaurantView from '../views/AddRestaurantView.vue'
import EditRestaurantView from '../views/EditRestaurantView.vue'
import AllRestaurantView from '../views/AllRestaurantView.vue'
import SingleRestaurantView from '../views/SingleRestaurantView.vue'
import AddCategoryView from '../views/AddCategoryView.vue'
import EditCategoryView from '../views/EditCategoryView.vue'
import CategoryView from '../views/CategoryView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      isAuth: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      isAuth: true
    }
  },
  {
    path: '/all-restaurant/',
    name: 'all-restaurant',
    component: AllRestaurantView,
    meta: {
      isNeededAuth: true
    }
  },
  {
    path: '/add-restaurant',
    name: 'add-restaurant',
    component: AddRestaurantView,
    meta: {
      isNeededAuth: true
    }
  },
  {
    path: '/edit-restaurant/:id',
    name: 'edit-restaurant',
    component: EditRestaurantView,
    meta: {
      isNeededAuth: true
    }
  },
  {
    path: '/restaurant/:id',
    name: 'restaurant',
    component: SingleRestaurantView
  },
  {
    path: '/add-category',
    name: 'add-category',
    component: AddCategoryView,
    meta: {
      isNeededAuth: true
    }
  },
  {
    path: '/edit-category/:id',
    name: 'edit-category',
    component: EditCategoryView,
    meta: {
      isNeededAuth: true
    }
  },
  {
    path: '/category',
    name: 'category',
    component: CategoryView,
    meta: {
      isNeededAuth: true
    }
  },
]

let isLogin = localStorage.getItem('token')

function removeQueryParams(to) {
  if (Object.keys(to.query).length)
    return { path: to.path, query: {}, hash: to.hash }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const Swal = require('sweetalert2')

router.beforeEach((to, from, next) => {
  if(to.meta.isNeededAuth && !isLogin) {
    [removeQueryParams]
    Swal.fire({
      icon: 'warning',
      title: 'Please login to view this page',
      showConfirmButton: false,
      timer: 1500
    })
    next({ name: 'login' })
  }
  if (to.meta.isAuth  && isLogin){
    Swal.fire({
      icon: 'info',
      title: 'You had already logged in',
      showConfirmButton: false,
      timer: 1500
    })
    next({ name: 'home' })
  }
  else next()
})

export default router

