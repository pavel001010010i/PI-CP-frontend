<template>
  <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
    <div class="container">
      <div class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
        <Logout v-show="!isVisibleBut" @click="Exit" />
        <div v-show="!isVisibleBut" class=" btn-light btn">{{username}}</div>
        <router-link v-show="true" class="nav-link text-dark" to="/search" >Поиск</router-link>
        <router-link v-show="isVisibleBut"  class="btn-info btn ml-1"  to="/login" >Login</router-link>
        <router-link v-show="isVisibleBut" class="btn btn-outline-info mr-1" to="/register" >Register</router-link>

      </div>
    </div>

  </nav>


</template>

<script>
import Logout from "@/views/Logout";
import Login from "@/views/Login";
import MainVariables from "@/Services/MainVariables";
export default {
name: "LogInOutShapka",
  props:['is_logout_but'],//true
  data(){
  return{
    username:''
    }
  },
  computed: {
  isVisibleBut(){
        return MainVariables.data().isVisibleButLogInOut
    }
  },
  updated() {
  this.isVisibleBut = MainVariables.data().isVisibleButLogInOut;
  this.username= MainVariables.data().email

  },
  components:{
    Login,
    Logout
  },

  methods:{
    Exit: function (){
      this.$store.dispatch("RemoveToken");
      this.$store.dispatch('GetToken');
      this.$store.dispatch('IsAdmin')
    }
  }
}
</script>

<style scoped>

</style>