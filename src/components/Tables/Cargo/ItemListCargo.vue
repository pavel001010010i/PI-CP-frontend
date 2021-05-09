<template>
  <div class="card text-left mb-3 boxShadow small">
    <div class="card-header pb-0 pt-1 v-popup__footer" style="background-color: dodgerblue; color: white">
      <div class="row">
        <h5 class="border-white border rounded p-1 mr-3">{{routeModel.countryCodeFrom}}-{{routeModel.countryCodeTo}}</h5>
        <h5 class="p-1">{{cargo.name}}</h5>
      </div>
      <div>
        <button class="btn btn-primary mr-1 btn-sm mb-1" @click="edit_cargo">Изменить</button>
        <button class="btn btn-danger btn-sm mb-1" @click="delete_cargo">Удалить</button>
      </div>

    </div>
    <div class="card-body row">
      <div class="col-md-2 border-right">
        <p class="card-text mb-0"><b>ВxШxД:</b> {{cargo.height}}x{{cargo.width}}x{{cargo.depth}}</p>
        <p class="card-text mb-0"><b>Вес:</b> {{cargo.weight}} кг</p>
        <p class="card-text mb-0"><b>Активный:</b> {{cargo.isStatus}}</p>
        <p class="card-text mb-0"><b>Стоимость:</b> {{cargo.costDelivery===0?"договорная":cargo.costDelivery}} {{cargo.costDelivery===0?"":currencyName}}</p>
        <p class="card-text mb-0"><b>Способ оплаты:</b> {{paymentName}}</p>
      </div>
      <div class=" col-md-2 border-right ">
        <p class="mb-0 font-weight-bold">Тип груза</p>
        <li class="card-text mb-0" style="width: 160px" v-for="cargoType in cargo.typeCargo">{{cargoType.name}}</li>
      </div>
      <div class=" col-md-5 border-right">
        <p class="card-text mb-0"><b>От:</b> {{routeModel.fullAddressFrom}}</p>
        <p class="card-text mb-0"><b>До:</b> {{routeModel.fullAddressTo}}</p>
      </div>
      <div class=" col-md-3">
        <p class="card-text mb-0 font-weight-bold"><b>Дата транспортировки</b></p>
        <p class="card-text mb-0"><b>С:</b> {{dateStart}}</p>
        <p class="card-text mb-0"><b>По</b> {{dateEnd}}</p>
      </div>


    </div>
  </div>
  </template>
<script>
import CargoService from "@/Services/CargoServices/CargoService"
import RouteMapService from "@/Services/RouteMapServices/RouteMapService"
import RouteModel from "@/Models/RouteModel"
import TypeService from "@/Services/TypeServices/TypeService"
import moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022'

export default {
  name: "ItemListCargo",
  props:['cargo'],
  data(){
    return{
      routeModel:RouteModel.data().routeModel,
      currencyName:"",
      paymentName:"",
      dateStart:Date,
      dateEnd:Date,
    }
  },
  components:{
    CargoService,
    TypeService
  },
  updated() {
    this.GetRouteMap();
    this.GetNamePayment();
    this.GetNameCurrency();
  },
  mounted() {
    this.GetNamePayment();
    this.GetNameCurrency();
    this.GetRouteMap();
  },
  methods:{
    GetRouteMap(){
      RouteMapService.methods.GetRouteMap(this.cargo.idRouteMap)
          .then(response=>{
            this.routeModel.countyFrom = response.data.countyFrom;
            this.routeModel.countyTo = response.data.countyTo;
            this.routeModel.cityFrom = response.data.cityFrom;
            this.routeModel.cityTo = response.data.cityTo;
            this.routeModel.latFrom= response.data.latFrom;
            this.routeModel.lngFrom = response.data.lngFrom;
            this.routeModel.latTo= response.data.latTo;
            this.routeModel.lngTo = response.data.lngTo;

            this.routeModel.countryCodeFrom = response.data.countryCodeFrom;
            this.routeModel.countryCodeTo = response.data.countryCodeTo;
            this.routeModel.fullAddressFrom = response.data.fullAddressFrom;
            this.routeModel.fullAddressTo = response.data.fullAddressTo;
            this.routeModel.id = response.data.id;
            this.routeModel.endDate = response.data.endDate;
            this.routeModel.startDate = response.data.startDate;

            moment.locale('ru');
            this.dateStart = moment(response.data.startDate).format('DD-MMMM-YYYY')
            this.dateEnd = moment(response.data.endDate).format('DD-MMMM-YYYY')

          }).catch((error) => {
        console.log(error);
      });
    },
    GetNamePayment(){
      TypeService.methods.getTypePaymentId(this.cargo.idTypePayment)
      .then(response => {
        this.paymentName = response.data.name;
      }).catch((error) => {
        console.log(error);
      });
    },
    GetNameCurrency(){
      TypeService.methods.getTypeCurrencyId(this.cargo.idTypeCurrency)
          .then(response => {
            this.currencyName = response.data.name;
          }).catch((error) => {
        console.log(error);
      });
    },
    GetTypePayments(){
      TypeService.methods.GetTypePayments();
    },
    GetTypeCurrencies(){
      TypeService.methods.GetTypeCurrencies();
    },
    edit_cargo:function () {
      this.$emit('edit-cargo',
          {
            cargo: this.cargo,
            fullAddressFrom: this.routeModel.fullAddressFrom,
            fullAddressTo: this.routeModel.fullAddressTo,
            idRouteMap: this.routeModel.id,
            endDate: this.routeModel.endDate,
            startDate: this.routeModel.startDate
          });

    },
    delete_cargo:function () {
      CargoService.methods.Delete(this.cargo.id);
    }
  }
}
</script>

<style scoped>
.v-popup__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.boxShadow {
  margin: 1em auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, .2);
}
</style>