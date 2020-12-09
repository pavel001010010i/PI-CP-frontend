<template>
  <div class="mt-3 mb-3 input-group-text">
    <input type="number" class="form-control" placeholder="Customer" v-model="customerId" disabled/>
    <input  type="number" class="form-control" placeholder="Provider" v-model="providerId" disabled/>
      <input type="number" class="form-control" placeholder="Cargo" v-model="cargoId" disabled/>
    <input type="text" class="form-control" placeholder="From" v-model="countryIdFrom" disabled/>
    <input type="text" class="form-control" placeholder="To" v-model="countryIdTo" disabled/>
      <input type="date" class="form-control" placeholder="Date Departure" v-model="dateDeparture" :disabled="!isEnable"/>
      <input type="date" class="form-control" placeholder="Date Delivery" v-model="dateDelivery" :disabled="!isEnable"/>
    <input type="number" class="form-control" placeholder="Date Delivery" v-model="castDelivery" disabled/>
    <select class="form-control" v-model="statusRequest" :disabled="!isEnable">
      <option disabled value="" >status</option>
      <option >true</option>
      <option>false</option>
    </select>
    <button class="btn btn-outline-danger"  v-on:click="clearFields" :disabled="!isEnable">Back</button>
    <button class="btn btn-outline-primary  mr-1 ml-1"  v-on:click="saveUpdate" :disabled="!isEnable">Update</button>
  </div>
</template>

<script>
export default {
name: "InputFieldCountry",
  props:['getItem','isVisible','isDisableEmailField'],
  data() {
    return {
      IdRequest:{Number},
      customerId:{Number},
      providerId:{Number},
      countryIdFrom:'',
      countryIdTo:'',
      cargoId:{Number},
      dateDeparture: '',
      dateDelivery: '',
      castDelivery:{Number},
      statusRequest: {Boolean},
      //customers:[],
      isEnable: false,
    }
  },
  watch:{
    getItem: function (val){
      var vm = this;
      vm.idRequest = val.idRequest;
      vm.customerId = val.customerId;
      vm.providerId= val.providerId;
      vm.countryIdFrom= val.countryIdFrom;
      vm.countryIdTo= val.countryIdTo;
      vm.cargoId= val.cargoId;
      vm.dateDeparture= val.dateDeparture;
      vm.dateDelivery= val.dateDelivery;
      vm.castDelivery= val.castDelivery;
      vm.statusRequest= val.statusRequest;
      vm.isEnable= this.isDisableEmailField;
    }
  },
  methods:{
    getProviders: function () {
      var vm = this;
      axios.get(url,config)
          .then(response => {
            vm.providers = response.data;});
    },

    add:  function () {
      var vm = this;
      var newItem = {
        customerId: vm.customerId,
        providerId:vm.providerId,
        countryIdFrom: vm.countryIdFrom,
        countryIdTo: vm.countryIdTo,
        cargoId:vm.cargoId,
        dateDeparture: vm.dateDeparture,
        dateDelivery: vm.dateDelivery,
        castDelivery:vm.castDelivery,
        statusRequest: vm.statusRequest
      }
      this.$emit('add-item',newItem);
      this.clearFields();
    },
    saveUpdate: function(){
      var vm = this;
      var  item= {
        idRequest: vm.idRequest,
        customerId: vm.customerId,
        providerId:vm.providerId,
        countryIdFrom: vm.countryIdFrom,
        countryIdTo: vm.countryIdTo,
        cargoId:vm.cargoId,
        dateDeparture: vm.dateDeparture,
        dateDelivery: vm.dateDelivery,
        castDelivery:vm.castDelivery,
        statusRequest: vm.statusRequest.bool
      };
      this.$emit('saveUpdate-item',item)
      this.clearFields();
    },
    clearFields: function (){
      this.customerId=0;
      this.providerId=0;
      this.countryIdFrom='';
      this.countryIdTo='';
      this.cargoId=0;
      this.dateDeparture =''
      this.dateDelivery= '';
      this.castDelivery=0;
      this.statusRequest=false;
      this.isEnable= this.isDisableEmailField;
      this.isEnable = false;
    }
}
}
</script>

<style scoped>

</style>