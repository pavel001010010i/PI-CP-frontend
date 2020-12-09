<template>
  <div class="mt-3 mb-3 input-group-text">
    <input type="text" class="form-control" placeholder="First Name" v-model="firstName" />
    <input type="text" class="form-control" placeholder="Last Name" v-model="lastName" />
    <input  type="number" class="form-control" placeholder="Age" v-model="age" />
    <input type="email" class="form-control" placeholder="Email" v-model="email" :disabled="isEnable" />
    <input type="text" class="form-control" placeholder="Passport Data" v-model="passportData" />
    <select class="form-control" v-model="sex">
      <option disabled value="" >selected sex</option>
      <option >man</option>
      <option>woman</option>
    </select>
    <input type="text" class="form-control" placeholder="Password" v-model="password" :disabled="isEnable" />
    <button class="btn btn-outline-info mr-1 ml-1"  v-on:click="addCustomer" :disabled="isEnable">Add</button>
    <button class="btn btn-outline-danger"  v-on:click="clearFields" :disabled="!isEnable">Back</button>
    <button class="btn btn-outline-primary  mr-1 ml-1"  v-on:click="saveUpdateCustomer" :disabled="!isEnable">Update</button>
  </div>
</template>

<script>
export default {
name: "InputFieldCust",
  props:['getCustomer','isVisible','isDisableEmailField'],
  data() {
    return {
      id:'',
      firstName: '',
      lastName: '',
      age: 0,
      email:'',
      passportData: '',
      sex:'',
      password: '',
      isEnable: false
    }

  },
  components:{
  },
  watch:{
    getCustomer: function (val){
      var vm = this;
      vm.id = val.id;
      vm.firstName = val.firstName;
      vm.lastName= val.lastName;
      vm.age= val.age;
      vm.passportData= val.passportData;
      vm.email= val.email;
      vm.sex = val.sex;
      vm.isEnable= this.isDisableEmailField;
    }
  },
  methods:{
    addCustomer:  function () {
      var vm = this;
      var newCustomer = {
        firstName: vm.firstName,
        lastName: vm.lastName,
        age: vm.age,
        email: vm.email,
        password: vm.password,
        passwordConfirm: vm.password,
        sex: vm.sex,
        passportData: vm.passportData,
        role: 'customer',
      }
      this.$emit('add-customer',newCustomer);
      this.clearFields();
    },
    saveUpdateCustomer: function(){
      var vm = this;
      var  customer= {
        id: vm.id,
        firstName: vm.firstName,
        lastName: vm.lastName,
        age: vm.age,
        email: vm.email,
        passportData: vm.passportData,
        sex: vm.sex,
      };
      this.$emit('saveUpdate-customer',customer)
      this.clearFields();


    },
    clearFields: function (){
      var vm = this;
      vm.firstName = '';
      vm.lastName= '';
      vm.age= '';
      vm.passportData= '';
      vm.email= '';
      vm.sex= '';
      vm.password ='';
      vm.isEnable = false;
    }
}
}
</script>

<style scoped>

</style>