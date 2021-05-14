<template>
  <div v-if="isHidden">
    <h3 class="text-left mb-3">Настройка видимости значений.</h3>
    <div class="form-row pb-3">
      <div class="col-lg-3">
        <div class="text-left justify-content-between d-flex" >
          <h4 >Тип груза</h4>
          <button  class="btn btn-outline-primary" @click="HiddenFormCargo">
            <img :src="require(`@/assets/${srcButCargo}`)" />
          </button>
        </div>
        <TypeCargoTable v-show="isHiddenFormCargo" :items="typeCargo"></TypeCargoTable>
      </div>
      <div class="col-lg-3">
        <div class="text-left justify-content-between d-flex" >
          <h4 >Тип транспорта</h4>
          <button  class="btn btn-outline-primary" @click="HiddenFormTrans">
            <img :src="require(`@/assets/${srcButTrans}`)" />
          </button>
        </div>
        <TypeTransportTable v-show="isHiddenFormTrans" :items="typeTransport"></TypeTransportTable>
      </div>
      <div class="col-lg-3">
        <div class="text-left justify-content-between d-flex">
          <h4 >Тип валюты</h4>
          <button  class="btn btn-outline-primary" @click="HiddenFormCurrency">
            <img :src="require(`@/assets/${srcButCurrency}`)" />
          </button>
        </div>
        <TypeCurrencyTable v-show="isHiddenFormCurrency" :items="typeCurrency"></TypeCurrencyTable>
      </div>
      <div class="col-lg-3">
        <div class="text-left justify-content-between d-flex">
          <h4 >Тип оплаты</h4>
          <button  class="btn btn-outline-primary" @click="HiddenFormPayment">
            <img :src="require(`@/assets/${srcButPayment}`)" />
          </button>
        </div>
        <TypePaymentTable v-show="isHiddenFormPayment" :items="typePayment"></TypePaymentTable>
      </div>
    </div>
  </div>


</template>

<script>
import TypeCargoTable from "@/Services/AppManageServices/Components/CargoType/List"
import TypeTransportTable from "@/Services/AppManageServices/Components/TransportType/List"
import TypeCurrencyTable from "@/Services/AppManageServices/Components/CurrencyType/List"
import TypePaymentTable from "@/Services/AppManageServices/Components/PaymentType/List"
import TypeService from "@/Services/TypeServices/TypeService"
import store from "@/store.index"
export default {
name: "AppManageService",
  store:store,
  components:{
    TypeTransportTable,
    TypeCargoTable,
    TypeCurrencyTable,
    TypePaymentTable,
    TypeService
  },
  data(){
    return{
      isHiddenFormTrans:false,
      isHiddenFormCargo:false,
      isHiddenFormPayment:false,
      isHiddenFormCurrency:false,
      srcButTrans:this.isHiddenFormTrans?"arrowUp.png":"arrowDown.png",
      srcButCargo:this.isHiddenFormCargo?"arrowUp.png":"arrowDown.png",
      srcButPayment:this.isHiddenFormPayment?"arrowUp.png":"arrowDown.png",
      srcButCurrency:this.isHiddenFormCurrency?"arrowUp.png":"arrowDown.png",

      typeCargo:[],
      typeTransport:[],
      typeCurrency:[],
      typePayment:[]
    }
  },
  mounted() {
    store.dispatch('IsAdmin')
    this.GetTypeCargo();
    TypeService.methods.GetTypeTransportsAll();
    TypeService.methods.GetTypeCurrenciesAll();
    TypeService.methods.GetTypePaymentsAll();
  },
  methods:{
    GetTypeCargo(){
      console.log(this.isHidden);
      TypeService.methods.GetTypeCargoesAllA();
    },
    HiddenFormTrans(){
      if(!this.isHiddenFormTrans){
        this.srcButTrans = "arrowUp.png"
        this.isHiddenFormTrans=!this.isHiddenFormTrans;
      }
      else {
        this.srcButTrans = "arrowDown.png"
        this.isHiddenFormTrans=!this.isHiddenFormTrans;
      }
    },
    HiddenFormCargo(){
      if(!this.isHiddenFormCargo){
        this.srcButCargo = "arrowUp.png"
        this.isHiddenFormCargo=!this.isHiddenFormCargo;
      }
      else {
        this.srcButCargo = "arrowDown.png"
        this.isHiddenFormCargo=!this.isHiddenFormCargo;
      }
    },
    HiddenFormPayment(){
      if(!this.isHiddenFormPayment){
        this.srcButPayment = "arrowUp.png"
        this.isHiddenFormPayment=!this.isHiddenFormPayment;
      }
      else {
        this.srcButPayment = "arrowDown.png"
        this.isHiddenFormPayment=!this.isHiddenFormPayment;
      }
    },
    HiddenFormCurrency(){
      if(!this.isHiddenFormCurrency){
        this.srcButCurrency = "arrowUp.png"
        this.isHiddenFormCurrency=!this.isHiddenFormCurrency;
      }
      else {
        this.srcButCurrency = "arrowDown.png"
        this.isHiddenFormCurrency=!this.isHiddenFormCurrency;
      }
    }
  },
  computed:{
    isHidden (){
      return store.getters.getIsAdmin;
    },
    typePayment(){
      return store.getters.GetTypePaymentsAdmin;
    },
    typeCurrency(){
      return store.getters.GetTypeCurrencyAdmin;
    },
    typeCargo(){
      return store.getters.GetTypeCargo;
    },
    typeTransport(){
      return store.getters.GetTypeTransportsAdmin;
    }
  }
}
</script>

<style scoped>

</style>