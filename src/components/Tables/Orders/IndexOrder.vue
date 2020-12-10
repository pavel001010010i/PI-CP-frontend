<template>
  <div v-if="token!=''" class="m-auto">
    <h1 class=" text-left">Orders</h1>
    <List :items ="items"
          v-on:delete-item ="deleteItem"/>
    <p class="text-info text-success" v-show="isSucceful">{{message}}</p>
    <p class="text-info text-danger" v-show="!isSucceful">{{ message }}</p>
  </div>
</template>

<script>
import List from "@/components/Tables/Orders/ListOrder";
const url = "https://localhost:44332/api/Orders/";
const config = {
  headers: { Authorization: 'Bearer '+ localStorage.getItem('user_token'),
    Accept: "application/json"}
};

export default {
name: "IndexOrder",
  data() {
    return {
      getItem: {},
      isDisableEmailField:false,
      items: [],
      isVisible: false,
      token:'',
      isSucceful:false,
      message:'',
      role:''
    }
  },
  components:{
    List
  },
  mounted() {
    this.getItems();
    this.role = localStorage.getItem('user_role');
    this.token = localStorage.getItem('user_token');
  },

  methods:{

    deleteItem:function (val){
      axios.delete(url + val.id,config).
      then(response=>{
        this.isSucceful = response.data.succes;
        this.message = response.data.message
        this.getItems();
      }).catch((error)=>{
        if(error.response.status==500){
          this.message = "You can't delete an item because it is being used elsewhere";}  });
    },
    getItems: function () {
      axios.get(url,config)
          .then(response => {this.items = response.data})}
  }
}
</script>

<style scoped>

</style>