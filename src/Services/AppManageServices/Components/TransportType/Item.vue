<template>
  <tr>
    <th>{{item.name}}</th>
    <th><input type="checkbox" v-model="isChek"></th>
  </tr>
</template>

<script>
import TypeService from "@/Services/TypeServices/TypeService"
export default {
  name: "Item",
  props:['item'],
  components:{
    TypeService
  },

  data(){
    return{
      isChek:this.item.isActive
    }
  },

  watch:{
    isChek(data){
      this.item.isActive = data;
      TypeService.methods.UpdateTypeTransport(this.item);
    }
  }
}
</script>

<style scoped>

</style>