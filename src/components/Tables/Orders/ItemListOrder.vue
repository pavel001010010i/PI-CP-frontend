<template>
  <tr>
    <th>{{item.customer.email}}</th>
    <th>{{item.provider.nameCompany}}</th>
    <th>{{item.cargo.name}}</th>
    <th>{{item.plane.namePlane}} {{item.plane.modelPlane}}</th>
    <th>{{item.countryIdFrom}}</th>
    <th>{{item.countryIdTo}}</th>
    <th>{{item.dateDeparture}}</th>
    <th>{{item.dateDelivery}}</th>
    <th>{{item.castDelivery}}</th>
    <th>{{item.status}}</th>
    <th>
      <button class="btn btn-danger" v-on:click="delete_item">Delete</button>
    </th>
  </tr>
</template>

<script>
export default {
  name: "ItemList",
  props:['item'],
  methods:{
    delete_item:function () {
      var data={
        id: this.item.orderId,
      };
      this.$emit('delete-item',data)
    }
  }
}
</script>

<style scoped>
.active{
  background-color: rgba(10, 170, 0, 0.5)
}
.isFalse{
  background-color: rgba(170, 0, 0, 0.5)
}
</style>