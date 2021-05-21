<template>
  <div class="card text-left mb-3 small boxShadow">
    <div class="card-header pb-0 pt-1 v-popup__footer">
      <div class="row">
        <h5 class="border-white border rounded p-1 mr-3">{{item.routeMap.countryCodeFrom}}-{{item.routeMap.countryCodeTo}}</h5>
        <h5 class="p-1" >{{item.name}}</h5>
      </div>
      <div v-if="isHidden">
        <button class="btn btn-primary mr-1 btn-sm mb-1 butn" @click="request_item">Оставить заявку</button>
      </div>
    </div>
    <div class="card-body row">
      <div class="col-md-2 border-right">
        <p class="card-text mb-0"><b>ВxШxД:</b> {{item.height}}x{{item.width}}x{{item.depth}}</p>
        <p class="card-text mb-0"><b>Расход топлива:</b> <br/>{{item.fuelConsumption}} л/100км</p>
        <p class="mb-0 "><b>Тип транспорта:</b> {{item.typeTransport.name}}</p>
      </div>
      <div class=" col-md-2 border-right">
        <p class="card-text mb-0"><b>Нагрузка на оси:</b> {{ `${item.transportLoadCapacity.name} (${item.transportLoadCapacity.minValue}-${item.transportLoadCapacity.maxValue}) кг`}}</p>
        <p class="card-text mb-0"><b>Грузоподъемность:</b> {{item.maxLoadCapacity}} кг</p>
      </div>
      <div class=" col-md-3 border-right">
        <p class="card-text mb-0"><b>От:</b> {{item.routeMap.fullAddressFrom}} </p>
        <p class="card-text mb-0"><b>До:</b> {{item.routeMap.fullAddressTo}}</p>
      </div>
      <div class=" col-md-2 border-right">
        <p class="card-text mb-0 font-weight-bold">Дата транспортировки</p>
        <p class="card-text mb-0"><b>С:</b> {{moment(item.routeMap.startDate).format('DD-MMMM-YYYY')}}</p>
        <p class="card-text mb-0"><b>По</b> {{moment(item.routeMap.endDate).format('DD-MMMM-YYYY')}}</p>
      </div>
      <div class=" col-md-3" v-if="isHidden">
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
  </template>
<script>

import moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022'

export default {
  name: "ItemList",
  props:['item'],
  data(){
    return{
      moment:moment

    }
  },
  computed:{
    isHidden (){
      return !this.$store.getters.isVisible;
    }
  },

  methods:{
    request_item:function () {
      this.$emit('request-item',this.item);
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