<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <label></label>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav mt-3 mb-3 " style="font-size: large">
          <router-link class="nav-link text-dark border-right" to="/transports" >Транспорт</router-link>
          <router-link class="nav-link text-dark border-right" to="/cargoes" >Грузы</router-link>
          <router-link class="nav-link text-dark border-right" to="/requests" >Заявки</router-link>
          <router-link class="nav-link text-dark border-right" to="/orders" >Заказы</router-link>
          <router-link class="nav-link text-dark" to="/here-service" >Расчет маршрута</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: "UserNavigation",

}
</script>

<style scoped>

</style>