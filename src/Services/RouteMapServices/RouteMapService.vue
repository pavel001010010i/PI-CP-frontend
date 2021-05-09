<script>
import Constants from "@/Services/Constants";
export default {
name: "RouteMapService",
  methods:{
    GetRouteMap(id){
      return  axios.get(Constants.data().url+`api/routemap/get-route/${id}`,Constants.data().contTypeHeader)
    }
  }
}
</script>
