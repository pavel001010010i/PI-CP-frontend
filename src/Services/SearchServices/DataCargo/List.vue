<template>
  <div class="pb-1">
    <Item v-for="item in items"
          :item="item"
          />
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
  }
}
</script>

<style scoped>

</style>