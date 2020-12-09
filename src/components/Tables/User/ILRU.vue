<template>
  <tr>
    <th>{{item.login}}</th>
    <th>{{item.role}}</th>
    <th>{{item.password}}</th>
    <th>
      <button class="btn btn-outline-success mr-1" v-on:click="accept_item">Accept</button>
      <button class="btn btn-outline-danger" v-on:click="reject_item">Reject</button>
    </th>
  </tr>
</template>

<script>
export default {
  name: "ItemList",
  props:['item'],
  data(){
    return{
      role:''
    }
  },
  mounted() {
    this.role = localStorage.getItem('user_role')
  },
  methods:{
    accept_item:function () {
      var user ={
        login:this.item.login,
        role: this.item.role,
        password: this.item.password
      }
      this.$emit('accept-item',user)
    },
    reject_item:function () {
      var data={
        id: this.item.login,
      };
      this.$emit('reject-item',data)
    }
  }
}
</script>

<style scoped>
.active{
  background-color: rgba(10, 170, 0, 0.5)
}
.isFalse{
  background-color: rgba(170, 0, 0, 0.5)
}
</style>