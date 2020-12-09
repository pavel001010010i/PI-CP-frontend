<template>
  <div >
    <table class="table table-hover table-striped">
      <thead class="thead-dark">
      <tr>
        <th>Name company</th>
        <th>Licence Number</th>
        <th>Phone Number</th>
        <th>Email</th>
        <th>Countries</th>
        <th>Edit</th>
      </tr>
      </thead>
      <tbody>
      <ItemListProvider v-for="provider in providers"
                               v-bind:provider="provider"
                               v-bind:visibleButEdit="visibleButEdit"
                               v-on:edit-provider="editProvBut"
                               v-on:delete-provider ="deleteProvider"/>

      </tbody>
    </table>
  </div>
</template>

<script>
import ItemListProvider from "@/components/Tables/Provider/ItemListProvider"
export default {
  props:['providers','visibleButEdit'],
  components:{
    ItemListProvider
  },
  methods:{
    editProvBut: function (val){
      this.$emit('edit-provider',val)
    },
    deleteProvider: function (val){
      this.$emit('delete-provider',val)
    }
  }


}
</script>