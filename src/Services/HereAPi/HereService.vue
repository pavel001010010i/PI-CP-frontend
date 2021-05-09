<template>
  <div style="align-content: center">
    <button class=" btn btn-outline-info" @click="SetMap" >Построить маршрут</button>
  </div>
    <div class="container">
      <div class="row align-items-center mt-2">
        <div class="col-lg-6">
          <HereAddressLookup @coordinats="GetFromCoordinats"
                             nameSearchLabel="Введите адрес/страну/город/область отпрвления"/>
        </div>
        <div class="col-lg-6">
          <HereAddressLookup @coordinats="GetToCoordinats"
                             nameSearchLabel="Введите адрес/страну/город/область конечной точки"/>
        </div>
      </div>
      <HereMap ref="hereMap" :center="center" />

  </div>

</template>

<script>
import HereMap from "@/Services/HereAPi/HereMap"
import HereAddressLookup from "@/Services/HereAPi/HereAddressLookup";
export default {
name: "HereService",
  components:{
    HereMap,
    HereAddressLookup
  },
  data(){
    return{
      center:{
        lat: 53.9,
        lng: 27.5667
      },
      queryFrom: "",
      queryTo: "",
      position: null,
      quality: null,
      coordinatsTo:{},
      coordinatsFrom:{}
    }
  },
  methods:{
    GetToCoordinats: function (data){
      this.coordinatsTo = data;
    },
    GetFromCoordinats: function (data){
      this.coordinatsFrom = data;
    },
    SetMap: function (){
      let map = this.$refs.hereMap;
      map.drawRoute({
            lat:this.coordinatsFrom.lat,
            lng:this.coordinatsFrom.lng
          },
          {
            lat: this.coordinatsTo.lat,
            lng:this.coordinatsTo.lng
          });
    }
  },
  mounted() {
    /*let map = this.$refs.hereMap;
    map.drawRoute({
          lat:"53.269920",
          lng:"24.679874"
        },
        {
          lat:"54.221800",
          lng:"28.529999"
        });*/

  }
}

</script>

<style scoped>

</style>