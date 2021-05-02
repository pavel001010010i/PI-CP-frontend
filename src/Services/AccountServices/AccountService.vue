<template>

</template>

<script>
import Constants from "@/Services/Constants";
import {model} from "@/Services/AccountServices/model.ts";

export default {
name: "AccountService",
  methods:{
  Login: function (userData){
    axios.post(Constants.data().url+'api/account/login',userData,Constants.data().contTypeHeader)
  }
  }
}
</script>

<style scoped>

</style>