<template>
  <div v-show="isVisible">
    <h3 class="mb-3 mt-3 text-left">Исходящие заявки</h3>
    <List :items="items"
          @delete-item = "DeleteItem"/>
    <div v-if="items.length==0">
      <p >У вас нет заявок</p>
    </div>
  </div>
</template>

<script>
import List from "@/components/Tables/Order/ORData/List"
import store from "@/store.index"
import ROService from "@/Services/RequestAndOrderServices/Request-Order-Service"
export default {
name: "OutgoingRequestsIndex",
  store:store,
  components:{
  List
  },

  data(){
    return{
      items:[],
      isVisible:Boolean
    }
  },

  mounted() {
    this.GetOrders();
  },

  methods:{
    DeleteItem(data){
      ROService.methods.DeleteOrderCustomer(data);
    },
    GetOrders() {
      ROService.methods.GetOrderCustomer();
    }
  },

  computed:{
    items(){
      return store.getters.GetOCustomer;
    },
    isVisible(){
      return !store.getters.isVisible;
    }
  }
}
</script>

<style scoped>

</style>