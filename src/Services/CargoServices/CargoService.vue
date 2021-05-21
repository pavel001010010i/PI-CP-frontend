
<script>
import { useNotificationStore } from '@dafcoe/vue-notification'
import Constants from "@/Services/Constants";
import store from "@/store.index"
export default {
name: "CargoService",
  store:store,
  methods:{
    UpdateCargo(data){
      axios.put(Constants.data().url+"api/cargo/update-cargo",data,Constants.data().configBearHeader)
          .then(response => {
            const { setNotification } = useNotificationStore()
            setNotification(Constants.methods.GetNotification("Ваш груз обновлен!","info"));
            store.dispatch('GetCargoes');
            store.dispatch('GetSuccesAdd',false);

          })
          .catch((error) => {
            const { setNotification } = useNotificationStore()
            setNotification(Constants.methods.GetNotification("Ошибка. Не возможно обновить груз!","alert"));
            console.log(error);
          });
    },
    AddCargo(data){
      axios.post(Constants.data().url+"api/cargo/add-cargo",data,Constants.data().configBearHeader)
          .then(response => {
            const { setNotification } = useNotificationStore()
            setNotification(Constants.methods.GetNotification("Груз успешно добавлен!","success"));
            store.dispatch('GetCargoes');
            store.dispatch('GetSuccesAdd',false);

            console.log(response.data);
          })
          .catch((error) => {
            const { setNotification } = useNotificationStore()
            if(error.response.data.errors){

              if(error.response.data.errors.FullAddressTo){
                setNotification(Constants.methods.GetNotification(`${error.response.data.errors.FullAddressTo}`,"alert"));
              }
              if (error.response.data.errors.PostCodeFrom){
                setNotification(Constants.methods.GetNotification(`${error.response.data.errors.PostCodeFrom}`,"alert"));
              }
              if (error.response.data.errors.endDate){
                setNotification(Constants.methods.GetNotification(`Заполните поле даты "По"`,"alert"));
              }
              if (error.response.data.errors.startDate){
                setNotification(Constants.methods.GetNotification(`Заполните поле даты "С"`,"alert"));
              }
              if (error.response.data.errors["Cargo.Name"]){
                setNotification(Constants.methods.GetNotification(`${error.response.data.errors["Cargo.Name"]}`,"alert"));
              }if (error.response.data.errors["Cargo.Height"]){
                setNotification(Constants.methods.GetNotification(`${error.response.data.errors["Cargo.Height"]}`,"alert"));
              }
              if (error.response.data.errors["Cargo.Weight"]){
                setNotification(Constants.methods.GetNotification(`${error.response.data.errors["Cargo.Weight"]}`,"alert"));
              }
              if (error.response.data.errors.width){
                setNotification(Constants.methods.GetNotification(`${error.response.data.errors.width}`,"alert"));
              }
              if (error.response.data.errors.depth){
                setNotification(Constants.methods.GetNotification(`${error.response.data.errors.depth}`,"alert"));
              }
              if (error.response.data.errors.costDelivery){
                setNotification(Constants.methods.GetNotification(`${error.response.data.errors.costDelivery}`,"alert"));
              }
              if (error.response.data.errors.typeCargo){
                setNotification(Constants.methods.GetNotification(`${error.response.data.errors.typeCargo}`,"alert"));
              }
              if (error.response.data.errors["cargo.idTypeCurrency"]){
                setNotification(Constants.methods.GetNotification(`Выберите валюту!`,"alert"));
              }
              if (error.response.data.errors["cargo.idTypePayment"]){
                setNotification(Constants.methods.GetNotification(`Выберите тип оплаты!`,"alert"));
              }
              if (error.response.data.errors["Cargo.Weight"]){
                setNotification(Constants.methods.GetNotification(`${error.response.data.errors["Cargo.Weight"]}`,"alert"));
              }
            }else {
              setNotification(Constants.methods.GetNotification(`Ошибка. Груз не удалось добавить!`,"alert"));
            }
            console.log(error.response);
          });
    },
    GetCargoes(){
      store.dispatch('GetCargoes');
    },
    Delete(data){
      axios.delete(Constants.data().url+ `api/cargo/delete-cargo/${data}`,Constants.data().configBearHeader)
          .then(response => {
            console.log(response.status)
            const { setNotification } = useNotificationStore()
            setNotification(Constants.methods.GetNotification("Груз успешно удален!","info"));
            store.dispatch('GetCargoes');

            console.log(response.status)
          })
          .catch((error) => {
            const { setNotification } = useNotificationStore()
            setNotification(Constants.methods.GetNotification("Ошибка. Груз не удален!","alert"));
            console.log(error);
          });
    }
  }
}
</script>

<style scoped>

</style>