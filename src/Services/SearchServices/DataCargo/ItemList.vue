<template>
  <div class="card text-left mb-3 boxShadow small">
    <div class="card-header pb-0 pt-1 v-popup__footer" style="background-color: dodgerblue; color: white">
      <div class="row">
        <h5 class="border-white border rounded p-1 mr-3">{{item.routeMap.countryCodeFrom}}-{{item.routeMap.countryCodeTo}}</h5>
        <h5 class="p-1">{{item.name}}</h5>
      </div>

    </div>
    <div class="card-body row">
      <div class="col-md-2 border-right">
        <p class="card-text mb-0"><b>ВxШxД:</b> {{item.height}}x{{item.width}}x{{item.depth}}</p>
        <p class="card-text mb-0"><b>Вес:</b> {{item.weight}} кг</p>
        <p class="card-text mb-0"><b>Стоимость:</b> {{item.costDelivery===0?"договорная":item.costDelivery}} {{item.costDelivery===0?"":item.typeCurrency.name}}</p>
        <p class="card-text mb-0"><b>Способ оплаты:</b> {{item.typePayment.name}}</p>
      </div>
      <div class=" col-md-10">
        <div class="row">
          <div class="col-lg-2 border-right">
            <p class="mb-0 font-weight-bold">Тип груза</p>
            <li class="card-text mb-0" style="width: 160px" v-for="cargoType in item.typeCargo">{{cargoType.name}}</li>
          </div>
          <div class="col-lg-5 border-right">
            <p class="card-text mb-0"><b>От:</b> {{item.routeMap.fullAddressFrom}}</p>
            <p class="card-text mb-0"><b>До:</b> {{item.routeMap.fullAddressTo}}</p>
          </div>
          <div class="col-lg-2 border-right">
            <p class="card-text mb-0 font-weight-bold">Дата перевозки</p>
            <p class="card-text mb-0"><b>С:</b> {{moment(item.routeMap.startDate).format('DD-MMMM-YY')}}</p>
            <p class="card-text mb-0"><b>По</b> {{moment(item.routeMap.endDate).format('DD-MMMM-YY')}}</p>
          </div>
          <div v-if="isHidden" class="col-lg-3">
            <p class="card-text mb-0 font-weight-bold">Контакты</p>
            <p class="card-text mb-0"><b>Email:</b> {{item.appUser.email}}</p>
            <p class="card-text mb-0"><b>Моб. номер</b> {{item.appUser.phoneNumber}}</p>
            <p class="card-text mb-0"><b>Наименование</b> {{item.appUser.nameOrganization}}</p>
          </div>
          <div class=" col-md-3" v-if="!isHidden">
            <p>Что бы увидеть контакты, необходимо зарегистрироватся или войти в систему!</p>
          </div>
        </div>
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
import AccService from "@/Services/AccountServices/AccountService"
import Model from "@/Models/UserModel"

export default {
  name: "ItemListCargo",
  props:['item'],
  data(){
    return{
      routeModel:RouteModel.data().routeModel,
      userModel: Model.data().model,
      currencyName:"",
      paymentName:"",
      dateStart:Date,
      dateEnd:Date,
      moment: moment
    }
  },
  components:{
    CargoService,
    TypeService, AccService,
    Model
  },
  computed:{
    isHidden (){
      return !this.$store.getters.isVisible;
    }
  },
  mounted() {
    moment.locale('ru')
  },
  methods:{
    GetTypePayments(){
      TypeService.methods.GetTypePayments();
    },
    GetTypeCurrencies(){
      TypeService.methods.GetTypeCurrencies();
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