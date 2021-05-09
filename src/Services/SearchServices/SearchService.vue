<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link class="nav-link" to="/searchTransport" active-class="active">Транспорт</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/searchCargo" active-class="active">Груз</router-link>
    </li>
  </ul>
  <router-view
  />
</template>

<script>
import store from "@/store.index"
export default {
name: "SearchService",
  store:store,
  methods:{
    GetTransports(data){
      store.dispatch('GetSearchTransports',data);
    },
    GetCargoes(data){
      store.dispatch('GetSearchCargoes',data);
    }
  }
}
</script>

<style scoped>

</style>