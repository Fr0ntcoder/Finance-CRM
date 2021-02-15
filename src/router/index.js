import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase/app"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      layout: "Main",
      auth: true
    },
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/login",
    name: "login",
    meta: {
      layout: "Empty"
    },
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    meta: {
      layout: "Empty"
    },
    component: () => import("@/views/Register.vue")
  },
  {
    path: "/categories",
    name: "categories",
    meta: {
      layout: "Main",
      auth: true
    },
    component: () => import("@/views/Categories.vue")
  },
  {
    path: "/detail/:id",
    name: "detail-record",
    meta: {
      layout: "Main",
      auth: true
    },
    component: () => import("@/views/Detail-record.vue")
  },
  {
    path: "/history",
    name: "history",
    meta: {
      layout: "Main",
      auth: true
    },
    component: () => import("@/views/History.vue")
  },
  {
    path: "/planning",
    name: "planning",
    meta: {
      layout: "Main",
      auth: true
    },
    component: () => import("@/views/Planning.vue")
  },
  {
    path: "/profile",
    name: "profile",
    meta: {
      layout: "Main",
      auth: true
    },
    component: () => import("@/views/Profile.vue")
  },
  {
    path: "/record",
    name: "record",
    meta: {
      layout: "Main",
      auth: true
    },
    component: () => import("@/views/Record.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if(requireAuth && !currentUser) {
    next("/login?message=login")
  }else {
    next()
  }
})
export default router
