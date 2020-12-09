<template>
  <div >
    <table class="table table-hover table-striped">
      <thead class="thead-dark">
      <tr>
        <th>Id Customer</th>
        <th>Name</th>
        <th>Height</th>
        <th>Width</th>
        <th>Depth</th>
        <th>Weight</th>
        <th>Email Customer</th>
        <th>Edit/Delete</th>
      </tr>
      </thead>
      <tbody>
      <ItemListCargo v-for="cargo in cargoes"
                               v-bind:cargo="cargo"
                               v-on:edit-cargo="editCargoBut"
                               v-on:delete-cargo ="deleteCargo"/>

      </tbody>
    </table>
  </div>
</template>

<script>
import ItemListCargo from "@/components/Tables/Cargo/ItemListCargo";
const url = "https://localhost:44332/api/Cargoes/";
export default {
name: "CargoList",
  props:['cargoes'],
  components:{
    ItemListCargo
  },
  methods:{
    editCargoBut: function (val){
      this.$emit('edit-cargo',val)
    },
    deleteCargo: function (val){
      this.$emit('delete-cargo',val)
    }
  }
}
</script>

<style scoped>

</style>