<template>

</template>

<script>
import Constants from "@/Services/Constants";
import JwtTokenService from "@/Services/JwtTokenService";
import store from '@/store.index'


export default {
name: "MainVariables",
  store,

  data(){
  return{
    jwToken: localStorage.getItem('user_token'),
    role: localStorage.getItem('user_role'),
    email: localStorage.getItem('user_email'),
    userId: localStorage.getItem('user_id'),
    isVisibleButLogInOut: store.state.isVisible, //localStorage.getItem('user_token')?true:false,//
    decodeJWToken: Object,
    isAdminCheck:store.state.isAdmin
  }
  },
  computed:{
    isVisibleButLogInOut(){
      return store.getters.isVisible
    },
    isAdminCheck() {
      return store.getters.getIsAdmin;
    },
    email(){
      console.log(store.getters.GetEmail)
      return store.getters.GetEmail;
    }
  },
  updated() {
    this.jwToken =localStorage.getItem('user_token');
    //this.email =localStorage.getItem('user_email');
    this.role =localStorage.getItem('user_role');
    this.userId = localStorage.getItem('user_id')
    this.isVisibleButLogInOut =localStorage.getItem('user_token')?false:true
    this.decodeJWToken= JwtTokenService.methods.getDecodeJwToken(this.jwToken)
  }
}
</script>

<style scoped>

</style>