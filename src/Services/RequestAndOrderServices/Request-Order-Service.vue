

<script>
import Constants from "@/Services/Constants"
import { useNotificationStore } from '@dafcoe/vue-notification'
import store from "@/store.index"

export default {
name: "Request-Order-Service",
  store:store,
  methods:{
  AddRequest(data){
    const { setNotification } = useNotificationStore()
    axios.post(Constants.data().url+"api/RequestOrder/add-item",data,Constants.data().configBearHeader).then(response => {
      setNotification(Constants.methods.GetNotification(response.data.message,"success"));
      console.log(response.data);
    }).catch((error) => {
      setNotification(Constants.methods.GetNotification(error.response.data.message,"alert"));
      console.log(error);
    });
  },
    DeleteRequest(data){
      const { setNotification } = useNotificationStore()
      axios.post(Constants.data().url+"api/RequestOrder/delete-item",data,Constants.data().configBearHeader).then(response => {
        setNotification(Constants.methods.GetNotification(response.data.message,"info"));
        store.dispatch('GetRCustomer');
        console.log(response.data);
      }).catch((error) => {
        setNotification(Constants.methods.GetNotification(error.response.data.message,"alert"));
        console.log(error);
      });
    },
    GetRequestCustomer(){
      store.dispatch('GetRCustomer');
    },
    GetRequestProvider(){
      store.dispatch('GetRProvider');
    }
  }
}
</script>

<style scoped>

</style>