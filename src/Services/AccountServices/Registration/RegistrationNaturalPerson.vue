<template>
  <div class="form-row mt-3">
    <div class="col-md-5 text-left">
      <div class="row mb-4">
        <div class="col-4">
          <label>Контактное лицо</label>
        </div>
        <div class="col">
          <input type="text" class="form-control" required v-model="state.model.name">
          <span v-if="v$.model.name.$error">
          {{ v$.model.name.$errors[0].$message }}</span>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-4">
          <label>Наименование организации</label>
        </div>
        <div class="col">
          <input type="text" class="form-control" required v-model="state.model.nameOrganization">
          <span v-if="v$.model.nameOrganization.$error">
          {{ v$.model.nameOrganization.$errors[0].$message }}</span>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-4">
          <label>Моб. телефон</label>
        </div>
        <div class="col">
          <input type="text" class="form-control" required v-model="state.model.phoneNumber">
          <span v-if="v$.model.phoneNumber.$error">
          {{ v$.model.phoneNumber.$errors[0].$message }}</span>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-4">
          <label>Доп контакт</label>
        </div>
        <div class="col">
          <input type="text" class="form-control" required v-model="state.model.anotherContact">
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
              <label class="input-group-text">@</label>
            </div>
            <input type="text" class="form-control" aria-describedby="validationTooltipUsernamePrepend" v-model="state.model.email">
          </div>
          <span v-if="v$.model.email.$error">
          {{ v$.model.email.$errors[0].$message }}</span>
        </div>
      </div>
      <div class="row mb-4 ">
        <div class="col-4">
          <label>Логин</label>
        </div>
        <div class="col">
          <input type="text" class="form-control" aria-describedby="validationTooltipUsernamePrepend" v-model="state.model.userName">
          <span v-if="v$.model.userName.$error">
          {{ v$.model.userName.$errors[0].$message }}</span>
        </div>
      </div>
      <div class="row mb-4 ">
        <div class="col-4">
          <label>Пароль</label>
        </div>
        <div class="col">
          <input type="password" class="form-control" placeholder="Пароль" v-model="state.model.password">
          <span v-if="v$.model.password.$error">
          {{ v$.model.password.$errors[0].$message }}</span>
        </div>
      </div>
      <div class="row mb-4 ">
        <div class="col-4">
          <label>Подтвердите пароль</label>
        </div>
        <div class="col">
          <input type="password" class="form-control" placeholder="Подтвердите пароль" v-model="state.model.passwordConfirm">
          <span v-if="v$.model.passwordConfirm.$error">
          {{ v$.model.passwordConfirm.$errors[0].$message }}</span>
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
import useValidate from '@vuelidate/core'
import { required,email, minLength,sameAs, helpers,maxLength } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
export default {
name: "RegistrationProvider",
  components:{
  Model, AccountService
  },
  data() {
    return {
      confirmEmail:"",
      isVisible:false
    }
  },
  setup() {
    const state = reactive({
      model:Model.data().registerModel
    })
    const rules = computed(() => {
      return {
        model: {
          name:{ required: helpers.withMessage(
                'Поле является обязательным!',
                required
            ),
            minLength: helpers.withMessage(
                'Минимальная длинна 6 символов!',
                minLength(6)
            )
          },
          nameOrganization:{ required: helpers.withMessage(
                'Поле является обязательным!',
                required
            ),
            minLength: helpers.withMessage(
                'Минимальная длинна 6 символов!',
                minLength(6)
            )
          },

          phoneNumber:{ required: helpers.withMessage(
                'Поле является обязательным!',
                required
            ),
            minLength: helpers.withMessage(
                'Минимальная длинна 9 символов!',
                minLength(9)
            ),
          },
          userName:{ required: helpers.withMessage(
                'Поле является обязательным!',
                required
            ),
            minLength: helpers.withMessage(
                'Минимальная длинна 6 символов!',
                minLength(6)
            ),
          },
          email:{ required: helpers.withMessage(
                'Поле является обязательным!',
                required
            ), email:
                helpers.withMessage(
                    'Неверный формат почты!',
                    email
                ),
          },
          password:{ required: helpers.withMessage(
                'Поле является обязательным!',
                required
            ), minLength: helpers.withMessage(
                'Минимальная длинна 6 символов!',
                minLength(6)
            )
          },
          passwordConfirm:{ required: helpers.withMessage(
                'Поле является обязательным!',
                required
            ), sameAs: helpers.withMessage(
                'Пароли не совпадают!',
                sameAs(state.model.password)
            )
          },

        },

      }
    })

    const v$ = useValidate(rules, state)

    return { state, v$ }
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
      this.v$.$validate();
      if (!this.v$.$error) { // if ANY fail validation
        AccountService.methods.RegisterUser(this.state.model).then(response=>{
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
      } else {
        alert('Пожалуйста, введите данные корректно!');
      }
      /**/
    }
  }
}
</script>

<style scoped>
span{
  margin: 0;
  padding: 0;
  font-size: x-small;
  color: red;
  position: relative;
}
</style>