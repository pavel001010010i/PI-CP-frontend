<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="nav-link text-dark" to="/" >Home</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav">
          <router-link class="nav-link text-dark" to="/" >Home</router-link>
          <router-link class="nav-link text-dark" to="/transports" >Транспорт</router-link>
          <router-link class="nav-link text-dark" to="/cargoes" >Грузы</router-link>
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