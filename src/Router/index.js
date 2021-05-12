import { createRouter, createWebHistory } from 'vue-router'
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
    path: '/requests',
    name: 'RequestIndex',
    component: () => import( '@/components/Tables/Request/RequestIndex'),
    children:[
      {
        path: '/outgoing-requests',
        name: 'OutgoingRequestIndex',
        component: () => import( '@/components/Tables/Request/OutgoingRequestsIndex')
      },
      {
        path: '/incoming-requests',
        name: 'IncomingRequestIndex',
        component: () => import( '@/components/Tables/Request/IncomingRequestsIndex')
      }
    ]
  },
  {
    path: '/app-manage',
    name: 'AppManageService',
    component: () => import( '../Services/AppManageServices/AppManageService')
  },
  {
    path: '/here-service',
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
    path: '/users',
    name: 'Users',
    component: () => import( '../components/Tables/User/UserIndex')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import( '../Services/AccountServices/Registration/Register.vue'),
    children:[
      {
        path: '/register-natural-person',
        name: 'RegistrationNaturalPerson',
        component: () => import( '../Services/AccountServices/Registration/RegistrationNaturalPerson')
      },
      {
        path: '/register-legal-person',
        name: 'RegistrationLegalPerson',
        component: () => import( '../Services/AccountServices/Registration/RegistrationLegalPerson')
      }
    ]
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
