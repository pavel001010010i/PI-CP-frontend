<template>
  <div>
    <h1 class=" text-left">Providers</h1>
    <Inputfields :getProvider = "getProvider"
                 :isDisableEmailFieldP="isDisableEmailFieldP"
                 @add-provider="addProvider"
                 @saveUpdate-provider ="saveUpdateProvider"
                 :isVisible="isVisible"/>
    <ProviderList :providers ="providers" v-on:delete-provider ="deleteProvider" v-on:edit-provider="editProvBut" />
    <p class="text-info text-success" v-show="isSucceful">{{message}}</p>
    <p class="text-info text-danger" v-show="!isSucceful">{{ message }}</p>
    <p class="text-danger" v-show="status=='400'">Forma not valid</p>
  </div>
</template>

<script>
const url = "https://localhost:44332/api/Providers/";
const urlUser = "https://localhost:44332/api/Users/";
const config = {
  headers: { Authorization: 'Bearer '+ localStorage.getItem('user_token'),
    Accept: "application/json"}
};
import ProviderList from '@/components/Tables/Provider/ProviderList'
import Inputfields from "@/components/Tables/Provider/Inputfields"

export  default {
  //name: 'app',
  data() {
    return {
      getProvider: {},
      isDisableEmailFieldP:false,
      providers: [],
      isVisible: false,
      token:'',
      isSucceful:true,
      message:'',
      status:''
    }
  },
  components: {
    ProviderList,
    Inputfields
  },
  mounted() {
    this.getProviders();
    this.token = localStorage.getItem('user_token');

  },
  updated() {
    if(this.token===''){
      this.isVisible =false;
    }
    else {
      this.isVisible=true;
    }
  },

  methods:{
    saveUpdateProvider: function(val){
      axios.put(url + val.providerId, val,config)
          .then(response => {
            this.isSucceful = response.data.exist;
            this.message = response.data.message
            this.getProviders();
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      this.getProviders();
    },

    addProvider:  function (val) {
      axios.post(url, val,config).then(response => {
        this.getProviders();})
          .catch((error) => {
            this.status = error.response.status
            console.log(error); });
    },

    deleteProvider:function (val){
      axios.delete(url + val.id,config).then(response=>{
        this.getProviders();
      });
      axios.delete(urlUser + val.email, config).
      then(response=>{
      });

    },
    editProvBut: function (val) {
      axios.get(url + val.id,config).then(response=>{
        this.getProvider = response.data;
        this.isDisableEmailFieldP = val.isDisableEmailField;
      });
    },

    getProviders: function () {
      axios.get(url,config)
          .then(response => (this.providers = response.data))
      .catch((error) => {
        localStorage.setItem('isAccess',error.response.status.toString())
        console.log(error); });
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