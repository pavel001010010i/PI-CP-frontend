<template>
  <div >
    <table class="table table-hover table-striped">
      <thead class="thead-dark">
      <tr>
        <th>Customer</th>
        <th>Provider</th>
        <th>Cargo</th>
        <th>From</th>
        <th>To</th>
        <th>Date Departure</th>
        <th>Date Delivery</th>
        <th>Cast Delivery</th>
        <th>Status</th>
        <th>Edit/Delete</th>
      </tr>
      </thead>
      <tbody>
      <ItemList v-for="item in items"
                v-bind:item="item"
                @edit-item="editItemBut"
                @delete-item ="deleteItem"
                @accept-item="acceptItemBut"
                @reject-item ="rejectItem"/>
      </tbody>
    </table>
  </div>
</template>

<script>
import ItemList from "@/components/Tables/RequestDeliveries/ItemListRD1";

export default {
name: "List",
  props:['items'],
  components:{
    ItemList
  },
  methods:{
    editItemBut: function (val){
      this.$emit('edit-item',val)
    },
    deleteItem: function (val){
      this.$emit('delete-item',val)
    },
    acceptItemBut: function (val){
      this.$emit('accept-item',val)
    },
    rejectItem: function (val){
      this.$emit('reject-item',val)
    }
  }
}
</script>

<style scoped>

</style>