<template>
  <div class="d-flex">
    <p class=" mr-3"><b>Укажите расход топлива, л/100км</b></p>
    <input class="col-md-1" type="number" v-model="FuelConsumption">
  </div>
  <div id="map">
    <div class="d-flex justify-content-between justify-content-center  p-2">
      <p><b>Дистанция: </b>{{distance}} км.</p>
      <p><b>Время в пути: </b>{{duration}}</p>
      <p><b>Расход топлива: </b>{{FuelConsumptionTotal}} л.</p>
    </div>


    <div id="mapContainer" style="height:600px;width:100%" ref="hereMap"></div>
  </div>
</template>

<script>
import Constants from '@/Services/Constants'
import { useNotificationStore } from '@dafcoe/vue-notification'
export default {
  name: "HereMap",
  props: {
    center: Object
  },
  data() {
    return {
      FuelConsumption:Number,
      FuelConsumptionTotal:0,
      distance:'',
      duration:'',
      routingService:{},
      H:window.H,
      map: {},
      platform: {},
      apiKey:Constants.data().HereApiKey
    }
  },

  created() {
    this.platform = new this.H.service.Platform({
      apikey: this.apiKey
    });
    this.routingService = this.platform.getRoutingService();
  },
  mounted() {

    const mapContainer = this.$refs.hereMap;
    var maptypes = this.platform.createDefaultLayers();

    this.map = new this.H.Map(mapContainer, maptypes.vector.normal.map, {
      zoom: 10,
      center: this.center
    });

    addEventListener("resize", () => this.map.getViewPort().resize());

    new this.H.mapevents.Behavior(new this.H.mapevents.MapEvents(this.map));

    this.H.ui.UI.createDefault(this.map, maptypes);
  },
  methods:{
    getHeader(start,finish){
      return {'routingMode': 'fast',
        'mode': 'fastest;car;traffic:enabled',
        'waypoint0': `${start.lat},${start.lng}`,
        'waypoint1': `${finish.lat},${finish.lng}`,
        "representation":"display",
        "routeAttributes":"summary",
        'return': 'polyline,turnByTurnActions,actions,instructions,travelSummary'
      }
    },
    converTime: function (secounds){
      var h = Math.floor(secounds/3600);
      var m = Math.floor(secounds/60)%60;
      return(`${h} ч, ${m} м`)
    },
    drawRoute(start,finish){

      this.routingService.calculateRoute(this.getHeader(start,finish),
          data=>{

            this.distance = data.response.route[0].summary.distance/1000;
            this.duration = this.converTime(data.response.route[0].summary.trafficTime);
            this.FuelConsumptionTotal = (data.response.route[0].summary.distance/100000) * this.FuelConsumption;

            if (data.response.route.length>0)
            {

              let linestring = new this.H.geo.LineString();

              data.response.route[0].shape.forEach(point => {

                let [lat,lng] = point.split(",");
                linestring.pushPoint({lat:lat,lng:lng});

                let startMarker = new this.H.map.Marker({lat:start.lat,lng: start.lng});
                let endMarker = new this.H.map.Marker({lat:finish.lat,lng: finish.lng});

                this.map.addObject(startMarker);
                //this.map=
                this.map.addObject(endMarker);
              });

              let polyLine = new this.H.map.Polyline(linestring,
                  {style: { strokeColor: 'green', lineWidth: 3 }});
              this.map.addObject(polyLine);
              this.map.getViewModel().setLookAtData({bounds: polyLine.getBoundingBox()});
            }

          },
          error=>{
            console.error(error);
            const { setNotification } = useNotificationStore()
            setNotification(Constants.methods.GetNotification('Введите адресс отправления и конечной точки!',"warning"));
          })

    }
  }

}
</script>

<style scoped>
#map {
  width: 60vw;
  min-width: 360px;
  text-align: center;
  margin: 5% auto;
  background-color: #ccc;
}
</style>