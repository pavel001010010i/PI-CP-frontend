<template>
  <div v-if="token!=''">
    <h1 class=" text-left">Requests Delivery</h1>
    <router-link class="btn btn-outline-info" to="/registerRD" v-show="role=='customer'">Add Request</router-link>
    <InputField v-if="role!='provider'" :getItem = "getItem"
                    :isDisableEmailField="isDisableEmailField"
                 @add-item="addItem"
                 @saveUpdate-item ="saveUpdateItem"
                 :isVisible="isVisible"/>
    <List :items ="items"
          v-on:delete-item ="deleteItem"
          v-on:edit-item="editItemBut"
          v-on:accept-item ="acceptItem"
          v-on:reject-item="deleteItem"/>
    <p class="text-info text-success" v-show="isSucceful">{{message}}</p>
    <p class="text-info text-danger" v-show="!isSucceful">{{ message }}</p>

  </div>
</template>

<script>
import List from "@/components/Tables/RequestDeliveries/RDList1";
import InputField from "@/components/Tables/RequestDeliveries/InputFieldRD";
const url = "https://localhost:44332/api/RequestDeliveries/";
const urlAcRe = "https://localhost:44332/addorder";
const config = {
  headers: { Authorization: 'Bearer '+ localStorage.getItem('user_token'),
    Accept: "application/json"}
};

export default {
name: "RDIndex",
  data() {
    return {
      getItem: {},
      isDisableEmailField:false,
      items: [],
      isVisible: false,
      token:'',
      isSucceful:false,
      message:'',
      role:'',
      dataFromRd:{}
    }
  },
  components:{
    InputField,
    List
  },
  mounted() {
    this.getItems();
    this.role = localStorage.getItem('user_role');
    this.token = localStorage.getItem('user_token');
  },

  methods:{
    acceptItem:  function (val) {
      axios.get(url + val,config).
      then(response=>{
        this.dataFromRd = response.data;
        axios.post(urlAcRe, this.dataFromRd,config)
            .then(response => {
              this.isSucceful = response.data.succes;
              this.message = response.data.message;
              this.getItems();})
            .catch((error) => {
              console.log(error);
            });
      });

    },

    saveUpdateItem: function(val){
      axios.put(url + val.idRequest, val,config)
          .then(response => {
            this.isSucceful = response.data.succes;
            this.message = response.data.message
            this.getItems();
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    addItem:  function (val) {
      axios.post(url, val,config)
          .then(response => {
            this.isSucceful = response.data.succes;
            this.message = response.data.message;
            this.getItems();})
          .catch((error) => {
            console.log(error);
          });
    },
    deleteItem:function (val){
      axios.delete(url + val.id,config).
      then(response=>{
        this.getItems();
      }).catch((error)=>{
        if(error.response.status==500){
          this.message = "You can't delete an item because it is being used elsewhere";}
      });
    },
    editItemBut: function (val) {
      axios.get(url + val.id,config).
      then(response=>{
        this.getItem = response.data;
        this.isDisableEmailField = val.isDisableEmailField
      });

    },
    getItems: function () {
      axios.get(url,config)
          .then(response => {this.items = response.data})}
  }

}
</script>

<style scoped>

</style>