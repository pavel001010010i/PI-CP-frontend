<template>
  <div v-show="isVisible" class="list-group-item col-md-5 m-d" style="margin: auto" >
    <p class="text-sm-center display-4 mb-0">Log in</p>
    <label class="sr-only" for="inlineFormInputGroupUsername2">Username</label>
    <div class="input-group mb-2 mr-sm-2">
      <div class="input-group-prepend">
        <div class="input-group-text">@</div>
      </div>
      <input v-model="loginField" type="email" class="form-control" id="inlineFormInputGroupUsername2" placeholder="Username">
    </div>

    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input v-model="passwordField" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
    </div>
    <p v-show="isLockout" class="text-danger">{{message}}</p>
    <p class="text-info mt-md-3">Technical support: techsupport@gmail.com</p>
  </div>
  <button v-show="isVisible"  type="submit" class="btn btn-primary mt-3" @click="LoginSubmit">Log in</button>
  <h1  class="text-info mt-5 alert alert-info">Hello, Admin:{{IsAdminCheck}}==User:{{IsUserCheck}} </h1>

</template>

<script>

import JwtTokenService from "@/Services/JwtTokenService";
import MainVariables from "@/Services/MainVariables";
import AuthService from "@/Services/AuthService/auth.service"


export default {
name: "Login",
  components: {
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
    },
    Token(){
      return this.$store.getters.getToken;
    },
    IsAdminCheck(){
      return this.$store.getters.getIsAdmin;
    },
    IsUserCheck(){
      return this.$store.getters.getIsUser;
    }

  },

  methods:{

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
          this.$store.dispatch('GetToken');
          this.$store.dispatch('IsAdmin');
          this.$store.dispatch('IsUser');
          this.isVisible =MainVariables.data().isVisibleButLogInOut;
          this.responseToken =JwtTokenService.methods.getDecodeJwToken(response.data)
        }
        else {
          this.isLockout = true;
          this.message = "User locked :("
        }
      })
          .catch((error) => {
            this.isLockout = true;
            this.message = "User not exist :("
            console.log(error);
          });
    }
  }
}
</script>

<style scoped>
.active{
  color: red;
  font-size: 200%;
}
.green{
  color: forestgreen;
  font-size: 200%;
}
</style>