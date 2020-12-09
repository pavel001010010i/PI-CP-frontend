<template>
  <div class="mt-3 mb-3 input-group-text">
    <input type="text" class="form-control" placeholder="Email" v-model="login" disabled />
    <input  type="text" class="form-control" placeholder="Role" v-model="role" disabled />
    <input type="text" class="form-control" placeholder="Password" v-model="password" :disabled="!isEnable" />
    <router-link class="btn btn-outline-info mr-1 ml-1" to="/register" v-show="!isEnable">Add</router-link>
    <button class="btn btn-outline-danger "  v-on:click="clearFields" :disabled="!isEnable">Back</button>
    <button class="btn btn-outline-primary mr-1 ml-1"  v-on:click="saveUpdateUser" :disabled="!isEnable">Update</button>
  </div>
</template>

<script>
export default {
  name: "InputFieldUser",
  props:['getUser','isVisible','isDisableEmailFieldU'],
  data() {
    return {
      login:'',
      password:'',
      role:'',
      lockoutEnable:{Boolean},
      isEnable: false
    }

  },
  watch:{
    getUser: function (val){
      var vm = this;
      vm.login = val.login;
      vm.password = val.password;
      vm.role= val.role;
      vm.lockoutEnable = val.lockoutEnable;
      vm.isEnable= this.isDisableEmailFieldU;
    }
  },
  methods:{
    saveUpdateUser: function(){
      var vm = this;
      var  user= {
        login: vm.login,
        role: vm.role,
        password: vm.password,
        lockoutEnable: vm.lockoutEnable
      };
      this.$emit('saveUpdate-user',user)
      this.clearFields();
    },
    clearFields: function (){
      var vm = this;
      vm.login = '';
      vm.password ='';
      vm.role = '';
      vm.isEnable = false;
    }
  }
}
</script>

<style scoped>

</style>