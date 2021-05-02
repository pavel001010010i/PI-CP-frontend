import { createRouter, createWebHistory } from 'vue-router'
import Vue from 'vue'
import Home from "@/views/Home";



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'SearchService',
    component: () => import( '../Services/SearchServices/SearchService'),
    children:[
      {
        path: '/searchCargo',
        name: 'SearchCargo',
        component: () => import( '../Services/SearchServices/SearchCargo')
      },
      {
        path: '/searchTransport',
        name: 'SearchTransport',
        component: () => import( '../Services/SearchServices/SearchTransport')
      }
    ]
  },

  {
    path: '/hereservice',
    name: 'HereService',
    component: () => import( '../Services/HereAPi/HereService')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(  '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(  '../views/Login.vue')
  },
  {
    path: '/customers',
    name: 'Customers',
    component: () => import( '../components/Tables/Customer/CustomerIndex')
  },
  {
    path: '/providers',
    name: 'Providers',
    component: () => import( '../components/Tables/Provider/ProvidersIndex.vue')
  },
  {
    path: '/registerRD',
    name: 'RegisterRD',
    component: () => import( '../components/Tables/RequestDeliveries/AddRequestPanel')
  },{
    path: '/RD',
    name: 'RD',
    component: () => import( '../components/Tables/RequestDeliveries/RDIndex')
  },
  {
    path: '/cargoes',
    name: 'Cargoes',
    component: () => import( '../components/Tables/Cargo/CargoIndex')
  },
  {
    path: '/transports',
    name: 'Transports',
    component: () => import( '../components/Tables/Transport/TransportIndex')
  },
  {
    path: '/registeruser',
    name: 'Register User',
    component: () => import( '../components/Tables/User/LUR')
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import( '../components/Tables/Orders/IndexOrder')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import( '../components/Tables/User/UserIndex')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import( '../views/Register.vue')
  },
  ,{
    path: '/regprovider',
    name: 'RegProv',
    component: () => import( '../components/RegistrationUser/RegistrProvider/RegistrationProvider')
  },
  {
    path: '/regcustomer',
    name: 'RegCust',
    component: () => import( '../components/RegistrationUser/RegistrCustomer/RegistrationCustomer')
  },
  {
    path: '/logout', redirect: { name: 'Login' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
