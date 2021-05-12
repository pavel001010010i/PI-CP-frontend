
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
            store.dispatch('GetUpdate');

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

            console.log(response.data);
          })
          .catch((error) => {
            const { setNotification } = useNotificationStore()
            if(error.response.data.errors){
              if(error.response.data.errors.FullAddressTo){
                setNotification(Constants.methods.GetNotification(`${error.response.data.errors.FullAddressTo}`,"alert"));

              }
              if (error.response.data.errors.PostCodeTo){
                setNotification(Constants.methods.GetNotification(`${error.response.data.errors.PostCodeTo}`,"alert"));

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