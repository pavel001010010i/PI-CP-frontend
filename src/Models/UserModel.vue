<template>

</template>

<script>
export default {
name: "UserModel",
  data(){
    return{
      registerModel:{
        userName: "",
        name:"",
        nameOrganization:"",
        unp:"",
        address:"",
        email:"",
        password:"",
        passwordConfirm:"",
        phoneNumber:"",
        anotherContact:""
      },
      model:{
        userName: "",
        name:"",
        nameOrganization:"",
        unp:"",
        address:"",
        email:"",
        password:"",
        passwordConfirm:"",
        phoneNumber:"",
        anotherContact:"",
        isLockdown:Boolean
      }
    }
  }
}
</script>

<style scoped>

</style>