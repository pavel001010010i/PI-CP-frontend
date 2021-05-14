<template>
  <div v-show="isVisible">
    <h3 class="mb-3 mt-3 text-left">Входящие заявки</h3>
    <List :items="items"
          @delete-item = "DeleteItem"
          @done-item ="DoneItem"
    />
    <div>
      <div v-if="items.length==0">
        <p >У вас нет заявок</p>
      </div>
    </div>
  </div>
</template>

<script>
import List from "@/components/Tables/Order/IRData/List"
import store from "@/store.index"
import ROService from "@/Services/RequestAndOrderServices/Request-Order-Service"
export default {
name: "IncomingRequestsIndex",
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
      ROService.methods.DeleteOrderProvider(data);
    },
    GetOrders() {
      ROService.methods.GetOrderProvider();
    },
    DoneItem(data){
      ROService.methods.DoneItemOrder(data);
    }
  },

  computed:{
    items(){
      return store.getters.GetOProvider;
    },
    isVisible(){
      return !store.getters.isVisible;
    }
  }
}
</script>

<style scoped>

</style>