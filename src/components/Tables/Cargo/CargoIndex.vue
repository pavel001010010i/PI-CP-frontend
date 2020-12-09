<template>
  <div>
    <h1 class=" text-left">Cargoes</h1>
    <InputFieldCargo :getCargo = "getCargo"
                    :isDisableEmailField="isDisableEmailField"
                 @add-cargo="addCargo"
                 @saveUpdate-cargo ="saveUpdateCargo"
                 :isVisible="isVisible"/>
    <CargoList :cargoes ="cargoes"
                  v-on:delete-cargo ="deleteCargo"
                  v-on:edit-cargo="editCargoBut" />
    <p class="text-info text-success" v-show="isSucceful">{{message}}</p>
    <p class="text-info text-danger" v-show="!isSucceful">{{ message }}</p>
  </div>
</template>

<script>
const url = "https://localhost:44332/api/Cargoes/";
const config = {
  headers: { Authorization: 'Bearer '+ localStorage.getItem('user_token'),
    Accept: "application/json"}
};

import InputFieldCargo from "@/components/Tables/Cargo/InputFieldCargo";
import CargoList from "@/components/Tables/Cargo/CargoList";
export default {
name: "CustomerIndex",
  data() {
    return {
      getCargo: {},
      isDisableEmailField:false,
      cargoes: [],
      isVisible: false,
      token:'',
      isSucceful:false,
      message:'',
      role:''
    }
  },
  components:{
    InputFieldCargo,
    CargoList
  },
  mounted() {
    //this.getCargoes();
    this.token = localStorage.getItem('user_token');
    this.role =localStorage.getItem('user_role');
  },
  watch:{
  role:function (val){
    this.getCargoes();
  }
  },
  Created() {
    axios.get(url,config)
        .then(response => (this.cargoes = response.data));
  },
  methods:{
    saveUpdateCargo: function(val){
      axios.put(url + val.id, val,config)
          .then(response => {
            this.isSucceful = response.data.succes;
            this.message = response.data.message
            this.getCargoes();
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      this.getCargoes();

    },
    addCargo:  function (val) {
      axios.post(url, val,config)
          .then(response => {
            this.isSucceful = response.data.succes;
            this.message = response.data.message;
            this.getCargoes();})
          .catch((error) => {
            console.log(error);
          });
    },

    deleteCargo:function (val){
      axios.delete(url + val.id,config).
      then(response=>{
        this.getCargoes();
      });
    },
    editCargoBut: function (val) {
      axios.get(url + val.id,config).
      then(response=>{
        this.getCargo = response.data;
        this.isDisableEmailField = val.isDisableEmailField
      });

    },
    getCargoes: function () {
      axios.get(url,config)
          .then(response => (this.cargoes = response.data));
    }
  }
}
</script>

<style scoped>

</style>