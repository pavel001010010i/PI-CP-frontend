<template>
  <div class="pb-1">
    <ItemList  v-for="item in items"
               :item="item"
               @request-item="RequestItem"/>
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
    RequestItem(data){
      this.$emit('request-item',data);
    }
  }
}
</script>

<style scoped>

</style>