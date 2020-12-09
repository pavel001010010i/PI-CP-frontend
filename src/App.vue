<template>
  <div id="app" class="container">
    <LogInOutShapka  :is_logout_but="!chekAutorizUser" @exit_logout="exit_logout"/>
    <Shapka v-show="chekAutorizUser&&isAdminCheck" />
    <NavigationForCustomer v-show="chekAutorizUser&&isCustomerCheck" />
    <NavigationForProvider v-show="chekAutorizUser&&isProviderCheck" />
    <router-view v-show="chekAutorizUser"
                 @exit_logout="exit_logout_route"
                 @enable_logout_but="enable_logout_but"
                 @provider_exist_check="provider_exist_check"
                 />
  </div>
</template>
<script>
import NavigationForProvider from "@/components/NavigatonBars/NavigationForProvider";
import NavigationForCustomer from "@/components/NavigatonBars/NavigationForCustomer";
import LogInOutShapka from "@/views/LogInOutShapka";
import Shapka from "@/views/Shapka";
export default {
  data(){
    return{
      chekAutorizUser: false,
      isEnableLogOutBut:false,
      token:'',
      role:'',
      isCustomerCheck: false,
      isProviderCheck: false,
      isAdminCheck: false,
      isAccess: true,
    }
  },
  components:{
    Shapka,
    LogInOutShapka,
    NavigationForCustomer,
    NavigationForProvider
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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
