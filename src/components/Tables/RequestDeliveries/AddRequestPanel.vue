<template >
  <div v-if="token!=''">
  <div  class="form-row">
    <div class="col-md-12 ">
      <label>Cargo</label>
      <select class="form-control" v-model="nameCargo" >
        <option v-for="cargo in cargoes" >{{cargo.name}}</option>
      </select>
    </div>
    <div class="col-md-6">
      <label>From</label>
      <select class="form-control" v-model="nameCountryFrom" >
        <option v-for="country in countries" >{{country.nameCountry}}</option>
      </select>
    </div>
    <div class="col-md-6">
      <label>To</label>
      <select class="form-control" v-model="nameCountryTo" >
        <option v-for="country in countries" >{{country.nameCountry}}</option>
      </select>
    </div>
    <div class="col-md-4 mb-3">
      <label>Departure Date</label>
      <input type="date"  class="form-control" v-model="dateDep">
      <div class="valid-tooltip">
        Looks good!
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <label>Delivery Date</label>
      <input type="date" class="form-control" required v-model="dateDel">
      <div class="valid-tooltip">
        Looks good!
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <label>Cast Departure</label>
      <input type="number" class="form-control" placeholder="Cast Departure" disabled v-model="castDep">
    </div>
  </div>
  <router-link to="/RD" class="btn btn-danger ml-1 mb-3">Back</router-link>
    <div class="container">
      <List :items ="providers"
            v-on:choose-item="chooseItemBut" />
    </div>
  <p class="text-info text-success" v-show="isSucceful">{{message}}</p>
  <p class="text-info text-danger" v-show="!isSucceful">{{ message }}</p>
  </div>


</template>
<script>
import List from "@/components/Tables/RequestDeliveries/RDList";
import InputField from "@/components/Tables/RequestDeliveries/InputFieldRD";
const url = "https://localhost:44332/";
const config = {
  headers: { Authorization: 'Bearer '+ localStorage.getItem('user_token'),
    Accept: "application/json"}
};
export default {
name: "AddRequestPanel",
  data() {
    return {
      nameCargo:'',
      cargoes:[],
      nameCountryFrom:'',
      nameCountryTo:'',
      countries:[],
      dateDep:'',
      dateDel:'',
      minDate:'',
      castDep:{Number},
      cargoVal:{},
      countryValFrom:{},
      countryValTo:{},
      providers:[],
      isSucceful:true,
      token:'',
      dist:0
    }
  },
  components:{
    List,
    InputField
  },
  mounted() {
    this.getCargoes();
    this.getCountries();
    this.token = localStorage.getItem('user_token');
  },
  watch:{
    nameCargo: function (val){
      var vm = this;
      axios.get(url+"getcargoval/"+val,config)
          .then(response => {
            vm.cargoVal = response.data;
            this.getCastDep();});
      this.searchP();
    },
    nameCountryFrom: function (val){
      axios.get(url+"getcountryval/"+val,config)
          .then(response => {
            this.countryValFrom = response.data;
            this.getDictance(this.countryValFrom,this.countryValTo);
            this.getCastDep();
          });
      this.searchP();
    },
    nameCountryTo: function (val){
      axios.get(url+"getcountryval/"+val,config)
          .then(response => {
            this.countryValTo = response.data;
            this.getDictance(this.countryValFrom,this.countryValTo);
            this.getCastDep();
          });
      this.searchP();
    }
  },
  methods:{
  getCastDep: function (){
    var castDep1 = this.cargoVal.height*0.01 +
        this.cargoVal.width*0.01+
        this.cargoVal.depth*0.01+
        this.cargoVal.weight*0.01
        +this.dist*0.01;
    this.castDep = castDep1;
  },
  getDictance: function (val,val2){
    var data ={
      x1: val.latitude,
      y1: val.longitude,
      x2: val2.latitude,
      y2: val2.longitude
    }
    axios.post(url+'getDis',data,config).then(responce=>{
      this.dist = responce.data;
    })
  },
    chooseItemBut:function (val){
    var order = {
      providerId: val.id,
      customerEmail: localStorage.getItem("user_username"),
      cargoName: this.nameCargo,
      countryNameTo: this.nameCountryTo,
      countryNameFrom: this.nameCountryFrom,
      dateDep: this.dateDep,
      dateDel: this.dateDel,
      castDep: this.castDep
    }
      axios.post(url+"addrd",order,config)
          .then(response => {
            this.message = response.data.message;
            this.isSucceful = response.data.succes;
            })
          .catch((error) => {
          if(error.response.status == 400){
            this.message = "Data not valid!"
            this.isSucceful = false;
          }
        console.log(error);});
    },
    searchP: function (){
      var data = {
        weight:this.cargoVal.weight,
        height: this.cargoVal.height,
        depth: this.cargoVal.depth,
        width: this.cargoVal.width,
        countryTo: this.nameCountryTo,
        countryFrom: this.nameCountryFrom
      };
      axios.post(url+"api/Providers/getProv",data,config)
          .then(response => {
            this.providers = response.data;
          if(this.providers==={}){
            this.message = "Ops :( " +
                "Providers not found!";
            this.isSucceful=false;
          }
          else {
            this.message = "E baby";
            this.isSucceful=true;
          }});
    },
    getCargoes: function () {
      var vm = this;
      axios.get(url+"api/Cargoes/",config)
          .then(response => {
            vm.cargoes = response.data;});
    },
    getCountries: function () {
      var vm = this;
      axios.get(url+"api/Countries/",config)
          .then(response => {
            vm.countries = response.data;});
    },
    sendForm:function (){
      var vm = this;
      var newCustomer = {
        id:0,
        firstName: vm.firstName,
        lastName: vm.lastName,
        age: vm.age,
        email: vm.email,
        passportData: vm.passportData,
        sex: vm.sex,
        password: vm.password,
        passwordConfirm: vm.passwordConfirm,
        role: 'customer'
      }
      axios.post(urlUser, newCustomer,config)
          .then(response => {
            this.isSucceful =response.data.exist;
            this.message = response.data.message;
            this.$emit('add_info_provide_sucfl',this.isSucceful);
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }
}

</script>

<style scoped>

</style>