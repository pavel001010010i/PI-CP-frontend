<template>
  <button class=" btn btn-outline-danger" @click="LogoutM" >Logout</button>
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
      localStorage.setItem('user_token',''),
        this.$emit('exit_logout',false);
      this.$emit('logout_but_is',true);

    }
  }
}
</script>

<style scoped>

</style>