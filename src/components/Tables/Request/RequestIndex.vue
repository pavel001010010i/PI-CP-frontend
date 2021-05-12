<template>
  <ul v-show="isVisible" class="nav nav-tabs">
    <li class="nav-item">
      <router-link class="nav-link" to="/outgoing-requests" active-class="active">Исходящие</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/incoming-requests" active-class="active">Входящие</router-link>
    </li>
  </ul>
  <router-view
  />
</template>

<script>
import store from "@/store.index"
export default {
name: "RequestIndex",
  store:store,
  data(){
    return{
      isVisible:Boolean
    }
  },
  computed:{
    isVisible(){
      return !store.getters.isVisible;
    }
  }
}
</script>

<style>

</style>