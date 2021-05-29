<template>
  <div class="form-row mt-3">
    <div class="col-md-5 text-left">
      <div class="row mb-4">
        <div class="col-4">
          <label>Контактное лицо</label>
        </div>
        <div class="col">
          <input type="text" class="form-control" required v-model="model.name">
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-4">
          <label>Наименование организации</label>
        </div>
        <div class="col">
          <input type="text" class="form-control" required v-model="model.nameOrganization">
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-4">
          <label>Моб. телефон</label>
        </div>
        <div class="col">
          <input type="text" class="form-control" required v-model="model.phoneNumber">
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-4">
          <label>Доп контакт</label>
        </div>
        <div class="col">
          <input type="text" class="form-control" required v-model="model.anotherContact">
        </div>
      </div>
    </div>
    <div class="col-md-1 ">

    </div>
    <div class="col-md-5 text-left ">
      <div class="row mb-4 ">
        <div class="col-4">
          <label>Эл. почта</label>
        </div>
        <div class="col">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">@</span>
            </div>
            <input type="text" class="form-control" aria-describedby="validationTooltipUsernamePrepend" v-model="model.email">
          </div>
        </div>
      </div>
      <div class="row mb-4 ">
        <div class="col-4">
          <label>Логин</label>
        </div>
        <div class="col">
          <input type="text" class="form-control" aria-describedby="validationTooltipUsernamePrepend" v-model="model.userName">
        </div>
      </div>
      <div class="row mb-4 ">
        <div class="col-4">
          <label>Пароль</label>
        </div>
        <div class="col">
          <input type="password" class="form-control" placeholder="Пароль" v-model="model.password">
        </div>
      </div>
      <div class="row mb-4 ">
        <div class="col-4">
          <label>Подтвердите пароль</label>
        </div>
        <div class="col">
          <input type="password" class="form-control" placeholder="Подтвердите пароль" v-model="model.passwordConfirm">
        </div>
      </div>
    </div>
  </div>
  <div v-if="isVisible" class="form-group row">
    <label for="inputEmail4" class="col-lg-1 col-form-label">Код</label>
    <div class="col-lg-auto input mb-2">
      <input type="text" class="form-control" id="inputEmail4"  v-model="confirmEmail">
    </div>
    <div class="col-lg-auto">
      <button class="btn btn-primary mb-2" @click="SendConfirmEmail">Подтвердить почту</button>
    </div>
  </div>
  <button class="btn btn-outline-primary mb-3"  @click="RegistrationUser">Регистрация</button>

</template>

<script>
import { useNotificationStore } from '@dafcoe/vue-notification'
import Constants from "@/Services/Constants";
import Model from "@/Models/UserModel"
import AccountService from "@/Services/AccountServices/AccountService"
export default {
name: "RegistrationProvider",
  components:{
  Model, AccountService
  },
  data() {
    return {
      model:Model.data().registerModel,
      confirmEmail:"",
      isVisible:false
    }
  },
  methods:{
    SendConfirmEmail(){
      console.log(this.confirmEmail)
      AccountService.methods.ConfirmEmail(this.confirmEmail).then(response=>{
        console.log(response);
        const { setNotification } = useNotificationStore()
        setNotification(Constants.methods.GetNotification(response.data.message,"success"));

        setTimeout(()=>this.$router.push({ name: 'Login' }), 3000);

      }).catch(error=>{
        const { setNotification } = useNotificationStore()
        setNotification(Constants.methods.GetNotification(error.response.data.message,"alert"));
        console.log(error);
      });
    },
    RegistrationUser(){

      AccountService.methods.RegisterUser(this.model).then(response=>{
        console.log(response);
        const { setNotification } = useNotificationStore()
        setNotification(Constants.methods.GetNotification(response.data.message,"info"));
        this.isVisible = true;


      }).catch(error=>{
        if(error.response.data.Email){
          const { setNotification } = useNotificationStore()
          setNotification(Constants.methods.GetNotification(error.response.data.Email[0],"alert"));
        }
        if(error.response.data.PhoneNumber){
          const { setNotification } = useNotificationStore()
          setNotification(Constants.methods.GetNotification(error.response.data.PhoneNumber[0],"alert"));
        }
        if(error.response.data.PasswordConfirm){
          const { setNotification } = useNotificationStore()
          setNotification(Constants.methods.GetNotification(error.response.data.PasswordConfirm[0],"alert"));
        }
        if(error.response.data.NameOrganization){
          const { setNotification } = useNotificationStore()
          setNotification(Constants.methods.GetNotification(error.response.data.NameOrganization[0],"alert"));
        }
        if(error.response.data.Name){
          const { setNotification } = useNotificationStore()
          setNotification(Constants.methods.GetNotification(error.response.data.Name[0],"alert"));
        }
        if(error.response.data.message){
          const { setNotification } = useNotificationStore()
          setNotification(Constants.methods.GetNotification(error.response.data.message,"alert"));
        }

        console.log(error);
      })
    }
  }
}
</script>

<style scoped>

</style>