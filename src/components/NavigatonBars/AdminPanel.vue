<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <label></label>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav mt-3 mb-3 " style="font-size: large">
       <!--   <router-link class="nav-link text-dark border-right" to="/transports" >Транспорт</router-link>
          <router-link class="nav-link text-dark border-right" to="/cargoes" >Грузы</router-link>
          <router-link class="nav-link text-dark border-right" to="/requests" >Заявки</router-link>
          <router-link class="nav-link text-dark border-right" to="/orders" >Заказы</router-link>-->
          <router-link class="nav-link text-dark border-right" to="/here-service" >Расчет маршрута</router-link>
          <router-link class="nav-link text-dark border-right" to="/users" >Пользователи</router-link>
          <router-link class="nav-link text-dark" to="/app-manage" >Настройка сайта</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Logout from "@/Views/Logout";
import About from "@/Views/About";
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