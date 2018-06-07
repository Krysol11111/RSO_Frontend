import Vue from 'vue'
import Router from 'vue-router'

import MainShop from '@/components/MainShop'
import AboutUs from '@/components/AboutUs'
import Contact from '@/components/Contact'
import Order from '@/components/Order'
import LoginPage from '@/components/LoginPage'
import OrderHistory from '@/components/OrderHistory'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainShop',
      component: MainShop
    },
    {
      path: '/AboutUs',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/Contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order
    },
    {
      path: '/Login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/OrderHistory',
      name: 'OrderHistory',
      component: OrderHistory
    },
  ]
})
