<script>
export default {
name: "OrderRequestModel",
  data(){
    return{
      requestModel:{
        id: Number,
        idTransport: Number,
        idUser: String,
        name: "",
        status: Boolean,
        orderData:{}
      },
      orderModel:{
        id: Number,
        idTransport: Number,
        idUser: String,
        name: "",
        status: Boolean,
        orderData:{}
      },
      orderDataModel:{
        idUser: String,
        status: Boolean,
        cargoes:[]
      }
    }
  }
}
</script>

<style scoped>

</style>