<template>
  <div class="mt-3 mb-3 input-group-text">
    <input class="form-control" placeholder="Name Company" v-model="nameCompany" />
    <input class="form-control" placeholder="Licence Number" v-model="licenceNumber" />
    <input class="form-control" placeholder="Phone Number" v-model="phoneNumber" />
    <input class="form-control" placeholder="Email" v-model="email" :disabled="isEnable"/>
    <input  class="form-control" placeholder="Counries" v-model="countries" />
    <input type="text" class="form-control" placeholder="Password" v-model="password" :disabled="isEnable" />
    <button class="btn btn-outline-info mr-1 ml-1"  v-on:click="addProvider" :disabled="isEnable">Add</button>
    <button class="btn btn-outline-danger "  v-on:click="clearFields" :disabled="!isEnable">Back</button>
    <button class="btn btn-outline-primary  mr-1 ml-1 "  v-on:click="saveUpdateProvider" :disabled="!isEnable">Update</button>
  </div>

</template>

<script>
import ProviderList from '@/components/Tables/Provider/ProviderList'
const url = "https://localhost:44332/api/Providers/";
export default {
name: "Inputfields",
  props:['getProvider','isVisible','isDisableEmailFieldP'],
  data() {
    return {
      providerId:'',
      nameCompany: '',
      licenceNumber: '',
      phoneNumber: '',
      email: '',
      countries: '',
      visibleButEdit: false,
      name: '',
      password:'',
      isEnable:false
    }

  },
  components:{
    ProviderList
  },
  watch:{
    getProvider: function (val){
      var vm = this;
      vm.visible = !vm.visible;
      vm.providerId = val.providerId;
      vm.nameCompany= val.nameCompany;
      vm.licenceNumber= val.licenceNumber;
      vm.phoneNumber= val.phoneNumber;
      vm.email= val.email;
      vm.countries= val.countresProvider;
      this.isEnable = this.isDisableEmailFieldP;
    }

  },
  methods:{
    addProvider:  function () {
      var vm = this;
      var newProvider = {
        nameCompany: vm.nameCompany,
        licenceNumber: vm.licenceNumber,
        phoneNumber: vm.phoneNumber,
        email: vm.email,
        countresProvider: vm.countries,
        password: vm.password,
        passwordConfirm: vm.password,
        role: 'provider'
      }
      this.$emit('add-provider',newProvider);
      this.clearFields();
    },
    saveUpdateProvider: function(){
      var vm = this;
      var  provider= {
        providerId: vm.providerId,
        nameCompany:vm.nameCompany,
        licenceNumber: vm.licenceNumber,
        phoneNumber: vm.phoneNumber,
        email: vm.email,
        countresProvider: vm.countries
      };
      this.$emit('saveUpdate-provider',provider)
      this.clearFields();


    },
    clearFields: function (){
      var vm = this;
      vm.providerId='';
      vm.nameCompany= '';
      vm.licenceNumber= '';
      vm.phoneNumber= '';
      vm.email= '';
      vm.countries='';
      vm.password ='';
      vm.isEnable = false;
    }
  }
}
</script>

