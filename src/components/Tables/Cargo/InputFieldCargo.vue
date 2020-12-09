<template>
  <div class="mt-3 mb-3 input-group-text">
    <input type="text" class="form-control" placeholder="Name Cargo" v-model="name" />
    <input  type="number" class="form-control" placeholder="Height" v-model="height" />
    <input type="number" class="form-control" placeholder="Width" v-model="width" />
    <input type="number" class="form-control" placeholder="Depth" v-model="depth" >
    <input type="number" class="form-control" placeholder="Weight" v-model="weight" >
    <select class="form-control" v-model="customerEmail" :disabled="isEnable" >
      <option disabled value="" >selected customer</option>
      <option v-for="customer in customers" > {{customer.email}}</option>
    </select>
    <button class="btn btn-outline-info mr-1 ml-1"  v-on:click="add" :disabled="isEnable">Add</button>
    <button class="btn btn-outline-danger"  v-on:click="clearFields" :disabled="!isEnable">Back</button>
    <button class="btn btn-outline-primary  mr-1 ml-1"  v-on:click="saveUpdate" :disabled="!isEnable">Update</button>
  </div>
</template>

<script>
const url = "https://localhost:44332/api/Customers/";
const urlC = "https://localhost:44332/api/Countries/";

const config = {
  headers: { Authorization: 'Bearer '+ localStorage.getItem('user_token'),
    Accept: "application/json"}
};
export default {
name: "InputFieldCust",
  props:['getCargo','isVisible','isDisableEmailField'],
  data() {
    return {
      id:'',
      customerId:'',
      name: '',
      height: {Number},
      width: {Number},
      depth: {Number},
      weight: {Number},
      customers:[],
      countries:[],
      isEnable: false,
      customerEmail:''
    }
  },
  components:{
  },
  mounted() {
    this.getCustomers();
  },
  watch:{
    getCargo: function (val){
      var vm = this;
      vm.id = val.id;
      vm.customerId = val.customerId;
      vm.name= val.name;
      vm.width = val.width;
      vm.height= val.height;
      vm.depth= val.depth;
      vm.weight = val.weight
      vm.isEnable= this.isDisableEmailField;
    }
  },

  methods:{
    getCustomers: function () {
      var vm = this;
      axios.get(url,config)
          .then(response => {
              vm.customers = response.data;});
    },
    add:  function () {
      var vm = this;
      var newCargo = {
        name: vm.name,
        height: vm.height,
        width: vm.width,
        depth: vm.depth,
        weight: vm.weight,
        customerEmail: vm.customerEmail,
      }
      this.$emit('add-cargo',newCargo);
      this.clearFields();
    },
    saveUpdate: function(){
      var vm = this;
      var  cargo= {
        id: vm.id,
        customerId: vm.customerId,
        name: vm.name,
        height: vm.height,
        width: vm.width,
        depth: vm.depth,
        weight: vm.weight
      };
      this.$emit('saveUpdate-cargo',cargo)
      this.clearFields();
    },
    clearFields: function (){
      var vm = this;
      vm.customerId = '';
      vm.name= '';
      vm.height='';
      vm.depth= '';
      vm.weight='';
      vm.isEnable= this.isDisableEmailField;
      vm.isEnable = false;
    }
}
}
</script>

<style scoped>

</style>