<template>
  <div>
    <h1 class=" text-left">Users</h1>
    <router-link class="btn btn-outline-info" to="/registeruser">Request Users</router-link>
    <InputFieldUser :getUser = "getUser"
                    :isDisableEmailFieldU="isDisableEmailFieldU"
                    @add-user="addUser"
                    @saveUpdate-user ="saveUpdateUser"
                    :isVisible="isVisible"/>
    <UserList :users ="users"
                  v-on:delete-user ="deleteUser"
                  v-on:edit-user="editUserBut"
              @lock-user = "lockUser"
    />
    <p class="text-info text-success" v-show="isSucceful">{{message}}</p>
    <p class="text-info text-danger" v-show="!isSucceful">{{ message }}</p>
  </div>
</template>

<script>
const url = "https://localhost:44332/api/Users/";
const urlUser = "https://localhost:44332/api/Users/";
const config = {
  headers: { Authorization: 'Bearer '+ localStorage.getItem('user_token'),
    Accept: "application/json"}
};

import InputFieldUser from "@/components/Tables/User/InputFieldUser";
import UserList from "@/components/Tables/User/UserList";
export default {
  name: "UserIndex",
  data() {
    return {
      getUser: {},
      isDisableEmailFieldU:false,
      users: [],
      isVisible: false,
      token:'',
      isSucceful:true,
      message:''
    }
  },
  components:{
    InputFieldUser,
    UserList
  },
  mounted() {
    this.getUsers();
    this.token = localStorage.getItem('user_token');
  },

  methods:{
    lockUser: function (val){
      axios.put(url + val.login, val,{
        headers: {'Content-Type': 'application/json'}})
          .then(response => {
            this.isSucceful = response.data.exist;
            this.message = response.data.message
            this.getUsers();
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    saveUpdateUser: function(val){
      axios.put(url + val.login, val,{
        headers: {'Content-Type': 'application/json'}})
          .then(response => {
            this.isSucceful = response.data.exist;
            this.message = response.data.message
            this.getUsers();
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    addUser:  function (val) {
      axios.post(url, val,config)
          .then(response => {this.getUsers();})
          .catch((error) => {
            console.log(error);
          });
    },

    deleteUser:function (val){
      axios.delete(url + val.login,config).
      then(response=>{
        this.getUsers();
      });
      /*axios.delete(urlUser + val.email).
      then(response=>{
      });*/

    },
    editUserBut: function (val) {
      axios.get(url + val.login,config).
      then(response=>{
        this.getUser = response.data;
        this.isDisableEmailFieldU = val.isDisableEmailFieldU
      });

    },
    getUsers: function () {
      axios.get(url,config)
          .then(response => (this.users = response.data));}
  },
}
</script>

<style scoped>

</style>