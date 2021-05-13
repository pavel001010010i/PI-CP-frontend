<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light ">
    <div class="container-fluid">
      <label></label>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav mr-auto mt-2 mt-lg-0 ">
        </div>
        <form class="form-inline my-2 my-lg-0">
          <router-link class="btn btn-outline-primary mb-1 mr-2" to="/search" >Поиск груза/транспорта</router-link>
          <router-link class="btn btn-outline-primary  mb-1 mr-2" to="/here-service" >Расчет маршрута</router-link>
          <router-link v-show="isVisibleBut" class="btn btn-outline-info mb-1 mr-1" to="/register" >Регистрация</router-link>
          <router-link v-show="isVisibleBut"  class="btn-info btn mb-1 ml-1"  to="/login" >Вход</router-link>
          <div v-show="!isVisibleBut" class=" btn-light mb-1 btn">{{username}}</div>
          <Logout v-show="!isVisibleBut" @click="Exit" />
        </form>
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