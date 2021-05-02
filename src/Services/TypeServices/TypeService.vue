
<script>
import Constants from "@/Services/Constants";
import store from "@/store.index"
export default {
name: "TypeCargoService",
  store:store,
  data(){
  return{
    data:Object
  }
  },
  methods:{
  GetTypeCargo(){
    return  axios.get(Constants.data().url+"api/TypeCargo/get",Constants.data().contTypeHeader)
  },
    GetTypePayments(){
      store.dispatch('GetTypePayments');
    },
    GetTypeTransports(){
      store.dispatch('GetTypeTransports');
    },
    GetTransportLoadCapacities(){
      store.dispatch('GetTransportLoadCapacities');
    },
    GetTypeCurrencies(){
      store.dispatch('GetTypeCurrencies');
    },
    getTypeCurrencyId(id){
      return axios.get(Constants.data().url+`api/typecurrency/get-item/${id}`,Constants.data().configBearHeader)
    },
    getTypePaymentId(id){
      return axios.get(Constants.data().url+`api/typepayment/get-item/${id}`,Constants.data().configBearHeader)
    },
    getTypeTransportId(id){
      return axios.get(Constants.data().url+`api/typetransport/get-item/${id}`,Constants.data().configBearHeader)
    },
    GetTransportLoadCapacityId(id){
      return axios.get(Constants.data().url+`api/TransportLoadCapacity/get-item/${id}`,Constants.data().configBearHeader)
    }
  }
}
</script>
