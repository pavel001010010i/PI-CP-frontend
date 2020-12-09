<template>
  <tr>
    <th>{{plane.idProvider}}</th>
    <th>{{plane.namePlane}}</th>
    <th>{{plane.modelPlane}}</th>
    <th>{{plane.height}}</th>
    <th>{{plane.width}}</th>
    <th>{{plane.depth}}</th>
    <th>{{plane.capacityWeight}}</th>
    <th>{{plane.provider.email}}</th>
    <th>
      <button class="btn btn-primary mr-1" v-on:click="edit_plane">Edit</button>
      <button class="btn btn-danger" v-on:click="delete_plane">Delete</button>
    </th>
  </tr>
</template>

<script>
export default {
  name: "ItemListPlane",
  props:['plane'],
  methods:{
    edit_plane:function () {
      var data={
        id: this.plane.id,
        isDisableEmailField: true
      };
      this.$emit('edit-plane',data)
    },
    delete_plane:function () {
      var data={
        id: this.plane.id,
        email: this.plane.email
      };
      this.$emit('delete-plane',data)
    }
  }
}
</script>

<style scoped>

</style>