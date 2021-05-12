<template>
  <div>
    <div style="display: flex;justify-content: space-between;align-items: center;">
      <h1 class="text-center">Мой транспорт</h1>
      <button class="btn btn-outline-info" @click="ShowCargoPopup">Добавить транспорт</button>
    </div>
    <v-popup v-if="isPopupeVisible"
             @ClosePopup="ClosePopup"
             @AddPopup="AddPopup"
             @UpdatePopup="UpdatePopup"
             :is-state="isState"
             right-btn-title-add="Добавить"
             right-btn-title-update="Обновить"
             leftBtnTitle="Отмена"
             nameTitle="Транспорт">

      <div class="form-row">
        <div class="col-md-auto mb-3">
          <label for="validationTooltip01">Название</label>
          <input type="text" class="form-control" id="validationTooltip01" placeholder="Имя" required v-model="transportModel.name">
          <div class="valid-tooltip">
            Looks good!
          </div>
        </div>
        <div class="col-md-auto mb-3">
          <label for="validationTooltip02">Модель</label>
          <input type="text" class="form-control" id="validationTooltip02" placeholder="Модель" required v-model="transportModel.model">
          <div class="valid-tooltip">
            Looks good!
          </div>
        </div>
        <div class="col-md-1 mb-3">
          <label for="validationTooltip01">Высота</label>
          <input type="number" class="form-control"  placeholder="Высота" required v-model="transportModel.height">
          <div class="valid-tooltip">
            Looks good!
          </div>
        </div>
        <div class="col-md-1 mb-3">
          <label for="validationTooltip01">Ширина</label>
          <input type="number" class="form-control"  placeholder="Ширина" required v-model="transportModel.width">
          <div class="valid-tooltip">
            Looks good!
          </div>
        </div>
        <div class="col-md-1 mb-3">
          <label>Глубина</label>
          <input type="number" class="form-control"  placeholder="Грубина" required v-model="transportModel.depth">
          <div class="valid-tooltip">
            Looks good!
          </div>
        </div>
        <div class="col-md-auto mb-3">
          <label>Расход топлива, л/100км</label>
          <input type="number" class="form-control"  placeholder="Расход топлива" required v-model="transportModel.fuelConsumption">
          <div class="valid-tooltip">
            Looks good!
          </div>
        </div>
        <div class="col-md-auto mb-3">
          <label for="validationTooltip03">Активный</label>
          <input type="checkbox" class="form-control" id="validationTooltip03" placeholder="Активный" required v-model="transportModel.isActive">
          <div class="valid-tooltip">
            Looks good!
          </div>
        </div>
        <div class="col-md-auto mb-3">
          <label>Нагрузка на оси</label>
          <Multiselect
              v-model="transportModel.idTransLoadCapacity"
              :options="TransportLoadCapacityOptions"
              label="name"
              trackBy="name"
              :searchable="true"
          />
        </div>
        <div class="col-md-auto mb-3">
          <label>Макс. грузоподъемность, кг</label>
          <input type="number" class="form-control"  placeholder="грузоподъемность" required v-model="transportModel.maxLoadCapacity">
          <div class="valid-tooltip">
            Looks good!
          </div>
        </div>
        <div class="col-md-auto mb-3">
          <label>Тип Кузова</label>
            <Multiselect
              v-model="transportModel.idTypeTransport"
              :options="TypeTransportOptions"
              label="name"
              trackBy="name"
              :searchable="true"
            />
        </div>
        <div class="col-md-auto mb-3">
          <label>С</label>
            <datepicker class="form-control"
                :locale="ru"
                v-model="selectedDateStart"
                :lowerLimit = "new Date()"
          />
        </div>
        <div class="col-md-auto mb-3">
          <label>По</label>
            <datepicker class="form-control"
                :locale="ru"
                v-model="selectedDateEnd"
                :lowerLimit = "new Date()"
              />
        </div>

      </div>
      <div class="form-row">
        <div class="col-md-6">
          <HereAddressLookup
              @data="GetFromAddress"
              :address="routeModel.fullAddressFrom"
              name-Search-Label ="Страна/регион/область/адресс отправления"
          />
        </div>
        <div class="col-md-6">
          <HereAddressLookup
              @data="GetToAddress"
              :address="routeModel.fullAddressTo"
              name-Search-Label ="Страна/регион/область/адресс конечной точки"
          />
        </div>
      </div>
    </v-popup>

    <List :items ="transports"  @edit-item="GetEditItem" />
    <p class="text-info text-success" v-show="isSucceful">{{message}}</p>
    <p class="text-info text-danger" v-show="!isSucceful">{{ message }}</p>
  </div>
</template>

<script>
import List from "@/components/Tables/Transport/List";
import vPopup from "@/Services/Popup/modal-popup"
import Multiselect from '@vueform/multiselect'
import TypeService from "@/Services/TypeServices/TypeService"
import TransportService from "@/Services/TransportServices/TransportService"
import MainVariables from "@/Services/MainVariables";
import TransportModel from "@/Models/TransportModel"
import Constants from "@/Services/Constants"
import Datepicker from 'vue3-datepicker'
import HereAddressLookup from "@/Services/HereAPi/HereAddressLookup";
import RouteModel from "@/Models/RouteModel"

import TypeTransportModel from "@/Models/TypeTransportModel"
import { ru } from 'date-fns/locale'


export default {
name: "TransportIndex",
  data() {
    return {
      ru:ru,
      isPopupeVisible:false,
      getCargo: {},
      isDisableEmailField:false,
      transports: [],
      isVisible: false,
      token:'',

      message:'',
      role:'',
      options: [],
      isState:true,
      transportModel:TransportModel.data().transportModel,
      typeTransportModel: TypeTransportModel.data().typeTransportModel,
      routeModel:RouteModel.data().routeModel,
      TransportLoadCapacityOptions:[],
      TypeTransportOptions:[],


      idTypeCargoes: [],
      AllTypeCargo:[],
      selectTypeCargo:[],
      selectedDateStart: new Date(Date.toLocaleString('en-US', { timeZone: "Europe/Minsk" })),
      selectedDateEnd: new Date(Date.toLocaleString('en-US', { timeZone: "Europe/Minsk" })),
    }
  },
  components:{
    vPopup,
    List,
    Multiselect,
    TypeService,
    TransportService,
    TransportModel,
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
    }
  },
  mounted() {
    this.GetTransports();
    this.GetTypeTransports();
    this.GetTransportLoadCapacities();
    this.token = localStorage.getItem('user_token');
    this.role =localStorage.getItem('user_role');
  },
  computed:{
    transports(){
      console.log("from compudet transport");
      return this.$store.getters.GetTransports;
    },
    TransportLoadCapacityOptions(){
      return this.$store.getters.GetTransportLoadCapacities
    },
    TypeTransportOptions(){
      return this.$store.getters.GetTypeTransports
    }
  },
  methods:{
    GetTypeTransports(){
      this.TypeTransportOptions=[];
      TypeService.methods.GetTypeTransports();
    },
    GetTransportLoadCapacities(){
      this.TransportLoadCapacityOptions=[];
      TypeService.methods.GetTransportLoadCapacities();
    },
    UpdatePopup(){
      this.transportModel.idUser=MainVariables.data().userId;
      this.routeModel.transport = this.transportModel;
      this.routeModel.endDate = new Date(this.selectedDateEnd.toLocaleString('en-US', { timeZone: "Europe/Minsk" }));
      this.routeModel.startDate = new Date(this.selectedDateStart.toLocaleString('en-US', { timeZone: "Europe/Minsk" }));

      TransportService.methods.Update(this.routeModel);
      this.GetTransports();
      this.ClosePopup();
    },
    GetEditItem(data){

      this.isState = false;
      this.isPopupeVisible=true;
      this.idTypeCargoes=[];

      this.transportModel ={
        id:data.item.id,
        name:data.item.name,
        model: data.item.model,
        height:data.item.height,
        width:data.item.width,
        depth:data.item.depth,
        numberAxes: data.item.numberAxes,
        idTransLoadCapacity:data.item.idTransLoadCapacity,
        idTypeTransport:data.item.idTypeTransport,
        maxLoadCapacity:data.item.maxLoadCapacity,
        fuelConsumption: data.item.fuelConsumption,
        isActive:data.item.isActive
      }

      this.selectedDateStart = new Date(data.startDate)
      this.selectedDateEnd = new Date(data.endDate)
      console.log(data.endDate);

      this.routeModel.startDate = data.startDate;
      this.routeModel.endDate = data.endDate;
      this.routeModel.id = data.idRouteMap
      this.routeModel.fullAddressFrom = data.fullAddressFrom
      this.routeModel.fullAddressTo = data.fullAddressTo
    },
    GetTransports(){
      TransportService.methods.Get();
    },
    ShowCargoPopup(){
      this.isState = true;
      this.isPopupeVisible=true;
    },
    AddPopup(){
      this.transportModel.idUser=MainVariables.data().userId;
      this.routeModel.transport = this.transportModel;
      this.routeModel.endDate = this.selectedDateEnd.toLocaleString('en-US', { timeZone: "Europe/Minsk" });
      this.routeModel.startDate = this.selectedDateStart.toLocaleString('en-US', { timeZone: "Europe/Minsk" });

      TransportService.methods.Add(this.routeModel);
      this.GetTransports();
      this.ClosePopup();
    },
    ClosePopup(){
      this.transportModel ={};
      this.routeModel ={};
      this.isPopupeVisible=false;
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