<template>
  <div class="pb-1">
    <Item v-for="item in items"
          :item="item"
          @edit-cargo="EditCargo"/>
  </div>

</template>

<script>
import Item from "@/Services/SearchServices/DataCargo/ItemList";

export default {
name: "CargoList",
  props:['items'],
  components:{
    Item,
  },

  methods:{

    EditCargo(data){
      this.$emit('edit-cargo',data);
    }
  }
}
</script>

<style scoped>

</style>