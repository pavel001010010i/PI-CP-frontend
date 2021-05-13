

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
    DeleteRequestCustomer(data){
      const { setNotification } = useNotificationStore()
      axios.post(Constants.data().url+"api/RequestOrder/delete-item-request-cust",data,Constants.data().configBearHeader).then(response => {
        setNotification(Constants.methods.GetNotification(response.data.message,"info"));
        store.dispatch('GetRCustomer');
        console.log(response.data);
      }).catch((error) => {
        setNotification(Constants.methods.GetNotification(error.response.data.message,"alert"));
        console.log(error);
      });
    },
    DeleteRequestProvider(data){
      const { setNotification } = useNotificationStore()
      axios.post(Constants.data().url+"api/RequestOrder/delete-item-request-prov",data,Constants.data().configBearHeader).then(response => {
        setNotification(Constants.methods.GetNotification(response.data.message,"info"));
        store.dispatch('GetRProvider');
        console.log(response.data);
      }).catch((error) => {
        setNotification(Constants.methods.GetNotification(error.response.data.message,"alert"));
        console.log(error);
      });
    },
    AcceptItemRequest(data){
      const { setNotification } = useNotificationStore()
      axios.post(Constants.data().url+"api/RequestOrder/accept-item-request",data,Constants.data().configBearHeader).then(response => {
        setNotification(Constants.methods.GetNotification(response.data.message,"info"));
        store.dispatch('GetRProvider');
        console.log(response.data);
      }).catch((error) => {
        setNotification(Constants.methods.GetNotification(error.response.data.message,"alert"));
        console.log(error);
      });
    },
    DoneItemOrder(data){
      const { setNotification } = useNotificationStore()
      axios.post(Constants.data().url+"api/RequestOrder/done-item-order",data,Constants.data().configBearHeader).then(response => {
        setNotification(Constants.methods.GetNotification(response.data.message,"info"));
        store.dispatch('GetOProvider');
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
    },
    GetOrderCustomer(){
      store.dispatch('GetOCustomer');
    },
    GetOrderProvider(){
      store.dispatch('GetOProvider');
    }
  }
}
</script>

<style scoped>

</style>