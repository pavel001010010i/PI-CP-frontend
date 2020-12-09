<template>
  <div >
    <table class="table table-sm  table-hover table-striped">
      <thead class="thead-dark">
      <tr>
        <th>Customer</th>
        <th>Provider</th>
        <th>Cargo</th>
        <th>Plane</th>
        <th>From</th>
        <th>To</th>
        <th>Date Departure</th>
        <th>Date Delivery</th>
        <th>Cast Delivery</th>
        <th>Status</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody>
      <ItemList v-for="item in items"
                v-bind:item="item"
                @delete-item ="deleteItem"/>
      </tbody>
    </table>
  </div>
</template>

<script>
import ItemList from "@/components/Tables/Orders/ItemListOrder";

export default {
name: "List",
  props:['items'],
  components:{
    ItemList
  },
  methods:{
    deleteItem: function (val){
      this.$emit('delete-item',val)
    }
  }
}
</script>

<style scoped>

</style>