<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link class="nav-link" to="/register-legal-person" active-class="active">Юр. Лицо</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/register-natural-person" active-class="active">Физ. Лицо</router-link>
    </li>
  </ul>
  <router-view/>
</template>

<script>
export default {
  name: "Register",
  data(){
    return{
      isEnable:true
    }
  },
  methods:{

  }

}
</script>

<style scoped>

</style>