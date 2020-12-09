<template>
  <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
    <div class="container">
      <div class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
        <Logout v-show="!isVisibleBut" @exit_logout="exit_logout" @logout_but_is="logout_but_is" @rol_check_f_logout="rol_check_f_logout" />
        <div v-show="!isVisibleBut" class=" btn-light btn">{{username}}</div>
        <router-link v-show="isVisibleBut"  class="btn-info btn ml-1"  to="/login" >Login</router-link>
        <router-link v-show="isVisibleBut" class="btn btn-outline-info mr-1" to="/register" >Register</router-link>

      </div>
    </div>

  </nav>


</template>

<script>
import Logout from "@/views/Logout";
import Login from "@/views/Login";
export default {
name: "LogInOutShapka",
  props:['is_logout_but'],//true
  data(){
  return{
    isVisibleBut:this.is_logout_but,
    username:''

  }
  },
  updated() {
  this.isVisibleBut = this.is_logout_but;
  this.username=localStorage.getItem('user_username')

  },
  components:{
  Login,
    Logout
  }, methods:{
    exit_logout: function (val){
      this.$emit('exit_logout',val);
    },
    logout_but_is: function (val) {
      this.isVisibleBut= val;
    },
    rol_check_f_logout:function (val){
      this.$emit('rol_check_f_logout',val)
    }
  }
}
</script>

<style scoped>

</style>