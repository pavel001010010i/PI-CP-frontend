<template>
  <div class="p2-">

    <v-popup1 v-if="isPopupeVisibleUser"
             @ClosePopup="ClosePopupUser"
             leftBtnTitle="Закрыть"
             :nameTitle=item.transport.name>

      <div class="card text-left mb-3 small boxShadow">
        <div class="card-header pb-0 pt-1 v-popup__footer">
          <div class="row">
            <h5 class="border-white border rounded p-1 mr-3">{{item.transport.routeMap.countryCodeFrom}}-{{item.transport.routeMap.countryCodeTo}}</h5>
            <h5 class="p-1" >{{item.transport.name}} {{item.transport.model}}</h5>
          </div>
        </div>
        <div class="card-body row">
          <div class="col-md-2 border-right">
            <p class="card-text mb-0"><b>ВxШxД:</b> {{item.transport.height}}x{{item.transport.width}}x{{item.transport.depth}}</p>
            <p class="card-text mb-0"><b>Расход топлива:</b> <br/>{{item.transport.fuelConsumption}} л/100км</p>
            <p class="mb-0 "><b>Тип транспорта:</b> {{item.transport.typeTransport.name}}</p>
          </div>
          <div class=" col-md-2 border-right">
            <p class="card-text mb-0"><b>Нагрузка на оси:</b> {{`${item.transport.transportLoadCapacity.name} (${item.transport.transportLoadCapacity.minValue}-${item.transport.transportLoadCapacity.maxValue}) кг`}}</p>
            <p class="card-text mb-0"><b>Грузоподъемность:</b> {{item.transport.maxLoadCapacity}}</p>
          </div>
          <div class=" col-md-3 border-right">
            <p class="card-text mb-0"><b>От:</b> {{item.transport.routeMap.fullAddressFrom}} </p>
            <p class="card-text mb-0"><b>До:</b> {{item.transport.routeMap.fullAddressTo}}</p>
          </div>
          <div class=" col-md-2 border-right">
            <p class="card-text mb-0 font-weight-bold">Дата транспортировки</p>
            <p class="card-text mb-0"><b>С:</b> {{moment(item.transport.routeMap.startDate).format('DD-MMMM-yyyy')}}</p>
            <p class="card-text mb-0"><b>По</b> {{moment(item.transport.routeMap.endDate).format('DD-MMMM-yyyy')}}</p>
          </div>
          <div class=" col-md-3">
            <p class="card-text mb-0 font-weight-bold">Контакты</p>
            <p class="card-text mb-0"><b>Email:</b> {{item.transport.appUser.email}}</p>
            <p class="card-text mb-0"><b>Моб. номер</b> {{item.transport.appUser.phoneNumber}}</p>
            <p class="card-text mb-0"><b>Наименование</b> {{item.transport.appUser.nameOrganization}}</p>
          </div>
        </div>
      </div>
    </v-popup1>

    <v-popup v-if="isPopupeVisible"
             @ClosePopup="ClosePopup"
             leftBtnTitle="Закрыть"
             :nameTitle="infoModel.name"
    >
      <div class="card text-left mb-3 boxShadow small">
        <div class="card-header pb-0 pt-1 v-popup__footer " style="background-color: dodgerblue; color: white">
          <div class="row">
            <h5 class="border-white border rounded p-1 mr-3">{{infoModel.routeMap.countryCodeFrom}}-{{infoModel.routeMap.countryCodeTo}}</h5>
            <h5 class="p-1">{{infoModel.name}}</h5>
          </div>

        </div>
        <div class="card-body row">
          <div class="col-md-2 border-right">
            <p class="card-text mb-0"><b>ВxШxД:</b> {{infoModel.height}}x{{infoModel.width}}x{{infoModel.depth}}</p>
            <p class="card-text mb-0"><b>Вес:</b> {{infoModel.weight}} кг</p>
            <p class="card-text mb-0"><b>Стоимость:</b> {{infoModel.costDelivery===0?"договорная":infoModel.costDelivery}} {{infoModel.costDelivery===0?"":infoModel.typeCurrency.name}}</p>
            <p class="card-text mb-0"><b>Способ оплаты:</b> {{infoModel.typePayment.name}}</p>
          </div>
          <div class=" col-md-2 border-right ">
            <p class="mb-0 font-weight-bold">Тип груза</p>
            <li class="card-text mb-0" style="width: 160px" v-for="cargoType in infoModel.typeCargo">{{cargoType.name}}</li>
          </div>
          <div class=" col-md-4 border-right">
            <p class="card-text mb-0"><b>От:</b> {{infoModel.routeMap.fullAddressFrom}}</p>
            <p class="card-text mb-0"><b>До:</b> {{infoModel.routeMap.fullAddressTo}}</p>
          </div>
          <div class=" col-md-2 border-right">
            <p class="card-text mb-0 font-weight-bold">Дата транспортировки</p>
            <p class="card-text mb-0"><b>С:</b> {{dateStart}}</p>
            <p class="card-text mb-0"><b>По</b> {{dateEnd}}</p>
          </div>
          <div class=" col-md-2">
            <p class="card-text mb-0 font-weight-bold">Контакты</p>
            <p class="card-text mb-0"><b>Email:</b> {{infoModel.appUser.email}}</p>
            <p class="card-text mb-0"><b>Моб. номер</b> {{infoModel.appUser.phoneNumber}}</p>
            <p class="card-text mb-0"><b>Наименование</b> {{infoModel.appUser.nameOrganization}}</p>
          </div>
        </div>
      </div>
    </v-popup>


    <div class="boxShadow small">
      <div class="row text-left">
        <div class="ml-3" :class="{done:item.orderDats[0].status,inProgress: !item.orderDats[0].status}"></div>
        <div class="col-lg-3 p-2">
          <div class="row">
            <div class="col-lg-6">
              <p>{{item.name}}</p>
            </div>
            <div class="col-lg-6">
              <div class="d-flex justify-content-between">
                <div >
                  <p class="m-0 p-0">{{item.transport.name}} {{item.transport.model}}</p>
                </div>
                <div class="col-lg-2">
                  <button class="infoButton" @click="ShowInfoUser"
                          data-toggle="tooltip" data-placement="top" title="Информация владельце транспорта">&#128712;</button>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="col-lg-3 p-2">
          <p>{{item.transport.routeMap.fullAddressFrom}} {{str}} {{item.transport.routeMap.fullAddressTo}}</p>
        </div>
        <div class="col-lg-4 p-2">
          <div v-for="orderData in item.orderDats">
            <div v-for="cargo in orderData.cargoes" class="row">
              <div class="col-lg-4" > <p class="m-0 p-0">{{cargo.name}}</p></div>
              <div class="col-lg-1 m-0 p-0">
                <button class="infoButton" @click="ShowInfo(cargo)"
                        data-toggle="tooltip" data-placement="top" title="Информация о грузе">&#128712;</button>
              </div>
              <div class="col-lg-7">
                <div class="row">
                  <div class="col-lg-4">
                    <p class="m-0 p-0">{{ cargo.costDelivery==0?"Договорная":cargo.costDelivery}}</p>
                  </div>
                  <div class="col-lg-2">
                    <p class="m-0 p-0">{{ cargo.typeCurrency.name}}</p>
                  </div>
                  <div class="col-lg-4">
                    <p class="m-0 p-0">{{ cargo.typePayment.name}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="color: green; font-size: 15px; width: auto; margin: auto 10px;" v-show="!item.orderDats[0].status">
          <button class="deleteButton" @click="DeleteItem"
                  data-toggle="tooltip" data-placement="top" title="Отменить">&#10006;</button>
        </div>
        <div style="color: green; font-size: 15px; width: auto; margin: auto -10px;" v-show="item.orderDats[0].status">
          Ваш заказ выполнен!
        </div>
      </div>
    </div>


  </div>


  </template>
<script>

import vPopup from "@/Services/Popup/popup-RO-info"
import vPopup1 from "@/Services/Popup/popup-RO-info"

import moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022'


export default {
  name: "ItemList",
  props:['item'],
  data(){
    return{
      str:"<=>",
      items:[],
      isPopupeVisible:false,
      isPopupeVisibleUser:false,
      infoModel:{},
      dateStart:Date,
      dateEnd:Date,
      moment:moment

    }
  },
  components:{
    vPopup,
    vPopup1

  },
  updated() {

  },
  mounted() {
    moment.locale('ru')
  },
  methods:{
    ShowInfoUser(){
      this.isPopupeVisibleUser = true;
    },
    ShowInfo(data){
      this.infoModel = data;

      moment.locale('ru');
      this.dateStart = moment(data.routeMap.startDate).format('DD-MMMM-YYYY')
      this.dateEnd = moment(data.routeMap.endDate).format('DD-MMMM-YYYY')

      this.isPopupeVisible = true;
      console.log(data);
    },
    ClosePopup(){
      this.isPopupeVisible=false;
    },
    ClosePopupUser(){
      this.isPopupeVisibleUser=false;
    },
    DeleteItem() {
      this.$emit('delete-item',this.item);
    }

  }
}
</script>

<style scoped>
.done{
  background-color: #40b538; width: 10px;
  border-radius: 10px 0px 0px 10px;
}
.inProgress{
  background-color: #007bff; width: 10px;
  border-radius: 10px 0px 0px 10px;
}

.boxShadow {
  margin: 1em auto;
  box-shadow: 0 2px 15px rgba(0, 0, 0, .2);
}
.v-popup__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: dodgerblue;
  color: white
}
.infoButton{
  color: #007bff;
  font-size: 15px;
  border: none;
  background: none;
}
.infoButton:hover{
  border-radius: 50%;
  box-shadow: 0 0px 5px rgba(0, 0, 0, .4);
}
.deleteButton{
  color: red;
  font-size: 20px;
  border-radius: 30%;
  border: none;
  background: white;

}
.deleteButton:hover{
  font-size: 20px;
  border-radius: 30%;
  box-shadow: 0 0px 5px rgba(0, 0, 0, .4);
}

</style>