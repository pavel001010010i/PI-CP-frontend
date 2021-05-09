<template>
  <div class="pb-1">
    <ItemList  v-for="item in items"
               :item="item"
               @edit-item="EditItem"/>
  </div>

</template>

<script>
import ItemList from "@/Services/SearchServices/DataTransport/ItemList";
import TypeService from "@/Services/TypeServices/TypeService"
export default {
name: "List",
  props:['items'],

  components:{
    ItemList,
    TypeService
  },
  methods:{
    EditItem(data){
      this.$emit('edit-item',data);
    }
  }
}
</script>

<style scoped>

</style>