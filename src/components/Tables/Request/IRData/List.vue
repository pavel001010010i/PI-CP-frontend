<template>
  <div class="pb-1">
    <ItemList  v-for="item in items"
               :item="item"/>
  </div>

</template>

<script>
import ItemList from "@/components/Tables/Request/IRData/ItemList";
export default {
name: "List",
  props:['items'],

  components:{
    ItemList,
  },
}
</script>

<style scoped>

</style>