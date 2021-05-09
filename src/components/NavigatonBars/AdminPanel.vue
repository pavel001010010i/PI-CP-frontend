<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light ">
    <div class="container-fluid">
      <label></label>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav">
          <router-link class="nav-link text-dark" to="/transports" >Транспорт</router-link>
          <router-link class="nav-link text-dark" to="/cargoes" >Грузы</router-link>
          <router-link class="nav-link text-dark" to="/here-service" >Расчет маршрута</router-link>
          <router-link class="nav-link text-dark" to="/users" >Пользователи</router-link>
          <router-link class="nav-link text-dark" to="/app-manage" >Настройка сайта</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Logout from "@/views/Logout";
import About from "@/views/About";
export default {
name: "Shapka",
  data(){
    return{
      responseToken:sessionStorage.getItem('user_token'),
      responseRole:sessionStorage.getItem('user_role'),
      tokenSucces: true
    }
  },
  methods:{
    logOut:function (){
      localStorage.setItem('user_token','');

    }
  },
  components:{
    About,
  Logout
  }
}
</script>

<style scoped>

</style>