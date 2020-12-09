<template>
  <tr :class="{isActive: user.lockoutEnable, isNotActive: !user.lockoutEnable }" >
    <th>{{user.login}}</th>
    <th>{{user.role}}</th>
    <th>{{user.password}}</th>
    <th>{{user.lockoutEnable}}</th>
    <th v-show="user.role!='admin'">
      <button class="btn btn-primary" v-on:click="edit_user">Edit</button>
      <button class="btn btn-danger" v-on:click="delete_user">Delete</button>
      <button v-show="!user.lockoutEnable" class="btn btn-warning text-white" v-on:click="lock_user(true)">Lock</button>
      <button v-show="user.lockoutEnable" class="btn btn-success" v-on:click="lock_user(false)">Unlock</button>
    </th>
    <th v-show="user.role=='admin'">======</th>
  </tr>
</template>

<script>
export default {
  name: "ItemListUser",
  props:['user'],
  data(){
    return{
     message:''
    }
  },
  methods:{
    edit_user:function () {
      var data={
        login: this.user.login,
        isDisableEmailFieldU: true
      };
      this.$emit('edit-user',data)
    },
    delete_user:function () {
      var data={
        login: this.user.login
      };
      this.$emit('delete-user',data)
    },
    lock_user:function (val) {
      var data={
        login: this.user.login,
        role: this.user.role,
        password:this.user.password,
        lockoutEnable: val
      };
      this.$emit('lock-user',data)
    }
  }
}
</script>

<style scoped>
.isActive{
  background: rgba(205, 0, 0, 0.3);
}
.isNotActive{
  background: rgba(1, 200, 0, 0.5);
}
</style>