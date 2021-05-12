<template>
  <div class="card text-left mb-3 small boxShadow">
    <div class="card-header pb-0 pt-1 v-popup__footer" style="background-color: dodgerblue; color: white">
      <div class="row">
        <h5 class="border-white border rounded p-1 mr-3">{{routeModel.countryCodeFrom}}-{{routeModel.countryCodeTo}}</h5>
        <h5 class="p-1">{{item.name}}</h5>
      </div>
      <div>
        <button class="btn btn-primary mr-1 btn-sm mb-1" @click="edit_item">Изменить</button>
        <button class="btn btn-danger btn-sm mb-1" @click="delete_item">Удалить</button>
      </div>

    </div>
    <div class="card-body row">
      <div class="col-md-2 border-right">
        <p class="card-text mb-0"><b>ВxШxД:</b> {{item.height}}x{{item.width}}x{{item.depth}}</p>
        <p class="card-text mb-0"><b>Активный:</b> {{item.isActive}}</p>
        <p class="card-text mb-0"><b>Расход топлива:</b> <br/>{{item.fuelConsumption}} л/100км</p>
      </div>
      <div class=" col-md-2 border-right">
        <p class="card-text mb-0"><b>Нагрузка на оси:</b> {{transportLoadCapacityName}}</p>
        <p class="card-text mb-0"><b>Грузоподъемность:</b> {{item.maxLoadCapacity}} кг</p>
        <p class="mb-0 "><b>Тип транспорта:</b> {{typeTransportName}}</p>

      </div>
      <div class=" col-md-5 border-right">
        <p class="card-text mb-0"><b>От:</b> {{routeModel.fullAddressFrom}} </p>
        <p class="card-text mb-0"><b>До:</b> {{routeModel.fullAddressTo}}</p>
      </div>
      <div class=" col-md-3">
        <p class="card-text mb-0 font-weight-bold">Дата транспортировки</p>
        <p class="card-text mb-0"><b>С:</b> {{dateStart}}</p>
        <p class="card-text mb-0"><b>По</b> {{dateEnd}}</p>
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

export default {
  name: "ItemList",
  props:['item'],
  data(){
    return{
      routeModel:RouteModel.data().routeModel,
      typeTransportName:"",
      transportLoadCapacityName:"",
      dateStart:Date,
      dateEnd:Date,
    }
  },
  components:{
    TransportService,
    TypeService
  },
  updated() {
    this.GetRouteMap();
    this.GetNameTransport();
    this.GetNameTransportLoadCapacity();
  },
  mounted() {
    this.GetNameTransport();
    this.GetNameTransportLoadCapacity();
    this.GetRouteMap();
  },
  methods:{
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
    edit_item:function () {
      this.$emit('edit-item',
          {
            item: this.item,
            fullAddressFrom: this.routeModel.fullAddressFrom,
            fullAddressTo: this.routeModel.fullAddressTo,
            idRouteMap: this.routeModel.id,
            endDate: this.routeModel.endDate,
            startDate: this.routeModel.startDate
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
}
.boxShadow {
  margin: 1em auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, .2);
}
</style>