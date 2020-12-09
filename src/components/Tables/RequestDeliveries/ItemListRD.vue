<template>
  <tr>
    <th>{{item.nameCompany}}</th>
    <th>{{item.licenceNumber}}</th>
    <th>{{item.phoneNumber}}</th>
    <th>{{item.email}}</th>
    <th>{{item.countresProvider}}</th>
    <th>
      <button class="btn btn-primary" v-on:click="choose_item">Choose</button>
    </th>
  </tr>
</template>

<script>
export default {
  name: "ItemListRD",
  props:['item'],
  methods:{
    choose_item:function () {
      var data={
        id: this.item.providerId,
        isDisableEmailField: true
      };
      this.$emit('choose-item',data)
    }
  }
}
</script>

<style scoped>

</style>