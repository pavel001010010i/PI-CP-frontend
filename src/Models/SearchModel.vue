
<script>
export default {
name: "SearchModel",
  data(){
  return{
    model:{

      heightOf:Number,
      widthOf:Number,
      depthOf:Number,
      cityOf:"",
      stateOf:"",
      postcodeOf:"",
      countryOf:"",

      heightTo:Number,
      widthTo:Number,
      depthTo:Number,
      cityTo:"",
      stateTo:"",
      postcodeTo:"",
      countryTo:"",

      weight:Number,
      costDelivery:Number,
      isStatus:Boolean,
      typeCargo:[],
      idRouteMap:Number,
      idTypePayment:Number,
      idTypeCurrency:Number,
    },
  }
  }
}
</script>
