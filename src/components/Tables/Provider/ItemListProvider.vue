<template>
    <tr>
      <th>{{provider.nameCompany}}</th>
      <th>{{provider.licenceNumber}}</th>
      <th>{{provider.phoneNumber}}</th>
      <th>{{provider.email}}</th>
      <th>{{provider.countresProvider}}</th>
      <th>
        <button class="btn btn-primary" v-on:click="edit_provider">Edit</button>
        <button class="btn btn-danger" v-on:click="delete_provider">Delete</button>
      </th>
    </tr>
</template>

<script>
export default {
  props:['provider'],
name: "ItemListProvider",
  methods:{
    edit_provider:function () {
      var data={
        id: this.provider.providerId,
        isDisableEmailField: true
      };
      this.$emit('edit-provider',data)
    },
    delete_provider:function () {
      var data={
        id: this.provider.providerId,
        email: this.provider.email
      };
      this.$emit('delete-provider',data)
    }
  }
}
</script>

<style scoped>

</style>