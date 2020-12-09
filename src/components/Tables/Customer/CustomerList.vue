<template>
  <div >
    <table class="table table-hover table-striped">
      <thead class="thead-dark">
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>Email</th>
        <th>Passport Data</th>
        <th>Sex</th>
        <th>Edit</th>
      </tr>
      </thead>
      <tbody><ItemListCustomer v-for="customer in customers"
                               v-bind:customer="customer"
                               v-on:edit-customer="editCustBut"
                               v-on:delete-customer ="deleteCustomer"/>

      </tbody>
    </table>
  </div>
</template>

<script>
import ItemListCustomer from "@/components/Tables/Customer/ItemListCustomer";

export default {
name: "CustomerList",
  props:['customers'],
  components:{
    ItemListCustomer
  },
  methods:{
    editCustBut: function (val){
      this.$emit('edit-customer',val)
    },
    deleteCustomer: function (val){
      this.$emit('delete-customer',val)
    }
  }
}
</script>

<style scoped>

</style>