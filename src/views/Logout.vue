<template>
  <button class=" btn btn-outline-danger" @click="LogoutM" to="/login">Выход</button>
</template>

<script>
export default {
name: "Logout",
  props:['message'],
  data(){
  return{
      }
  },
  methods:{
    LogoutM: function (){
      localStorage.setItem('user_token','')
    }
  }
}
</script>

<style scoped>

</style>