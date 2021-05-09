<template>
  <div class="p-3">
    <div style="display: flex;justify-content: space-between;">
      <h2 class="text-center">Поиск груза</h2>
      <div class="">
        <button  class="btn btn-outline-primary mb-1" @click="HiddenForm">
          <img :src="require(`@/assets/${srcBut}`)" />
          Фильтр
        </button>
        <button class="btn btn-outline-info ml-1 mb-1" @click="Search">Найти</button>
      </div>

    </div>
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
                      v-model="selectedDateStart"
                      :lowerLimit = "new Date()"
          />
        </div>
        <div class="mb-2">
          <label>По</label>
          <datepicker class="form-control"
                      v-model="selectedDateEnd"
                      :lowerLimit = "new Date()"
          />
        </div>
        <div class="text-left mb-2">
          <label><b>Тип груза</b></label>
          <Multiselect
              v-model="idTypeCargoes"
              mode="tags"
              :options="options"
              label="name"
              trackBy="name"
              :searchable="true"
          />
        </div>
        <div class="text-left mb-2">
          <label><b>Тип оплаты</b></label>
          <Multiselect
              v-model="searchModel.idTypePayment"
              placeholder="Оплата"
              :options="TypePaymentOptions"
              label="name"
              trackBy="name"
              :searchable="true"
          />
        </div>
        <div class="text-left mb-2">
          <label><b>Валюта</b></label>
          <Multiselect
              v-model="searchModel.idTypeCurrency"
              placeholder="валюта"
              :options="TypeCurrencyOptions"
              label="name"
              trackBy="name"
              :searchable="true"
          />
        </div>
      </div>
    </div>

  </div>
  <List :items ="cargoes"  />
</template>

<script>
import TypeService from "@/Services/TypeServices/TypeService"
import store from "@/store.index"
import Datepicker from 'vue3-datepicker'
import Multiselect from '@vueform/multiselect'
import SearchModel from "@/Models/SearchModel"
import TransportService from "@/Services/TransportServices/TransportService"
import List from "@/Services/SearchServices/DataCargo/List";
import SearchService from "@/Services/SearchServices/SearchService"

export default {
  name: "SearchCargo",
  store: store,
  components:{
    TypeService,
    Multiselect,
    Datepicker,
    SearchModel,
    TransportService,
    List, SearchService
  },
  data(){
    return{
      isHiddenForm:Boolean,
      searchModel: SearchModel.data().model,
      srcBut:this.isHiddenForm?"arrowUp.png":"arrowDown.png",
      cargoes: [],
      options: [],

      TypePaymentOptions:[],
      TypeCurrencyOptions:[],

      idTypeCargoes: [],
      AllTypeCargo:[],
      selectTypeCargo:[],

      TypeTransportOptions:[],
      selectedDateStart:new Date(Date.toLocaleString('en-US', { timeZone: "Europe/Minsk" })) ,
      selectedDateEnd:new Date(Date.toLocaleString('en-US', { timeZone: "Europe/Minsk" })),
    }
  },
  mounted() {
    this.GetCargoes()
    this.GetTypeCargo();
    this.GetTypePayments();
    this.GetTypeCurrencies();
  },
  methods:{
    Search(){
      this.selectTypeCargo=[]
      this.idTypeCargoes.forEach(item=>{
        this.AllTypeCargo.forEach(x=>{
          if(item===x.id){
            this.selectTypeCargo.push(x);
          }
        });
      });
      this.searchModel.typeCargo =this.selectTypeCargo;
      this.searchModel.dateOf = new Date(this.selectedDateStart.toLocaleString('en-US', { timeZone: "Europe/Minsk" }));
      this.searchModel.dateTo = new Date(this.selectedDateEnd.toLocaleString('en-US', { timeZone: "Europe/Minsk" }));
      SearchService.methods.GetCargoes(this.searchModel);
    },
    HiddenForm(){

      if(this.isHiddenForm){
        this.srcBut = "arrowUp.png"
        this.isHiddenForm=!this.isHiddenForm;
        this.$store.dispatch('SetVisibleCargoFilter',false)
      }
      else {
        this.srcBut = "arrowDown.png"
        this.isHiddenForm=!this.isHiddenForm;
        this.$store.dispatch('SetVisibleCargoFilter',true)
      }

    },
    GetTypePayments(){
      this.TypePaymentOptions=[];
      TypeService.methods.GetTypePaymentsAll();
    },
    GetTypeCurrencies(){
      this.TypeCurrencyOptions=[];
      TypeService.methods.GetTypeCurrenciesAll();
    },
    GetTypeCargo(){
      this.AllTypeCargo=[];
      this.options =[];
      TypeService.methods.GetTypeCargoesAll()
          .then(response => {
            response.data.forEach(item=>{
              this.AllTypeCargo.push(item);
              this.options.push(
                  {
                    value:item.id,
                    name:item.name
                  });
            });
          })
          .catch((error) => {
            console.log(error);
          });
    },
    GetCargoes(){
      SearchService.methods.GetCargoes(this.searchModel);
    }
  },
  computed:{
    isHiddenForm() {
      return this.$store.getters.GetVisibleFilterCargo;
    },
    cargoes(){
      return store.getters.GetSearchCargoes;
    },
    TypeCurrencyOptions(){
      return store.getters.GetTypeCurrencies
    },
    TypePaymentOptions(){
      return store.getters.GetTypePayments
    }
  }

}
</script>

<style src="@vueform/multiselect/themes/default.css">

</style>