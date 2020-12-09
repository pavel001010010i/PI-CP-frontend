<template>
  <div class="mt-3 mb-3 input-group-text">
    <input type="text" class="form-control" placeholder="Name Country" v-model="nameCountry" :disabled="isEnable"/>
    <input  type="number" class="form-control" placeholder="Latitude" v-model="latitude" />
    <input  type="number" class="form-control" placeholder="Longitude" v-model="longitude" />
    <input type="number" class="form-control" placeholder="Index" v-model="index" />
    <button class="btn btn-outline-info mr-1 ml-1"  v-on:click="add" :disabled="isEnable">Add</button>
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
      nameCountry:'',
      latitude:0,
      longitude:0,
      index: '',
      customers:[],
      isEnable: false,
    }
  },
  watch:{
    getItem: function (val){
      var vm = this;
      vm.nameCountry = val.nameCountry;
      vm.latitude = val.latitude;
      vm.longitude = val.longitude;
      vm.index= val.index;
      vm.isEnable= this.isDisableEmailField;
    }
  },

  methods:{
    add:  function () {
      var vm = this;
      var newItem = {
        nameCountry: vm.nameCountry,
        latitude: vm.latitude,
        longitude: vm.longitude,
        index: vm.index,
      }
      this.$emit('add-item',newItem);
      this.clearFields();
    },
    saveUpdate: function(){
      var vm = this;
      var  item= {
        nameCountry: vm.nameCountry,
        latitude: vm.latitude,
        longitude: vm.longitude,
        index: vm.index,
      };
      this.$emit('saveUpdate-item',item)
      this.clearFields();
    },
    clearFields: function (){
      var vm = this;
      vm.nameCountry = '';
      vm.latitude= 0;
      vm.longitude= 0;
      vm.index='';
      vm.isEnable= this.isDisableEmailField;
      vm.isEnable = false;
    }
}
}
</script>

<style scoped>

</style>