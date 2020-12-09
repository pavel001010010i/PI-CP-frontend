<template>
  <div >
    <table class="table table-hover table-striped">
      <thead class="thead-dark">
      <tr>
        <th>Name Country</th>
        <th>Latitude</th>
        <th>Longitude</th>
        <th>Index</th>
        <th>Edit/Delete</th>
      </tr>
      </thead>
      <tbody>
      <ItemListCountry v-for="item in items"
                               v-bind:item="item"
                               v-on:edit-item="editItemBut"
                               v-on:delete-item ="deleteItem"/>
      </tbody>
    </table>
  </div>
</template>

<script>
import ItemListCountry from "@/components/Tables/Country/ItemListCountry";

export default {
name: "CargoList",
  props:['items'],
  components:{
    ItemListCountry
  },
  methods:{
    editItemBut: function (val){
      this.$emit('edit-item',val)
    },
    deleteItem: function (val){
      this.$emit('delete-item',val)
    }
  }
}
</script>

<style scoped>

</style>