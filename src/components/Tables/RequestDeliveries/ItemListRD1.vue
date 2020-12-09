<template>
  <tr>
    <th>{{item.customer.email}}</th>
    <th>{{item.provider.nameCompany}}</th>
    <th>{{item.cargo.name}}</th>
    <th>{{item.countryIdFrom}}</th>
    <th>{{item.countryIdTo}}</th>
    <th>{{item.dateDeparture}}</th>
    <th>{{item.dateDelivery}}</th>
    <th>{{item.castDelivery}}</th>
    <th>{{item.statusRequest}}</th>
    <th>
      <button v-show="role!='provider'" class="btn btn-primary" v-on:click="edit_item">Edit</button>
      <button v-show="role!=='provider'" class="btn btn-danger" v-on:click="delete_item">Delete</button>
      <button v-show="role=='provider'" class="btn btn-outline-success mb-1" v-on:click="accept_item">Accept</button>
      <button v-show="role=='provider'" class="btn btn-outline-danger" v-on:click="reject_item">Reject</button>
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
    edit_item:function () {
      var data={
        id: this.item.idRequest,
        isDisableEmailField: true
      };
      this.$emit('edit-item',data)
    },
    delete_item:function () {
      var data={
        id: this.item.idRequest,
      };
      this.$emit('delete-item',data)
    },
    accept_item:function () {
      this.$emit('accept-item',this.item.idRequest)
    },
    reject_item:function () {
      var data={
        id: this.item.idRequest,
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