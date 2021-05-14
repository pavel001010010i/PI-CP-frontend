import { createApp } from 'vue'
import App from './App.vue'
import store from './store.index'
import './registerServiceWorker'
import router from './Router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'material-design-icons-iconfont'
import VueNotificationList from '@dafcoe/vue-notification'
import '@dafcoe/vue-notification/dist/vue-notification.css'



createApp(App)
    .use(router)
    .use(store)
    .use(VueNotificationList)
.mount('#app')
