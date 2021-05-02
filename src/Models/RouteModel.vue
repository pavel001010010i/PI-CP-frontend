

<script>
import moment from "moment-timezone"
export default {
name: "RouteModel",
  data(){
  return{
    routeModel:{
      id: Number,
      countryCodeFrom:"",
      latFrom: Number,
      lngFrom: Number,
      countyFrom: "",
      cityFrom:String,
      stateFrom:String,
      streetFrom:String,
      postCodeFrom:String,
      fullAddressFrom:"",
      countryCodeTo:"",
      latTo: Number,
      lngTo: Number,
      countyTo: "",
      cityTo:"",
      stateTo:String,
      streetTo:String,
      postCodeTp:String,
      fullAddressTo:"",
      startDate:Date,
      endDate:Date,
      cargo:Object,
      transport:Object
    }
  }
  }
}
</script>

