<template>
  <tr>
    <th>{{customer.firstName}}</th>
    <th>{{customer.lastName}}</th>
    <th>{{customer.age}}</th>
    <th>{{customer.email}}</th>
    <th>{{customer.passportData}}</th>
    <th>{{customer.sex}}</th>
    <th>
      <button class="btn btn-primary" v-on:click="edit_customer">Edit</button>
      <button class="btn btn-danger" v-on:click="delete_customer">Delete</button>
    </th>
  </tr>
</template>

<script>
export default {
  name: "ItemListCustomer",
  props:['customer'],
  methods:{
    edit_customer:function () {
      var data={
        id: this.customer.id,
        isDisableEmailField: true
      };
      this.$emit('edit-customer',data)
    },
    delete_customer:function () {
      var data={
        id: this.customer.id,
        email: this.customer.email
      };
      this.$emit('delete-customer',data)
    }
  }
}
</script>

<style scoped>

</style>