<template>
  <tr>
    <th>{{item.nameCountry}}</th>
    <th>{{item.latitude}}</th>
    <th>{{item.longitude}}</th>
    <th>{{item.index}}</th>
    <th>
      <button class="btn btn-primary" v-on:click="edit_item">Edit</button>
      <button class="btn btn-danger" v-on:click="delete_item">Delete</button>
    </th>
  </tr>
</template>

<script>
export default {
  name: "ItemListCountry",
  props:['item'],
  methods:{
    edit_item:function () {
      var data={
        id: this.item.nameCountry,
        isDisableEmailField: true
      };
      this.$emit('edit-item',data)
    },
    delete_item:function () {
      var data={
        id: this.item.nameCountry,
      };
      this.$emit('delete-item',data)
    }
  }
}
</script>

<style scoped>

</style>