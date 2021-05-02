<template>
  <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3 container">
    <div class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
      <ul class="navbar-nav flex-grow-1">
        <li class="nav-item">
          <router-link class="nav-link text-dark" to="/" >CUSTOMER HOME</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-dark" to="/cargoes" >My Cargoes</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-dark" to="/transports" >Мой Транспорт</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-dark" to="/RD" >My Request Delivery</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-dark" to="/orders" >My Orders</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

export default {
  name: "NavigationForCustomer",

}
</script>

<style scoped>

</style>