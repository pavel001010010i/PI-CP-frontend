<template>
  <h1 class="text-dark mb-4" >Select the type of registration</h1>
  <router-link class="btn btn-info ml-1" to="/regprovider" >Provider</router-link>
</template>

<script>
const urlUser = "https://localhost:44332/register";
export default {
  name: "Register",
  data(){
    return{
      isEnable:true
    }
  },
  methods:{
    add_info_provide_sucfl:function (val){
      this.isEnable = val;
    }
  }

}
</script>

<style scoped>
.active{
  color: red;
  font-size: 200%;
}
.green{
  color: forestgreen;
  font-size: 200%;
}
</style>