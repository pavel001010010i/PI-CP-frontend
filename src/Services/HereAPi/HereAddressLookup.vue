<template>
  <div class="container text-left mb-3">
    <div>
      <label for="validationSearch" class="form-label">{{nameSearchLabel }}</label>
      <div class="input-group has-validation">
        <input type="search" class="form-control" id="validationSearch" aria-describedby="inputGroupPrepend" required v-model="searchString">
        <div class="invalid-feedback">
          Пожалуйста, ведите значение.
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3">
        <label class="font-weight-bold">Полный адресс:</label>
      </div>
      <div class="col-lg-9">{{fullAddress}}</div>
    </div>
    <div class="row">
      <div class="col-lg-3">
        <label class="font-weight-bold">Координаты:</label>
      </div>
      <div class="col-lg-9">lat: {{coordinats.lat}}, lng: {{coordinats.lng}}</div>
    </div>
    <div class="row">
      <div class="col-lg-3">
        <label class="font-weight-bold">Улица:</label>
      </div>
      <div class="col-lg-9">
        <input type="text" v-model="street" disabled />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3">
        <label class="font-weight-bold">Город:</label>
      </div>
      <div class="col-lg-9">
        <input type="text" v-model="city" disabled />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3">
        <label class="font-weight-bold">Штат/Область:</label>
      </div>
      <div class="col-lg-9">
        <input type="text" v-model="state" disabled />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3">
        <label class="font-weight-bold">Индекс:</label>
      </div>
      <div class="col-lg-9">
        <input type="text" v-model="postcode" disabled />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3">
        <label class="font-weight-bold">Страна:</label>
      </div>
      <div class="col-lg-9">
        <input type="text" v-model="country" disabled />
      </div>
    </div>
    </div>

</template>

<script>
import axios from "axios";

export default {
  name: "HereAddressLookup",
  props:{
    address:String,
    nameSearchLabel:{
      type:String,
      default: "Введите значение"
    }
  },
  data() {
    return {

      response: Object,
      searchString: "",
      street: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
      fullAddress:"",
      coordinats:{
        lat:"",
        lng:""
      }
    };
  },
  mounted() {
    this.searchString = this.address
  },
  watch: {
    searchString: function(value) {
      axios.get(`https://geocode.search.hereapi.com/v1/geocode?lang=ru&q=${value}&apiKey=o7Tl02_PXi3g7pUODLjFAoY15tXNJePXq60La-9LK2o`)
          .then(result => {
            this.street = "";
            this.city = "";
            this.state = "";
            this.postalCode = "";
            this.country = "";
            this.fullAddress="";
            this.lat = "";
            this.lng = "";
            var response = result.data.items[0]
            if(result.data.items[0] && result.data.items.length > 0) {

              this.response= result.data;
              if(response.address.street) {
                this.street = response.address.street;
              }
              if(response.address.houseNumber){
                this.street= this.street+" " +response.address.houseNumber}

              this.city = response.address.city ? response.address.city : "";
              this.state = response.address.state ? response.address.state : "";
              this.postcode = response.address.postalCode ? response.address.postalCode : "";
              this.country = response.address.countryName ? response.address.countryName : "";
              this.fullAddress = response.address.label? response.address.label: "";

              this.coordinats.lat = response.position.lat ? response.position.lat: "";
              this.coordinats.lng = response.position.lng ? response.position.lng: "";
              this.$emit('coordinats',this.coordinats);
              this.$emit('data',response);

            } else {
              this.street = "";
              this.city = "";
              this.state = "";
              this.postalCode = "";
              this.country = "";
              this.fullAddress="";
              this.lat = "";
              this.lng = "";
              this.$emit('coordinats',this.coordinats);
              this.$emit('data', response);
            }
          }, error => {
            console.error(error);
          });
    }
  },
  methods: {

  }
}
</script>

<style scoped>
body { margin: 0; }
.information {
  width: 40%;
  margin: 15px 0px;
  position: relative; padding: 10px; background: lightblue; height: 400px;
}
label{
  float: left;
}


</style>