<template>
  <div class="pb-1 ">
    <ItemList  v-for="item in items"
               :item="item"
                @delete-item = "DeleteItem"/>
  </div>

</template>

<script>
import ItemList from "@/components/Tables/Order/ORData/ItemList";
export default {
name: "List",
  props:['items'],

  components:{
    ItemList,
  },
  methods:{
    DeleteItem(data){
      this.$emit('delete-item',data);
    }
  }
}
</script>

<style scoped>

</style>