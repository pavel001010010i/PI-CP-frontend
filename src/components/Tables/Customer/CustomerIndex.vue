<template>
  <div>
    <h1 class=" text-left">Customers</h1>
    <InputFieldCust :getCustomer = "getCustomer"
                    :isDisableEmailField="isDisableEmailField"
                 @add-customer="addCustomer"
                 @saveUpdate-customer ="saveUpdateCustomer"
                 :isVisible="isVisible"/>
    <CustomerList :customers ="customers"
                  v-on:delete-customer ="deleteCustomer"
                  v-on:edit-customer="editCustBut" />
    <p class="text-info text-success" v-show="isSucceful">{{message}}</p>
    <p class="text-info text-danger" v-show="!isSucceful">{{ message }}</p>
  </div>
</template>

<script>
const url = "https://localhost:44332/api/Customers/";
const urlUser = "https://localhost:44332/api/Users/";

import InputFieldCust from "@/components/Tables/Customer/InputFieldCust";
import CustomerList from "@/components/Tables/Customer/CustomerList";
export default {
name: "CustomerIndex",
  data() {
    return {
      getCustomer: {},
      isDisableEmailField:false,
      customers: [],
      isVisible: false,
      token:'',
      isSucceful:true,
      message:''
    }
  },
  components:{
    InputFieldCust,
    CustomerList
  },
  mounted() {
    this.getCustomers();
    this.token = localStorage.getItem('user_token');

  },

  methods:{
    saveUpdateCustomer: function(val){
      axios.put(url + val.id, val,{
        headers: {'Content-Type': 'application/json'}})
          .then(response => {
            this.isSucceful = response.data.exist;
            this.message = response.data.message
            this.getCustomers();
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      this.getCustomers();

    },
    addCustomer:  function (val) {
      var headers= {
        "Content-Type": "application/json"
      };
      axios.post(url, val,headers)
          .then(response => {this.getCustomers();})
          .catch((error) => {
            console.log(error);
          });
    },

    deleteCustomer:function (val){
      var vm = this;
      var headers= {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('user_token')
      }
      axios.delete(url + val.id).
      then(response=>{
        this.getCustomers();
      });
      axios.delete(urlUser + val.email).
      then(response=>{
      });

    },
    editCustBut: function (val) {
      var vm = this;
      var headers= {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('user_token')
      }
      //vm.visibleButEdit = !vm.visibleButEdit;
      axios.get(url + val.id).
      then(response=>{
        this.getCustomer = response.data;
        this.isDisableEmailField = val.isDisableEmailField
      });

    },
    getCustomers: function () {
      const config = {
        headers: { Authorization: 'Bearer '+ localStorage.getItem('user_token'),
          Accept: "application/json"}
      };
      axios.get(url,config)
          .then(response => (this.customers = response.data));
    }
  },
  watch:{
    providers: function (){
      //this.getProviders();
    }
  }
}
</script>

<style scoped>

</style>