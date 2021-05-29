<script>
export default {
name: "CargoModel",
  data(){
    return{
      cargoModel:{
        id: Number,
        idUser:"",
        name:"",
        height:Number,
        width:Number,
        depth:Number,
        weight:Number,
        costDelivery:Number,
        isStatus:Boolean,
        typeCargo:[],
        idRouteMap:Number,
        idTypePayment:Number,
        idTypeCurrency:Number
      }
    }
  }
}
</script>



