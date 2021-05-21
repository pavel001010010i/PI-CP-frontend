<template>
  <div >
    <div id="app">
      <div class="container boxShadow" >
        <vue-notification-list position="bottom-right"></vue-notification-list>
        <LogInOutShapka />
        <AdminPanel v-show="isAdminCheck" />
        <UserPanel v-show="isUserCheck" />
        <router-view v-show="isVisible"
        />
      </div>
    </div>
  </div>
</template>
<script>
import store from './store.index'
import MaintVariables from '@/Services/MainVariables'
import UserPanel from "@/components/NavigatonBars/UserNavigation";
import LogInOutShapka from "@/Views/LogInOutShapka";
import AdminPanel from "@/components/NavigatonBars/AdminPanel";
import HereService from "@/Services/HereAPi/HereService";
import Home from "@/Views/Home"
export default {
  store:store,
  data(){
    return{
      chekAutorizUser: false,
      isEnableLogOutBut:false,
      token:'',
      role:'',
      isCustomerCheck: false,
      isProviderCheck: false,
      isAdminCheck: false,
      isUserChek: false
    }
  },
  components:{
    Home,
    HereService,
    AdminPanel,
    LogInOutShapka,
    UserPanel,
    MaintVariables
  },
  computed:{
    isVisible(){
      return !store.getters.isVisible;
    },
    isAdminCheck(){
      return !store.getters.isVisible && store.getters.getIsAdmin
    },
    isUserCheck(){
      return store.getters.getIsUser && !store.getters.isVisible
    }
  },
  methods:{
  },
  mounted() {
    if(localStorage.getItem('user_token')===''){
      this.token= localStorage.getItem('user_token');
      this.role= localStorage.getItem('user_role');
      this.chekAutorizUser = false;
    }
    else {
      this.chekAutorizUser = true;
      this.token= localStorage.getItem('user_token');
      this.role= localStorage.getItem('user_role');
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height:850px;
  background-color: #9fcdff;
  padding: 10px;
}
.boxShadow {
  box-shadow: 0 0 20px rgba(0, 0, 0, .4);
  background-color: white;
  border-radius: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
