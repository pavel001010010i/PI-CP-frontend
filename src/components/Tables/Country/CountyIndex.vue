<template>
  <div>
    <h1 class=" text-left">Countries</h1>
    <InputFieldCountry :getItem = "getItem"
                    :isDisableEmailField="isDisableEmailField"
                 @add-item="addItem"
                 @saveUpdate-item ="saveUpdateItem"
                 :isVisible="isVisible"/>
    <CountryList :items ="items"
                  v-on:delete-item ="deleteItem"
                  v-on:edit-item="editItemBut" />
    <p class="text-info text-success" v-show="isSucceful">{{message}}</p>
    <p class="text-info text-danger" v-show="!isSucceful">{{ message }}</p>

  </div>
</template>

<script>
import CountryList from "@/components/Tables/Country/CountryList";
import InputFieldCountry from "@/components/Tables/Country/InputFieldCountry";
const url = "https://localhost:44332/api/Countries/";
const config = {headers: { Authorization: 'Bearer '+ localStorage.getItem('user_token'),
    Accept: "application/json"}
}
export default {
name: "CountryIndex",
  data() {
    return {
      getItem: {},
      isDisableEmailField:false,
      items: [],
      isVisible: false,
      token:'',
      isSucceful:false,
      message:''
    }
  },
  components:{
    InputFieldCountry,
    CountryList
  },
  mounted() {
    this.getItems();
    this.token = localStorage.getItem('user_token');
  },
  methods:{
    saveUpdateItem: function(val){
      axios.put(url + val.nameCountry, val,config)
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
            if(error.response.status==400)
            this.isSucceful = false;
            this.message = "Model not valid"
          });
    },
    deleteItem:function (val){
      axios.delete(url + val.id,config).
      then(response=>{
        this.isSucceful = response.data.succes;
        this.message = response.data.message;
        this.getItems();
      }).catch((error)=>{
        if(error.response.status==500){
          this.message = "You can't delete an item because it is being used elsewhere";
        }

      });
    },
    editItemBut: function (val) {
      axios.get(url + val.id,config).
      then(response=>{
        this.isSucceful = response.data.succes;
        this.message = response.data.message;
        this.getItem = response.data;
        this.isDisableEmailField = val.isDisableEmailField
      });

    },
    getItems: function () {
      axios.get(url,config)
          .then(response => (this.items = response.data));
    }
  }

}
</script>

<style scoped>

</style>