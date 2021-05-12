<template>
  <div class="card text-left mb-3 small boxShadow">
    <div class="card-header pb-0 pt-1 v-popup__footer">
      <div class="row">
        <h5 class="border-white border rounded p-1 mr-3">{{routeModel.countryCodeFrom}}-{{routeModel.countryCodeTo}}</h5>
        <h5 class="p-1" >{{item.name}}</h5>
      </div>
      <div>
        <button class="btn btn-primary mr-1 btn-sm mb-1 butn" @click="request_item">Оставить заявку</button>
      </div>

    </div>
    <div class="card-body row">
      <div class="col-md-2 border-right">
        <p class="card-text mb-0"><b>ВxШxД:</b> {{item.height}}x{{item.width}}x{{item.depth}}</p>
        <p class="card-text mb-0"><b>Расход топлива:</b> <br/>{{item.fuelConsumption}} л/100км</p>
        <p class="mb-0 "><b>Тип транспорта:</b> {{typeTransportName}}</p>
      </div>
      <div class=" col-md-2 border-right">
        <p class="card-text mb-0"><b>Нагрузка на оси:</b> {{transportLoadCapacityName}}</p>
        <p class="card-text mb-0"><b>Грузоподъемность:</b> {{item.maxLoadCapacity}}</p>
      </div>
      <div class=" col-md-3 border-right">
        <p class="card-text mb-0"><b>От:</b> {{routeModel.fullAddressFrom}} </p>
        <p class="card-text mb-0"><b>До:</b> {{routeModel.fullAddressTo}}</p>
      </div>
      <div class=" col-md-3 border-right">
        <p class="card-text mb-0 font-weight-bold">Дата транспортировки</p>
        <p class="card-text mb-0"><b>С:</b> {{dateStart}}</p>
        <p class="card-text mb-0"><b>По</b> {{dateEnd}}</p>
      </div>
      <div class=" col-md-2">
        <p class="card-text mb-0 font-weight-bold">Контакты</p>
        <p class="card-text mb-0"><b>Email:</b> {{userModel.email}}</p>
        <p class="card-text mb-0"><b>Моб. номер</b> {{userModel.phoneNumber}}</p>
        <p class="card-text mb-0"><b>Наименование</b> {{userModel.nameOrganization}}</p>
      </div>
    </div>
  </div>
  </template>
<script>
import TransportService from "@/Services/TransportServices/TransportService"
import RouteMapService from "@/Services/RouteMapServices/RouteMapService"
import RouteModel from "@/Models/RouteModel"
import TypeService from "@/Services/TypeServices/TypeService"
import moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022'
import AccService from "@/Services/AccountServices/AccountService"
import Model from "@/Models/UserModel"

export default {
  name: "ItemList",
  props:['item'],
  data(){
    return{
      routeModel:RouteModel.data().routeModel,
      userModel: Model.data().model,
      typeTransportName:"",
      transportLoadCapacityName:"",
      dateStart:Date,
      dateEnd:Date,
    }
  },
  components:{
    TransportService,
    TypeService, AccService,
    Model
  },
  updated() {
    this.GetUserData();
    this.GetRouteMap();
    this.GetNameTransport();
    this.GetNameTransportLoadCapacity();
  },
  mounted() {
    this.GetUserData();
    this.GetNameTransport();
    this.GetNameTransportLoadCapacity();
    this.GetRouteMap();
  },
  methods:{
    GetUserData() {
      AccService.methods.GetUserData(this.item.idUser)
      .then(response=>{
          this.userModel.email = response.data.email;
          this.userModel.phoneNumber = response.data.phoneNumber;
          this.userModel.nameOrganization = response.data.nameOrganization;
      })
      .catch(error=>{
        console.log(error);
      })
    },
    GetRouteMap(){
      RouteMapService.methods.GetRouteMap(this.item.idRouteMap)
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
    GetNameTransport(){
      TypeService.methods.getTypeTransportId(this.item.idTypeTransport)
      .then(response => {
        this.typeTransportName = response.data.name;
      }).catch((error) => {
        console.log(error);
      });
    },
    GetNameTransportLoadCapacity(){
      TypeService.methods.GetTransportLoadCapacityId(this.item.idTransLoadCapacity)
          .then(response => {
            this.transportLoadCapacityName =  `${response.data.name} (${response.data.minValue}-${response.data.maxValue}) кг`;
          }).catch((error) => {
        console.log(error);
      });
    },
    request_item:function () {
      this.$emit('request-item',
          {
            item: this.item,
            routeModel: this.routeModel,
            transportLoadCapacityName: this.transportLoadCapacityName,
            typeTransportName: this.typeTransportName,
            dateStart : moment(this.routeModel.startDate).format('DD-MMMM-YYYY'),
            dateEnd : moment(this.routeModel.endDate).format('DD-MMMM-YYYY')
          });

    },
    delete_item:function () {
      TransportService.methods.Delete(this.item.id);
    }
  }
}
</script>

<style scoped>
.v-popup__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: dodgerblue;
  color: white
}
.boxShadow {
  margin: 1em auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, .2);
}
.butn{
  background-color: white;
  color: dodgerblue;
  border: 1px solid dodgerblue;
  border-radius: 5px;
}
.butn:hover{
  background-color: dodgerblue;
  color: white;
  border: 1px solid white;
}
</style>