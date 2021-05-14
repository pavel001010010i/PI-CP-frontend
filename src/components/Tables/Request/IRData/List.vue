<template>
  <div class="pb-1 ">
    <ItemList  v-for="item in items"
               :item="item"
               @delete-item = "DeleteItem"
               @accept-item = "AcceptItem"
          />
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
  methods:{
    DeleteItem(data){
      this.$emit('delete-item',data);
    },
    AcceptItem(data){
      this.$emit('accept-item',data);
    }
  }
}
</script>

<style scoped>

</style>