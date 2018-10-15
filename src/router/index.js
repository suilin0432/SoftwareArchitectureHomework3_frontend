import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login'
import register from '../pages/register'
import home from '../pages/home'
import functional from '../pages/functional'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/function',
      name: 'function',
      component: functional
    }
  ]
})
