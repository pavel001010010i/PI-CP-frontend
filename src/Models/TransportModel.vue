<script>
export default {
name: "TransportModel",
  data(){
    return{
      transportModel:{
        id: Number,
        idUser:"",
        idTypeTransport:Number,
        idRouteMap:Number,
        idTransLoadCapacity:Number,
        name:"",
        model:"",
        height:Number,
        width:Number,
        depth:Number,
        numberAxes:Number,
        maxLoadCapacity:Number,
        fuelConsumption:Number,
        isActive:Boolean,
      },
      requestModel:{
        item: {},
        routeModel: {},
        transportLoadCapacityName: "",
        typeTransportName: "",
        dateStart :"",
        dateEnd :""
      }
    }
  }
}
</script>
