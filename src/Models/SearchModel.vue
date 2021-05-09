
<script>
export default {
name: "SearchModel",
  data(){
  return{
    model:{
      idTypePayment:Number,
      idTypeCurrency:Number,
      idTypeTransport:Number,
      typeCargo:[],
      heightOf:Number,
      widthOf:Number,
      depthOf:Number,
      weightOf:Number,
      cityOf:"",
      stateOf:"",
      postcodeOf:"",
      countryOf:"",
      heightTo:Number,
      widthTo:Number,
      depthTo:Number,
      weightTo:Number,
      cityTo:"",
      stateTo:"",
      postcodeTo:"",
      countryTo:"",
      dateOf:Date,
      dateTo:Date
    },
  }
  }
}
</script>
