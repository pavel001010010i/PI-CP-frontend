<template>
  <div class="p2-">
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
        <div class="ml-3" style=" background-color: #007bff; width: 10px; border-radius: 10px; border-bottom-right-radius: 0px; border-top-right-radius: 0px"></div>
        <div class="col-lg-2 p-2">
          <p>{{item.name}}</p>
          <p></p>
        </div>
        <div class="col-lg-2 p-2">
          <p>{{item.transport.name}} {{item.transport.model}}</p>
        </div>
        <div class="col-lg-3 p-2">
          <p>{{item.transport.routeMap.fullAddressFrom}} {{str}} {{item.transport.routeMap.fullAddressTo}}</p>
        </div>
        <div class="col-lg-3 p-2">
          <div v-for="orderData in item.orderDats">
            <div v-for="cargo in orderData.cargoes" class="row">
              <p class="col-lg-6 mb-0" >{{cargo.name}}</p>
              <div class="col-lg-6">
                <button class="infoButton" @click="ShowInfo(cargo)"
                        data-toggle="tooltip" data-placement="top" title="Информация">&#128712;</button>
              </div>

            </div>
            <div class="border-bottom" style="width: 50%"></div>
          </div>
        </div>
        <div class="col-lg-1 text-sm-center justify-content-center" style="width: auto; margin: auto -10px;">
          <button class="deleteButton" @click="DeleteItem"
                  data-toggle="tooltip" data-placement="top" title="Отказаться">&#10006;</button>
          <button class="acceptButton" @click="AcceptItem"
                  data-toggle="tooltip" data-placement="top" title="Принять">&#10004;</button>
        </div>
      </div>
    </div>
  </div>
  </template>
<script>

import vPopup from "@/Services/Popup/popup-RO-info"
import moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022'


export default {
  name: "ItemList",
  props:['item'],
  data(){
    return{
      str:"<=>",
      items:[],
      isPopupeVisible:false,
      infoModel:{},
      dateStart:Date,
      dateEnd:Date,

    }
  },
  components:{
    vPopup
  },
  updated() {

  },
  mounted() {
  },
  methods:{
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
    DeleteItem() {
      this.$emit('delete-item',this.item);
    },
    AcceptItem() {
      this.$emit('accept-item',this.item);
    }

  }
}
</script>

<style scoped>

.boxShadow {
  margin: 1em auto;
  box-shadow: 0 2px 15px rgba(0, 0, 0, .2);
}
.v-popup__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  background: none;

}
.deleteButton:hover{
  font-size: 20px;
  border-radius: 30%;
  box-shadow: 0 0px 5px rgba(0, 0, 0, .4);
}

.acceptButton{
  color: green;
  font-size: 20px;
  border-radius: 30%;
  border: none;
  background: none;
}
.acceptButton:hover{
  font-size: 20px;
  border-radius: 30%;
  box-shadow: 0 0px 5px rgba(0, 0, 0, .4);
}
</style>