<template>
  <div class="mt-3 mb-3 input-group-text">
    <input type="text" class="form-control" placeholder="Name Plane" v-model="namePlane" />
    <input type="text" class="form-control" placeholder="Model Plane" v-model="modelPlane" />
    <input  type="number" class="form-control" placeholder="Height" v-model="height" />
    <input type="number" class="form-control" placeholder="Width" v-model="width" />
    <input type="number" class="form-control" placeholder="Depth" v-model="depth" >
    <input type="number" class="form-control" placeholder="Capacity Weight" v-model="capacityWeight" />
    <select class="form-control" v-model="nameCompany" :disabled="isEnable" >
      <option v-for="provider in providers" > {{provider.nameCompany}}</option>
    </select>
    <button class="btn btn-outline-info mr-1 ml-1"  v-on:click="addPlane" :disabled="isEnable">Add</button>
    <button class="btn btn-outline-danger"  v-on:click="clearFields" :disabled="!isEnable">Back</button>
    <button class="btn btn-outline-primary  mr-1 ml-1"  v-on:click="saveUpdatePlane" :disabled="!isEnable">Update</button>
  </div>
</template>

<script>
const url = "https://localhost:44332/api/Providers/";
const config = {
  headers: { Authorization: 'Bearer '+ localStorage.getItem('user_token'),
    Accept: "application/json"}
};
export default {
name: "InputFieldCust",
  props:['getPlane','isVisible','isDisableEmailField'],
  data() {
    return {
      id:'',
      idProvider:'',
      namePlane: '',
      modelPlane: '',
      height: {Number},
      width: {Number},
      depth: {Number},
      capacityWeight:{Number},
      providers:[],
      isEnable: false,
      planes:[],
      nameCompany:''
    }
  },
  components:{
  },
  mounted() {
    this.getProviders();
    //this.token = localStorage.getItem('user_token');
  },
  watch:{
    getPlane: function (val){
      var vm = this;
      vm.id = val.id;
      vm.idProvider = val.idProvider;
      vm.namePlane= val.namePlane;
      vm.modelPlane= val.modelPlane;
      vm.width = val.width;
      vm.height= val.height;
      vm.depth= val.depth;
      vm.capacityWeight = val.capacityWeight;
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
    addPlane:  function () {
      var vm = this;
      var newPlane = {
        namePlane: vm.namePlane,
        modelPlane: vm.modelPlane,
        height: vm.height,
        width: vm.width,
        depth: vm.depth,
        capacityWeight: vm.capacityWeight,
        nameCompany: vm.nameCompany,
      }
      this.$emit('add-plane',newPlane);
      this.clearFields();
    },
    saveUpdatePlane: function(){
      var vm = this;
      var  customer= {
        id: vm.id,
        idProvider: vm.idProvider,
        namePlane: vm.namePlane,
        modelPlane: vm.modelPlane,
        height: vm.height,
        width: vm.width,
        depth: vm.depth,
        capacityWeight: vm.capacityWeight
      };
      this.$emit('saveUpdate-plane',customer)
      this.clearFields();
    },
    clearFields: function (){
      var vm = this;
      vm.idProvider = '';
      vm.namePlane= '';
      vm.modelPlane= '';
      vm.height='';
      vm.depth= '';
      vm.capacityWeight ='';
      vm.isEnable= this.isDisableEmailField;
      vm.isEnable = false;
    }
}
}
</script>

<style scoped>

</style>