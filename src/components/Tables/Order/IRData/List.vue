<template>
  <div class="pb-1 ">
    <ItemList  v-for="item in items"
               :item="item"
               @delete-item = "DeleteItem"
               @done-item ="DoneItem"
    />
  </div>

</template>

<script>
import ItemList from "@/components/Tables/Order/IRData/ItemList";
export default {
name: "List",
  props:['items'],

  components:{
    ItemList,
  },
  methods:{
    DeleteItem(data){
      this.$emit('delete-item',data);
    },
    DoneItem(data){
      this.$emit('done-item',data);
    }

  }
}
</script>

<style scoped>

</style>