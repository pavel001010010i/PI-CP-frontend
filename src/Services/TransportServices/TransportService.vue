
<script>
import { useNotificationStore } from '@dafcoe/vue-notification'
import Constants from "@/Services/Constants";
import store from "@/store.index"
export default {
name: "TransportService",
  store:store,
  methods:{
    Update(data){
      axios.put(Constants.data().url+"api/transport/update-transport",data,Constants.data().configBearHeader)
          .then(response => {
            const { setNotification } = useNotificationStore()
            setNotification(Constants.methods.GetNotification("Ваш транспорт успешно обновлен!","info"));
            store.dispatch('GetTransports');
            store.dispatch('GetSuccesAdd',false);
          })
          .catch((error) => {
            const { setNotification } = useNotificationStore()
            setNotification(Constants.methods.GetNotification("Ошибка. Не возможно обновить транспорт!","alert"));
            console.log(error);
          });
    },
    Add(data){
      axios.post(Constants.data().url+"api/transport/add-transport",data,Constants.data().configBearHeader)
          .then(response => {
            const { setNotification } = useNotificationStore()
            setNotification(Constants.methods.GetNotification("Транспорт успешно добавлен!","success"));
            store.dispatch('GetTransports');
            store.dispatch('GetSuccesAdd',false);
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
              setNotification(Constants.methods.GetNotification(`Ошибка. Транспорт не удалось добавить!`,"alert"));
            }
            console.log(error.response);
          });
    },
    Get(){
      store.dispatch('GetTransports');
    },
    Delete(data){
      const { setNotification } = useNotificationStore()
      axios.delete(Constants.data().url+ `api/transport/delete-transport/${data}`,Constants.data().configBearHeader)
          .then(response => {
            console.log(response)
            if(response.data.status){
              setNotification(Constants.methods.GetNotification(`${response.data.message}`,"info"));
            }
            else {
              setNotification(Constants.methods.GetNotification(`${response.data.message}`,"alert"));
            }

            store.dispatch('GetTransports');
          })
          .catch((error) => {
            const { setNotification } = useNotificationStore()
            setNotification(Constants.methods.GetNotification("Ошибка. Транспорт не удален!","alert"));
            console.log(error);
          });
    }
  }
}
</script>

<style scoped>

</style>