<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link class="nav-link" to="/searchTransport">Транспорт</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/searchCargo">Груз</router-link>
    </li>
  </ul>
  <router-view
  />
</template>

<script>
export default {
name: "SearchService"
}
</script>

<style scoped>

</style>