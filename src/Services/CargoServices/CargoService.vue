
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
            setNotification(Constants.methods.GetNotification("The cargo was updated successfully","success"));
            store.dispatch('GetCargoes');
            store.dispatch('GetUpdate');

          })
          .catch((error) => {
            const { setNotification } = useNotificationStore()
            setNotification(Constants.methods.GetNotification("Error. Cargo not updated","alert"));
            console.log(error);
          });
    },
    AddCargo(data){
      axios.post(Constants.data().url+"api/cargo/add-cargo",data,Constants.data().configBearHeader)
          .then(response => {
            const { setNotification } = useNotificationStore()
            setNotification(Constants.methods.GetNotification("The cargo was added successfully","success"));
            store.dispatch('GetCargoes');
            store.dispatch('GetUpdate');

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
              setNotification(Constants.methods.GetNotification(`Error. Cargo not added`,"alert"));
            }
            console.log(error.response);
          });
    },
    GetCargoes(){
      store.dispatch('GetCargoes');
      store.dispatch('GetUpdate');
    },
    Delete(data){
      axios.delete(Constants.data().url+ `api/cargo/delete-cargo/${data}`,Constants.data().configBearHeader)
          .then(response => {
            console.log(response.status)
            const { setNotification } = useNotificationStore()
            setNotification(Constants.methods.GetNotification("The cargo was deleted successfully","success"));
            store.dispatch('GetCargoes');
            store.dispatch('GetUpdate');

            console.log(response.status)
          })
          .catch((error) => {
            const { setNotification } = useNotificationStore()
            setNotification(Constants.methods.GetNotification("Error. Cargo not deleted","alert"));
            console.log(error);
          });
    }
  }
}
</script>

<style scoped>

</style>