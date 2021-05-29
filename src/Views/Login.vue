<template >
  <div v-show="isVisible" class="list-group-item col-md-5 p-3" style="margin: auto" >
    <h1 class="text-sm-center mb-1">Вход</h1>

    <div class="form-group text-left ">
      <label for="inlineFormInputGroupUsername2">Логин</label>
      <input v-model="loginField" type="email" class="form-control" id="inlineFormInputGroupUsername2" placeholder="Логин">
    </div>

    <div class="form-group text-left">
      <label for="exampleInputPassword1">Пароль</label>
      <input v-model="passwordField" type="password" class="form-control" id="exampleInputPassword1" placeholder="Пароль">
    </div>
    <router-link to="/register" >Регистрация</router-link>
    <p v-show="isLockout" class="text-danger">{{message}}</p>
    <p class="text-info mt-md-3">Техническая поддержка: techsupport@gmail.com</p>
  </div>
  <button v-show="isVisible"  type="submit" class="btn btn-primary m-3" @click="LoginSubmit">Войти</button>
</template>

<script>

import JwtTokenService from "@/Services/JwtTokenService";
import MainVariables from "@/Services/MainVariables";
import AuthService from "@/Services/AuthService/auth.service"
import { useNotificationStore } from '@dafcoe/vue-notification'
import Constants from "@/Services/Constants";

export default {
name: "Login",
  components: {
  Constants
  },
  data() {
  return{
    passwordField:'',
    loginField:'',
    responseToken:'',
    message:'',
    isLockout: false,
    isToken:'true',
    userName: '',
    role: '',
    items:[]
  }
  },
  computed: {
    isVisible(){
      return this.$store.getters.isVisible;
    }
  },

  methods:{
    submitForm() {
      this.v$.$validate() // checks all inputs
      if (!this.v$.$error) { // if ANY fail validation
        alert('Form successfully submitted.')
      } else {
        alert('Form failed validation')
      }
    },
    LoginSubmit: function (){
      AuthService.methods.Login({
        login: this.loginField,
        password: this.passwordField
      }).then(response => {
        if(response.data){
          localStorage.setItem('user_role',JwtTokenService.methods.getUserRoleFromJwToken(response.data));
          localStorage.setItem('user_email',JwtTokenService.methods.getUserEmailFromJwToken(response.data));
          localStorage.setItem('user_id',JwtTokenService.methods.getUserIdFromJwToken(response.data));
          this.$store.dispatch('SetToken',response.data);
          this.$store.dispatch('GetEmail',JwtTokenService.methods.getUserEmailFromJwToken(response.data));
          this.$store.dispatch('GetToken');
          this.$store.dispatch('IsAdmin');
          this.$store.dispatch('IsUser');
          this.isVisible =MainVariables.data().isVisibleButLogInOut;
          this.responseToken =JwtTokenService.methods.getDecodeJwToken(response.data)
          this.$router.push({ name: 'Home' });
        }
        else {
          this.isLockout = true;
          this.message = "User locked :("
        }
      })
          .catch((error) => {
            const { setNotification } = useNotificationStore()
            console.log(error);
            setNotification(Constants.methods.GetNotification(`${error.response.data.message}`,"warning"));
          });
    }
  }
}
</script>

<style scoped>

</style>