<template>
  <div >
    <table class="table table-hover ">
      <thead class="thead-dark">
      <tr>
        <th>Login</th>
        <th>Role</th>
        <th>Password</th>
        <th>Lockout Enable</th>
        <th>Edit/Delete</th>
      </tr>
      </thead>
      <tbody><ItemListUser v-for="user in users"
                               v-bind:user="user"
                               v-on:edit-user="editUserBut"
                               v-on:delete-user ="deleteUser"
                           @lock-user = "lockUser"
      />
      </tbody>
    </table>
  </div>
</template>

<script>
import ItemListUser from "@/components/Tables/User/ItemListUser";

export default {
  name: "UserList",
  props:['users'],
  components:{
    ItemListUser
  },
  methods:{
    editUserBut: function (val){
      this.$emit('edit-user',val)
    },
    deleteUser: function (val){
      this.$emit('delete-user',val)
    },
    lockUser: function (val){
      this.$emit('lock-user',val)
    }
  }
}
</script>

<style scoped>

</style>