<template>
  <div>

  </div>
  <div class="p-3">
    <div class="justify-content-between d-flex">
      <h2 class="text-center">Поиск транспорта</h2>
      <div>
        <button  class="btn btn-outline-primary mb-1" @click="HiddenForm">
          <img :src="require(`@/Assets/${srcBut}`)" />
          Фильтр
        </button>
        <button class="btn btn-outline-info ml-1 mb-1" @click="Search">Найти</button>
      </div>

    </div>
    <v-popup v-if="isPopupeVisible"
             @ClosePopup="ClosePopup"
             @AddPopup="AddPopup"
             :is-state="isState"
             right-btn-title-add="Добавить"
             leftBtnTitle="Отмена"
             nameTitle="Транспорт">
      <div class="row">
        <div class="col-lg-12">
          <div class="card text-left mb-3 small boxShadow">
            <div class="card-header pb-0 pt-1 v-popup__footer" style="background-color: dodgerblue; color: white">
              <div class="row">
                <h5 class="border-white border rounded p-1 mr-3">{{item.routeMap.countryCodeFrom}}-{{item.routeMap.countryCodeTo}}</h5>
                <h5 class="p-1" >{{item.name}}</h5>
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
              <div>
                <p class="card-text mb-0 font-weight-bold">Контакты</p>
                <p class="card-text mb-0"><b>Email:</b> {{item.appUser.email}}</p>
                <p class="card-text mb-0"><b>Моб. номер</b> {{item.appUser.phoneNumber}}</p>
                <p class="card-text mb-0"><b>Наименование</b> {{item.appUser.nameOrganization}}</p>
              </div>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="text-left mb-2">
            <label><b>Выберите грузы</b></label>
            <Multiselect
                v-model="idCargoes"
                mode="tags"
                :options="cargoOptions"
                label="name"
                trackBy="name"
                :searchable="true"
            />
          </div>
        </div>
      </div>
      </div>

    </v-popup>
    <div v-show="!isHiddenForm" class="row border rounded mb-3">
      <div class="row col-md-3">
        <div class="col-md-6 text-left ">
          <label><b>ОТ</b></label>
          <div class="mb-2">
            <label>Высота/м</label>
            <input type="number" class="form-control"   required v-model="searchModel.heightOf">
          </div>
          <div class="mb-2">
            <label>Ширина/м</label>
            <input type="number" class="form-control"   required v-model="searchModel.widthOf">
          </div>
          <div class="mb-2">
            <label>Глубина/м</label>
            <input type="number" class="form-control"   required v-model="searchModel.depthOf">
          </div>
          <div class="mb-2">
            <label>Вес/кг</label>
            <input type="number" class="form-control"   required v-model="searchModel.weightOf">
          </div>
        </div>
        <div class="col-md-6 text-left">
          <label><b>ДО</b></label>
          <div class="mb-2">
            <label>Высота/м</label>
            <input type="number" class="form-control"  required v-model="searchModel.heightTo">
          </div>
          <div class="mb-2">
            <label>Ширина/м</label>
            <input type="number" class="form-control"  required v-model="searchModel.widthTo">
          </div>
          <div class="mb-2">
            <label>Глубина/м</label>
            <input type="number" class="form-control"  required v-model="searchModel.depthTo">
          </div>
          <div class="mb-2">
            <label>Вес/кг</label>
            <input type="number" class="form-control"   required v-model="searchModel.weightTo">
          </div>

        </div>
      </div>

      <div class="col-md-3 text-left">
        <label><b>ОТКУДА</b></label>
        <div class="mb-2">
          <label>Страна:</label>
          <input class="form-control" type="text" v-model="searchModel.countryOf" />
        </div>
        <div class="mb-2">
          <label>Город:</label>
          <input class="form-control" type="text" v-model="searchModel.cityOf" />
        </div>
        <div class="mb-2">
          <label>Штат/Область:</label>
          <input class="form-control" type="text" v-model="searchModel.stateOf"/>
        </div>
        <div class="mb-2">
          <label>Индекс:</label>
          <input class="form-control" type="text" v-model="searchModel.postcodeOf"/>
        </div>
      </div>

      <div class="col-md-3 text-left">
        <label><b>КУДА</b></label>
        <div class="mb-2">
          <label>Страна:</label>
          <input class="form-control" type="text" v-model="searchModel.countryTo" />
        </div>
        <div class="mb-2">
          <label>Город:</label>
          <input class="form-control" type="text" v-model="searchModel.cityTo" />
        </div>
        <div class="mb-2">
          <label>Штат/Область:</label>
          <input class="form-control" type="text" v-model="searchModel.stateTo"/>
        </div>
        <div class="mb-2">
          <label>Индекс:</label>
          <input class="form-control" type="text" v-model="searchModel.postcodeTo"/>
        </div>

      </div>
      <div class="col-md-3 text-left">
        <label><b>ДИАПАЗОН ДАТ</b></label>
        <div class="mb-2">
          <label>С</label>
          <datepicker class="form-control"
              :locale="ru"
              v-model="selectedDateStart"
              :lowerLimit = "new Date()"
          />
        </div>
        <div class="mb-2">
          <label>По</label>
          <datepicker class="form-control"
                      :locale="ru"
                      v-model="selectedDateEnd"
                      :lowerLimit = "new Date()"
          />
        </div>
        <div class="text-left mb-2">
          <label><b>Тип Кузова</b></label>
          <Multiselect
              v-model="idTypeTransport"
              :options="TypeTransportOptions"
              label="name"
              trackBy="name"
              :searchable="true"
          />
        </div>
      </div>
    </div>


  </div>
  <List :items ="transports" @request-item="RequestItem"  />
</template>

<script>
import TypeService from "@/Services/TypeServices/TypeService"
import store from "@/store.index"
import Datepicker from 'vue3-datepicker'
import Multiselect from '@vueform/multiselect'
import SearchModel from "@/Models/SearchModel"
import TransportService from "@/Services/TransportServices/TransportService"
import List from "@/Services/SearchServices/DataTransport/List";
import SearchService from "@/Services/SearchServices/SearchService"
import { ru } from 'date-fns/locale'
import RequestModel from "@/Models/OrderRequestModel"
import TransModel from "@/Models/TransportModel"
import vPopup from "@/Services/Popup/modal-popup"
import CargoService from "@/Services/CargoServices/CargoService"
import Constants from "@/Services/Constants"
import MainVariables from "@/Services/MainVariables"
import ROService from "@/Services/RequestAndOrderServices/Request-Order-Service"
import moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022'


export default {
name: "SearchTransport",
  store: store,
  components:{
    TypeService,
    Multiselect,
    Datepicker,
    SearchModel,
    TransportService,
    List, SearchService,
    RequestModel, TransModel,
    vPopup, CargoService,
    ROService
  },
  data(){
    return{
      moment:moment,
      isState:true,
      isPopupeVisible:false,
      ru:ru,
      isHiddenForm:Boolean,
      searchModel: SearchModel.data().model,
      idTypeTransport:Number,
      srcBut:this.isHiddenForm?"arrowUp.png":"arrowDown.png",
      transports: [],

      reqTranModel: TransModel.data().requestModel,
      item: {},
      orderDataModel: RequestModel.data().orderDataModel,
      requestModel: RequestModel.data().requestModel,
      cargoes:[],
      idCargoes:[],
      selectCargoes:[],
      cargoOptions:[],
      TypeTransportOptions:[],
      selectedDateStart:new Date(Date.toLocaleString('en-US', { timeZone: "Europe/Minsk" })) ,
      selectedDateEnd:new Date(Date.toLocaleString('en-US', { timeZone: "Europe/Minsk" })),
    }
  },
  mounted() {

    this.GetTransports();
    this.GetTypeTransports();
    this.GetTransportLoadCapacities();
  },
  methods:{
    RequestItem(data){
      this.GetCargoes();
      this.isPopupeVisible = true,
      this.item = data;

    },
    AddPopup(){
      this.selectCargoes=[]
      this.idCargoes.forEach(item=>{
        this.cargoes.forEach(x=>{
          if(item===x.id){
            this.selectCargoes.push(x);
          }
        });
      });
      this.orderDataModel.idUser = MainVariables.data().userId;
      this.orderDataModel.status = false;
      this.orderDataModel.cargoes = this.selectCargoes;

      this.requestModel.idTransport = this.item.id;
      this.requestModel.idUser = this.item.idUser;
      this.requestModel.status = false;
      this.requestModel.orderData = this.orderDataModel;
      this.requestModel.name = "Заказ номер: "+(new Date().getMilliseconds())

      ROService.methods.AddRequest(this.requestModel);

      this.ClosePopup();
    },
    ClosePopup(){
      this.isPopupeVisible = false;
      this.idCargoes=[];
    },
    Search(){
      this.searchModel.dateOf = new Date(this.selectedDateStart.toLocaleString('en-US', { timeZone: "Europe/Minsk" }));
      this.searchModel.dateTo = new Date(this.selectedDateEnd.toLocaleString('en-US', { timeZone: "Europe/Minsk" }));
      this.searchModel.idTypeTransport = this.idTypeTransport;
      SearchService.methods.GetTransports(this.searchModel);
    },
    HiddenForm(){
      if(this.isHiddenForm){
        this.srcBut = "arrowUp.png"
        this.isHiddenForm=!this.isHiddenForm;
        this.$store.dispatch('SetVisibleTransFilter',false)
      }
      else {
        this.srcBut = "arrowDown.png"
        this.isHiddenForm=!this.isHiddenForm;
        this.$store.dispatch('SetVisibleTransFilter',true)
      }
    },
    GetCargoes(){
      this.cargoOptions=[];
      axios.get(Constants.data().url+"api/cargo/get-cargoes-request",Constants.data().configBearHeader).then(response => {
        this.cargoes = response.data;
        this.cargoes.forEach(item=>{
          if(item.isStatus){
            this.cargoOptions.push(
                {
                  value:item.id,
                  name:item.name
                });
          }
        });
      }).catch((error) => {
        console.log(error);
      });

    },
    GetTypeTransports(){
      this.TypeTransportOptions=[];
      TypeService.methods.GetTypeTransportsAll();
    },
    GetTransportLoadCapacities(){
      this.TransportLoadCapacityOptions=[];
      TypeService.methods.GetTransportLoadCapacities();
    },
    GetTransports(){
      SearchService.methods.GetTransports(this.searchModel);
    }
  },
  computed:{
    isHiddenForm() {
      return this.$store.getters.GetVisibleFilterTrans;
    },
    transports(){
      return store.getters.GetSearchTransports;
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

<style src="@vueform/multiselect/themes/default.css">

.boxShadow {
  margin: 1em auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, .2);
}
</style>