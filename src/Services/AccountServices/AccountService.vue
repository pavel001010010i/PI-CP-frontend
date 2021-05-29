<template>

</template>

<script>
import Constants from "@/Services/Constants";
import store from "@/store.index"
import { useNotificationStore } from '@dafcoe/vue-notification'

export default {
name: "AccountService",
  store:store,
  methods:{
  Login: function (userData){
    axios.post(Constants.data().url+'api/account/login',userData,Constants.data().contTypeHeader)
  },
    ConfirmEmail(data){
      return axios.post(Constants.data().url+'api/account/confirm-email',{ code: data},Constants.data().contTypeHeader)
    },
    RegisterUser(data){
      return axios.post(Constants.data().url+'api/account/registration-user',data,Constants.data().contTypeHeader)
    },
    GetUserData(id){
      return axios.get(Constants.data().url+`api/account/get-user/${id}`,Constants.data().contTypeHeader)
    },
    GetUsers(){
      store.dispatch("GetUsers");
    },
    UpdateUserLockout(id){
      axios.get(Constants.data().url+`api/user/update-user/${id}`,Constants.data().configBearHeader)
      .then(response=>{
        const { setNotification } = useNotificationStore()
        setNotification(Constants.methods.GetNotification(`${response.data.message}`,"info"));
        store.dispatch("GetUsers");
      })
      .catch(error=>{
        const { setNotification } = useNotificationStore()
        setNotification(Constants.methods.GetNotification(`${error.response.data.message}`,"alert"));
      })
    }
  }
}
</script>

<style scoped>

</style>