<template>
  <div class="">
    <div style="display: flex;justify-content: space-between;align-items: center;">
      <h1 class="text-center">Введите данные</h1>
      <button class="btn btn-outline-info" @click="Search">Найти</button>
    </div>
    <div class="row">
      <div class="col-md-1">
        <label>ОТ</label>
        <div>
          <label>Высота</label>
          <input type="number" class="form-control"   required v-model="searchModel.heightOf">
        </div>
        <div >
          <label>Ширина</label>
          <input type="number" class="form-control"   required v-model="searchModel.widthOf">
        </div>
        <div>
          <label>Глубина</label>
          <input type="number" class="form-control"   required v-model="searchModel.depthOf">
        </div>
      </div>
      <div class="col-md-1">
        <label>ДО</label>
        <div>
          <label>Высота</label>
          <input type="number" class="form-control"  required v-model="searchModel.heightTo">
        </div>
        <div >
          <label>Ширина</label>
          <input type="number" class="form-control"  required v-model="searchModel.widthTo">
        </div>
        <div>
          <label>Глубина</label>
          <input type="number" class="form-control"  required v-model="searchModel.depthTo">
        </div>

      </div>
      <div class="col-md-4">
        <div class="row">
          <div class="col-md-4">
            <label>Город:</label>
          </div>
          <div class="col-md-3">
            <input type="text" v-model="city" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <label>Штат/Область:</label>
          </div>
          <div class="col-md-3">
            <input type="text" v-model="state" disabled />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <label>Индекс:</label>
          </div>
          <div class="col-md-3">
            <input type="text" v-model="postcode" disabled />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <label>Страна:</label>
          </div>
          <div class="col-md-3">
            <input type="text" v-model="country" disabled />
          </div>
        </div>
      </div>


      <div class="col-md-3 mb-3">
        <label>Тип Кузова</label>
        <Multiselect
            v-model="idTypeTransport"
            :options="TypeTransportOptions"
            label="name"
            trackBy="name"
            :searchable="true"
        />
      </div>
      <div class="col-2 mb-3">
        <label>С</label>
        <datepicker
            v-model="selectedDateStart"
            :lowerLimit = "new Date()"
        />
      </div>
      <div class="col-1 mb-3">
        <label>По</label>
        <datepicker
            v-model="selectedDateEnd"
            :lowerLimit = "new Date()"
        />
      </div>
    </div>

    <List :items ="transports"  @edit-item="GetEditItem" />
    <p class="text-info text-success" v-show="isSucceful">{{message}}</p>
    <p class="text-info text-danger" v-show="!isSucceful">{{ message }}</p>
  </div>
</template>

<script>
import TypeService from "@/Services/TypeServices/TypeService"
import store from "@/store.index"
import Datepicker from 'vue3-datepicker'
import Multiselect from '@vueform/multiselect'
import SearchModel from "@/Models/SearchModel"
export default {
name: "SearchTransport",
  store: store,
  components:{
    TypeService,
    Multiselect,
    Datepicker,
    SearchModel
  },
  data(){
    return{
      searchModel: SearchModel.data().model,
      idTypeTransport:0,

      TypeTransportOptions:[],
      selectedDateStart: new Date().toLocaleString('en-US', { timeZone: "Europe/Minsk" }),
      selectedDateEnd: new Date().toLocaleString('en-US', { timeZone: "Europe/Minsk" }),
    }
  },
  mounted() {
    // this.GetTransports();
    this.GetTypeTransports();
    this.GetTransportLoadCapacities();
  },
  methods:{
    Search(){

    },
    GetTypeTransports(){
      this.TypeTransportOptions=[];
      TypeService.methods.GetTypeTransports();
    },
    GetTransportLoadCapacities(){
      this.TransportLoadCapacityOptions=[];
      TypeService.methods.GetTransportLoadCapacities();
    },
  },
  computed:{
    transports(){
      return store.getters.GetTransports;
    },
    TransportLoadCapacityOptions(){
      return store.getters.GetTransportLoadCapacities
    },
    TypeTransportOptions(){
      return store.getters.GetTypeTransports
    }
  }
}
</script>

<style scoped>

</style>