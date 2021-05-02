<template>
  <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3 container">
    <div class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
      <partial name="_LoginPartial" />
      <ul class="navbar-nav flex-grow-1">
        <li class="nav-item">
          <router-link class="nav-link text-dark" to="/" >Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-dark" to="/providers" >Providers</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-dark" to="/customers" >Customers</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-dark" to="/users" >Users</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-dark" to="/cargoes" >Грузы</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-dark" to="/countries" >Countries</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-dark" to="/RD" >Requests for delivery</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-dark" to="/orders" >Orders</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-dark" to="/hereservice" >HereApi</router-link>
        </li>
      </ul>
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