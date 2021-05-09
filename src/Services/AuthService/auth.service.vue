<template>

</template>

<script>
import Constants from "@/Services/Constants";
import JwtTokenService from "@/Services/JwtTokenService";
import store from "@/store.index"



export default {
name: "auth.service",
  methods:{
    Login(data){
      return axios.post(Constants.data().url+"api/account/login",data,Constants.data().contTypeHeader)
    }
  }
}
</script>
