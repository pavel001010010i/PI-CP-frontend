<template>
  <div>
    <div style="display: flex;justify-content: space-between;align-items: center;">
      <h1 class="text-center">Мои грузы</h1>
      <button class="btn btn-outline-info" @click="ShowCargoPopup">Добавить груз</button>
    </div>
    <v-popup v-if="isPopupeVisible"
             @ClosePopup="ClosePopup"
             @AddPopup="AddPopup"
             @UpdatePopup="UpdatePopup"
             :is-state="isState"
             right-btn-title-add="Добавить"
             right-btn-title-update="Обновить"
             leftBtnTitle="Отмена"
             nameTitle="Грузы">

      <div class="form-row">
        <div class="col-lg-2 mb-3">
          <label for="validationTooltip01">Название</label>
          <input type="text" class="form-control" id="validationTooltip01" placeholder="Название" required v-model="cargoModel.name">
          <div class="valid-tooltip">
            Looks good!
          </div>
        </div>
        <div class="col-lg-2 mb-3">
          <label for="validationTooltip01">Высота</label>
          <input type="number" class="form-control"  placeholder="Высота" required v-model="cargoModel.height">
          <div class="valid-tooltip">
            Looks good!
          </div>
        </div>
        <div class="col-lg-2 mb-3">
          <label for="validationTooltip01">Ширина</label>
          <input type="number" class="form-control"  placeholder="Широта" required v-model="cargoModel.width">
          <div class="valid-tooltip">
            Looks good!
          </div>
        </div>
        <div class="col-lg-2 mb-3">
          <label>Глубина</label>
          <input type="number" class="form-control"  placeholder="Глубина" required v-model="cargoModel.depth">
          <div class="valid-tooltip">
            Looks good!
          </div>
        </div>
        <div class="col-lg-2 mb-3">
          <label>Вес</label>
          <input type="number" class="form-control"  placeholder="Вес" required v-model="cargoModel.weight">
          <div class="valid-tooltip">
            Looks good!
          </div>
        </div>
        <div class="col-md-1 mb-3">
          <label for="validationTooltip03">Активный</label>
          <input type="checkbox" class="form-control" id="validationTooltip03" required v-model="cargoModel.isStatus">
          <div class="valid-tooltip">
            Looks good!
          </div>
        </div>
        <div class="col-lg-12 mb-3">
          <label>Тип груза</label>
            <Multiselect
              v-model="idTypeCargoes"
              mode="tags"
              :options="options"
              label="name"
              trackBy="name"
              :searchable="true"
            />
        </div>
        <div class="col-lg-2">
          <label>Стоимость</label>

          <input type="number" class="form-control" :disabled="isNegotiatedPrice" placeholder="Стоимость доставки" required v-model="cargoModel.costDelivery">
          <div class="text-left">
            <input type="checkbox" class="text-left ml-3"  placeholder="is active" v-model="isNegotiatedPrice">
            <label class="small font-weight-light ml-2">договорная</label>
          </div>
          <div class="valid-tooltip">
            Looks good!
          </div>
        </div>
        <div class="col-lg-2 mb-3">
          <label>Тип оплаты</label>
          <Multiselect
              v-model="cargoModel.idTypePayment"
              placeholder="Оплата"
              :options="TypePaymentOptions"
              label="name"
              trackBy="name"
              :searchable="true"
          />
        </div>
        <div class="col-lg-2 mb-3">
          <label>Валюта</label>
          <Multiselect
              v-model="cargoModel.idTypeCurrency"
              placeholder="валюта"
              :options="TypeCurrencyOptions"
              label="name"
              trackBy="name"
              :searchable="true"
          />
        </div>
        <div class="col-lg-3 mb-3">
          <label>С</label>
            <datepicker class="form-control"
              :locale="ru"
              v-model="selectedDateStart"
              :lowerLimit = "new Date()"
          />
        </div>
        <div class="col-lg-2 mb-3">
          <label>По</label>
            <datepicker class="form-control"
                :locale="ru"
                v-model="selectedDateEnd"
                :lowerLimit = "new Date()"
              />
        </div>
        <div class="col-lg-6">
          <HereAddressLookup
              @data="GetFromAddress"
              nameSearchLabel="Введите адрес/страну/город/область отпрвления"
              :address="routeModel.fullAddressFrom"/>
        </div>
        <div class="col-lg-6">
          <HereAddressLookup
              @data="GetToAddress"
              nameSearchLabel="Введите адрес/страну/город/область конечной точки"
              :address="routeModel.fullAddressTo"/>
        </div>
      </div>
    </v-popup>

    <CargoList :cargoes ="cargoes" @edit-cargo="GetEditCargoItem" />
    <p class="text-info text-success" v-show="isSucceful">{{message}}</p>
    <p class="text-info text-danger" v-show="!isSucceful">{{ message }}</p>
  </div>
</template>

<script>

import CargoList from "@/components/Tables/Cargo/CargoList";
import vPopup from "@/Services/Popup/modal-popup"
import Multiselect from '@vueform/multiselect'
import TypeService from "@/Services/TypeServices/TypeService"
import CargoService from "@/Services/CargoServices/CargoService"
import MainVariables from "@/Services/MainVariables";
import CargoModel from "@/Models/CargoModel"
import Constants from "@/Services/Constants"
import Datepicker from 'vue3-datepicker'
import HereAddressLookup from "@/Services/HereAPi/HereAddressLookup";
import RouteModel from "@/Models/RouteModel"
import { ru } from 'date-fns/locale'

export default {
name: "CustomerIndex",
  data() {
    return {
      ru:ru,
      isPopupeVisible:false,
      getCargo: {},
      isDisableEmailField:false,
      cargoes: [],
      isVisible: false,
      token:'',
      isNegotiatedPrice:false,

      message:'',
      role:'',
      options: [],
      isState:true,
      cargoModel:CargoModel.data().cargoModel,
      routeModel:RouteModel.data().routeModel,

      TypePaymentOptions:[],
      TypeCurrencyOptions:[],

      idTypeCargoes: [],
      AllTypeCargo:[],
      selectTypeCargo:[],
      selectedDateStart: new Date(Date.toLocaleString('en-US', { timeZone: "Europe/Minsk" })),
      selectedDateEnd: new Date(Date.toLocaleString('en-US', { timeZone: "Europe/Minsk" })),
    }
  },
  components:{
    vPopup,
    CargoList,
    Multiselect,
    TypeCargoService: TypeService,
    CargoService,
    CargoModel,
    Constants,
    Datepicker,
    HereAddressLookup
  },
  watch:{
    selectedDateStart(data){
      this.routeModel.startDate = data;
    },
    selectedDateEnd(data){
      this.routeModel.endDate = data;
    },
    isNegotiatedPrice(data){

    }
  },
  mounted() {
    this.GetCargoes();
    this.GetTypeCargo();
    this.GetTypePayments();
    this.GetTypeCurrencies();
    this.token = localStorage.getItem('user_token');
    this.role =localStorage.getItem('user_role');
  },
  computed:{
    cargoes(){
      return this.$store.getters.GetCargoes;
    },
    TypeCurrencyOptions(){
      return this.$store.getters.GetTypeCurrencies
    },
    TypePaymentOptions(){
      return this.$store.getters.GetTypePayments
    }

  },
  methods:{
    GetTypePayments(){
      this.TypePaymentOptions=[];
      TypeService.methods.GetTypePayments();
    },
    GetTypeCurrencies(){
      this.TypeCurrencyOptions=[];
      TypeService.methods.GetTypeCurrencies();
    },
    UpdatePopup(){
      this.selectTypeCargo=[]
      this.idTypeCargoes.forEach(item=>{
        this.AllTypeCargo.forEach(x=>{
          if(item===x.id){
            this.selectTypeCargo.push(x);
          }
        });
      })
      if(this.isNegotiatedPrice){
        this.cargoModel.costDelivery = 0;
      }
      this.cargoModel.idUser=MainVariables.data().userId;
      this.cargoModel.typeCargo=this.selectTypeCargo;
      this.routeModel.cargo = this.cargoModel;
      this.routeModel.endDate = this.selectedDateEnd.toLocaleString('en-US', { timeZone: "Europe/Minsk" });
      this.routeModel.startDate = this.selectedDateStart.toLocaleString('en-US', { timeZone: "Europe/Minsk" })

      CargoService.methods.UpdateCargo(this.routeModel);
      this.GetCargoes();
      this.ClosePopup();
    },
    GetEditCargoItem(data){

      this.isState = false;
      this.isPopupeVisible=true;
      this.idTypeCargoes=[];

      this.cargoModel ={
        id:data.cargo.id,
        name:data.cargo.name,
        height:data.cargo.height,
        width:data.cargo.width,
        depth:data.cargo.depth,
        weight:data.cargo.weight,
        costDelivery: data.cargo.costDelivery===0 ? null : data.cargo.costDelivery,
        idTypeCurrency: data.cargo.idTypeCurrency,
        idTypePayment: data.cargo.idTypePayment,
        isStatus:data.cargo.isStatus
      }
      if(data.cargo.costDelivery === 0){
        this.isNegotiatedPrice = true;
      }
      data.cargo.typeCargo.forEach(item=>{
        this.idTypeCargoes.push(item.id);
      });

      this.selectedDateStart = new Date(data.startDate)
      this.selectedDateEnd = new Date(data.endDate)
      console.log(data.endDate);

      this.routeModel.startDate = data.startDate;
      this.routeModel.endDate = data.endDate;
      this.routeModel.id = data.idRouteMap
      this.routeModel.fullAddressFrom = data.fullAddressFrom
      this.routeModel.fullAddressTo = data.fullAddressTo
    },
    GetCargoes(){
      CargoService.methods.GetCargoes();
    },
    GetTypeCargo(){
      this.AllTypeCargo=[];
      this.options =[];
      TypeService.methods.GetTypeCargo()
          .then(response => {
            response.data.forEach(item=>{
              this.AllTypeCargo.push(item);
              this.options.push(
                  {
                    value:item.id,
                    name:item.name
                  });
            });
          })
          .catch((error) => {
            console.log(error);
          });
    },
    ShowCargoPopup(){
      this.isState = true;
      this.isPopupeVisible=true;
    },
    AddPopup(){
      this.selectTypeCargo=[]
      this.idTypeCargoes.forEach(item=>{
        this.AllTypeCargo.forEach(x=>{
          if(item===x.id){
            this.selectTypeCargo.push(x);
          }
        });
      });

      if(this.isNegotiatedPrice){
        this.cargoModel.costDelivery = 0;
      }
      this.cargoModel.idUser=MainVariables.data().userId;
      this.cargoModel.typeCargo=this.selectTypeCargo;
      this.routeModel.cargo = this.cargoModel;
      this.routeModel.endDate = this.selectedDateEnd.toLocaleString('en-US', { timeZone: "Europe/Minsk" });
      this.routeModel.startDate = this.selectedDateStart.toLocaleString('en-US', { timeZone: "Europe/Minsk" });

      CargoService.methods.AddCargo(this.routeModel);
      this.GetCargoes();
      this.ClosePopup();
    },
    ClosePopup(){
      this.cargoModel ={};
      this.routeModel ={};
      this.isPopupeVisible=false;
      this.idTypeCargoes = [];
      this.selectedDateStart = ""
      this.selectedDateEnd = ""
    },
    GetFromAddress(a){
      var street="";
      this.routeModel.countryCodeFrom = a.address.countryCode;
      this.routeModel.latFrom = a.position.lat;
      this.routeModel.lngFrom = a.position.lng;
      this.routeModel.countyFrom = a.address.countryName;
      this.routeModel.cityFrom = a.address.city;
      this.routeModel.stateFrom = a.address.state;
      if(a.address.street) {
        street = a.address.street;
      }
      if(a.address.houseNumber){
        street= street+" " +a.address.houseNumber}
      this.routeModel.streetFrom = street;
      this.routeModel.postCodeFrom = a.address.postalCode;
      this.routeModel.fullAddressFrom = a.address.label? a.address.label: "";

    },
    GetToAddress(a){
      var street="";
      this.routeModel.countryCodeTo = a.address.countryCode;
      this.routeModel.latTo = a.position.lat;
      this.routeModel.lngTo = a.position.lng;
      this.routeModel.countyTo = a.address.countryName;
      this.routeModel.cityTo = a.address.city;
      this.routeModel.stateTo = a.address.state;
      if(a.address.street) {
        street = a.address.street;
      }
      if(a.address.houseNumber){
        street= street+" " +a.address.houseNumber}
      this.routeModel.streetTo = street;
      this.routeModel.postCodeTo = a.address.postalCode;
      this.routeModel.fullAddressTo = a.address.label? a.address.label: "";
    }
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css">
.betweenc-cv {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>