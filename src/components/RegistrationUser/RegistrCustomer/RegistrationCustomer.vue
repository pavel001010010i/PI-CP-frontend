<template>
  <div class="form-row">
    <div class="col-md-4 mb-3">
      <label for="validationTooltip01">First Name</label>
      <input type="text" class="form-control" id="validationTooltip01" placeholder="First Name" required v-model="firstName">
      <div class="valid-tooltip">
        Looks good!
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <label for="validationTooltip01">Last Name</label>
      <input type="text" class="form-control"  placeholder="Last Name" required v-model="lastName">
      <div class="valid-tooltip">
        Looks good!
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <label for="validationTooltipUsername">Username/Email</label>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="validationTooltipUsernamePrepend">@</span>
        </div>
        <input type="text" class="form-control" id="validationTooltipUsername" aria-describedby="validationTooltipUsernamePrepend" v-model="email">
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <label>Age</label>
      <input type="number" class="form-control"  placeholder="Age" required v-model="age">
      <div class="valid-tooltip">
        Looks good!
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <label for="validationTooltip03">Passport Data</label>
      <input type="text" class="form-control" id="validationTooltip03" placeholder="Passport Data" required v-model="passportData">
      <div class="valid-tooltip">
        Looks good!
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <label for="validationTooltip03">Sex</label>
      <select class="custom-select mr-sm-2 " v-model="sex">
        <option disabled value="" >selected sex</option>
        <option >man</option>
        <option>woman</option>
      </select>
    </div>
    <div class="col-md-4 mb-3">
      <label for="exampleInputPassword1">Password</label>
      <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
    </div>
    <div class="col-md-4 mb-3">
      <label for="exampleInputPassword2">Password Confirm</label>
      <input v-model="passwordConfirm" type="password" class="form-control" id="exampleInputPassword2" placeholder="Password Confirm">
    </div>
  </div>
  <button class="btn btn-primary mr-1"  v-on:click="sendForm">Submit form</button>
  <router-link to="/register" class="btn btn-danger ml-1">Back</router-link>

  <p class="text-info text-success" v-show="isSucceful">{{message}}</p>
  <p class="text-info text-danger" v-show="!isSucceful">{{ message }}</p>
</template>

<script>
const urlUser = "https://localhost:44332/addcustomer";
export default {
  name: "RegistrationCustomer",
  data() {
    return {
      firstName: '',
      lastName: '',
      age: 0,
      email:'',
      passportData: '',
      sex:'',
      password:'',
      passwordConfirm:'',
      isSucceful:true,
      message:''
    }
  },
  updated() {
  },
  methods:{
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
      var headers= {
        "Content-Type": "application/json"
      };
      axios.post(urlUser, newCustomer,headers)
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