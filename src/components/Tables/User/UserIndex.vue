<template>
  <div class="pb-2 " v-if="isHidden">
    <h1 class=" text-left">Пользователи</h1>
    <v-popup v-if="isPopupeVisible"
             @ClosePopup="ClosePopup"
             leftBtnTitle="Закрыть"
             :nameTitle=model.userName>

      <div class="row mt-3 mb-3 col-form-label-sm">
        <div class="col-md-5 text-left">
          <div class="row">
            <div class="col-md-auto">
              <label>Контактное лицо:</label>
            </div>
            <div class="col-md-8">
              <label class="font-weight-bold">{{model.name}}</label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-auto">
              <label>Наименование организации:</label>
            </div>
            <div class="col-md-8">
              <label class="font-weight-bold">{{model.nameOrganization}}</label>
            </div>
          </div>
          <div class="row ">
            <div class="col-md-auto">
              <label>Юридический адрес</label>
            </div>
            <div class="col-md-8">
              <label class="font-weight-bold">{{model.address}}</label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-auto">
              <label>УНП/ИНН</label>
            </div>
            <div class="col-md-8">
              <label class="font-weight-bold">{{model.unp}}</label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-auto">
              <label>Доп контакт</label>
            </div>
            <div class="col-md-8">
              <label class="font-weight-bold">{{model.anotherContact}}</label>
            </div>
          </div>
        </div>
        <div class="col-md-1 ">

        </div>
        <div class="col-md-5 text-left ">
          <div class="row">
            <div class="col-md-auto">
              <label>Моб. телефон</label>
            </div>
            <div class="col-md-8">
              <label class="font-weight-bold">{{model.phoneNumber}}</label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-auto">
              <label>Емайл</label>
            </div>
            <div class="col-md-8">
              <label class="font-weight-bold">{{model.email}}</label>
            </div>
          </div>
          <div class="row ">
            <div class="col-md-auto">
              <label>Логин</label>
            </div>
            <div class="col-md-8">
              <label class="font-weight-bold">{{model.userName}}</label>
            </div>
          </div>
          <div class="row ">
            <div class="col-md-auto">
              <label>Статус блокировки</label>
            </div>
            <div class="col-md-8">
              <label class="font-weight-bold">{{model.isLockdown===false?"Активен":"Заблокирован"}}</label>
            </div>
          </div>
        </div>
      </div>
    </v-popup>

    <UserList :users ="users"
              @show-info="ShowInfo"
              @update_users ="GetUsers"/>
  </div>
</template>

<script>


import UserList from "@/components/Tables/User/UserList";
import AccService from "@/Services/AccountServices/AccountService"
import store from "@/store.index"
import vPopup from "@/Services/Popup/user-popup"
import UserModel from "@/Models/UserModel"
export default {
  name: "UserIndex",
  store:store,
  components:{
    UserList, AccService,vPopup,
    UserModel
  },
  data(){
    return{
      users:[],
      isPopupeVisible:false,
      model:UserModel.data().model
    }
  },
  mounted() {
    this.GetUsers();
    store.dispatch('IsAdmin')
  },

  computed:{
    users(){
      return store.getters.GetUsers;
    },
    isHidden (){
      return store.getters.getIsAdmin;
    },
  },
  methods:{
    ShowInfo(data){
      this.isPopupeVisible=true;
      this.model.name = data.name;
      this.model.nameOrganization = data.nameOrganization;
      this.model.address = data.address;
      this.model.unp = data.unp;
      this.model.phoneNumber = data.phoneNumber;
      this.model.anotherContact = data.anotherContact;
      this.model.email = data.email;
      this.model.userName = data.userName;
      this.model.isLockdown = data.isLockdown;

    },
    GetUsers(){
        AccService.methods.GetUsers();
    },
    ClosePopup(){
      this.isPopupeVisible=false;
    },
  }
}
</script>

<style scoped>
.v-popup{
  padding: 16px;
  position: fixed;
  top:15%;
  width:50%;
  background: #c35656;
  z-index: 10;
}
</style>