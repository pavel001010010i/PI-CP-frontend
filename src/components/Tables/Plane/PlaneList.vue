<template>
  <div >
    <table class="table table-hover table-striped">
      <thead class="thead-dark">
      <tr>
        <th>Id Provider</th>
        <th>Name Plane</th>
        <th>Model Plane</th>
        <th>Height</th>
        <th>Width</th>
        <th>Depth</th>
        <th>Capacity Weight</th>
        <th>Email Providers</th>
        <th>Edit/Delete</th>
      </tr>
      </thead>
      <tbody>
      <ItemListPlane v-for="plane in planes"
                               v-bind:plane="plane"
                               v-on:edit-plane="editPlaneBut"
                               v-on:delete-plane ="deletePlane"/>

      </tbody>
    </table>
  </div>
</template>

<script>
import ItemListPlane from "@/components/Tables/Plane/ItemListPlane";

export default {
name: "CustomerList",
  props:['planes'],
  components:{
    ItemListPlane
  },
  methods:{
    editPlaneBut: function (val){
      this.$emit('edit-plane',val)
    },
    deletePlane: function (val){
      this.$emit('delete-plane',val)
    }
  }
}
</script>

<style scoped>

</style>