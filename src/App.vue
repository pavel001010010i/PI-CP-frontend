<template>
  <div id="app" class="container">
    <vue-notification-list position="bottom-right"></vue-notification-list>
    <LogInOutShapka  :is_logout_but="!chekAutorizUser" @exit_logout="exit_logout"/>
    <Shapka v-show="isAdminCheck" />
    <NavigationForCustomer v-show="isUserCheck" />
    <NavigationForProvider v-show="chekAutorizUser&&isProviderCheck" />
    <router-view v-show="isVisible"
                 />
  </div>
</template>
<script>
import store from './store.index'
import MaintVariables from '@/Services/MainVariables'
import NavigationForProvider from "@/components/NavigatonBars/NavigationForProvider";
import NavigationForCustomer from "@/components/NavigatonBars/NavigationForCustomer";
import LogInOutShapka from "@/views/LogInOutShapka";
import Shapka from "@/views/Shapka";
import HereService from "@/Services/HereAPi/HereService";
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
    HereService,
    Shapka,
    LogInOutShapka,
    NavigationForCustomer,
    NavigationForProvider,
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

    exit_logout: function (val){
      this.chekAutorizUser = val;
    },
    exit_logout_route: function (val){
      this.chekAutorizUser = val;
    },
    enable_logout_but:function (val){
      this.isEnableLogOutBut=val;

    },
    provider_exist_check: function (val){
      if(val==="customer"){
        this.isCustomerCheck = true;
        this.isAdminCheck=false;
        this.isProviderCheck = false;
      }else if(val==="provider"){
        this.isProviderCheck = true;
        this.isAdminCheck=false;
        this.isCustomerCheck = false;
      }else if(val==="admin"){
        this.isAdminCheck=true;
        this.isProviderCheck = false;
        this.isCustomerCheck = false;
      }else
      {
        this.isAdminCheck=false;
        this.isProviderCheck = false;
        this.isCustomerCheck = false;
      }

    },
    add_info_provide_sucfl: function (val){
      this.chekAutorizUser = val;
    }
  },
  mounted() {
    if(localStorage.getItem('user_token')===''){
      this.token= localStorage.getItem('user_token');
      this.role= localStorage.getItem('user_role');
      this.chekAutorizUser = false;
    }
    else {
      if(localStorage.getItem('user_role')==="admin"){
        this.isAdminCheck = true;
      }
      if(localStorage.getItem('user_role')==="customer"){
        this.isCustomerCheck = true;
      }
      if(localStorage.getItem('user_role')==="provider"){
        this.isProviderCheck = true;
      }
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
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
