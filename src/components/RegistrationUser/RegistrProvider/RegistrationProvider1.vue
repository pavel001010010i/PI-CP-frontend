<template>
  <div class="form-row">
    <div class="col-md-4 mb-3">
      <label for="validationTooltip01">Name Company</label>
      <input type="text" class="form-control" id="validationTooltip01" placeholder="Name Company" required v-model="nameCompany">
      <div class="valid-tooltip">
        Looks good!
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <label for="validationTooltip01">Phone number</label>
      <input type="text" class="form-control"  placeholder="Phone number" required v-model="phoneNumber">
      <div class="valid-tooltip">
        Looks good!
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <label for="validationTooltipUsername">Username</label>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="validationTooltipUsernamePrepend">@</span>
        </div>
        <input type="text" class="form-control" id="validationTooltipUsername" aria-describedby="validationTooltipUsernamePrepend" v-model="email">
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <label>License Number</label>
      <input type="text" class="form-control"  placeholder="License Number" required v-model="licenceNumber">
      <div class="valid-tooltip">
        Looks good!
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <label for="validationTooltip03">Countries</label>
      <input type="text" class="form-control" id="validationTooltip03" placeholder="Countries" required v-model="countries">
      <div class="valid-tooltip">
        Looks good!
      </div>
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
const url = "https://localhost:44332/addprovider";
export default {
name: "RegistrationProvider",
  data() {
    return {
      providerId:'',
      nameCompany: '',
      licenceNumber: '',
      phoneNumber: '',
      email:'',
      countries: '',
      password:'',
      passwordConfirm:'',
      isSucceful:true,
      message:''
    }
  },
  updated() {
  //this.email =
  },
  methods:{
    sendForm:function (){
      var vm = this;
      var newProvider = {
        id:0,
        nameCompany: vm.nameCompany,
        licenceNumber: vm.licenceNumber,
        phoneNumber: vm.phoneNumber,
        email: vm.email,
        countresProvider: vm.countries,
        password: vm.password,
        passwordConfirm: vm.passwordConfirm,
        role: 'provider'
      }
      var headers= {
        "Content-Type": "application/json"
      };
      axios.post(url, newProvider,headers)
          .then(response => {
            this.isSucceful =response.data.exist;
            this.message = response.data.message;
            this.$emit('add_info_provide_sucfl',true);

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