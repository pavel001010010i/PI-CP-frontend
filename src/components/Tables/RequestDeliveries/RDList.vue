<template>
  <div>
    <table class="table table-hover table-striped">
      <thead class="thead-dark">
      <tr>
        <th>Name company</th>
        <th>Licence Number</th>
        <th>Phone Number</th>
        <th>Email</th>
        <th>Countries</th>
        <th>=========</th>
      </tr>
      </thead>
      <tbody>
      <ItemList v-for="item in items"
                               :item="item"
                               @choose-item="chooseItemBut"
                               />
      </tbody>
    </table>
  </div>
</template>

<script>
import ItemList from "@/components/Tables/RequestDeliveries/ItemListRD";

export default {
name: "RDList",
  props:['items'],
  components:{
    ItemList
  },
  methods:{
    chooseItemBut: function (val){
      this.$emit('choose-item',val)
    }
  }
}
</script>

<style scoped>

</style>