<template>
  <div class="list-group-item col-md-5 m-d" style="margin: auto" v-show="kke==''">
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
  <button v-show="kke==''" type="submit" class="btn btn-primary mt-3" v-on:click="LoginSubmit">Log in</button>
  <h1 v-show="kke!=''" class="text-info mt-5">Hello, {{responseToken.username}} </h1>
</template>

<script>
const urlUser = "https://localhost:44332/token";

export default {
name: "Login",
  data() {
  return{
    passwordField:'',
    loginField:'',
    responseToken:{},
    message:'',
    isLockout: false,
    isToken:'true',
    kke:'',
  }
  },
  updated() {
  this.kke = localStorage.getItem('user_token');
  },
  methods:{
    LoginSubmit: function (){
      var vm = this;
      var userData = {
        login: vm.loginField,
        password: vm.passwordField
      }
      const headers = {
        'Content-Type': 'application/json',
      }
      axios.post(urlUser,userData,headers)
          .then(response => {
            this.responseToken = response.data;
            if(this.responseToken.lockoutEnable == false){
              this.$emit('provider_exist_check',this.responseToken.role);
              this.$emit('exit_logout',true);
              this.$emit('user_token',this.responseToken.access_token);
              localStorage.setItem('user_token',this.responseToken.access_token);
              localStorage.setItem('user_role',this.responseToken.role);
              localStorage.setItem('user_username',this.responseToken.username);
              this.isLockout = false;
              this.message = '';
            }
            else {
              this.isLockout = true;
              this.message = "User locked :("
            }
            if(this.responseToken.succes==false){
              this.message = this.responseToken.message;
              this.isLockout = true;
            }
          })
          .catch((error) => {
            this.$emit('exit_logout',false);
            this.responseToken = 'error';
            localStorage.setItem('user_token','');
            localStorage.setItem('user_role','');
            localStorage.setItem('user_username','');
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