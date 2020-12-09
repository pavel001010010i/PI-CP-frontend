<template>
  <tr>
    <th>{{cargo.customerId}}</th>
    <th>{{cargo.name}}</th>
    <th>{{cargo.height}}</th>
    <th>{{cargo.width}}</th>
    <th>{{cargo.depth}}</th>
    <th>{{cargo.weight}}</th>
    <th>{{cargo.customer.email}}</th>
    <th>
      <button class="btn btn-primary" v-on:click="edit_cargo">Edit</button>
      <button class="btn btn-danger" v-on:click="delete_cargo">Delete</button>
    </th>
  </tr>
</template>

<script>
export default {
  name: "ItemListCargo",
  props:['cargo'],
  methods:{
    edit_cargo:function () {
      var data={
        id: this.cargo.id,
        isDisableEmailField: true
      };
      this.$emit('edit-cargo',data)
    },
    delete_cargo:function () {
      var data={
        id: this.cargo.id,
        email: this.cargo.email
      };
      this.$emit('delete-cargo',data)
    }
  }
}
</script>

<style scoped>

</style>