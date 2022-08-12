import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import RestaurantView from '../views/RestaurantView.vue'
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
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/restaurant/:id',
    name: 'restaurant',
    component: RestaurantView
  },
  {
    path: '/add-category',
    name: 'add-category',
    component: AddCategoryView
  },
  {
    path: '/edit-category/:id',
    name: 'edit-category',
    component: EditCategoryView
  },
  {
    path: '/category',
    name: 'category',
    component: CategoryView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
