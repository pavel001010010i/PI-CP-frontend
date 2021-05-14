
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
    UpdateTypeCargo(data){
      axios.put(Constants.data().url+"api/TypeCargo/update",data,Constants.data().configBearHeader)
      .then(response=>{
        store.dispatch('GetTypeCargoAll');
      }).catch(error=>{
      })
    },
    UpdateTypeTransport(data){
      axios.put(Constants.data().url+"api/typetransport/update",data,Constants.data().configBearHeader)
          .then(response=>{
            store.dispatch('GetTypeTransportsAll');
          }).catch(error=>{
      })
    },
    UpdateTypeCurrency(data){
      axios.put(Constants.data().url+"api/typecurrency/update",data,Constants.data().configBearHeader)
          .then(response=>{
            store.dispatch('GetTypeCurrenciesAll');
          }).catch(error=>{
      })
    },
    UpdateTypePayment(data){
      axios.put(Constants.data().url+"api/typepayment/update",data,Constants.data().configBearHeader)
          .then(response=>{
            store.dispatch('GetTypePaymentsAll');
          }).catch(error=>{
      })
    },
    GetTypeCargoesAllA(){
      store.dispatch('GetTypeCargoAll');
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
    GetTypeTransportsAll(){

      store.dispatch('GetTypeTransportsAll');
    },
    GetTypeCargoesAll(){
      return  axios.get(Constants.data().url+"api/TypeCargo/get-type-cargo",Constants.data().contTypeHeader)
    },
    GetTypeCurrenciesAll(){
      store.dispatch('GetTypeCurrenciesAll');
    },
    GetTypePaymentsAll(){
      store.dispatch('GetTypePaymentsAll');
    },
    getTypeCurrencyId(id){
      return axios.get(Constants.data().url+`api/typecurrency/get-item/${id}`,Constants.data().contTypeHeader)
    },
    getTypePaymentId(id){
      return axios.get(Constants.data().url+`api/typepayment/get-item/${id}`,Constants.data().contTypeHeader)
    },
    getTypeTransportId(id){
      return axios.get(Constants.data().url+`api/typetransport/get-item/${id}`,Constants.data().contTypeHeader)
    },
    GetTransportLoadCapacityId(id){
      return axios.get(Constants.data().url+`api/TransportLoadCapacity/get-item/${id}`,Constants.data().contTypeHeader)
    }
  }
}
</script>
