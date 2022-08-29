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

let isLogin = localStorage.getItem('token')

function removeQueryParams(to) {
  if (Object.keys(to.query).length)
    return { path: to.path, query: {}, hash: to.hash }
}

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
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/all-restaurant/',
    name: 'all-restaurant',
    component: AllRestaurantView,
  },
  {
    path: '/add-restaurant',
    name: 'add-restaurant',
    component: AddRestaurantView,
  },
  {
    path: '/edit-restaurant/:id',
    name: 'edit-restaurant',
    component: EditRestaurantView,
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
  },
  {
    path: '/edit-category/:id',
    name: 'edit-category',
    component: EditCategoryView,
  },
  {
    path: '/category',
    name: 'category',
    component: CategoryView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if ((to.name == 'category' || to.name == 'all-restaurant' || to.name == 'add-restaurant' || to.name == 'add-category') && !isLogin){
    alert('Please login to view this page')
    next({ name: 'login' })
  }
  if ((to.name == 'edit-category' || to.name == 'edit-restaurant') && !isLogin){
    [removeQueryParams]
    alert('Please login to view this page')
    next({ name: 'login' })
  }
  else next()
})

export default router

