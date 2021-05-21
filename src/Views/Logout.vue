<template>
  <button class=" btn btn-outline-danger" @click="LogoutM" to="/">Выход</button>
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
      this.$router.push({ name: 'Login' });
      localStorage.setItem('user_token','')
    }
  }
}
</script>

<style scoped>

</style>